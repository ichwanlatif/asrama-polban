<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;
    protected $table = 'mahasiswa';

    protected $fillable = [
        'id_users',
        'id_prodi',
        'id_kamar',
        'nama_mhs',
        'nim',
        'alamat',
        'no_hp_mhs',
        'nama_ortu',
        'no_hp_ortu',
        'jenis_kelamin',
        'status_keaktifan',
        'tanggal_lahir',
        'agama',
        'keterangan_asal',
        'role_mhs',
    ];
}
