<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('barang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('satuan_barang_id');
            $table->unsignedBigInteger('user_id');
            $table->string('kode_barang', 6)->unique();
            $table->string('nama_barang', 20);
            $table->unsignedBigInteger('kategori_barang_id');
            $table->integer('jumlah')->nullable();
            $table->timestamps();

            $table->foreign('satuan_barang_id')->references('id')->on('satuan_barang')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('kategori_barang_id')->references('id')->on('kategori_barang')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barang');
    }
};