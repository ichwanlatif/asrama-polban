<?php

namespace App\Http\Controllers;

use App\Models\Presensi;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Response;
use PDF;

class PresensiController extends Controller
{

    public function store(Request $request)
    {
        
        $messages = [
            'required'            => ':attribute harus diisi. ',
            'numeric'            => ':attribute harus diisi angka. ',
            'max'               => ':attribute harus diisi maksimal :max. ',
        ];

        $validasi = \Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
            'id_mhs' => 'required',
            'suhu_badan' => 'required|numeric|between:30,50',
            'kondisi_kesehatan' => 'required|max:50',
            'status' => 'required'
        ], $messages);

        if($validasi->fails()){
            return response()->json(["message" => $validasi->errors()]);
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
                    'message' => 'Presensi berhasil diinput',
                    'data' => $insert
                ], 201);
            }
            else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'Presensi gagal diinput',
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
                'message' => "Kehadiran Not Found"
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
                'message' => 'Kehadiran not found'
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

    public function dashboard(){
        
        $alfaA = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('presensi', 'mahasiswa.id_mhs', '=', 'presensi.id_mhs')
        ->where([
            ['status_presensi', '=', 0],
            ['nama_gedung', '=', 'A']
        ])
        ->whereMonth('presensi.created_at', date('n'))
            ->whereYear('presensi.created_at', date('Y'))
            ->count();

        $alfaB = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('presensi', 'mahasiswa.id_mhs', '=', 'presensi.id_mhs')
        ->where([
            ['status_presensi', '=', 0],
            ['nama_gedung', '=', 'B']
        ])
        ->whereMonth('presensi.created_at', date('n'))
            ->whereYear('presensi.created_at', date('Y'))
            ->count();

        $alfaC = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('presensi', 'mahasiswa.id_mhs', '=', 'presensi.id_mhs')
        ->where([
            ['status_presensi', '=', 0],
            ['nama_gedung', '=', 'C']
        ])
        ->whereMonth('presensi.created_at', date('n'))
            ->whereYear('presensi.created_at', date('Y'))
            ->count();

        $hadirA = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('presensi', 'mahasiswa.id_mhs', '=', 'presensi.id_mhs')
        ->where([
            ['status_presensi', '=', 1],
            ['nama_gedung', '=', 'A']
        ])
        ->whereMonth('presensi.created_at', date('n'))
            ->whereYear('presensi.created_at', date('Y'))
            ->count();

        $hadirB = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('presensi', 'mahasiswa.id_mhs', '=', 'presensi.id_mhs')
        ->where([
            ['status_presensi', '=', 1],
            ['nama_gedung', '=', 'B']
        ])
        ->whereMonth('presensi.created_at', date('n'))
            ->whereYear('presensi.created_at', date('Y'))
            ->count();

        $hadirC = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('presensi', 'mahasiswa.id_mhs', '=', 'presensi.id_mhs')
        ->where([
            ['status_presensi', '=', 1],
            ['nama_gedung', '=', 'C']
        ])
        ->whereMonth('presensi.created_at', date('n'))
            ->whereYear('presensi.created_at', date('Y'))
            ->count();

        $izinA = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('presensi', 'mahasiswa.id_mhs', '=', 'presensi.id_mhs')
        ->where([
            ['status_presensi', '=', 2],
            ['nama_gedung', '=', 'A']
        ])
        ->whereMonth('presensi.created_at', date('n'))
            ->whereYear('presensi.created_at', date('Y'))
            ->count();

        $izinB = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('presensi', 'mahasiswa.id_mhs', '=', 'presensi.id_mhs')
        ->where([
            ['status_presensi', '=', 2],
            ['nama_gedung', '=', 'B']
        ])
        ->whereMonth('presensi.created_at', date('n'))
            ->whereYear('presensi.created_at', date('Y'))
            ->count();

        $izinC = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('presensi', 'mahasiswa.id_mhs', '=', 'presensi.id_mhs')
        ->where([
            ['status_presensi', '=', 2],
            ['nama_gedung', '=', 'C']
        ])
        ->whereMonth('presensi.created_at', date('n'))
            ->whereYear('presensi.created_at', date('Y'))
            ->count();

        $mhsA = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->where([
            ['nama_gedung', '=', 'A']
        ])
        ->count();

        $pengurusA = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->where([
            ['nama_gedung', '=', 'A'],
            ['role_mhs', '=', 'Pengurus'],
        ])
        ->count();

        $mhsB = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->where([
            ['nama_gedung', '=', 'B']
        ])
        ->count();

        $pengurusB = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->where([
            ['nama_gedung', '=', 'B'],
            ['role_mhs', '=', 'Pengurus'],
        ])
        ->count();

        $mhsC = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->where([
            ['nama_gedung', '=', 'C']
        ])
        ->count();

        $pengurusC = Mahasiswa::join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->where([
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

    public function getRekapitulasi($date_from, $date_to){
        $rekap_mahasiswas = new Collection;
        $rekap_mahasiswa = new Collection;
        $mahasiswas = DB::table('mahasiswa')
        ->where([['status_keaktifan', '=', 1]])
        ->join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->orderBy('kamar.id_kamar', 'asc')
        ->orderBy('mahasiswa.nama_mhs', 'asc')
        ->get();
        foreach($mahasiswas as $mahasiswa){
            $presensi = Presensi::where([
                ['id_mhs', '=', $mahasiswa->id_mhs],
            ])
            ->where([
                ['created_at', '<=', $date_to],
                ['created_at', '>=', $date_from]
            ])
            ->get();
            
            $alfa = $presensi->where('status_presensi', '=', 0)->count();
            $hadir = $presensi->where('status_presensi', '=', 1)->count();
            $izin = $presensi->where('status_presensi', '=', 2)->count();
            
            $resign = DB::table('resign')
            ->where('id_mhs', '=', $mahasiswa->id_mhs)
            ->where('status_resign', '=', 1)
            ->first();

            // switch ($mahasiswa->status_keaktifan) {
            //     case 1:
            //         $status = "Aktif";
            //         break;
                
            //     case 0:
            //         $status = "Tidak Aktif";
            //         break;
            // }

            $rekap_mahasiswa = collect([
                'nama_mhs' => $mahasiswa->nama_mhs, 
                'nim' => $mahasiswa->nim, 
                'no_kamar' => $mahasiswa->no_kamar, 
                'nama_gedung' => $mahasiswa->nama_gedung,
                'keterangan_asal' => $mahasiswa->keterangan_asal,
                'role_mhs' => $mahasiswa->role_mhs, 
                'alfa' => $alfa, 
                'hadir' => $hadir, 
                'izin' => $izin, 
                // 'status_keaktifan' => $status,
                // 'tanggal_resign' => $resign
            ]);
            $rekap_mahasiswas->push($rekap_mahasiswa);
        }

        return response()->json([
            'status' => 'success',
            'data' => $rekap_mahasiswas
        ]);
    }

    public function getPresensiToday(){
        $presensis = DB::table('presensi')
        ->join('mahasiswa', 'presensi.id_mhs', '=', 'mahasiswa.id_mhs')
        ->join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->whereDate('presensi.created_at', date("Y-m-d"))
        ->orderBy('kamar.id_kamar', 'asc')
        ->orderBy('mahasiswa.nama_mhs', 'asc')
        ->get();

        if($presensis){
            return response()->json([
                'status' => 'success',
                'data' => $presensis
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Kehadiran not found'
            ]);
        }
    }
}