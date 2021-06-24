<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResign extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Resign', function (Blueprint $table) {
            $table->bigIncrements('id_resign');
            $table->unsignedBigInteger('id_mhs');
            $table->date('tanggal_resign');
            $table->string('keterangan_resign', 125);
            $table->integer('suhu_badan');
            $table->string('kondisi_kesehatan', 50);
            $table->string('jenis_kendaraan', 10);
            $table->string('keterangan_stnk')->nullable();
            $table->integer('status_resign');
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
        Schema::dropIfExists('resign');
    }
}
