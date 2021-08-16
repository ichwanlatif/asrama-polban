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


        //Mahasiswa random
        // for($i = 1; $i <= 50; $i++){
        //     $user = User::create([
        //         'email' => "mahasiswa$i@polban.ac.id",
        //         'password' => \Hash::make(12345678),
        //         'role' => 1
        //     ]);
        //     $mahasiswa = Mahasiswa::create([
        //         'id_users' => $i+1,
        //         'id_prodi' => $faker->numberBetween(1,36),
        //         'id_kamar' => $faker->numberBetween(1,72),
        //         'nama_mhs' => $faker->name,
        //         'nim' => $faker->numberBetween(181511001,181511068),
        //         'alamat' => $faker->address,
        //         'no_hp_mhs' => "0812345678",
        //         'nama_ortu' => $faker->name,
        //         'no_hp_ortu' => "0812345678",
        //         'jenis_kelamin' => $faker->numberBetween(0,1),
        //         'status_keaktifan' => 1,
        //         'tanggal_lahir' => $faker->date($format = 'Y-m-d', $max = 'now'),
        //         'agama' => "Islam",
        //         'keterangan_asal' => "ADIK",
        //         'role_mhs' => "Mahasiswa",
        //     ]);
        // }
    }
}
