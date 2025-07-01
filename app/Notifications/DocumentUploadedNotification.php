<?php

namespace App\Notifications;

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DocumentUploadedNotification extends Notification
{
    use Queueable;

    public $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => 'Document "' . $this->data['title'] . '" was uploaded.',
            'title' => $this->data['title'],
            'file_path' => $this->data['file_path'],
            'expires_at' => $this->data['expires_at'],
            'category' => $this->data['category'],
            'tags' => $this->data['tags'],
            'file_size' => $this->data['file_size'],
            'file_type' => $this->data['file_type'],
        ];
    }
}
