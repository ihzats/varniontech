<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\KategoriBarangResource;
use Illuminate\Support\Str;
use App\Models\KategoriBarang;

class KategoriBarangController extends Controller
{
    public function index()
    {
        $kategoriBarang = KategoriBarang::all();

            return KategoriBarangResource::collection($kategoriBarang);
    }    
}