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
            'email' => "manajemen@polban.ac.id",
            'password' => \Hash::make(12345678),
            'role' => 3
        ]);
    }
}
