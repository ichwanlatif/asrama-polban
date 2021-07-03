<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateViewRekapitulasiPerizinanGedung extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \DB::statement('
            CREATE VIEW view_rekapitulasi_perizinan_gedung AS
            (
                SELECT 
                    mahasiswa.nama_mhs, 
                    mahasiswa.nim,
                    kamar.no_kamar,
                    gedung.nama_gedung,
                    perizinan.status_izin,
                    perizinan.created_at
                FROM mahasiswa
                JOIN kamar ON mahasiswa.id_kamar = kamar.id_kamar
                JOIN gedung ON kamar.id_gedung = gedung.id_gedung
                JOIN perizinan ON mahasiswa.id_mhs = perizinan.id_mhs
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
        \DB::statement('DROP VIEW view_rekapitulasi_perizinan_gedung');
    }
}
