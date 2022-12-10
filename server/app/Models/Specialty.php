<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    use HasFactory;

    // public $timestamps = false;

    protected $fillable = ['specialty_name'];

    // one to many relationship with Subject
    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    // one to many relationship with Teacher
    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }
}
