<?php

namespace App\Http\Controllers;

use App\Models\Kehadiran;
use Illuminate\Http\Request;

class KehadiranController extends Controller
{

    public function store(Request $request)
    {
        $validasi = \Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
            'user_id' => 'required'
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
                $status = "Alfa";
            }
            else{
                $status = "Hadir";
            }
            $insert = Kehadiran::create([
                'kehadiran_at' => now(),
                'kehadiran_status' => $status,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'user_id' => $request->user_id
            ]);
            
            if($insert){
                return response()->json([
                    'status' => 'success',
                    'msg' => 'Kehadiran berhasil diinput',
                    'data' => $insert
                ], 201);
            }
            else{
                return response()->json([
                    'status' => 'error',
                    'msg' => 'Kehadiran gagal diinput',
                ], 500);
            }
        }
    }

    public function getKehadiranByWeek(){
        $kehadiran = Kehadiran::where([
            ['created_at', '>', DB::raw('NOW() - INTERVAL 1 WEEK')]
            ])
            ->orderByDesc('created_at')
            ->get();

        if($kehadiran){
            return response()->json([
                'status' => 'success',
                'data' => $insert
            ], 201);
        }
        else{
            return response()->json([
                'status' => 'error',
            ], 500);
        }
    }

    public function getKehadiranById($id){
        $kehadiran = Kehadiran::where([
            ['id', '=', $id],
            ['created_at', '>', DB::raw('NOW() - INTERVAL 1 WEEK')]
            ])
            ->orderByDesc('kehadiran_at')
            ->get();

        if($kehadiran){
            return response()->json([
                'status' => 'success',
                'data' => $insert
            ], 201);
        }
        else{
            return response()->json([
                'status' => 'error',
            ], 500);
        }
    }
}