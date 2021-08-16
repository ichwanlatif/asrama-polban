<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class PengelolaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'email' => "rizqa.fauziyyah.tif18@polban.ac.id",
            'password' => \Hash::make(181511065),
            'role' => 2
        ]);
    }
}
