<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject_id',
    ];

    // one to many relationship with Classes
    // public function classes()
    // {
    //     return $this->hasMany(Classes::class);
    // }

    // many to one relationship with Teacher
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'user_id', 'user_id');
    }

    // many to one relationship with Subject
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
