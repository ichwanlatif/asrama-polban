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
            MahasiswaSeeder::class,
            PengurusKoordinatorSeeder::class,
            PengurusKomdisSeeder::class,
            ManajemenSeeder::class,
            JurusanSeeder::class,
            ProdiSeeder::class,
            KamarSeeder::class,
        ]);
    }
}
