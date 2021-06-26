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
        'keterangan_resign',
        'suhu_badan',
        'kondisi_kesehatan',
        'jenis_kendaraan',
        'keterangan_stnk',
        'status_resign'
    ];
}
