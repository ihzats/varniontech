<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\SatuanBarangController;
use App\Http\Controllers\KategoriBarangController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();

});
Route::get('/barang', [BarangController::class, 'index'])->name('barang.index');
Route::post('/barang/addnew', [BarangController::class, 'store']);
Route::put('/barang/update/{id}', [BarangController::class, 'update']);
Route::delete('/barang/delete/{id}', [BarangController::class, 'destroy']);
Route::get('/barang/{id}', [BarangController::class, 'show']);
Route::get('/user', [UserController::class, 'index'])->name('user.index');
Route::get('/satuanbarang', [SatuanBarangController::class, 'index']);
Route::get('/kategoribarang', [KategoriBarangController::class, 'index']);