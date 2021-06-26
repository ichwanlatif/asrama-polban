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
        Schema::create('Perizinan', function (Blueprint $table) {
            $table->bigIncrements('id_perizinan');
            $table->unsignedBigInteger('id_mhs');
            $table->date('tanggal_pergi');
            $table->date('tanggal_pulang')->nullable();
            $table->string('keterangan_izin', 125);
            $table->string('alamat_izin', 125);
            $table->string('keterangan_kembali', 125)->nullable();
            $table->string('surat_pendukung')->nullable();
            $table->string('catatan_approval', 125)->nullable();
            $table->integer('status_izin');
            $table->integer('suhu_badan');
            $table->string('kondisi_kesehatan', 50);
            $table->string('jenis_kendaraan', 10);
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
        Schema::dropIfExists('perizinan');
    }
}
