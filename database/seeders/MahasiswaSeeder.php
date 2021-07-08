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
            'email' => "ichwan.latif.tif18@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 1
        ]);
        
        $mahasiswa = Mahasiswa::create([
            'id_users' => 1,
            'id_prodi' => 23,
            'id_kamar' => 6,
            'nama_mhs' => "Ichwan Latif Fajari",
            'nim' => "181511046",
            'alamat' => "Perum Villa Permata Blok DD5/33",
            'no_hp_mhs' => "08991276549",
            'nama_ortu' => "Bapak Ichwan",
            'no_hp_ortu' => "087878910454",
            'jenis_kelamin' => 1,
            'status_keaktifan' => 1,
            'tanggal_lahir' => "2000-04-17",
            'agama' => "Islam",
            'keterangan_asal' => "ADIK",
            'role_mhs' => "Mahasiswa",
        ]);

        $user = User::create([
            'email' => "dudung@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 1
        ]);
        
        $mahasiswa = Mahasiswa::create([
            'id_users' => 2,
            'id_prodi' => 23,
            'id_kamar' => 20,
            'nama_mhs' => "Dudung",
            'nim' => "181511046",
            'alamat' => "Perum Villa Permata Blok DD5/33",
            'no_hp_mhs' => "08991276549",
            'nama_ortu' => "Bapak Ichwan",
            'no_hp_ortu' => "087878910454",
            'jenis_kelamin' => 1,
            'status_keaktifan' => 1,
            'tanggal_lahir' => "2000-04-17",
            'agama' => "Islam",
            'keterangan_asal' => "BIDIKMISI",
            'role_mhs' => "Pengurus",
        ]);

        $user = User::create([
            'email' => "asep@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 1
        ]);
        
        $mahasiswa = Mahasiswa::create([
            'id_users' => 3,
            'id_prodi' => 23,
            'id_kamar' => 20,
            'nama_mhs' => "Asep",
            'nim' => "181511046",
            'alamat' => "Perum Villa Permata Blok DD5/33",
            'no_hp_mhs' => "08991276549",
            'nama_ortu' => "Bapak Ichwan",
            'no_hp_ortu' => "087878910454",
            'jenis_kelamin' => 1,
            'status_keaktifan' => 1,
            'tanggal_lahir' => "2000-04-17",
            'agama' => "Islam",
            'keterangan_asal' => "BIDIKMISI",
            'role_mhs' => "Pengurus",
        ]);
    }
}
