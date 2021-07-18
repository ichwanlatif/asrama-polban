<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function getMahasiswaByUserId($id){
        $mahasiswa = Mahasiswa::where([['id_users', '=', $id], ['status_keaktifan', '=', 1]])->first();
        
        if($mahasiswa){
            return response()->json([
                "status" => 'success',
                "message" => "Success get mahasiswa",
                "data" => $mahasiswa
            ]);
        }
        else{
            return response()->json([
                "status" => 'error',
                "message" => "Mahasiswa Not Found"
            ]);
        }
        
    }
}
