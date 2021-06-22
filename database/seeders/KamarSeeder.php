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
        for($i = 1; $i <= 24; $i++){
            $Kamar = Kamar::create([
                'no_kamar' => "A$i",
            ]);
        }
    }
}
