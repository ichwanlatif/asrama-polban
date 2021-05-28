<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resign extends Model
{
    use HasFactory;
    protected $table = 'resign';

    protected $fillable = [
        'id_mhs',
        'tanggal_resign',
        'deskripsi',
        'status_approval'
    ];
}
