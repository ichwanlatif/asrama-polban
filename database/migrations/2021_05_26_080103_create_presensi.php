<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePresensi extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Presensi', function (Blueprint $table) {
            $table->bigIncrements('id_presensi');
            $table->unsignedBigInteger('id_mhs');
            $table->integer('status_presensi');
            $table->double('latitude');
            $table->double('longitude');
            $table->float('suhu_badan', 8, 2);
            $table->string('kondisi_kesehatan', 50);
            $table->timestamps();

            $table->foreign('id_mhs')->references('id_mhs')->on('Mahasiswa')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('presensi');
    }
}
