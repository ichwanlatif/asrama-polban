<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Presensi;
use Faker\Factory as Faker;

class PresensiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $faker = Faker::create('id_ID');

<<<<<<< HEAD
        // for($i = 1; $i <= 50; $i++){
        //     $presensi = Presensi::create([
        //         'id_mhs' => $i,
        //         'status_presensi' => 0,
        //         'latitude' => $faker->latitude($min = -90, $max = 90),
        //         'longitude' => $faker->longitude($min = -180, $max = 180),
        //         'suhu_badan' => $faker->randomFloat($nbMaxDecimals = 1, $min = 36.5, $max = 37.5),
        //         'kondisi_kesehatan' => "Sehat",
        //     ]);
        // }

        // for($i = 1; $i <= 15; $i++){
        //     $presensi = Presensi::create([
        //         'id_mhs' => 2,
        //         'status_presensi' => 0,
        //         'latitude' => $faker->latitude($min = -90, $max = 90),
        //         'longitude' => $faker->longitude($min = -180, $max = 180),
        //         'suhu_badan' => $faker->randomFloat($nbMaxDecimals = 1, $min = 36.5, $max = 37.5),
        //         'kondisi_kesehatan' => "Sehat",
        //     ]);
        // }
=======
        for($i = 2; $i <= 50; $i++){
            $presensi = Presensi::create([
                'id_mhs' => $i,
                'status_presensi' => $faker->numberBetween(0,2),
                'latitude' => $faker->latitude($min = -90, $max = 90),
                'longitude' => $faker->longitude($min = -180, $max = 180),
                'suhu_badan' => $faker->randomFloat($nbMaxDecimals = 1, $min = 36.5, $max = 37.5),
                'kondisi_kesehatan' => "Sehat",
            ]);
        }

        for($i = 1; $i <= 15; $i++){
            $presensi = Presensi::create([
                'id_mhs' => 1,
                'status_presensi' => $faker->numberBetween(0,2),
                'latitude' => $faker->latitude($min = -90, $max = 90),
                'longitude' => $faker->longitude($min = -180, $max = 180),
                'suhu_badan' => $faker->randomFloat($nbMaxDecimals = 1, $min = 36.5, $max = 37.5),
                'kondisi_kesehatan' => "Sehat",
            ]);
        }
>>>>>>> dev
    }
}
