<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Prodi;

class ProdiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $prodis = [
            //Teknik Sipil
            ['id_jurusan' => '1', 'nama_prodi' => 'DIII - Teknik Konstruksi Gedung' ],
            ['id_jurusan' => '1', 'nama_prodi' => 'DIII - Teknik Konstruksi Sipil' ],
            ['id_jurusan' => '1', 'nama_prodi' => 'DIV - Teknik Perancangan Jalan dan Jembatan' ],
            ['id_jurusan' => '1', 'nama_prodi' => 'DIV - Teknik Perawatan dan Perbaikan Gedung' ],

            //Teknik Mesin
            ['id_jurusan' => '2', 'nama_prodi' => 'DIII - Teknik Mesin' ],
            ['id_jurusan' => '2', 'nama_prodi' => 'DIII - Teknik Aeronautika' ],
            ['id_jurusan' => '2', 'nama_prodi' => 'DIV - Teknik Perancangan dan Konstruksi Mesin' ],
            ['id_jurusan' => '2', 'nama_prodi' => 'DIV - Proses Manufaktur' ],

            //Teknik Refrigasi dan Tata Udara
            ['id_jurusan' => '3', 'nama_prodi' => 'DIII - Teknik Pendingin dan Tata Udara' ],
            ['id_jurusan' => '3', 'nama_prodi' => 'DIV - Teknik Pendingin dan Tata Udara' ],

            //Teknik Konversi Energi
            ['id_jurusan' => '4', 'nama_prodi' => 'DIII - Teknik Konversi Energi' ],
            ['id_jurusan' => '4', 'nama_prodi' => 'DIV - Teknologi Pembangkit Tenaga Listrik' ],
            ['id_jurusan' => '4', 'nama_prodi' => 'DIV - Teknik Konversi Energi' ],

             //Teknik Elektro
             ['id_jurusan' => '5', 'nama_prodi' => 'DIII - Teknik Elektronika' ],
             ['id_jurusan' => '5', 'nama_prodi' => 'DIII - Teknik Listrik' ],
             ['id_jurusan' => '5', 'nama_prodi' => 'DIII - Teknik Telekomunikasi' ],
             ['id_jurusan' => '5', 'nama_prodi' => 'DIV - Teknik Elektronika' ],
             ['id_jurusan' => '5', 'nama_prodi' => 'DIV - Teknik Telekomunikasi' ],
             ['id_jurusan' => '5', 'nama_prodi' => 'DIV - Teknik Otomasi Indurstri' ],

             //Teknik Kimia
             ['id_jurusan' => '6', 'nama_prodi' => 'DIII - Teknik Kimia' ],
             ['id_jurusan' => '6', 'nama_prodi' => 'DIII - Analis Kimia' ],
             ['id_jurusan' => '6', 'nama_prodi' => 'DIV - Teknik Kimia Produksi Bersih' ],

             //Teknik Komputer dan Informatika
             ['id_jurusan' => '7', 'nama_prodi' => 'DIII - Teknik Informatika' ],
             ['id_jurusan' => '7', 'nama_prodi' => 'DIV - Teknik Informatika' ],

             //Akuntansi
             ['id_jurusan' => '8', 'nama_prodi' => 'DIII - Akuntansi' ],
             ['id_jurusan' => '8', 'nama_prodi' => 'DIII - Keuangan dan Perbankan' ],
             ['id_jurusan' => '8', 'nama_prodi' => 'DIV - Akuntansi Manajemen Pemerintahan' ],
             ['id_jurusan' => '8', 'nama_prodi' => 'DIV - Keuangan Syariah' ],
             ['id_jurusan' => '8', 'nama_prodi' => 'DIV - Akuntasi' ],
             
             //Administrasi Niaga
             ['id_jurusan' => '9', 'nama_prodi' => 'DIII - Administrasi Bisnis' ],
             ['id_jurusan' => '9', 'nama_prodi' => 'DIII - Manajemen Pemasaran' ],
             ['id_jurusan' => '9', 'nama_prodi' => 'DIII - Usaha Perjalanan Wisata' ],
             ['id_jurusan' => '9', 'nama_prodi' => 'DIV - Manajemen Pemasaran' ],
             ['id_jurusan' => '9', 'nama_prodi' => 'DIV - Administrasi Bisnis' ],
             ['id_jurusan' => '9', 'nama_prodi' => 'DIV - Manajemen Aset' ],
             
             //Bahasa Inggris
             ['id_jurusan' => '10', 'nama_prodi' => 'DIII - Bahasa Inggris' ],
             
        ];

        foreach($prodis as $prodi){
            Prodi::create($prodi);
        }
    }
}
