<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Perizinan;
use Faker\Factory as Faker;

class IzinPulangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');

        for($i = 2; $i <= 15; $i++){
            $perizinan = Perizinan::create([
                'id_mhs' => $i,
                'tanggal_pergi' => "2021-10-10",
                'tanggal_pulang' => "2021-12-12",
                'pengajuan_tanggal_pulang' => null,
                'keterangan_izin' => "Pulkam",
                'alamat_izin' => $faker->address,
                'keterangan_kembali' => null,
                'surat_pendukung' => null,
                'catatan_approval' => null,
                'status_izin' => $faker->numberBetween(0,4),
                'suhu_badan' => $faker->randomFloat($nbMaxDecimals = 1, $min = 36.5, $max = 37.5),
                'kondisi_kesehatan' => "Sehat",
                'jenis_kendaraan' => "Mobil",
            ]);
        }

        for($i = 1; $i <= 5; $i++){
            $perizinan = Perizinan::create([
                'id_mhs' => 1,
                'tanggal_pergi' => "2021-10-10",
                'tanggal_pulang' => "2021-12-12",
                'pengajuan_tanggal_pulang' => null,
                'keterangan_izin' => "Test pagination",
                'alamat_izin' => $faker->address,
                'keterangan_kembali' => null,
                'surat_pendukung' => null,
                'catatan_approval' => null,
                'status_izin' => $faker->numberBetween(0,4),
                'suhu_badan' => $faker->randomFloat($nbMaxDecimals = 1, $min = 36.5, $max = 37.5),
                'kondisi_kesehatan' => "Sehat",
                'jenis_kendaraan' => "Mobil",
            ]);
        }
    }
}
