<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nim');
            $table->string('nama');
            $table->string('alamat');
            $table->date('tgl_lahir');
            $table->string('prodi');
            $table->string('jurusan');
            $table->boolean('status_aktif');
            $table->boolean('status_bidikmisi');
            $table->integer('ukt');
            $table->string('nomor_telepon');
            $table->timestamp('pengurus_verified_at')->nullable();
            $table->string('pengurus_jabatan');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->unsignedBigInteger('asrama_id');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
