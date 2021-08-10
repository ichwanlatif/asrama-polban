<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Models\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function getMahasiswaByUserId($id){
        $mahasiswa = Mahasiswa::where([['id_users', '=', $id], ['status_keaktifan', '=', 1]])->first();
        
        if($mahasiswa){
            return response()->json([
                "status" => 'success',
                "message" => "Success get mahasiswa",
                "data" => $mahasiswa
            ]);
        }
        else{
            return response()->json([
                "status" => 'error',
                "message" => "Mahasiswa Not Found"
            ]);
        }
        
    }

    public function getMahasiswaById($id){
        $mahasiswa = DB::table('mahasiswa')
        ->where([['id_mhs', '=', $id]])
        ->join('users', 'mahasiswa.id_users', '=', 'users.id_users')
        ->join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->join('prodi', 'mahasiswa.id_prodi', '=', 'prodi.id_prodi')
        ->join('jurusan', 'prodi.id_jurusan', '=', 'jurusan.id_jurusan')
        ->first();
        
        if($mahasiswa){
            return response()->json([
                "status" => 'success',
                "message" => "Success get mahasiswa",
                "data" => $mahasiswa
            ]);
        }
        else{
            return response()->json([
                "status" => 'error',
                "message" => "Mahasiswa Not Found"
            ]);
        }
        
    }

    public function getAllMahasiswa(){
        $mahasiswa = DB::table('mahasiswa')
        ->join('users', 'mahasiswa.id_users', '=', 'users.id_users')
        ->join('kamar', 'mahasiswa.id_kamar', '=', 'kamar.id_kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->get();

        if($mahasiswa){
            return response()->json([
                "status" => 'success',
                "message" => "Success get mahasiswa",
                "data" => $mahasiswa
            ]);
        }
        else{
            return response()->json([
                "status" => 'error',
                "message" => "Mahasiswa Not Found"
            ]);
        }
    }

    public function getAllProdi(){
        $prodi = DB::table('prodi')
        ->join('jurusan', 'prodi.id_jurusan', '=', 'jurusan.id_jurusan')
        ->get();

        if($prodi){
            return response()->json([
                "status" => 'success',
                "message" => "Success get prodi",
                "data" => $prodi
            ]);
        }
        else{
            return response()->json([
                "status" => 'error',
                "message" => "Prodi Not Found"
            ]);
        }
    }

    public function getAllKamar(){
        $kamar = DB::table('kamar')
        ->join('gedung', 'kamar.id_gedung', '=', 'gedung.id_gedung')
        ->get();

        if($kamar){
            return response()->json([
                "status" => 'success',
                "message" => "Success get kamar",
                "data" => $kamar
            ]);
        }
        else{
            return response()->json([
                "status" => 'error',
                "message" => "Kamar Not Found"
            ]);
        }
    }

    public function store(Request $request){

        $messages = [
            'required'          => ':attribute harus diisi. ',
            'email'             => ':attribute tidak valid. ',
            'ends_with'         => 'harus menggunakan :attribute polban. ',
            'max'               => ':attribute harus diisi maksimal :max. ',
            'min'               => ':attribute harus diisi minimal :min. ',
        ];

        $validasi = \Validator::make($request->all(), [
            'email' => 'required|email|ends_with:polban.ac.id',
            'nama_mhs' => 'required|max:50', 
            'nim' => 'required|max:10',
            'alamat' => 'required|max:125',
            'no_hp_mhs' => 'required|max:13',
            'nama_ortu' => 'required|max:50',
            'no_hp_ortu' => 'required|max:13',
            'jenis_kelamin' => 'required',
            'status_keaktifan' => 'required',
            'tanggal_lahir' => 'required'
        ], $messages);

        if($validasi->fails()){
            return response()->json(["status" => "error", "message" => $validasi->errors()]);
        }
        $user = User::create([
            'email' => $request->email,
            'password' => \Hash::make($request->nim),
            'role' => 1,
        ]);

        dd($user->id);
        $insert = Mahasiswa::create([
            'id_users' => $user->id_users,
            'id_prodi' => $request->id_prodi,
            'id_kamar' => $request->id_kamar,
            'nama_mhs' => $request->nama_mhs, 
            'nim' => $request->nim,
            'alamat' => $request->alamat,
            'no_hp_mhs' => '0' + $request->no_hp_mhs,
            'nama_ortu' => $request->nama_ortu,
            'no_hp_ortu' => '0' + $request->no_hp_ortu,
            'jenis_kelamin' => $request->jenis_kelamin,
            'status_keaktifan' => $request->status_keaktifan,
            'tanggal_lahir' => $request->tanggal_lahir,
            'agama' => $request->agama,
            'keterangan_asal' => $request->keterangan_asal,
            'role_mhs' => $request->role_mhs
        ]);

        if($insert){
            return response()->json([
                'status' => 'success',
                'message' => 'Mahasiswa berhasil diinput',
                'data' => $insert
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Mahasiswa gagal diinput',
            ]);
        }
    }

    public function update(Request $request){

        $messages = [
            'required'          => ':attribute harus diisi. ',
            'email'             => ':attribute tidak valid. ',
            'ends_with'         => 'harus menggunakan :attribute polban. ',
            'max'               => ':attribute harus diisi maksimal :max. ',
            'min'               => ':attribute harus diisi minimal :min. ',
        ];

        if($request->password == "" || $request->password == null){
            $validasi = \Validator::make($request->all(), [
                'email' => 'required|email|ends_with:polban.ac.id',
                'nama_mhs' => 'required|max:50', 
                'nim' => 'required|max:10',
                'alamat' => 'required|max:125',
                'no_hp_mhs' => 'required|max:13',
                'nama_ortu' => 'required|max:50',
                'no_hp_ortu' => 'required|max:13',
                'jenis_kelamin' => 'required',
                'status_keaktifan' => 'required',
                'tanggal_lahir' => 'required',
                'agama' => 'required|max:10',
                'keterangan_asal' => 'required|max:10',
                'role_mhs' => 'required'
            ], $messages);
        }
        else{
            $validasi = \Validator::make($request->all(), [
                'email' => 'required|email|ends_with:polban.ac.id',
                'password' => 'required|alpha_num|min:8',
                'nama_mhs' => 'required|max:50', 
                'nim' => 'required|max:10',
                'alamat' => 'required|max:125',
                'no_hp_mhs' => 'required|max:13',
                'nama_ortu' => 'required|max:50',
                'no_hp_ortu' => 'required|max:13',
                'jenis_kelamin' => 'required',
                'status_keaktifan' => 'required',
                'tanggal_lahir' => 'required',
                'agama' => 'required|max:10',
                'keterangan_asal' => 'required|max:10',
                'role_mhs' => 'required'
            ], $messages);
        }

        if($validasi->fails()){
            return response()->json(["status" => "error", "message" => $validasi->errors()]);
        }
        
        $mahasiswa = Mahasiswa::where([
            ['id_mhs', '=', $request->id_mhs],
        ]);

        if($request->password == "" || $request->password == null){
            $user = User::where('id_users', '=',$request->id_users)
            ->update([
                'email' => $request->email,
                'role' => 1,
            ]);
        }
        else{
            $user = User::where('id_users', $request->id_users)
            ->update([
                'email' => $request->email,
                'password' => \Hash::make($request->password),
                'role' => 1,
            ]);
        }

        $update = $mahasiswa->update([
            'id_prodi' => $request->id_prodi,
            'id_kamar' => $request->id_kamar,
            'nama_mhs' => $request->nama_mhs, 
            'nim' => $request->nim,
            'alamat' => $request->alamat,
            'no_hp_mhs' => '0' + $request->no_hp_mhs,
            'nama_ortu' => $request->nama_ortu,
            'no_hp_ortu' => '0' + $request->no_hp_ortu,
            'jenis_kelamin' => $request->jenis_kelamin,
            'status_keaktifan' => $request->status_keaktifan,
            'tanggal_lahir' => $request->tanggal_lahir,
            'agama' => $request->agama,
            'keterangan_asal' => $request->keterangan_asal,
            'role_mhs' => $request->role_mhs
        ]);

        if($update){
            return response()->json([
                'status' => 'success',
                'message' => 'Mahasiswa berhasil diupdate',
                'data' => $update
            ], 201);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Mahasiswa gagal diiupdate',
            ]);
        }
    }

    public function delete(Request $request){
        $listMahasiswa = $request->listMhs;
        // dd(count($listMahasiswa));
        for($i=0; $i < count($listMahasiswa); $i++){
            $delete = Mahasiswa::where([
                ['id_mhs', '=', $listMahasiswa[$i]],
            ])
            ->first();
            User::where([
                ['id_users', '=', $delete->id_users],
            ])
            ->delete();
            $delete->delete();
        }
        if($delete){
            return response()->json([
                'status' => 'success',
                'message' => 'Mahasiswa berhasil dihapus',
                'data' => $delete
            ], 201);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'Mahasiswa gagal dihapus',
            ]);
        }
    }
}
