<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manajemen extends Model
{
    use HasFactory;
    protected $table = 'manajemen';

    protected $fillable = [
        'id_users',
        'nama_manajemen',
        'nip',
        'no_hp_manajemen'
    ];
}
