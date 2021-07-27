<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
// use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Imports\UserImport;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    // public function index(){
    //     $user = User::all();
    //     return response()->json(["status" => "success", "data" => $user], 200);
    // }

    // public function create(Request $request){
    //     $validasi = \Validator::make($request->all(), [
    //         'nim' => 'required|max:20',
    //         'nama' => 'required|max:255',
    //         'alamat' => 'required|max:255',
    //         'tgl_lahir' => 'required',
    //         'prodi' => 'required',
    //         'jurusan' => 'required',
    //         'status_aktif' => 'required',
    //         'status_bidikmisi' => 'required',
    //         'ukt' => 'required',
    //         'nomor_telepon' => 'required|max:13|min:11',
    //         'pengurus_jabatan' => 'required|max:255',
    //         'email' => 'required',
    //         'password' => 'required|min:8',
    //         'asrama_id' => 'required'
    //     ]);

    //     if($validasi->fails()){
    //         return response()->json(["status" => $validasi->errors()], 422);
    //     }
    //     else{
    //         $insert = User::create([
    //             'nim' => $request->nim,
    //             'nama' => $request->nama,
    //             'alamat' => $request->alamat,
    //             'tgl_lahir' => $request->tgl_lahir,
    //             'prodi' => $request->prodi,
    //             'jurusan' => $request->jurusan,
    //             'status_aktif' => $request->status_aktif,
    //             'status_bidikmisi' => $request->status_bidikmisi,
    //             'ukt' => $request->ukt,
    //             'nomor_telepon' => $request->nomor_telepon,
    //             'pengurus_verified_at' => null,
    //             'pengurus_jabatan' => $request->pengurus_jabatan,
    //             'email' => $request->email,
    //             'email_verified_at' => null,
    //             'password' => \Hash::make($request->password),
    //             'asrama_id' => $request->asrama_id,
    //             'deleted' => 0
    //         ]);
            
    //         if($insert){
    //             return response()->json([
    //                 'status' => 'success',
    //                 'message' => 'Data mahasiswa berhasil diinput',
    //             ], 201);
    //         }
    //         else{
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => 'Data mahasiswa gagal diinput',
    //             ], 500);
    //         }
    //     }
    // }


    // public function update(Request $request){

    //     $user = User::findOrFail($request->id);

    //     $validasi = \Validator::make($request->all(), [
    //         'nim' => 'required|max:20',
    //         'nama' => 'required|max:255',
    //         'alamat' => 'required|max:255',
    //         'tgl_lahir' => 'required',
    //         'prodi' => 'required',
    //         'jurusan' => 'required',
    //         'status_aktif' => 'required',
    //         'status_bidikmisi' => 'required',
    //         'ukt' => 'required',
    //         'nomor_telepon' => 'required|max:13|min:11',
    //         'pengurus_jabatan' => 'required|max:255',
    //         'email' => 'required',
    //         'password' => 'required|min:8',
    //         'asrama_id' => 'required'
    //     ]);

    //     if($validasi->fails()){
    //         return response()->json(["status" => $validasi->errors()], 422);
    //     }
    //     else{
    //         $update = $user->update([
    //             'nim' => $request->nim,
    //             'nama' => $request->nama,
    //             'alamat' => $request->alamat,
    //             'tgl_lahir' => $request->tgl_lahir,
    //             'prodi' => $request->prodi,
    //             'jurusan' => $request->jurusan,
    //             'status_aktif' => $request->status_aktif,
    //             'status_bidikmisi' => $request->status_bidikmisi,
    //             'ukt' => $request->ukt,
    //             'nomor_telepon' => $request->nomor_telepon,
    //             'pengurus_verified_at' => null,
    //             'pengurus_jabatan' => $request->pengurus_jabatan,
    //             'email' => $request->email,
    //             'email_verified_at' => null,
    //             'password' =>  \Hash::make($request->password),
    //             'asrama_id' => $request->asrama_id
    //         ]);
            
    //         if($update){
    //             return response()->json([
    //                 'status' => 'success',
    //                 'message' => 'Data mahasiswa berhasil diupdate',
    //             ], 201);
    //         }
    //         else{
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => 'Data mahasiswa gagal diupdate',
    //             ], 500);
    //         }
    //     }
    // }

    // public function delete(Request $request){
    //     // $user = User::findOrFail($request->id);
    //     // $update = $user->update([
    //     //     'deleted' => 1,
    //     // ]);
    //     $update = DB::table('users')
    //           ->where('id', $request->id)
    //           ->update(['deleted' => 1]);

    //     if($update){
    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Data mahasiswa berhasil didelete',
    //             'data' => $update
    //         ], 201);
    //     }
    //     else{
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Data mahasiswa gagal didelete',
    //         ], 500);
    //     }
    // }

    public function importUser(Request $request){

        $validasi = \Validator::make($request->all(), [
            'file' => 'file|mimes:xls,xlsx',
        ]);

        if($validasi->fails()){
            return response()->json(["status" => "error", "message" => $validasi->errors()]);
        }
        else{
            $import = Excel::import(new UserImport, $request->file('file')->store('temp'));
            if($import){
                return response()->json([
                    'status' => 'success',
                    'message' => 'Data mahasiswa berhasil diimport',
                ], 201);
            }
            else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data mahasiswa gagal diimport',
                ], 500);
            }
        }
    }
}
