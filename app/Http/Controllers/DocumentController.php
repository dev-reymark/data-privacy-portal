<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Notifications\DocumentUploadedNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $documents = Document::with('user')
            ->when($user->userrole === 'uploader', function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            }, function ($query) {
                return $query->where('status', 'approved');
            })
            ->latest()
            ->get();

        $notifications = $user->unreadNotifications()->limit(10)->get();

        return Inertia::render('Documents/Index', [
            'documents' => $documents,
            'notifications' => $notifications,
        ]);
    }


    public function create()
    {
        return Inertia::render('Documents/UploadDocumentForm');
    }

    public function store(Request $request)
    {
        Log::info('Document upload request received', [
            'user_id' => Auth::id(),
            'title' => $request->title,
            'category' => $request->category,
            'tags' => $request->tags,
            'expires_at' => $request->expires_at,
            'file' => $request->file('file') ? $request->file('file')->getClientOriginalName() : null,
            'file_size' => $request->file('file') ? $request->file('file')->getSize() : null,
            'file_type' => $request->file('file') ? $request->file('file')->getClientMimeType() : null,
        ]);

        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|mimes:pdf|max:10240',
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|string|max:255',
            'expires_at' => 'nullable|date',
            'file_size' => 'nullable|integer',
            'file_type' => 'nullable|string|max:50',
        ]);

        $file = $request->file('file');

        // use original
        $filename = uniqid() . '-' . $file->getClientOriginalName();
        $path = "documents/{$filename}";

        Storage::disk('public')->put($path, file_get_contents($file));

        $document = Document::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'file_path' => $path,
            'category' => $request->category,
            'tags' => $request->tags,
            'expires_at' => $request->expires_at,
            'file_size' => $file->getSize(),
            'file_type' => $file->getClientMimeType(),
            'status' => 'pending', // default status
        ]);

        $document->user->notify(
            (new DocumentUploadedNotification([
                'title' => $request->title,
                'file_path' => $path,
                'expires_at' => $request->expires_at,
                'category' => $request->category,
                'tags' => $request->tags,
                'file_size' => $file->getSize(),
                'file_type' => $file->getClientMimeType(),
            ]))->delay(now()->addMinutes(5))->onQueue('notifications')
        );

        return redirect()->route('documents.index')->with('success', 'Document uploaded.');
    }

    public function show(Document $document)
    {
        return response()->file(storage_path("app/public/{$document->file_path}"));
    }

    public function destroy(Document $document)
    {
        Storage::disk('public')->delete($document->file_path);
        $document->delete();

        return back()->with('success', 'Document deleted.');
    }

    public function pending()
    {
        if (Auth::user()?->userrole !== 'admin' && Auth::user()?->userrole !== 'approver') {
            abort(403, 'Unauthorized');
        }
        $pendingDocuments = Document::with('user')
            ->where('status', 'pending')
            ->latest()
            ->get();

        return Inertia::render('Documents/Pending', [
            'documents' => $pendingDocuments,
        ]);
    }

    public function approve(Document $document)
    {
        if (Auth::user()?->userrole !== 'admin' && Auth::user()?->userrole !== 'approver') {
            abort(403, 'Unauthorized');
        }
        if ($document->status !== 'pending') {
            return back()->withErrors(['error' => 'Document cannot be approved at this stage.']);
        }
        $document->update([
            'status' => 'approved',
            'rejection_reason' => null,
        ]);

        return back()->with('success', 'Document approved.');
    }

    public function deny(Request $request, Document $document)
    {

        if (Auth::user()?->userrole !== 'admin' && Auth::user()?->userrole !== 'approver') {
            abort(403, 'Unauthorized');
        }
        if ($document->status !== 'pending') {
            return back()->withErrors(['error' => 'Document cannot be denied at this stage.']);
        }
        $request->validate([
            'rejection_reason' => 'nullable|string|max:1000',
        ]);

        $document->update([
            'status' => 'denied',
            'rejection_reason' => $request->rejection_reason,
        ]);

        return back()->with('success', 'Document denied.');
    }
}
