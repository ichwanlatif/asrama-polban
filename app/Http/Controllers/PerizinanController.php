<?php

namespace App\Http\Controllers;

use App\Models\Perizinan;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PerizinanController extends Controller
{
    public function store(Request $request){
        $validasi = \Validator::make($request->all(), [
            'tanggal_pergi' => 'required',
            'tanggal_pulang' => 'required',
            'deskripsi' => 'required',
            'id_mhs' => 'required',
        ]);

        if($validasi->fails()){
            return response()->json(["status" => $validasi->errors()], 422);
        }
        else{
            if($request->hasFile('file')){

                $fileName = time().Str::random(10). '.'.$request->file->extension();
                $request->file->move(public_path('file_perizinan'), $fileName);
            }
            $insert = Perizinan::create([
                'id_mhs' => $request->id_mhs,
                'tanggal_pergi' => $request->tanggal_pergi,
                'tanggal_pulang' => $request->tanggal_pulang,
                'deskripsi' => $request->deskripsi,
                'file_pendukung' => $fileName,
                'status_approval' => 0,
                'catatan_pengurus' => " ",
            ]);

            // if($insert){
            //     return response()->json([
            //         'status' => 'success',
            //         'msg' => 'Kehadiran berhasil diinput',
            //         'data' => $insert
            //     ], 201);
            // }
            // else{
            //     return response()->json([
            //         'status' => 'error',
            //         'msg' => 'Kehadiran gagal diinput',
            //     ], 500);
            // }

            return view('insertPerizinan');
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
                'status' => 201,
                'message' => 'Sedang Izin'
            ], 201);
        }
        return response()->json([
            'status' => 500,
            'message' => 'Sedang Tidak Izin'
        ], 500);
    }
}
