import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';

export default function Index({ products }) {
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [payAmount, setPayAmount] = useState(0);

    // State untuk memilih warna (default: putih)
    const [selectedColor, setSelectedColor] = useState('putih');

    // Filter pencarian berdasarkan nama produk atau brand
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (product) => {
        const countInCart = cart.filter(item => item.id === product.id).length;
        if (countInCart >= product.stock) {
            alert(`Maaf, stok ${product.name} tidak mencukupi!`);
            return;
        }
        // Menyimpan item ke keranjang beserta info warna yang dipilih
        setCart([...cart, {
            id: product.id,
            name: product.name,
            price: product.price,
            color: selectedColor
        }]);
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

    // FUNGSI UNTUK MENDAPATKAN URL GAMBAR YANG BENAR
    const getImageUrl = (product) => {
        let path = product[`image_${selectedColor}`];
        // Jika warna terpilih kosong, cari warna lain yang ada isinya
        if (!path) {
            const colors = ['putih', 'hitam', 'merah', 'biru', 'cyan'];
            const availableColor = colors.find(c => product[`image_${c}`]);
            path = availableColor ? product[`image_${availableColor}`] : null;
        }
        if (!path) return 'https://via.placeholder.com/150?text=No+Image';
        return `${window.location.origin}/storage/${path}`;
    };

    return (
        <div className="p-10 min-h-screen font-sans" style={{ backgroundColor: "#F7F8F0", color: "#355872" }}>
            <Head title="MOTOPART - Kasir" />

            {/* HEADER */}
            <header className="mb-6 border-b pb-4 flex justify-between items-end" style={{ borderColor: "#7AAACE" }}>
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-[#355872]">MOTOPART</h1>
                    <p className="text-sm opacity-70 italic font-bold">POS System & Sparepart Management</p>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/inventory"
                        className="flex items-center gap-2 px-4 py-2 bg-[#355872] text-white rounded-lg font-bold text-sm hover:brightness-125 transition-all shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                        Manajemen Stok
                    </Link>

                    <div className="w-64">
                        <input
                            type="text"
                            placeholder="Cari part atau brand..."
                            className="w-full p-2 rounded-lg border border-[#7AAACE] focus:ring-2 focus:ring-[#355872] outline-none shadow-inner bg-white bg-opacity-50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* KOLOM KIRI: KATALOG PART */}
                <div className="p-6 rounded-3xl shadow-xl" style={{ backgroundColor: "#9CD5FF" }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black uppercase tracking-widest">Katalog Part</h2>

                        {/* Selector Warna Global */}
                        <div className="flex gap-2 bg-white p-1.5 rounded-full shadow-inner border border-[#7AAACE]">
                            {['putih', 'hitam', 'merah', 'biru', 'cyan'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedColor(c)}
                                    title={`Lihat warna ${c}`}
                                    className={`w-7 h-7 rounded-full border-2 ${selectedColor === c ? 'border-[#355872] scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100 transition-all'}`}
                                    style={{
                                        backgroundColor: c === 'putih' ? '#fff' : c === 'hitam' ? '#000' :
                                                         c === 'merah' ? '#ef4444' : c === 'biru' ? '#3b82f6' : '#06b6d4'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto pr-3 scrollbar-hide">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-[#F7F8F0] p-4 rounded-2xl shadow-sm border border-[#7AAACE] flex flex-col h-full hover:shadow-md transition-all group">

                                {/* FOTO PRODUK: KOTAK PERSEGI SEMPURNA */}
                                <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-white border border-[#7AAACE] relative">
                                    <img
                                        src={getImageUrl(product)}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt={product.name}
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=No+Image'}
                                    />
                                </div>

                                {/* AREA TEKS */}
                                <div className="flex flex-col flex-grow justify-between">
                                    <div className="text-left mb-2">
                                        <span className="block font-black text-sm leading-tight text-[#355872] truncate uppercase" title={product.name}>
                                            {product.name}
                                        </span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#9CD5FF] rounded-md opacity-80 uppercase">
                                                {product.brand}
                                            </span>
                                            <span className="text-[10px] font-bold opacity-60 uppercase">Stok: {product.stock}</span>
                                        </div>
                                    </div>

                                    {/* HARGA & TOMBOL */}
                                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#7AAACE33]">
                                        <span className="font-black text-sm text-[#355872]">
                                            Rp {product.price.toLocaleString()}
                                        </span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="bg-[#355872] text-white w-8 h-8 rounded-full flex items-center justify-center font-black hover:scale-110 active:scale-90 transition-all shadow-md"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* KOLOM KANAN: PEMBAYARAN */}
                <div className="p-8 rounded-3xl shadow-xl border-4" style={{ backgroundColor: "#7AAACE", borderColor: "#355872" }}>
                    <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Checkout
                    </h2>

                    <div className="min-h-[250px] mb-6 overflow-y-auto bg-white bg-opacity-30 rounded-2xl p-4 shadow-inner">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center mt-12 opacity-40">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <p className="text-sm font-bold italic">Belum ada barang dipilih</p>
                            </div>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="flex justify-between py-2 border-b border-[#35587222] text-sm font-bold">
                                    <span>{item.name} <span className="text-[9px] px-1 bg-[#355872] text-white rounded uppercase ml-1">{item.color}</span></span>
                                    <span>Rp {item.price.toLocaleString()}</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="space-y-5 pt-4">
                        <div className="flex justify-between text-2xl font-black">
                            <span>TOTAL</span>
                            <span>Rp {totalPrice.toLocaleString()}</span>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest block mb-1">Input Pembayaran (Cash)</label>
                            <input
                                type="number"
                                className="w-full p-4 rounded-2xl text-3xl font-mono text-right outline-none focus:ring-4 focus:ring-[#35587255] shadow-lg border-none"
                                value={payAmount}
                                onChange={(e) => setPayAmount(parseInt(e.target.value) || 0)}
                            />
                        </div>

                        <div className="flex justify-between text-xl font-black text-[#F7F8F0] bg-[#355872] bg-opacity-20 p-4 rounded-2xl">
                            <span>KEMBALIAN</span>
                            <span>Rp {returnAmount < 0 ? 0 : returnAmount.toLocaleString()}</span>
                        </div>

                        <button
                            onClick={handleBayar}
                            className="w-full font-black py-5 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-white text-xl tracking-tighter"
                            style={{ backgroundColor: "#355872" }}
                        >
                            KONFIRMASI PEMBAYARAN
                        </button>

                        <Link href="/sales" className="block text-center text-xs font-black mt-2 underline opacity-70 hover:opacity-100 uppercase tracking-widest">
                            Review Riwayat Penjualan
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
