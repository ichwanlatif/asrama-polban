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
            $table->id();
            $table->unsignedBigInteger('id_mhs')->references('id')->on('users');
            $table->date('tanggal_resign');
            $table->longText('deskripsi');
            $table->tinyInteger('status_approval');
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
        Schema::dropIfExists('resign');
    }
}
