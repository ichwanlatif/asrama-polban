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
            $latitude1 = -6.871977813343654;
            $longitude1 = 107.57378749578149;
            $latitude2 = $request->latitude;
            $longitude2 = $request->longitude;

            $earth_radius = 6371;

            $dLat = deg2rad($latitude2 - $latitude1);
            $dLon = deg2rad($longitude2 - $longitude1);

            $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * sin($dLon/2) * sin($dLon/2);
            $c = 2 * asin(sqrt($a));
            $jarak = $earth_radius * $c;
            
            if($jarak > 1){
                $status = 0;
            }
            else{
                $status = 1;
            }
            $insert = Presensi::create([
                'status' => $status,
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