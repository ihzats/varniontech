<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\SatuanBarang;

class SatuanBarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $satuannBarang = [
            ['kode' => 'kg', 'nama' => 'Kilogram'],
            ['kode' => 'm', 'nama' => 'Meter'],
            ['kode' => 'lt', 'nama' => 'Liter'],
            // Tambahkan data lainnya sesuai kebutuhan
        ];

        // Masukkan data ke dalam tabel satuan_barang
        foreach ($satuannBarang as $satuanBarang) {
            SatuanBarang::create($satuanBarang);
        }
    }
}