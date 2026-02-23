<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function index()
    {
        return Inertia::render('Inventory/Index', [
            'products' => Product::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'price' => 'required|integer',
            'stock' => 'required|integer',
        ]);

        Product::create($data);
        return redirect()->back()->with('message', 'Barang berhasil ditambahkan!');
    }


public function update(Request $request, $id)
{
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'brand' => 'required|string|max:255',
        'price' => 'required|integer',
        'stock' => 'required|integer',
    ]);

    $product = Product::findOrFail($id);

    $product->update($data);

    return redirect()->back();
}


    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->back();
    }
}
