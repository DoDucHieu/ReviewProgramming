<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'subject_name',
        'specialty_id',
        'credit_id'
    ];

    // many to one relationship with Classes
    public function classes()
    {
        return $this->hasMany(Classes::class);
    }

    // one to many relationship with Specialty
    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    // one to many relationship with StudentSubject
    public function studentSubject()
    {
        return $this->hasMany(StudentSubject::class);
    }

    // one to many relationship with Credit
    public function credit()
    {
        return $this->belongsTo(Credit::class);
    }
}
