<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    private $colors = ['putih', 'hitam', 'merah', 'biru', 'cyan'];

    public function index()
    {
        return Inertia::render('Inventory/Index', [
            'products' => Product::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'image_*' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['name', 'brand', 'price', 'stock']);

        foreach ($this->colors as $color) {
            $field = "image_" . $color;

            if ($request->hasFile($field)) {
                $data[$field] = $request->file($field)->store('products', 'public');
            }
        }

        Product::create($data);

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan');
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'image_*' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['name', 'brand', 'price', 'stock']);

        foreach ($this->colors as $color) {
            $field = "image_" . $color;

            if ($request->hasFile($field)) {

                // 🔥 HAPUS GAMBAR LAMA
                if ($product->$field) {
                    Storage::disk('public')->delete($product->$field);
                }

                $data[$field] = $request->file($field)->store('products', 'public');
            }
        }

        $product->update($data);

        return redirect()->back()->with('success', 'Produk berhasil diupdate');
    }

    public function destroy(Product $product)
    {
        foreach ($this->colors as $color) {
            $field = "image_" . $color;

            if ($product->$field) {
                Storage::disk('public')->delete($product->$field);
            }
        }

        $product->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus');
    }
}
