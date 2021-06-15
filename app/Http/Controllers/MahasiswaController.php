<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function getMahasiswaByUserId($id){
        $mahasiswa = Mahasiswa::where('id_users', $id)->first();
        
        if($mahasiswa){
            return response()->json([
                "status" => 'success',
                "msg" => "Success get mahasiswa",
                "data" => $mahasiswa
            ]);
        }
        else{
            return response()->json([
                "status" => 'error',
                "msg" => "Mahasiswa Not Found"
            ]);
        }
        
    }
}
