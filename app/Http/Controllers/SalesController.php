<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function index()
    {
        return Inertia::render('POS/History', ['sales' => Sale::latest()->get()]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'total_price' => 'required|integer',
            'pay_amount' => 'required|integer',
            'return_amount' => 'required|integer',
            'items' => 'required|array'
        ]);

        Sale::create([
            'total_price' => $request->total_price,
            'pay_amount' => $request->total_price,
            'return_amount' => $request->return_amount
        ]);

        foreach ($request->items as $item) {
            $product = \App\Models\Product::where('name', $item['name'])->first();
            if ($product && $product->stock > 0) {
                $product->decrement('stock', 1);
            }   
        }

        return redirect()->back()->with('message', 'Transaksi Berhasigma');
    }
}
