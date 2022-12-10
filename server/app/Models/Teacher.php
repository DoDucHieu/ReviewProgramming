<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'user_id',
        'specialty_id'
    ];

    // one to one relationship with User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // has many Classes
    public function classes()
    {
        return $this->hasMany(Classes::class, 'user_id', 'user_id');
    }

    // one to many relationship with Specialty
    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    // one to many relationship with TeacherSubject
    public function teacherSubjects()
    {
        return $this->hasMany(TeacherSubject::class, 'user_id', 'user_id');
    }
}
