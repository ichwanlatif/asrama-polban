<?php

namespace App\Imports;

use App\Models\User;
use App\Models\Mahasiswa;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class UserImport implements ToCollection, WithStartRow
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
                'password' => \Hash::make($row[4]),
                'role' => 1,
            ]);
            
            // dd(date(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[7])->format('Y-m-d')));

            $mahasiswa = Mahasiswa::create([
                'id_users' => $user->id_users,
                'id_prodi' => $row[1],
                'id_kamar' => $row[2],
                'nama_mhs' => $row[3],
                'nim' => $row[4],
                'alamat' => $row[5],
                'no_hp_mhs' => $row[6],
                'nama_ortu' => $row[7],
                'no_hp_ortu' => $row[8],
                'jenis_kelamin' => $row[9],
                'status_keaktifan' => 1,
                'tanggal_lahir' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[10])->format('Y-m-d'),
                'agama' => $row[11],
                'keterangan_asal' => $row[12],
                'role_mhs' => $row[13],
            ]);
        }
    }

    public function startRow(): int
    {
        return 2;
    }
}
