<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Barang extends Model
{
    use HasFactory;

    protected $fillable = [ 
        'nama_barang',
        'satuan_barang_id',    
        'user_id', 
        'kategori_barang_id', 
        'jumlah'
    ];

    protected static function boot()
    {
        parent::boot();

        // Ketika data barang pertama kali dibuat
        static::creating(function ($barang) {
            // Generate kode barang jika belum ada
            if (empty($barang->kode_barang)) {
                $barang->kode_barang = static::generateKodeBarang();
            }
        });
    }

    // Method untuk mengenerate kode barang
    protected static function generateKodeBarang()
    {
         do {
            $kode = strtoupper(Str::random(6)); // Menggunakan Str::random() untuk menghasilkan string acak
         } while (static::where('kode_barang', $kode)->exists());

    return $kode;
    }

    public function satuan_barang()
    {
        return $this->belongsTo(SatuanBarang::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kategori_barang()
    {
        return $this->belongsTo(KategoriBarang::class);
    }
    
    protected $table = 'barang';
}