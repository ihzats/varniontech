<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SatuanBarangResource extends JsonResource
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
            'kode'=>$this->kode,
            'name' => $this->nama,
            // Tambahkan informasi lain yang Anda ingin sertakan tentang kategori barang
        ];
    }
}