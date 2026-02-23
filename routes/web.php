<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SalesController;
use Illuminate\Foundation\Application;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/pos', function () {
    $products = Product::all();
    return Inertia::render('POS/Index',['products' =>$products]);
})->name('pos');

Route::get('/products' , [ProductController::class, 'index'])->name('products.index');
Route::get('/sales', [SalesController::class, 'index'])->name('sales.index');

Route::get('/pos', function () {
    return Inertia::render('POS/Index', [
        'products' => \App\Models\Product::all()
    ]);
})->name('pos');

// Trx Historiiii
Route::post('/sales', [SalesController::class, 'store'])->name('sales.store');
Route::get('/sales', [SalesController::class, 'index'])->name('sales.index');
Route::resource('inventory', ProductController::class);




require __DIR__.'/auth.php';
