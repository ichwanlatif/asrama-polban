<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengurus_Koordinator extends Model
{
    use HasFactory;
    protected $table = 'pengurus_koordinator';

    protected $fillable = [
        'id_users',
            'id_prodi',
            'id_kamar',
            'nama_pengurus_koordinator',
            'nim_pengurus_koordinator',
            'no_hp_pengurus_koordinator',
    ];
}
