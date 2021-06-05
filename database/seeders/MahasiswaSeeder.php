<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Mahasiswa;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'email' => "mahasiswa@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 1
        ]);
        
        $mahasiswa = Mahasiswa::create([
            'id_users' => $user->id,
            'id_prodi' => 1,
            'id_kamar' => 1,
            'nama_mhs' => 'Chiwan',
            'nim_mhs' => '181511046',
            'jenis_kelamin' => 1,
            'tempat_tgl_lahir' => 'Bekasi,200/04/17',
            'agama' => 'Islam',
            'alamat_mhs' => 'Perum Villa Permata',
            'no_hp_mhs' => '08991276549',
            'nama_ortu' => 'Bu ichwan',
            'no_hp_ortu' => '08991276549',
            'status_keaktifan' => 1,
            'golongan_ukt' => 1
        ]);
    }
}
