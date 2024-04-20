<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Barang;
use App\Http\Resources\BarangResource;
use Illuminate\Support\Str;


class BarangController extends Controller
{
     /**
     * Menampilkan formulir untuk menambahkan data barang.
     */
    public function create()
    {
        // Jika diperlukan, Anda bisa memuat data yang diperlukan untuk formulir, seperti daftar kategori barang atau satuan barang
        // Misalnya:
        // $kategoriBarang = KategoriBarang::all();
        // $satuanBarang = SatuanBarang::all();

        return view('barang.create');
    }
    
    public function index()
    {
        $barang = Barang::all();

            return BarangResource::collection($barang);
    }    

    /**
     * Menyimpan data barang yang baru ditambahkan.
     */
    public function store(Request $request)
    {
    // Validasi input
    $validatedData = $request->validate([
        'nama_barang' => 'required|string|max:20|min:2',
        'satuan_barang_id' => 'required|exists:satuan_barang,id',
        'kategori_barang_id' => 'required|exists:kategori_barang,id',
        'jumlah' => 'nullable|integer|min:0|max:100',
        'user_id' => 'nullable|exists:users,id',
    ]);

    // Generate kode barang jika belum ada
    $kode_barang = $this->generateUniqueKodeBarang();

    // Buat data barang baru
    $barang = new Barang;
    $barang->kode_barang = $kode_barang;
    $barang->nama_barang = $validatedData['nama_barang'];
    $barang->satuan_barang_id = $validatedData['satuan_barang_id'];
    $barang->kategori_barang_id = $validatedData['kategori_barang_id'];
    $barang->jumlah = $validatedData['jumlah'];
    $barang->user_id = $request->input('user_id', null); 

    $barang->save();

    return redirect()->route('barang.index')->with('success', 'Data barang berhasil ditambahkan!');
    }

    protected function generateUniqueKodeBarang()
    {
    do {
        $kode = strtoupper(Str::random(6)); // Menggunakan Str::random() untuk menghasilkan string acak
    } while (Barang::where('kode_barang', $kode)->exists());

    return $kode;
    }


    public function update(Request $request, $id)
    {
    $validatedData = $request->validate([
        'nama_barang' => 'required|string|max:20|min:2',
        'satuan_barang_id' => 'required|exists:satuan_barang,id',
        'kategori_barang_id' => 'required|exists:kategori_barang,id',
        'jumlah' => 'nullable|integer|min:0|max:100',
    ]);

    $barang = Barang::findOrFail($id);
    $barang->nama_barang = $validatedData['nama_barang'];
    $barang->satuan_barang_id = $validatedData['satuan_barang_id'];
    $barang->kategori_barang_id = $validatedData['kategori_barang_id'];
    $barang->jumlah = $validatedData['jumlah'];

    $barang->save();

    return redirect()->route('barang.index')->with('success', 'Data barang berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $barang = Barang::findOrFail($id);

        // Hapus data barang
        $barang->delete();

        return redirect()->route('barang.index')->with('success', 'Data barang berhasil dihapus!');
    }

    public function show($id)
    {
        $barangItem = Barang::find($id);

        if (!$barangItem) {
            return response()->json([
                'message' => 'Product item not found.'
            ], 404);
        }

        return response()->json([
            '$barangItem' => $barangItem
        ], 200);
    }
}