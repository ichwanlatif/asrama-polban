<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presensi extends Model
{
    use HasFactory;

    protected $table = 'presensi';

    protected $fillable = [
        'id_mhs',
        'status_presensi',
        'latitude',
        'longitude',
        'suhu_badan',
        'kondisi_kesehatan',
    ];
}
