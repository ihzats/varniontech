<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\SatuanBarangResource;
use Illuminate\Support\Str;
use App\Models\SatuanBarang;

class SatuanBarangController extends Controller
{
    public function index()
    {
        $satuanBarang = SatuanBarang::all();

            return SatuanBarangResource::collection($satuanBarang);
    }    
}