<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Mahasiswa;
use Faker\Factory as Faker;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');

        $user = User::create([
            'email' => "ichwan.latif.tif18@polban.ac.id",
            'password' => \Hash::make(181511046),
            'role' => 1
        ]);
        
        $mahasiswa = Mahasiswa::create([
            'id_users' => 1,
            'id_prodi' => 23,
            'id_kamar' => 25,
            'nama_mhs' => "Ichwan Latif Fajari",
            'nim' => "181511046",
            'alamat' => "Perum Villa Permata Blok DD5/33",
            'no_hp_mhs' => "08991276549",
            'nama_ortu' => "Pak Chibe",
            'no_hp_ortu' => "087878910454",
            'jenis_kelamin' => 1,
            'status_keaktifan' => 1,
            'tanggal_lahir' => "2000-04-17",
            'agama' => "Islam",
            'keterangan_asal' => "ADIK",
            'role_mhs' => "Mahasiswa",
        ]);

        $user = User::create([
            'email' => "irfan.siswara.tif18@polban.ac.id",
            'password' => \Hash::make(181511048),
            'role' => 1
        ]);
        
        $mahasiswa = Mahasiswa::create([
            'id_users' => 2,
            'id_prodi' => 23,
            'id_kamar' => 25,
            'nama_mhs' => "Irfan Siswara",
            'nim' => "181511048",
            'alamat' => "Karawang",
            'no_hp_mhs' => "0812345678",
            'nama_ortu' => "Pak Opa",
            'no_hp_ortu' => "0812345678",
            'jenis_kelamin' => 1,
            'status_keaktifan' => 1,
            'tanggal_lahir' => "2000-01-11",
            'agama' => "Islam",
            'keterangan_asal' => "BIDIKMISI",
            'role_mhs' => "Pengurus",
        ]);

        $user = User::create([
            'email' => "rizqa.fauzziyah.tif18@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 1
        ]);
        
        $mahasiswa = Mahasiswa::create([
            'id_users' => 3,
            'id_prodi' => 23,
            'id_kamar' => 5,
            'nama_mhs' => "Rizqa Fauziyyah",
            'nim' => "181511065",
            'alamat' => "Tasik",
            'no_hp_mhs' => "0812345678",
            'nama_ortu' => "Bu koko",
            'no_hp_ortu' => "0812345678",
            'jenis_kelamin' => 2,
            'status_keaktifan' => 1,
            'tanggal_lahir' => "2000-02-22",
            'agama' => "Islam",
            'keterangan_asal' => "BIDIKMISI",
            'role_mhs' => "Pengurus",
        ]);
        

        //Mahasiswa random
        for($i = 1; $i <= 50; $i++){
            $user = User::create([
                'email' => "mahasiswa$i@polban.ac.id",
                'password' => \Hash::make(12345678),
                'role' => 1
            ]);
            $mahasiswa = Mahasiswa::create([
                'id_users' => $i+3,
                'id_prodi' => $faker->numberBetween(1,36),
                'id_kamar' => $faker->numberBetween(1,72),
                'nama_mhs' => $faker->name,
                'nim' => $faker->numberBetween(181511001,181511099),
                'alamat' => $faker->address,
                'no_hp_mhs' => "0812345678",
                'nama_ortu' => $faker->name,
                'no_hp_ortu' => "0812345678",
                'jenis_kelamin' => $faker->numberBetween(1,2),
                'status_keaktifan' => 1,
                'tanggal_lahir' => $faker->date($format = 'Y-m-d', $max = 'now'),
                'agama' => "Islam",
                'keterangan_asal' => "BIDIKMISI",
                'role_mhs' => "Mahasiswa",
            ]);
        }
    }
}
