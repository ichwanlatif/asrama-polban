<?php

namespace App\Http\Controllers;

use App\Models\Perizinan;
use App\Models\Mahasiswa;
use App\Models\User;
use App\Models\RekapPerizinan;

use App\Mail\PengajuanPerizinanMail;
use App\Mail\ApprovalMail;
use App\Mail\PengajuanPerizinanKembaliMail;
use App\Mail\ApprovalKembaliMail;
use App\Mail\KonfirmasiKembaliMail;

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
            'jenis_kendaraan' => 'required',
            'kondisi_kesehatan' => 'required',
            'suhu_badan' => 'required',
            'alamat_izin' => 'required',
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
            $fileName = null;

            if($request->file('file')){

                $fileName = time().'-'.Str::random(10). '.'.$request->file('file')->getClientOriginalExtension();
                $request->file('file')->storeAs('public/file_perizinan', $fileName);
            }
            $insert = Perizinan::create([
                'id_mhs' => $request->id_mhs,
                'tanggal_pergi' => $request->tanggal_pergi,
                'tanggal_pulang' => $request->tanggal_pulang,
                'keterangan_izin' => $request->keterangan_izin,
                'alamat_izin' => $request->alamat_izin,
                'surat_pendukung' => $fileName,
                'suhu_badan' => $request->suhu_badan,
                'kondisi_kesehatan' => $request->kondisi_kesehatan,
                'jenis_kendaraan' => $request->jenis_kendaraan,
                'status_izin' => 0,
            ]);

            if($insert){

                $mahasiswa = Mahasiswa::where('id_mhs', $request->id_mhs)->first();
                $pengelola = User::where('role', 2)->first();

                $details = [
                    'from' => $mahasiswa->nama_mhs,
                    'tanggal_pergi' => $request->tanggal_pergi,
                    'tanggal_pulang' => $request->tanggal_pulang,
                    'keterangan_izin' => $request->keterangan_izin,
                    'alamat_izin' => $request->alamat_izin,
                    'suhu_badan' => $request->suhu_badan,
                    'kondisi_kesehatan' => $request->kondisi_kesehatan,
                    'jenis_kendaraan' => $request->jenis_kendaraan,
                ];

                Mail::to($pengelola->email)->send(new PengajuanPerizinanMail($details));

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
        $validasi = \Validator::make($request->all(), [
            'status_izin' => 'required',
        ]);

        if($validasi->fails()){
            return response()->json(["status" => 422, "msg" => "Form Tidak Valid"]);
        }
        $perizinan = Perizinan::where([
            ['id_perizinan', '=', $request->id_perizinan],
        ])->update([
            'status_izin' => $request->status_izin,
            'catatan_approval' => $request->catatan_approval
        ]);

        $detail = Perizinan::where([
            ['id_perizinan', '=', $request->id_perizinan],
        ])->first();

        $mahasiswa = Mahasiswa::where('id_mhs', $request->id_mhs)->first();

        $details = [
            'from' => $mahasiswa->nama_mhs,
            'tanggal_pergi' => $detail->tanggal_pergi,
            'tanggal_pulang' => $detail->tanggal_pulang,
            'keterangan_izin' => $detail->keterangan_izin,
            'alamat_izin' => $detail->alamat_izin,
            'suhu_badan' => $detail->suhu_badan,
            'kondisi_kesehatan' => $detail->kondisi_kesehatan,
            'jenis_kendaraan' => $detail->jenis_kendaraan,
        ];

        if($request->status_izin == 2 || $request->status_izin == 3 || $request->status_izin == 4){
            $akun = User::where('id_users', $mahasiswa->id_users)->first();
            Mail::to($akun->email)->send(new ApprovalMail($details));
        }
        else if($request->status_izin == 1){
            $akun = User::where('role', 3)->first();
            Mail::to($akun->email)->send(new PengajuanPerizinanMail($details));
        }

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

    public function approvalPerizinanKembali(Request $request){
        $validasi = \Validator::make($request->all(), [
            'status_izin' => 'required',
        ]);

        if($validasi->fails()){
            return response()->json(["status" => 422, "msg" => "Form Tidak Valid"]);
        }
        if($request->status_izin == 8){
            $perizinan = Perizinan::where([
                ['id_perizinan', '=', $request->id_perizinan],
            ])->update([
                'status_izin' => $request->status_izin,
                'tanggal_pulang' => $request->pengajuan_tanggal_pulang,
                'catatan_approval' => $request->catatan_approval
            ]);
        }
        else{
            $perizinan = Perizinan::where([
                ['id_perizinan', '=', $request->id_perizinan],
            ])->update([
                'status_izin' => $request->status_izin,
                'catatan_approval' => $request->catatan_approval
            ]);
        }

        $detail = Perizinan::where([
            ['id_perizinan', '=', $request->id_perizinan],
        ])->first();

        $mahasiswa = Mahasiswa::where('id_mhs', $request->id_mhs)->first();

        $details = [
            'from' => $mahasiswa->nama_mhs,
            'tanggal_pergi' => $detail->tanggal_pergi,
            'pengajuan_tanggal_pulang' => $detail->pengajuan_tanggal_pulang,
            'keterangan_kembali' => $detail->keterangan_kembali,
            'alamat_izin' => $detail->alamat_izin,
            'suhu_badan' => $detail->suhu_badan,
            'kondisi_kesehatan' => $detail->kondisi_kesehatan,
            'jenis_kendaraan' => $detail->jenis_kendaraan,
        ];

        if($request->status_izin == 7 || $request->status_izin == 8 || $request->status_izin == 9){
            $akun = User::where('id_users', $mahasiswa->id_users)->first();
            Mail::to($akun->email)->send(new ApprovalKembaliMail($details));
        }
        else if($request->status_izin == 6){
            $akun = User::where('role', 3)->first();
            Mail::to($akun->email)->send(new PengajuanPerizinanKembaliMail($details));
        }

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

    public function getAllPengajuanPerizinan($role){
        $perizinan = false;
        if($role == 2){
            $perizinan = DB::table('perizinan')
            ->where('status_izin', '=', 0)
            ->join('mahasiswa', 'perizinan.id_mhs', '=', 'mahasiswa.id_mhs')
            ->select('perizinan.*', 'mahasiswa.nama_mhs')
            ->get();
        }
        else if($role == 3){
            $perizinan = DB::table('perizinan')
            ->where('status_izin', '=', 0)
            ->orWhere('status_izin', '=', 1)
            ->join('mahasiswa', 'perizinan.id_mhs', '=', 'mahasiswa.id_mhs')
            ->select('perizinan.*', 'mahasiswa.nama_mhs')
            ->get();
        }
        
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

    public function getAllPengajuanPerizinanKembali($role){
        $perizinan = "";
        
        if($role == 2){
            $perizinan = DB::table('perizinan')
            ->where('status_izin', '=', 5)
            ->join('mahasiswa', 'perizinan.id_mhs', '=', 'mahasiswa.id_mhs')
            ->select('perizinan.*', 'mahasiswa.nama_mhs')
            ->get();
        }
        else if($role == 3){
            $perizinan = DB::table('perizinan')
            ->where('status_izin', '=', 5)
            ->orWhere('status_izin', '=', 6)
            ->join('mahasiswa', 'perizinan.id_mhs', '=', 'mahasiswa.id_mhs')
            ->select('perizinan.*', 'mahasiswa.nama_mhs')
            ->get();
        }
        
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
            ->join('mahasiswa', 'mahasiswa.id_mhs', '=', 'perizinan.id_mhs')
            ->join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
            ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
            ->where('perizinan.id_perizinan', $id)
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
            ['id_perizinan', '=', $request->id],
            ['status_izin', '=', 8],
        ])->update([
            'status_izin' => 10
        ]);

        if($perizinan){
            $detail = Perizinan::where([
                ['id_perizinan', '=', $request->id],
            ])->first();
            $mahasiswa = Mahasiswa::where('id_mhs', $request->id_mhs)->first();

            $details = [
                'from' => $mahasiswa->nama_mhs,
                'tanggal_pergi' => $detail->tanggal_pergi,
                'tanggal_pulang' => $detail->tanggal_pulang,
                'keterangan_kembali' => $detail->keterangan_kembali,
                'alamat_izin' => $detail->alamat_izin,
                'suhu_badan' => $detail->suhu_badan,
                'kondisi_kesehatan' => $detail->kondisi_kesehatan,
                'jenis_kendaraan' => $detail->jenis_kendaraan,
            ];

            $akun = User::where('id_users', $mahasiswa->id_users)->first();
            Mail::to($akun->email)->send(new KonfirmasiKembaliMail($details));

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

    public function izinKembali(Request $request){
        $validasi = \Validator::make($request->all(), [
            'id_perizinan' => 'required',
            'keterangan_kembali' => 'required',
            'pengajuan_tanggal_pulang' => 'required',
            'suhu_badan' => 'required',
            'kondisi_kesehatan' => 'required',
            'jenis_kendaraan' => 'required',
        ]);

        if($validasi->fails()){
            return response()->json(["status" => 422, "msg" => "Form Tidak Valid"]);
        }
        
        $perizinan = Perizinan::where([
            ['id_perizinan', '=', $request->id_perizinan]
        ])->update([
            'status_izin' => 5,
            'keterangan_kembali' => $request->keterangan_kembali,
            'pengajuan_tanggal_pulang' => $request->pengajuan_tanggal_pulang,
            'suhu_badan' => $request->suhu_badan,
            'kondisi_kesehatan' => $request->kondisi_kesehatan,
            'jenis_kendaraan' => $request->jenis_kendaraan,
        ]);

        if($perizinan){
            $mahasiswa = Mahasiswa::where('id_mhs', $request->id_mhs)->first();
            $pengelola = User::where('role', 2)->first();

            $details = [
                'from' => $mahasiswa->nama_mhs,
                'tanggal_pergi' => $request->tanggal_pergi,
                'pengajuan_tanggal_pulang' => $request->pengajuan_tanggal_pulang,
                'keterangan_kembali' => $request->keterangan_kembali,
                'alamat_izin' => $request->alamat_izin,
                'suhu_badan' => $request->suhu_badan,
                'kondisi_kesehatan' => $request->kondisi_kesehatan,
                'jenis_kendaraan' => $request->jenis_kendaraan,
            ];

            Mail::to($pengelola->email)->send(new PengajuanPerizinanKembaliMail($details));

            return response()->json([
                'status' => 'success',
                'msg' => 'Success mengajukan kembali',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'msg' => 'Failed to mengajukan kembali'
            ]);
        }
    }

    public function dashboard(){
        $mengajukanA = RekapPerizinan::where([
            ['status_izin', '=', 0],
            ['nama_gedung', '=', 'A']
        ])
        ->whereMonth('created_at', date('n'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $mengajukanB = RekapPerizinan::where([
                ['status_izin', '=', 0],
                ['nama_gedung', '=', 'B']
        ])
        ->whereMonth('created_at', date('n'))
                ->whereYear('created_at', date('Y'))
                ->count();


        $mengajukanC = RekapPerizinan::where([
            ['status_izin', '=', 0],
            ['nama_gedung', '=', 'C']
        ])
        ->whereMonth('created_at', date('n'))
        ->whereYear('created_at', date('Y'))
        ->count();

        $disetujuiA = RekapPerizinan::where([
            ['status_izin', '=', 3],
            ['nama_gedung', '=', 'A']
        ])
        ->whereMonth('created_at', date('n'))
        ->whereYear('created_at', date('Y'))
        ->count();

        $disetujuiB = RekapPerizinan::where([
            ['status_izin', '=', 3],
            ['nama_gedung', '=', 'B']
        ])
        ->whereMonth('created_at', date('n'))
        ->whereYear('created_at', date('Y'))
        ->count();

        $disetujuiC = RekapPerizinan::where([
            ['status_izin', '=', 3],
            ['nama_gedung', '=', 'C']
        ])
        ->whereMonth('created_at', date('n'))
        ->whereYear('created_at', date('Y'))
        ->count();

        $ditolakA = RekapPerizinan::where([
            ['status_izin', '=', 2],
            ['status_izin', '=', 4],
            ['nama_gedung', '=', 'A']
        ])
        ->whereMonth('created_at', date('n'))
        ->whereYear('created_at', date('Y'))
        ->count();

        $ditolakB = RekapPerizinan::where([
            ['status_izin', '=', 2],
            ['status_izin', '=', 4],
            ['nama_gedung', '=', 'B']
        ])
        ->whereMonth('created_at', date('n'))
        ->whereYear('created_at', date('Y'))
        ->count();

        $ditolakC = RekapPerizinan::where([
            ['status_izin', '=', 2],
            ['status_izin', '=', 4],
            ['nama_gedung', '=', 'C']
        ])
        ->whereMonth('created_at', date('n'))
        ->whereYear('created_at', date('Y'))
        ->count();

        return response()->json([
            'status' => 'success',
            'gedungA' => array($mengajukanA, $disetujuiA, $ditolakA),
            'gedungB' => array($mengajukanB, $disetujuiB, $ditolakB),
            'gedungC' => array($mengajukanC, $disetujuiC, $ditolakC),
        ]);
    
    }
}