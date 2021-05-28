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
            $table->id();
            $table->unsignedBigInteger('id_users')->references('id')->on('users');
            $table->unsignedBigInteger('id_prodi')->references('id')->on('prodi');
            $table->unsignedBigInteger('id_kamar')->references('id')->on('kamar');
            $table->string('nama_mhs');
            $table->string('nim_mhs');
            $table->tinyInteger('jenis_kelamin');
            $table->string('tempat_tgl_lahir');
            $table->string('agama');
            $table->string('alamat_mhs');
            $table->string('no_hp_mhs');
            $table->string('nama_ortu');
            $table->string('no_hp_ortu');
            $table->tinyInteger('status_keaktifan');
            $table->tinyInteger('golongan_ukt');
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
        Schema::dropIfExists('mahasiswa');
    }
}
