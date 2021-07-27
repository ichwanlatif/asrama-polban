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
            ]);
            
            // dd(date(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[7])->format('Y-m-d')));

            $mahasiswa = Mahasiswa::create([
                'id_users' => $user->id,
                'id_prodi' => $row[2],
                'id_kamar' => $row[3],
                'nama_mhs' => $row[4],
                'nim' => $row[5],
                'alamat' => $row[6],
                'no_hp_mhs' => $row[7],
                'nama_ortu' => $row[8],
                'no_hp_ortu' => $row[9],
                'jenis_kelamin' => $row[10],
                'status_keaktifan' => 1,
                'tanggal_lahir' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[11])->format('Y-m-d'),
                'agama' => $row[12],
                'keterangan_asal' => $row[13],
                'role_mhs' => $row[14],
            ]);
        }
    }
}
