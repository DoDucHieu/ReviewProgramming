<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    // public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = 'class_id';

    protected $fillable = [
        'class_id',
        'start_date',
        'max_number_students',
        'current_number_students',
        'schedules',
        'description',
        'image',
        'bg_color',

        // 'teacher_subject_id',
        'user_id',
        'subject_id',
    ];

    // one to many relationship with StudentClasses
    public function studentClasses()
    {
        return $this->hasMany(StudentClass::class, 'class_id', 'class_id');
    }

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

    // many to one relationship with TeacherSubject
    // public function teacherSubject()
    // {
    //     return $this->belongsTo(TeacherSubject::class);
    // }

    // one to many relationship with Document
    public function documents()
    {
        return $this->hasMany(Document::class, 'class_id', 'class_id');
    }
}
