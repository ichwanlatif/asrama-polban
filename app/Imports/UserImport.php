<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\ToModel;

class UserImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new User([
            'nim' => $row[0],
            'nama' => $row[1],
            'alamat' => $row[2],
            'tgl_lahir' => $row[3],
            'prodi' => $row[4],
            'jurusan' => $row[5],
            'status_aktif' => 1,
            'status_bidikmisi' => $row[6],
            'ukt' => $row[7],
            'nomor_telepon' => $row[8],
            'pengurus_verified_at' => null,
            'pengurus_jabatan' => $row[9],
            'email' => $row[10],
            'email_verified_at' => null,
            'password' => \Hash::make($row[11]),
            'asrama_id' => $row[12],
            'deleted' => 0
        ]);
    }
}
