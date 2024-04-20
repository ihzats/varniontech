<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Barang;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat 10 data dummy dengan kode barang yang di-generate
        for ($i = 1; $i <= 20; $i++) {
            $kode_barang = $this->generateKodeBarang(); // Menghasilkan kode barang baru
            $barang = [
                'kode_barang' => $kode_barang,
                'nama_barang' => 'Barang ' . $i,
                'satuan_barang_id' => random_int(1, 3), // ganti dengan id satuan barang yang sesuai
                'user_id' => 1, // ganti dengan id user yang sesuai
                'kategori_barang_id' => random_int(1, 3), // ganti dengan id kategori barang yang sesuai
                'jumlah' => random_int(1, 100),
            ];

            Barang::create($barang);
        }
    }

    // Method untuk mengenerate kode barang
    protected function generateKodeBarang()
    {
        do {
            $kode = strtoupper(substr(md5(uniqid()), 0, 6)); // Menggunakan kombinasi dari hash md5 dan unik id untuk menghasilkan kode acak
        } while (Barang::where('kode_barang', $kode)->exists());

        return $kode;
    }
}