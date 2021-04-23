<?php

namespace App\Http\Controllers;

use App\Models\Perizinan;

use Illuminate\Http\Request;

class PerizinanController extends Controller
{
    public function store(Request $request){
        $validasi = \Validator::make($request->all(), [
            'perizinan_type' => 'required',
            'perizinan_start_at' => 'required',
            'perizinan_end_at' => 'required',
            'user_id' => 'required',
        ]);

        if($validasi->fails()){
            return response()->json(["status" => $validasi->errors()], 422);
        }
        else{
            if($request->hasFile('file')){

                $fileName = time().'.'. $request->file->extension();
                $request->file->move(public_path('file_perizinan'), $fileName);
            }
            $insert = Perizinan::create([
                'perizinan_type' => $request->perizinan_type,
                'perizinan_status' => 0,
                'perizinan_start_at' => $request->perizinan_start_at,
                'perizinan_end_at' => $request->perizinan_end_at,
                'keterangan' => $request->keterangan,
                'file' => $fileName,
                'catatan' => "",
                'user_id' => $request->user_id
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
