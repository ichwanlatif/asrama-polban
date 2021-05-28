<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerizinan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('perizinan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_mhs')->references('id')->on('mahasiswa');
            $table->date('tanggal_pergi');
            $table->date('tanggal_pulang');
            $table->longText('deskripsi');
            $table->string('file_pendukung');
            $table->tinyInteger('status_approval');
            $table->longText('catatan_pengurus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('perizinan');
    }
}
