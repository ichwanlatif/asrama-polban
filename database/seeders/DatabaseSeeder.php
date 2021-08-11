<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            JurusanSeeder::class,
            ProdiSeeder::class,
            GedungSeeder::class,
            KamarSeeder::class,
            
            //Dummy
            MahasiswaSeeder::class,
            ManajemenSeeder::class,
            PengelolaSeeder::class,
            // IzinPulangSeeder::class,
            // IzinKembaliSeeder::class,
            // ResignSeeder::class,
            // PresensiSeeder::class,
        ]);
    }
}
