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
            'kondisi_kesehatan' => 'required',
            'suhu_badan' => 'required',
            'id_mhs' => 'required',

        ]);
        if($validasi->fails()){
            return response()->json(["status" => 'error', "msg" => "Form Tidak Valid"]);
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

    public function getAllResign(){
        $resign = DB::table('resign')
            ->where('status_resign', '=', 0)
            ->join('mahasiswa', 'resign.id_mhs', '=', 'mahasiswa.id')
            ->select('resign.*', 'mahasiswa.nama_mhs')
            ->get();
        
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

    public function approveResign(Request $request){
        $resign = Resign::where([
            ['id', '=', $request->id],
            ['status_resign', '=', 0],
        ])->first();

        $resign->update([
            'status_resign' => 5
        ]);

        if($resign){
            $details = [
                
                'tanggal_resign' => $resign->tanggal_resign,
                'keterangan_resign' => $resign->keterangan_resign
            ];
    
            $mahasiswa = Mahasiswa::where('id', $resign->id_mhs)->first();
            $akun = User::where('id', $mahasiswa->id_users)->first();
    
            Mail::to($akun->email)->send(new ApprovalResignMail($details));
            return response()->json([
                'status' => 'success',
                'msg' => 'Success approve',
                'data' => $resign
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => 'Failed to approve'
            ]);
        }
    }
}
