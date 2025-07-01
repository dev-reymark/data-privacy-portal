<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'notifications' => Auth::user()->unreadNotifications()->limit(5)->get(),
            'documents' => Document::with('user')->latest()->limit(5)->get(),
            'approvedDocument' => Document::where('status', 'approved')->count(),
        ]);
    }
}
