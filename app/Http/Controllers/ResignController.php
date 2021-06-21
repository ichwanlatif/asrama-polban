<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resign;

class ResignController extends Controller
{
    public function store(Request $request){
        $validasi = \Validator::make($request->all(), [
            'tanggal_resign' => 'required',
            'keterangan_resign' => 'required',
            'id_mhs' => 'required',
        ]);
        if($validasi->fails()){
            return response()->json(["status" => 'error', "msg" => "Form Tidak Valid"]);
        }
        else{
            $insert = Resign::create([
                'id_mhs' => $request->id_mhs,
                'tanggal_resign' => $request->tanggal_resign,
                'keterangan_resign' => $request->keterangan_resign,
                'status_resign' => 0,
            ]);

            if($insert){
                return response()->json([
                    'status' => 'success',
                    'msg' => 'Perizinan berhasil diinput',
                    'data' => $insert
                ], 201);
            }
            else{
                return response()->json([
                    'status' => 'error',
                    'msg' => 'Perizinan gagal diinput',
                ]);
            }
        }
    }

    public function getRiwayatResign($id){
        
        $resign = Resign::where('id_mhs', $id)->orderByDesc('created_at')->get();
        
        if($resign){
            return response()->json([
                'status' => 'success',
                'msg' => 'Success get data',
                'data' => $resign
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => 'Failed to get data'
            ]);
        }
    }
}
