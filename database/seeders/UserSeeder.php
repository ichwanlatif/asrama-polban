<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'nim' => '181511046',
            'nama' => 'Ichwan Latif Fajari',
            'alamat' => 'Perum Villa Permata',
            'tgl_lahir' => date_format(date_create("2000-04-17"), "Y-m-d"),
            'prodi' => 'D3 - Teknik Informatika',
            'jurusan' => 'Jurusan Teknik Informatika',
            'status_aktif' => 1,
            'status_bidikmisi' => 1,
            'ukt' => 1,
            'nomor_telepon' => '08991276549',
            'pengurus_jabatan' => 'Anggota',
            'email' => 'ichwan.latif.tif18@polban.ac.id',
            'password' => \Hash::make('123456'),
            'asrama_id' => 1
        ]);
    }
}
