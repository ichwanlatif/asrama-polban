<?php

namespace App\Http\Controllers;

use App\Models\Presensi;
use App\Models\RekapPresensi;
use App\Models\MahasiswaGedung;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PresensiController extends Controller
{

    public function store(Request $request)
    {
        $validasi = \Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
            'id_mhs' => 'required',
            'suhu_badan' => 'required',
            'kondisi_kesehatan' => 'required',
            'status' => 'required'
        ]);

        if($validasi->fails()){
            return response()->json(["status" => $validasi->errors()], 422);
        }
        else{
            $insert = Presensi::create([
                'status_presensi' => $request->status,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'id_mhs' => $request->id_mhs,
                'suhu_badan' => $request->suhu_badan,
                'kondisi_kesehatan' => $request->kondisi_kesehatan
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

    public function getRekapitulasiById($id){
        $alfa = Presensi::where([
            ['id_mhs', '=', $id],
            ['status_presensi', '=', 0]
            ])
            ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();
        
        $hadir = Presensi::where([
            ['id_mhs', '=', $id],
            ['status_presensi', '=', 1]
            ])
            ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();
        
        $izin = Presensi::where([
            ['id_mhs', '=', $id],
            ['status_presensi', '=', 2]
            ])
            ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();
        
        $mahasiswa = DB::table('mahasiswa')
            ->where('id_mhs', '=', $id)
            ->join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
            ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
            ->first();

        return response()->json([
            'status' => 'success',
            'alfa' => $alfa,
            'hadir' => $hadir,
            'izin' => $izin,
            'mahasiswa' => $mahasiswa
        ]);
    }

    public function getRekapitulasi(){
        
        $alfaA = RekapPresensi::where([
            ['status_presensi', '=', 0],
            ['nama_gedung', '=', 'A']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $alfaB = RekapPresensi::where([
            ['status_presensi', '=', 0],
            ['nama_gedung', '=', 'B']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $alfaC = RekapPresensi::where([
            ['status_presensi', '=', 0],
            ['nama_gedung', '=', 'C']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $hadirA = RekapPresensi::where([
            ['status_presensi', '=', 1],
            ['nama_gedung', '=', 'A']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $hadirB = RekapPresensi::where([
            ['status_presensi', '=', 1],
            ['nama_gedung', '=', 'B']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $hadirC = RekapPresensi::where([
            ['status_presensi', '=', 1],
            ['nama_gedung', '=', 'C']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $izinA = RekapPresensi::where([
            ['status_presensi', '=', 2],
            ['nama_gedung', '=', 'A']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $izinB = RekapPresensi::where([
            ['status_presensi', '=', 2],
            ['nama_gedung', '=', 'B']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $izinC = RekapPresensi::where([
            ['status_presensi', '=', 2],
            ['nama_gedung', '=', 'C']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $mhsA = MahasiswaGedung::where([
            ['nama_gedung', '=', 'A']
        ])
        ->count();

        $pengurusA = MahasiswaGedung::where([
            ['nama_gedung', '=', 'A'],
            ['role_mhs', '=', 'Pengurus'],
        ])
        ->count();

        $mhsB = MahasiswaGedung::where([
            ['nama_gedung', '=', 'B']
        ])
        ->count();

        $pengurusB = MahasiswaGedung::where([
            ['nama_gedung', '=', 'B'],
            ['role_mhs', '=', 'Pengurus'],
        ])
        ->count();

        $mhsC = MahasiswaGedung::where([
            ['nama_gedung', '=', 'C']
        ])
        ->count();

        $pengurusC = MahasiswaGedung::where([
            ['nama_gedung', '=', 'C'],
            ['role_mhs', '=', 'Pengurus'],
        ])
        ->count();

        return response()->json([
            'status' => 'success',
            'gedungA' => array($alfaA, $hadirA, $izinA, $mhsA, $pengurusA),
            'gedungB' => array($alfaB, $hadirB, $izinB, $mhsB, $pengurusB),
            'gedungC' => array($alfaC, $hadirC, $izinC, $mhsC, $pengurusC),
        ]);
    }

}