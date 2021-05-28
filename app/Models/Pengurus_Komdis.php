<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengurus_Komdis extends Model
{
    use HasFactory;
    protected $table = 'pengurus_komdis';

    protected $fillable = [
        'id_users',
            'id_prodi',
            'id_kamar',
            'nama_pengurus_komdis',
            'nim_pengurus_komdis',
            'no_hp_pengurus_komdis'
    ];
}
