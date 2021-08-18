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
        Schema::create('resign', function (Blueprint $table) {
            $table->bigIncrements('id_resign');
            $table->unsignedBigInteger('id_mhs');
            $table->date('tanggal_resign');
            $table->string('keterangan_resign', 125);
            $table->float('suhu_badan', 8, 2);
            $table->string('kondisi_kesehatan', 50);
            $table->string('jenis_kendaraan', 10);
            $table->string('file_stnk')->nullable();
            $table->tinyInteger('status_resign');
            $table->timestamps();

            $table->foreign('id_mhs')->references('id_mhs')->on('mahasiswa')->onDelete('cascade');
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
