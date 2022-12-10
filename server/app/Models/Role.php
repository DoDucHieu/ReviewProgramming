<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    // disable auto increment
    public $incrementing = false;

    protected $primaryKey = 'role_id';

    // one to many relationship with User
    public function users()
    {
        return $this->hasMany(User::class, 'role_id', 'role_id');
    }
}
