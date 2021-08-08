<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMahasiswa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mahasiswa', function (Blueprint $table) {
            $table->bigIncrements('id_mhs');
            $table->unsignedBigInteger('id_users');
            $table->unsignedBigInteger('id_prodi');
            $table->unsignedBigInteger('id_kamar');
            $table->string('nama_mhs', 50);
            $table->string('nim', 10);
            $table->string('alamat', 125);
            $table->string('no_hp_mhs', 13);
            $table->string('nama_ortu', 50);
            $table->string('no_hp_ortu', 13);
            $table->tinyInteger('jenis_kelamin');
            $table->tinyInteger('status_keaktifan')->default(1);
            $table->date('tanggal_lahir');
            $table->string('agama', 10);
            $table->string('keterangan_asal', 10);
            $table->string('role_mhs', 12);
            $table->timestamps();

            $table->foreign('id_users')->references('id_users')->on('users')->onDelete('cascade');
            $table->foreign('id_prodi')->references('id_prodi')->on('prodi')->onDelete('cascade');
            $table->foreign('id_kamar')->references('id_kamar')->on('kamar')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mahasiswa');
    }
}
