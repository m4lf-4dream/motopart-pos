<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::create(['name' => 'Busi Racing Iridium', 'brand' => 'NGK', 'price' => 55000, 'stock' => 10]);
        \App\Models\Product::create(['name' => 'Oli Motul 1L', 'brand' => 'Motul', 'price' => 125000, 'stock' => 5]);
        \App\Models\Product::create(['name' => 'Kampas Rem Depan', 'brand' => 'Honda', 'price' => 35000, 'stock' => 20]);
        \App\Models\Product::create(['name' => 'V-Belt Kit', 'brand' => 'Yamaha', 'price' => 250000, 'stock' => 8]);
    }
}
