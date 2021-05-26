<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePengurusKomdis extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pengurus_komdis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_users')->references('id')->on('users');
            $table->unsignedBigInteger('id_prodi')->references('id')->on('prodi');
            $table->unsignedBigInteger('id_kamar')->references('id')->on('kamar');
            $table->string('nama_pengurus_komdis');
            $table->string('nim_pengurus_komdis');
            $table->string('no_hp_pengurus_komdis');
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
        Schema::dropIfExists('pengurus_komdis');
    }
}
