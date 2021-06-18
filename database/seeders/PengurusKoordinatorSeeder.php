<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Mahasiswa;

class PengurusKoordinatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'email' => "koordinator@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 2
        ]);
        
        $mahasiswa = Mahasiswa::create([
            'id_users' => $user->id,
            'id_prodi' => 1,
            'id_kamar' => 1,
            'nama_mhs' => 'Irfan',
            'nim_mhs' => '181511048',
            'jenis_kelamin' => 1,
            'tanggal_lahir' => '2000-01-01',
            'agama' => 'Islam',
            'alamat_mhs' => 'Karawang',
            'no_hp_mhs' => '0812345678',
            'nama_ortu' => 'Pak irfan',
            'no_hp_ortu' => '0812345678',
            'golongan_ukt' => 1
        ]);
    }
}
