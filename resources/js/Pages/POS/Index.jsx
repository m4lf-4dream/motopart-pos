import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';

export default function Index({ products }) {
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [payAmount, setPayAmount] = useState(0);


    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (product) => {
    const countInCart = cart.filter(item => item.name === product.name).length;
    if (countInCart >= product.stock) {
        alert(`Maaf, stok ${product.name} tidak mencukupi!`);
        return;
        }

    setCart([...cart, { name: product.name, price: product.price }]);
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
    const returnAmount = payAmount - totalPrice;

    const handleBayar = () => {
        if (cart.length === 0) return alert("Keranjang kosong!");
        if (payAmount < totalPrice) return alert("Uang pembayaran kurang!");

        router.post('/sales', {
            total_price: totalPrice,
            pay_amount: payAmount,
            return_amount: returnAmount,
            items: cart
        }, {
            onSuccess: () => {
                alert(`Transaksi Berhasil! Kembalian: Rp ${returnAmount.toLocaleString()}`);
                setCart([]);
                setPayAmount(0);
            },
        });
    };

    return (
        <div className="p-10 min-h-screen font-sans" style={{ backgroundColor: "#F7F8F0", color: "#355872" }}>
            <Head title="MOTOPART - Kasir" />



            <header className="mb-6 border-b pb-4 flex justify-between items-end" style={{ borderColor: "#7AAACE" }}>
                <div>
                    <h1 className="text-4xl font-black tracking-tighter">MOTOPART</h1>
                    <p className="text-sm opacity-70">Sistem POS Penjualan Part Motor</p>
                </div>





                <div className="w-1/3">
                    <input
                        type="text"
                        placeholder="Cari part atau brand..."
                        className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-[#355872] outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">





                <div className="p-6 rounded-2xl shadow-xl" style={{ backgroundColor: "#9CD5FF" }}>
                    <h2 className="text-xl font-bold mb-4">Katalog Part</h2>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {filteredProducts.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="w-full p-4 rounded-xl text-left bg-[#F7F8F0] flex justify-between hover:scale-[1.02] transition-all"
                            >
                                <div>
                                    <span className="block font-bold">{product.name}</span>
                                    <span className="text-xs">Brand: {product.brand} | Stok: {product.stock}</span>
                                </div>
                                <span className="font-bold">Rp {product.price.toLocaleString()}</span>
                            </button>
                        ))}
                    </div>
                </div>








                <div className="p-6 rounded-2xl shadow-xl border" style={{ backgroundColor: "#7AAACE", borderColor: "#355872" }}>
                    <h2 className="text-xl font-bold mb-4">Pembayaran</h2>









                    <div className="min-h-[150px] mb-4 overflow-y-auto">
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between py-1 border-b border-[#35587233]">
                                <span>{item.name}</span>
                                <span>Rp {item.price.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>








                    <div className="space-y-4 pt-4 border-t border-[#355872]">
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>Rp {totalPrice.toLocaleString()}</span>
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase">Uang Bayar (Rp)</label>
                            <input
                                type="number"
                                className="w-full p-3 rounded-xl text-2xl font-mono text-right outline-none focus:ring-2 focus:ring-[#355872]"
                                value={payAmount}
                                onChange={(e) => setPayAmount(parseInt(e.target.value) || 0)}
                            />
                        </div>

                        <div className="flex justify-between text-lg font-bold text-[#F7F8F0]">
                            <span>Kembalian</span>
                            <span>Rp {returnAmount < 0 ? 0 : returnAmount.toLocaleString()}</span>
                        </div>

                        <button
                            onClick={handleBayar}
                            className="w-full font-black py-4 rounded-xl shadow-lg hover:brightness-110 transition-all text-white"
                            style={{ backgroundColor: "#355872" }}
                        >
                            PROSES TRANSAKSI
                        </button>
                        <Link href="/sales" className="block text-center text-sm font-bold mt-2">Lihat Riwayat</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

