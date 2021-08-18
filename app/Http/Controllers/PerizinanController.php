<?php

namespace App\Http\Controllers;

use App\Models\Perizinan;
use App\Models\Mahasiswa;
use App\Models\User;
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
        
        $messages = [
            'required'            => ':attribute harus diisi. ',
            'numeric'            => ':attribute harus diisi angka. ',
            'max'               => ':attribute harus diisi maksimal :max. ',
            'mimes'               => 'format :attribute tidak didukung. ',
        ];

        $validasi = \Validator::make($request->all(), [
            'tanggal_pergi' => 'required',
            'tanggal_pulang' => 'required',
            'jenis_kendaraan' => 'required',
            'suhu_badan' => 'required|numeric|between:30,50',
            'kondisi_kesehatan' => 'required|max:50',
            'alamat_izin' => 'required|max:125',
            'file' => 'file|max:2000|mimes:pdf,png,jpg',
            'keterangan_izin' => 'required|max:125',
            'id_mhs' => 'required',
        ], $messages);

        if($validasi->fails()){
            return response()->json(["status" => "error", "message" => $validasi->errors()]);
        }
        else{
            if($request->tanggal_pergi > $request->tanggal_pulang || $request->tanggal_pergi < date('Y-m-d')){
                return response()->json(["status" => "invalid", "message" => "Tanggal Pergi dan Pulang Tidak Benar"]);
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

                // dd($insert->id);

                $details = [
                    'link' => 'https://asrama-polban.herokuapp.com/#/form-approval-izin-pulang/' . $insert->id,
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

            // return view('insertPerizinan');
        }
    }

    public function checkPerizinanToPresensi($id){
        $perizinan = Perizinan::where([
            ['id_mhs', '=', $id],
            // ['tanggal_pergi', '<=', Carbon::now()],
            // ['tanggal_pulang', '>=', Carbon::now()->subDay(1)],
        ])
        ->whereIn('status_izin', [3, 5, 6, 7, 8, 9])
        ->first();
        if($perizinan){
            return response()->json([
                'data' => $perizinan,
                'status' => 'success',
                'message' => 'Sedang Izin'
            ]);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Sedang Tidak Izin'
        ]);
    }

    public function approvalPerizinan(Request $request){

        $messages = [
            'required'            => ':attribute harus diisi. ',
        ];

        $validasi = \Validator::make($request->all(), [
            'status_izin' => 'required|numeric',
        ], $messages);

        if($validasi->fails()){
            return response()->json(["status" => "error", "message" => $validasi->errors()]);
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
            'link' => 'https://asrama-polban.herokuapp.com/#/form-approval-izin-pulang/' . $request->id_perizinan,
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
                'message' => 'Success approv',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to approv'
            ]);
        }
    }

    public function approvalPerizinanKembali(Request $request){
        
        $messages = [
            'required'            => ':attribute harus diisi. ',
        ];
        
        $validasi = \Validator::make($request->all(), [
            'status_izin' => 'required|numeric',
        ], $messages);

        if($validasi->fails()){
            return response()->json(["status" => "error", "message" => $validasi->errors()]);
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
            'link' => 'https://asrama-polban.herokuapp.com/#/form-approval-izin-kembali/' . $request->id_perizinan,
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
                'message' => 'Success approv',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to approv'
            ]);
        }
    }

    public function getAllPengajuanPerizinan($role){
        $perizinan = false;
        $perizinan = DB::table('perizinan')
            ->whereBetween('status_izin', [0, 4])
            ->join('mahasiswa', 'perizinan.id_mhs', '=', 'mahasiswa.id_mhs')
            ->select('perizinan.*', 'mahasiswa.nama_mhs')
            ->orderBy('status_izin', 'asc')
            ->get();
        
        if($perizinan){
            return response()->json([
                'status' => 'success',
                'message' => 'Success get data',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to get data'
            ]);
        }
    }

    public function getAllPengajuanPerizinanKembali($role){
        $perizinan = "";
        
        $perizinan = DB::table('perizinan')
            ->whereBetween('status_izin', [5, 9])
            ->join('mahasiswa', 'perizinan.id_mhs', '=', 'mahasiswa.id_mhs')
            ->select('perizinan.*', 'mahasiswa.nama_mhs')
            ->orderBy('status_izin', 'asc')
            ->get();
        
        if($perizinan){
            return response()->json([
                'status' => 'success',
                'message' => 'Success get data',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to get data'
            ]);
        }
    }

    public function getRiwayatPerizinan($id){
        
        $perizinan = Perizinan::where('id_mhs', $id)->orderByDesc('created_at')->get();
        
        if($perizinan){
            return response()->json([
                'status' => 'success',
                'message' => 'Success get data',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to get data'
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
                'message' => 'Success get data',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to get data'
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
                'message' => 'Success kembali',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to kembali'
            ]);
        }
    }

    public function izinKembali(Request $request){
        
        $messages = [
            'required'            => ':attribute harus diisi. ',
            'numeric'            => ':attribute harus diisi angka. ',
            'max'               => ':attribute harus diisi maksimal :max. ',
        ];

        $validasi = \Validator::make($request->all(), [
            'id_perizinan' => 'required',
            'keterangan_kembali' => 'required|max:125',
            'pengajuan_tanggal_pulang' => 'required',
            'suhu_badan' => 'required|numeric|between:30,50',
            'kondisi_kesehatan' => 'required|max:50',
            'jenis_kendaraan' => 'required',
        ], $messages);

        if($validasi->fails()){
            return response()->json(["status" => "error", "message" => $validasi->errors()]);
        }

        if($request->pengajuan_tanggal_pulang < date('Y-m-d')){
            return response()->json(["status" => "invalid", "message" => "Tanggal Pengajuan Pulang Tidak Benar"]);
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
                'link' => 'https://asrama-polban.herokuapp.com/#/form-approval-izin-kembali/' . $request->id_perizinan,
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
                'message' => 'Success mengajukan kembali',
                'data' => $perizinan
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to mengajukan kembali'
            ]);
        }
    }

    public function dashboard($role){

        $perizinanGedungA = DB::table('mahasiswa')
        ->crossJoin('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->crossJoin('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->crossJoin('perizinan', 'mahasiswa.id_mhs', '=', 'perizinan.id_mhs')
        ->where([
            ['gedung.nama_gedung', '=', 'A']
        ])
        ->whereMonth('perizinan.created_at', date('n'))
        ->whereYear('perizinan.created_at', date('Y'))->get();

        $perizinanGedungB = DB::table('mahasiswa')
        ->crossJoin('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->crossJoin('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->crossJoin('perizinan', 'mahasiswa.id_mhs', '=', 'perizinan.id_mhs')
        ->where([
            ['gedung.nama_gedung', '=', 'B']
        ])
        ->whereMonth('perizinan.created_at', date('n'))
        ->whereYear('perizinan.created_at', date('Y'))->get();

        $perizinanGedungC = DB::table('mahasiswa')
        ->crossJoin('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->crossJoin('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->crossJoin('perizinan', 'mahasiswa.id_mhs', '=', 'perizinan.id_mhs')
        ->where([
            ['gedung.nama_gedung', '=', 'C']
        ])
        ->whereMonth('perizinan.created_at', date('n'))
        ->whereYear('perizinan.created_at', date('Y'))->get();

        $resignGedungA = DB::table('mahasiswa')
        ->crossJoin('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->crossJoin('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->crossJoin('resign', 'mahasiswa.id_mhs', '=', 'resign.id_mhs')
        ->where([
            ['gedung.nama_gedung', '=', 'A']
        ])
        ->whereMonth('resign.created_at', date('n'))
        ->whereYear('resign.created_at', date('Y'))->get();

        $resignGedungB = DB::table('mahasiswa')
        ->crossJoin('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->crossJoin('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->crossJoin('resign', 'mahasiswa.id_mhs', '=', 'resign.id_mhs')
        ->where([
            ['gedung.nama_gedung', '=', 'B']
        ])
        ->whereMonth('resign.created_at', date('n'))
        ->whereYear('resign.created_at', date('Y'))->get();

        $resignGedungC = DB::table('mahasiswa')
        ->crossJoin('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->crossJoin('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->crossJoin('resign', 'mahasiswa.id_mhs', '=', 'resign.id_mhs')
        ->where([
            ['gedung.nama_gedung', '=', 'C']
        ])
        ->whereMonth('resign.created_at', date('n'))
        ->whereYear('resign.created_at', date('Y'))->get();

        $mengajukanA = clone $perizinanGedungA;
        $disetujuiA = clone $perizinanGedungA;
        $ditolakA = clone $perizinanGedungA;
        $mengajukanB = clone $perizinanGedungB;
        $disetujuiB = clone $perizinanGedungB;
        $ditolakB = clone $perizinanGedungB;
        $mengajukanC = clone $perizinanGedungC;
        $disetujuiC = clone $perizinanGedungC;
        $ditolakC = clone $perizinanGedungC;

        if($role == 2){
            $mengajukanA = $mengajukanA->whereIn('status_izin', [0, 5])->count() + $resignGedungA->where('status_resign', '=', 0)->count();
            $mengajukanB = $mengajukanB->whereIn('status_izin', [0, 5])->count() + $resignGedungB->where('status_resign', '=', 0)->count();
            $mengajukanC = $mengajukanC->whereIn('status_izin', [0, 5])->count() + $resignGedungC->where('status_resign', '=', 0)->count();

            $disetujuiA = $disetujuiA->whereIn('status_izin', [1, 6])->count() + $resignGedungA->where('status_resign', '=', 1)->count();
            $disetujuiB = $disetujuiB->whereIn('status_izin', [1, 6])->count() + $resignGedungB->where('status_resign', '=', 1)->count();
            $disetujuiC = $disetujuiC->whereIn('status_izin', [1, 6])->count() + $resignGedungC->where('status_resign', '=', 1)->count();

            $ditolakA = $ditolakA->whereIn('status_izin', [2, 7])->count() + $resignGedungA->where('status_resign', '=', 2)->count();
            $ditolakB = $ditolakB->whereIn('status_izin', [2, 7])->count() + $resignGedungB->where('status_resign', '=', 2)->count();
            $ditolakC = $ditolakC->whereIn('status_izin', [2, 7])->count() + $resignGedungC->where('status_resign', '=', 2)->count();
        }
        else{
            $mengajukanA = $mengajukanA->whereIn('status_izin', [0, 1, 5])->count() + $resignGedungA->whereIn('status_resign', [0, 1])->count();
            $mengajukanB = $mengajukanB->whereIn('status_izin', [0, 1, 5])->count() + $resignGedungB->whereIn('status_resign', [0, 1])->count();
            $mengajukanC = $mengajukanC->whereIn('status_izin', [0, 1, 5])->count() + $resignGedungC->whereIn('status_resign', [0, 1])->count();

            $disetujuiA = $disetujuiA->whereIn('status_izin', [3, 8, 10])->count() + $resignGedungA->where('status_resign', '=', 3)->count();
            $disetujuiB = $disetujuiB->whereIn('status_izin', [3, 8, 10])->count() + $resignGedungB->where('status_resign', '=', 3)->count();
            $disetujuiC = $disetujuiC->whereIn('status_izin', [3, 8, 10])->count() + $resignGedungC->where('status_resign', '=', 3)->count();

            $ditolakA = $ditolakA->whereIn('status_izin', [4, 9])->count() + $resignGedungA->where('status_resign', '=', 4)->count();
            $ditolakB = $ditolakB->whereIn('status_izin', [4, 9])->count() + $resignGedungB->where('status_resign', '=', 4)->count();
            $ditolakC = $ditolakC->whereIn('status_izin', [4, 9])->count() + $resignGedungC->where('status_resign', '=', 4)->count();
        }

        return response()->json([
            'status' => 'success',
            'gedungA' => array($mengajukanA, $disetujuiA, $ditolakA),
            'gedungB' => array($mengajukanB, $disetujuiB, $ditolakB),
            'gedungC' => array($mengajukanC, $disetujuiC, $ditolakC),
        ]);
    
    }
}