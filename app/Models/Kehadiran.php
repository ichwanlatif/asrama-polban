<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kehadiran extends Model
{
    use HasFactory;

    protected $fillable = [
        'kehadiran_at',
        'kehadiran_status',
        'latitude',
        'longitude',
        'user_id'
    ];
}
