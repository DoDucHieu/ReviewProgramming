<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $fillable = [
        'score',
        'user_id',
        'class_id',
    ];

    // many to one relationship with Student
    public function student()
    {
        return $this->belongsTo(Student::class, 'user_id', 'user_id');
    }

    // many to one relationship with Class
    public function class()
    {
        return $this->belongsTo(Classes::class, 'class_id', 'class_id');
    }
}
