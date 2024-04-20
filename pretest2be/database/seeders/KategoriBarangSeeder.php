<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\KategoriBarang;

class KategoriBarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategoriBarang = [
            ['kode' => 'kts', 'nama' => 'Kitchen set'],
            ['kode' => 'bds', 'nama' => 'Bedroom set'],
            ['kode' => 'fms', 'nama' => 'Family room set'],
            // Tambahkan data lainnya sesuai kebutuhan
        ];

        // Masukkan data ke dalam tabel kategori_barang
        foreach ($kategoriBarang as $kategoriBarang) {
            KategoriBarang::create($kategoriBarang);
        }
    }
}