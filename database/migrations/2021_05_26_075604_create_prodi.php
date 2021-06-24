<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdi extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Prodi', function (Blueprint $table) {
            $table->bigIncrements('id_prodi');
            $table->unsignedBigInteger('id_jurusan');
            $table->string('nama_prodi', 50);
            $table->timestamps();

            $table->foreign('id_jurusan')->references('id_jurusan')->on('Jurusan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prodi');
    }
}
