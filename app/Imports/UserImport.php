<?php

namespace App\Imports;

use App\Models\User;
use App\Models\Mahasiswa;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class UserImport implements ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function collection(Collection $rows)
    {
        // dd($rows);
        foreach($rows as $row){
            $user = User::create([
                'email' => $row[0],
                'password' => \Hash::make($row[1]),
                'role' => 1,
                'deleted' => 0
            ]);
            
            // dd(date(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[7])->format('Y-m-d')));

            $mahasiswa = Mahasiswa::create([
                'id_users' => $user->id,
                'id_prodi' => $row[2],
                'id_kamar' => $row[3],
                'nama_mhs' => $row[4],
                'nim_mhs' => $row[5],
                'jenis_kelamin' => $row[6],
                'tanggal_lahir' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[7])->format('Y-m-d'),
                'agama' => $row[8],
                'alamat_mhs' => $row[9],
                'no_hp_mhs' => $row[10],
                'nama_ortu' => $row[11],
                'no_hp_ortu' => $row[12],
                'status_keaktifan' => $row[13],
                'golongan_ukt' => $row[14]
            ]);
        }
    }
}
