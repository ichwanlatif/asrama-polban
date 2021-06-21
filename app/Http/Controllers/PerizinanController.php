<?php

namespace App\Http\Controllers;

use App\Models\Perizinan;
use App\Models\Mahasiswa;
use App\Models\User;

use App\Mail\PengajuanPerizinanMail;
use App\Mail\ApprovalMail;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use Carbon\Carbon;

class PerizinanController extends Controller
{
    public function store(Request $request){
        $validasi = \Validator::make($request->all(), [
            'tanggal_pergi' => 'required',
            'tanggal_pulang' => 'required',
            'keterangan_izin' => 'required',
            'id_mhs' => 'required',
        ]);

        if($validasi->fails()){
            return response()->json(["status" => 422, "msg" => "Form Tidak Valid"]);
        }
        else{
            if($request->tanggal_pergi > $request->tanggal_pulang){
                return response()->json(["status" => 422, "msg" => "Tanggal Pergi dan Pulang Tidak Benar"]);
            }
            if($request->file('file')){

                $fileName = time().'-'.Str::random(10). '.'.$request->file('file')->getClientOriginalExtension();
                $request->file('file')->storeAs('public/file_perizinan', $fileName);
            }
            $insert = Perizinan::create([
                'id_mhs' => $request->id_mhs,
                'tanggal_pergi' => $request->tanggal_pergi,
                'tanggal_pulang' => $request->tanggal_pulang,
                'keterangan_izin' => $request->keterangan_izin,
                'surat_pendukung' => $fileName,
                'status_izin' => 0,
                'catatan_pengurus' => " ",
            ]);

            if($insert){

                $mahasiswa = Mahasiswa::where('id', $request->id_mhs)->first();
                $pengurus = User::where('role', 2)->first();

                $details = [
                    'from' => $mahasiswa->nama_mhs,
                    'tanggal_pergi' => $request->tanggal_pergi,
                    'tanggal_pulang' => $request->tanggal_pulang,
                    'keterangan_izin' => $request->keterangan_izin
                ];

                Mail::to($pengurus->email)->send(new PengajuanPerizinanMail($details));

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

            // return view('insertPerizinan');
        }
    }

    public function checkPerizinanToPresensi($id){
        $perizinan = Perizinan::where([
            ['id_mhs', '=', $id],
            ['tanggal_pergi', '<=', Carbon::now()],
            ['tanggal_pulang', '>=', Carbon::now()]
        ])->first();

        if($perizinan){
            return response()->json([
                'status' => 'success',
                'msg' => 'Sedang Izin'
            ]);
        }
        return response()->json([
            'status' => 'error',
            'msg' => 'Sedang Tidak Izin'
        ]);
    }

    public function approvalPerizinan(Request $request){
        $perizinan = Perizinan::where([
            ['id', '=', $request->id],
            ['status_izin', '=', 0],
        ])->first();
        
        $perizinan->update([
            'status_izin' => $request->status_izin,
            'catatan_pengurus' => $request->catatan_pengurus
        ]);

        $details = [
            'tanggal_pergi' => $perizinan->tanggal_pergi,
            'tanggal_pulang' => $perizinan->tanggal_pulang,
            'keterangan_izin' => $perizinan->keterangan_izin
        ];

        $mahasiswa = Mahasiswa::where('id', $perizinan->id_mhs)->first();
        $akun = User::where('id', $mahasiswa->id_users)->first();

        Mail::to($akun->email)->send(new ApprovalMail($details));


        if($perizinan){
            return response()->json([
                'status' => 'success',
                'msg' => 'Success approv',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => 'Failed to approv'
            ]);
        }
    }

    public function getAllPengajuanPerizinan(){
        $perizinan = DB::table('perizinan')
            ->where('status_izin', '=', 0)
            ->join('mahasiswa', 'perizinan.id_mhs', '=', 'mahasiswa.id')
            ->select('perizinan.*', 'mahasiswa.nama_mhs')
            ->get();
        
        if($perizinan){
            return response()->json([
                'status' => 'success',
                'msg' => 'Success get data',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => 'Failed to get data'
            ]);
        }
    }

    public function getRiwayatPerizinan($id){
        
        $perizinan = Perizinan::where('id_mhs', $id)->orderByDesc('created_at')->get();
        
        if($perizinan){
            return response()->json([
                'status' => 'success',
                'msg' => 'Success get data',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => 'Failed to get data'
            ]);
        }
    }

    public function getDetailPerizinan($id){  
        
        $perizinan = DB::table('perizinan')
            ->join('mahasiswa', 'mahasiswa.id', '=', 'perizinan.id_mhs')
            ->where('perizinan.id', $id)
            ->first();
        
        if($perizinan){
            return response()->json([
                'status' => 'success',
                'msg' => 'Success get data',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => 'Failed to get data'
            ]);
        }
    }

    public function kembali(Request $request){
        $perizinan = Perizinan::where([
            ['id', '=', $request->id],
            ['status_izin', '=', 1],
        ])->first();

        $perizinan->update([
            'status_izin' => 3
        ]);

        if($perizinan){
            return response()->json([
                'status' => 'success',
                'msg' => 'Success kembali',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => 'Failed to kembali'
            ]);
        }
    }
}