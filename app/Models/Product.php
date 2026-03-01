<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'stock',
        'image_putih',
        'image_hitam',
        'image_merah',
        'image_biru',
        'image_cyan',
    ];
}
