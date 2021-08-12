<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Resign;
use Faker\Factory as Faker;

class ResignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    //     $faker = Faker::create('id_ID');

    //     for($i = 1; $i <= 15; $i++){
    //         $resign = Resign::create([
    //             'id_mhs' => $i+30,
    //             'tanggal_resign' => "2021-12-21",
    //             'keterangan_resign' => "Masa tinggal habis",
    //             'suhu_badan' => $faker->randomFloat($nbMaxDecimals = 1, $min = 36.5, $max = 37.5),
    //             'kondisi_kesehatan' => "Sehat",
    //             'jenis_kendaraan' => "Sepeda",
    //             'keterangan_stnk' => null,
    //             'status_resign' => 0,
    //         ]);
    //     }

    //     for($i = 1; $i <= 5; $i++){
    //         $resign = Resign::create([
    //             'id_mhs' => 2,
    //             'tanggal_resign' => "2021-12-21",
    //             'keterangan_resign' => "Test pagination",
    //             'suhu_badan' => $faker->randomFloat($nbMaxDecimals = 1, $min = 36.5, $max = 37.5),
    //             'kondisi_kesehatan' => "Sehat",
    //             'jenis_kendaraan' => "Sepeda",
    //             'keterangan_stnk' => null,
    //             'status_resign' => 3,
    //         ]);
    //     }
    }
}
