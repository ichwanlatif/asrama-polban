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
        'keterangan_izin',
        'alamat_izin',
        'keterangan_kembali',
        'surat_pendukung',
        'catatan_approval',
        'status_izin',
        'suhu_badan',
        'kondisi_kesehatan',
        'jenis_kendaraan',
    ];
}
