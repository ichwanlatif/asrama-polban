<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jurusan;

class JurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $jurusans = [
            ['nama_jurusan' => "Teknik Sipil"],
            ['nama_jurusan' => "Teknik Mesin"],
            ['nama_jurusan' => "Teknik Refrigasi dan Tata Udara"],
            ['nama_jurusan' => "Teknik Konversi Energi"],
            ['nama_jurusan' => "Teknik Elektro"],
            ['nama_jurusan' => "Teknik Kimia"],
            ['nama_jurusan' => "Teknik Komputer dan Informatika"],
            ['nama_jurusan' => "Akuntansi"],
            ['nama_jurusan' => "Administrasi Niaga"],
            ['nama_jurusan' => "Bahasa Inggris"],
        ];

        foreach($jurusans as $jurusan){
            Jurusan::create($jurusan);
        }
    }
}
