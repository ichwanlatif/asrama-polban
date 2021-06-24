<?php

namespace App\Http\Controllers;

use App\Models\Presensi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PresensiController extends Controller
{

    public function store(Request $request)
    {
        $validasi = \Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
            'id_mhs' => 'required'
        ]);

        if($validasi->fails()){
            return response()->json(["status" => $validasi->errors()], 422);
        }
        else{
            $insert = Presensi::create([
                'status' => $request->status,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'id_mhs' => $request->id_mhs
            ]);
            
            if($insert){
                return response()->json([
                    'status' => 'success',
                    'msg' => 'Presensi berhasil diinput',
                    'data' => $insert
                ], 201);
            }
            else{
                return response()->json([
                    'status' => 'error',
                    'msg' => 'Presensi gagal diinput',
                ]);
            }
        }
    }

    public function getKehadiranByUser($id){
        $kehadiran = Presensi::where([
            ['id_mhs', '=', $id],
            ])
            ->orderByDesc('created_at')
            ->get();

        if($kehadiran){
            return response()->json([
                'status' => 'success',
                'data' => $kehadiran
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => "Kehadiran Not Found"
            ]);
        }
    }

    public function checkKehadiranToday($id){
        $kehadiran = Presensi::where([
            ['id_mhs', '=', $id],
            ])
            ->whereDate('created_at', date("Y-m-d"))
            ->first();

        if($kehadiran){
            return response()->json([
                'status' => 'success',
                'data' => $kehadiran
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => 'Kehadiran not found'
            ]);
        }
    }

}