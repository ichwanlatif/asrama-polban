<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateViewMahasiswaGedung extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \DB::statement("
            CREATE VIEW view_mahasiswa_gedung AS
            (
                SELECT 
                    mahasiswa.nama_mhs, 
                    mahasiswa.nim,
                    mahasiswa.role_mhs,
                    kamar.no_kamar,
                    gedung.nama_gedung

                FROM mahasiswa
                JOIN kamar ON mahasiswa.id_kamar = kamar.id_kamar
                JOIN gedung ON kamar.id_gedung = gedung.id_gedung
            )
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \DB::statement('DROP VIEW view_mahasiswa_gedung');
    }
}
