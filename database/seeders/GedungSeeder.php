<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gedung;

class GedungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $gedungs = [
            ['nama_gedung' => "A"],
            ['nama_gedung' => "B"],
            ['nama_gedung' => "C"],
        ];

        foreach($gedungs as $gedung){
            Gedung::create($gedung);
        }
    }
}
