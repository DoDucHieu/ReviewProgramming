<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'desc',
        'img_url',
        'is_approve',
        'html',
        'content',
        'user_id',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
