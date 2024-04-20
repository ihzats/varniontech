<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Barang;
use App\Http\Resources\BarangResource;
use App\Http\Resources\KategoriBarangResource;
use App\Http\Resources\SatuanBarangResource;

class BarangResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'kategori_barang' => new KategoriBarangResource($this->kategori_barang),
            'satuan_barang' => new SatuanBarangResource($this->satuan_barang),
            'nama_barang' => $this->nama_barang,
            'kode_barang' => $this->kode_barang, 
            'jumlah' => $this->jumlah,
            'user_id' => $this->user_id,  
        ];
    }
}