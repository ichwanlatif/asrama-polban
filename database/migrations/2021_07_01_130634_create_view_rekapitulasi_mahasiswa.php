<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateViewRekapitulasiMahasiswa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \DB::statement('
            CREATE VIEW view_rekapitulasi_mahasiswa AS
            (
                SELECT 
                    mahasiswa.nama_mhs, 
                    mahasiswa.nim,
                    kamar.no_kamar,
                    gedung.nama_gedung,
                    presensi.status_presensi,
                    presensi.created_at
                FROM mahasiswa
                JOIN kamar ON mahasiswa.id_kamar = kamar.id_kamar
                JOIN gedung ON kamar.id_gedung = gedung.id_gedung
                JOIN presensi ON mahasiswa.id_mhs = presensi.id_mhs
            )
        ');
    }
   
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \DB::statement('DROP VIEW view_rekapitulasi_mahasiswa');
    }
}
