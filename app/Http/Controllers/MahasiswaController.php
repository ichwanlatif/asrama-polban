<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function getMahasiswaByUserId($id){
        $mahasiswa = Mahasiswa::where('id_users', $id)->first();
        
        return response()->json([
            "status" => 200,
            "success" => true,
            "data" => $mahasiswa
        ]);
        
    }
}
