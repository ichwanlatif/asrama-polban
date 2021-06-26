<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kamar;

class KamarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($j = 1; $j <= 3; $j++){
            for($i = 1; $i <= 24; $i++){
                $Kamar = Kamar::create([
                    'id_gedung'  => $j,
                    'no_kamar' => "$i",
                ]);
            }
        }
    }
}
