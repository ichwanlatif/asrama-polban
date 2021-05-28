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
        'nim_mhs',
        'jenis_kelamin',
        'tempat_tgl_lahir',
        'agama',
        'alamat_mhs',
        'no_hp_mhs',
        'nama_ortu',
        'no_hp_ortu',
        'status_keaktifan',
        'golongan_ukt'
    ];
}
