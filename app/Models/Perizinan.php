<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perizinan extends Model
{
    use HasFactory;

    protected $fillable = [
        'perizinan_type',
        'perizinan_status',
        'perizinan_start_at',
        'perizinan_end_at',
        'keterangan',
        'file',
        'catatan',
        'user_id'
    ];
}
