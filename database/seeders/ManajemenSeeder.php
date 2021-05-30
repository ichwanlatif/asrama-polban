<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Manajemen;

class ManajemenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'email' => "manajemen@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 4
        ]);
        
        $manajemen = Manajemen::create([
            'id_users' => $user->id,
            'nama_manajemen' => "Ichwan",
            'nip' => "1234567892132",
            'no_hp_manajemen' => "0896552314562",
        ]);
    }
}
