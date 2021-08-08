<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKamar extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kamar', function (Blueprint $table) {
            $table->bigIncrements('id_kamar');
            $table->unsignedBigInteger('id_gedung');
            $table->integer('no_kamar');
            $table->timestamps();

            $table->foreign('id_gedung')->references('id_gedung')->on('Gedung')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kamar');
    }
}
