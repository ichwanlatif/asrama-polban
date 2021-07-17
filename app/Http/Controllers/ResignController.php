<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Mahasiswa;
use App\Models\Resign;
use App\Models\User;

use App\Mail\PengajuanResignMail;
use App\Mail\ApprovalResignMail;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class ResignController extends Controller
{
    public function store(Request $request){
        $validasi = \Validator::make($request->all(), [
            'tanggal_resign' => 'required',
            'keterangan_resign' => 'required',
            'jenis_kendaraan' => 'required',
            'suhu_badan' => 'required|numeric|between:30,50',
            'kondisi_kesehatan' => 'required|max:50',
            'id_mhs' => 'required',

        ]);
        if($validasi->fails()){
            return response()->json(["status" => 'error', "message" => $validasi->errors()]);
        }
        else{
            
            if($request->file('file')){
                $fileName = time().'-'.Str::random(10). '.'.$request->file('file')->getClientOriginalExtension();
                $request->file('file')->storeAs('public/stnk_kendaraan', $fileName);
            }
            else{
                $fileName = null;
            }
            $insert = Resign::create([
                'id_mhs' => $request->id_mhs,
                'tanggal_resign' => $request->tanggal_resign,
                'keterangan_resign' => $request->keterangan_resign,
                'suhu_badan' => $request->suhu_badan,
                'kondisi_kesehatan' => $request->kondisi_kesehatan,
                'jenis_kendaraan' => $request->jenis_kendaraan,
                'keterangan_stnk' => $fileName,
                'status_resign' => 0,
            ]);

            if($insert){
                $mahasiswa = Mahasiswa::where('id_mhs', $request->id_mhs)->first();
                $pengelola = User::where('role', 2)->first();

                $details = [
                    'from' => $mahasiswa->nama_mhs,
                    'tanggal_resign' => $request->tanggal_resign,
                    'keterangan_resign' => $request->keterangan_resign,
                    'suhu_badan' => $request->suhu_badan,
                    'kondisi_kesehatan' => $request->kondisi_kesehatan,
                    'jenis_kendaraan' => $request->jenis_kendaraan,
                ];

                Mail::to($pengelola->email)->send(new PengajuanResignMail($details));

                return response()->json([
                    'status' => 'success',
                    'message' => 'Perizinan berhasil diinput',
                    'data' => $insert
                ], 201);
            }
            else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'Perizinan gagal diinput',
                ]);
            }
        }
    }

    public function getRiwayatResign($id){
        
        $resign = Resign::where('id_mhs', $id)->orderByDesc('created_at')->get();
        
        if($resign){
            return response()->json([
                'status' => 'success',
                'message' => 'Success get data',
                'data' => $resign
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to get data'
            ]);
        }
    }

    public function getAllResign($role){
        $resign = false;
        if($role == 2){
            $resign = DB::table('resign')
            ->where('status_resign', '=', 0)
            ->join('mahasiswa', 'resign.id_mhs', '=', 'mahasiswa.id_mhs')
            ->select('resign.*', 'mahasiswa.nama_mhs')
            ->get();
        }
        else if($role == 3){
            $resign = DB::table('resign')
            ->where('status_resign', '=', 0)
            ->orWhere('status_resign', '=', 1)
            ->join('mahasiswa', 'resign.id_mhs', '=', 'mahasiswa.id_mhs')
            ->select('resign.*', 'mahasiswa.nama_mhs')
            ->get();
        }
        if($resign){
            return response()->json([
                'status' => 'success',
                'message' => 'Success get data',
                'data' => $resign
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to get data'
            ]);
        }
    }

    public function getDetailResign($id){  
        
        $resign = DB::table('resign')
            ->join('mahasiswa', 'mahasiswa.id_mhs', '=', 'resign.id_mhs')
            ->join('prodi', 'mahasiswa.id_prodi', '=', 'prodi.id_prodi')
            ->join('jurusan', 'prodi.id_jurusan', '=', 'jurusan.id_jurusan')
            ->join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
            ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
            ->where('resign.id_resign', $id)
            ->first();
        
        if($resign){
            return response()->json([
                'status' => 'success',
                'message' => 'Success get data',
                'data' => $resign
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to get data'
            ]);
        }
    }

    public function approveResign(Request $request){
        $validasi = \Validator::make($request->all(), [
            'status_resign' => 'required|numeric',
            'id_resign' => 'required'
        ]);

        if($validasi->fails()){
            return response()->json(["status" => 422, "message" => $validasi->errors()]);
        }
        
        $resign = Resign::where([
            ['id_resign', '=', $request->id_resign],
            ['status_resign', '=', 0],
        ])->update([
            'status_resign' => $request->status_resign
        ]);

        $detail = Resign::where([
            ['id_resign', '=', $request->id_resign],
        ])->first();

        Mahasiswa::where('id_mhs', $detail->id_mhs)
        ->update([
            'status_keaktifan' => 0
        ]);

        if($resign){
            $details = [
                'tanggal_resign' => $detail->tanggal_resign,
                'keterangan_resign' => $detail->keterangan_resign,
                'suhu_badan' => $detail->suhu_badan,
                'kondisi_kesehatan' => $detail->kondisi_kesehatan,
                'jenis_kendaraan' => $detail->jenis_kendaraan,
            ];
    
            $mahasiswa = Mahasiswa::where('id_mhs', $detail->id_mhs)->first();
            $akun = User::where('id_users', $mahasiswa->id_users)->first();
    
            Mail::to($akun->email)->send(new ApprovalResignMail($details));
            return response()->json([
                'status' => 'success',
                'message' => 'Success approve',
                'data' => $resign
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to approve'
            ]);
        }
    }
}
