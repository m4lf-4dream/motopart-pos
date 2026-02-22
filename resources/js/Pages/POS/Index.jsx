import React, { useState } from 'react';
import { Head } from '@inertiajs/react';


export default function Index({ products }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {

        setCart([...cart, { name: product.name, price: product.price }]);
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="p-10 min-h-screen font-sans" style={{ backgroundColor: "#F7F8F0", color: "#355872" }}>
            <Head title="MOTOPART - Kasir" />


            <header className="mb-10 border-b pb-4" style={{ borderColor: "#7AAACE" }}>
                <h1 className="text-4xl font-black tracking-tighter" style={{ color: "#355872" }}>
                    MOTOPART
                </h1>
                <p style={{ color: "#7AAACE" }} className="text-sm">Sistem POS Penjualan Part Motor</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="p-6 rounded-2xl shadow-xl" style={{ backgroundColor: "#9CD5FF" }}>
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                        <span className="w-2 h-6 mr-3" style={{ backgroundColor: "#355872" }}></span>
                        Katalog Part
                    </h2>

                    <div className="space-y-3">

                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    className="w-full p-4 rounded-xl text-left transition-all active:scale-95 flex justify-between shadow-sm hover:brightness-95"
                                    style={{ backgroundColor: "#F7F8F0" }}
                                >
                                    <div>
                                        <span className="block font-bold">{product.name}</span>
                                        <span className="text-xs opacity-60">{product.brand}</span>
                                    </div>
                                    <span className="font-bold italic" style={{ color: "#355872" }}>
                                        Rp {product.price.toLocaleString()}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <p className="text-sm italic">Stok barang kosong di database...</p>
                        )}
                    </div>
                </div>


                <div className="p-6 rounded-2xl shadow-xl border" style={{ backgroundColor: "#7AAACE", borderColor: "#355872" }}>
                    <h2 className="text-xl font-bold mb-6">Keranjang Belanja</h2>
                    <div className="min-h-[200px] mb-6 pb-2" style={{ borderBottom: "1px solid #355872" }}>
                        {cart.length === 0 ? (
                            <p style={{ color: "#F7F8F0" }} className="italic">Belum ada barang...</p>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="flex justify-between py-2" style={{ borderBottom: "1px solid #35587255" }}>
                                    <span>{item.name}</span>
                                    <span className="font-mono" style={{ color: "#F7F8F0" }}>
                                        Rp {item.price.toLocaleString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <span>Total Pembayaran:</span>
                        <span className="text-3xl font-black" style={{ color: "#F7F8F0" }}>
                            Rp {totalPrice.toLocaleString()}
                        </span>
                    </div>

                    <button
                        onClick={() => alert('Transaksi Berhasil Simpan!')}
                        className="w-full font-black py-4 rounded-xl transition-all shadow-lg hover:brightness-110"
                        style={{ backgroundColor: "#355872", color: "#F7F8F0" }}
                    >
                        BAYAR SEKARANG
                    </button>
                </div>
            </div>
        </div>
    );
}
