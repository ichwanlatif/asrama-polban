<?php

namespace App\Http\Controllers;

use App\Models\Perizinan;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

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

                $fileName = time().Str::random(10). $request->file->extension();
                $request->file->move(public_path('file_perizinan'), $fileName);
            }
            $insert = Perizinan::create([
                'id_mhs' => $request->user_id,
                'tanggal_pergi' => $request->perizinan_start_at,
                'tanggal_pulang' => $request->perizinan_end_at,
                'deskripsi' => $request->keterangan,
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
}
