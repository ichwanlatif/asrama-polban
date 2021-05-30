<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Pengurus_Komdis;

class PengurusKomdisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'email' => "koko.koko.tif18@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 3
        ]);
        
        $komdis = Pengurus_Komdis::create([
            'id_users' => $user->id,
            'id_prodi' => 1,
            'id_kamar' => 1,
            'nama_pengurus_komdis' => "Koko Koko",
            'nim_pengurus_komdis' => "181511100",
            'no_hp_pengurus_komdis' => "08787896548",
        ]);
    }
}
