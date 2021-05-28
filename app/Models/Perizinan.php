<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perizinan extends Model
{
    use HasFactory;

    protected $table = 'perizinan';
    protected $fillable = [
        'id_mhs',
        'tanggal_pergi',
        'tanggal_pulang',
        'deskripsi',
        'file_pendukung',
        'status_approval',
        'catatan_pengurus',
    ];
}
