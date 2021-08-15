<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

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
            'email' => "irfan.siswara.tif18@polban.ac.id",
            'password' => \Hash::make(181511048),
            'role' => 3
        ]);
    }
}
