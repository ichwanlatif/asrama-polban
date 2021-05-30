<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Pengurus_Koordinator;

class PengurusKoordinatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'email' => "irfan.siswara.tif18@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 2
        ]);
        
        $koordinator = Pengurus_Koordinator::create([
            'id_users' => $user->id,
            'id_prodi' => 1,
            'id_kamar' => 1,
            'nama_pengurus_koordinator' => "Irfan Siswara",
            'nim_pengurus_koordinator' => "181511048",
            'no_hp_pengurus_koordinator' => "08787891454",
        ]);
    }
}
