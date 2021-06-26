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
            'email' => "pengelola@polban.ac.id",
            'password' => \Hash::make(123456),
            'role' => 2
        ]);
    }
}
