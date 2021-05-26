<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateManajemen extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('manajemen', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_users')->references('id')->on('users');
            $table->string('nama_manajemen');
            $table->string('nip');
            $table->string('no_hp_manajemen');
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
        Schema::dropIfExists('manajemen');
    }
}
