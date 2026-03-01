import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ products }) {
    // 1. Inisialisasi useForm dengan nilai null untuk file
    const { data, setData, post, reset, errors, processing } = useForm({
        name: '',
        brand: '',
        price: '',
        stock: '',
        image_putih: null,
        image_hitam: null,
        image_merah: null,
        image_biru: null,
        image_cyan: null,
    });

    // 2. Fungsi Submit dengan forceFormData
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/inventory', {
            forceFormData: true, // WAJIB: Agar file terkirim ke Laravel
            onSuccess: () => {
                reset();
                alert('Produk berhasil ditambahkan!');
            },
        });
    };

const handleDelete = (id) => {
    if (confirm('Hapus produk ini?')) {
        router.delete(`/inventory/${id}`); // Gunakan backtick (`) yang benar
    }
};

    return (
        <div className="p-10 min-h-screen bg-[#F7F8F0] text-[#355872]">
            <Head title="Inventory - MOTOPART" />

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black italic">MANAJEMEN STOK</h1>
                <a href="/pos" className="bg-[#355872] text-white px-4 py-2 rounded-lg font-bold">Kembali ke Kasir</a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FORM TAMBAH PRODUK */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#7AAACE] h-fit">
                    <h2 className="text-xl font-bold mb-4 uppercase">Tambah Part Baru</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text" placeholder="Nama Part" className="w-full p-2 border rounded-lg"
                            value={data.name} onChange={e => setData('name', e.target.value)}
                        />
                        <input
                            type="text" placeholder="Brand (Contoh: NGK, AHM)" className="w-full p-2 border rounded-lg"
                            value={data.brand} onChange={e => setData('brand', e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="number" placeholder="Harga" className="p-2 border rounded-lg"
                                value={data.price} onChange={e => setData('price', e.target.value)}
                            />
                            <input
                                type="number" placeholder="Stok" className="p-2 border rounded-lg"
                                value={data.stock} onChange={e => setData('stock', e.target.value)}
                            />
                        </div>

                        {/* INPUT FILE - PERHATIKAN e.target.files[0] */}
                        <div className="space-y-2 border-t pt-2">
                            <p className="text-[10px] font-bold text-gray-400">UPLOAD FOTO PER WARNA (Opsional)</p>

                            {['putih', 'hitam', 'merah', 'biru', 'cyan'].map((color) => (
                                <div key={color} className="flex flex-col">
                                    <label className="text-[10px] uppercase font-bold text-[#7AAACE]">Foto {color}</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="text-xs file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-[#9CD5FF] file:text-[#355872]"
                                        onChange={e => setData(`image_${color}`, e.target.files[0])}
                                    />
                                    {errors[`image_${color}`] && <span className="text-red-500 text-[10px]">{errors[`image_${color}`]}</span>}
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#355872] text-white py-3 rounded-xl font-bold hover:brightness-125 transition-all"
                        >
                            {processing ? 'Menyimpan...' : 'SIMPAN PRODUK'}
                        </button>
                    </form>
                </div>

                {/* TABEL DAFTAR PRODUK */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-[#7AAACE] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#9CD5FF]">
                            <tr>
                                <th className="p-4 border-b">Part</th>
                                <th className="p-4 border-b">Brand</th>
                                <th className="p-4 border-b">Stok</th>
                                <th className="p-4 border-b">Preview Warna</th>
                                <th className="p-4 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="p-4 border-b font-bold">{p.name}</td>
                                    <td className="p-4 border-b">{p.brand}</td>
                                    <td className="p-4 border-b">{p.stock}</td>
                                    <td className="p-4 border-b">
                                        <div className="flex gap-1">
                                            {['putih', 'hitam', 'merah', 'biru', 'cyan'].map(col => (
                                                <div
                                                    key={col}
                                                    title={col}
                                                    className={`w-4 h-4 rounded-full border ${p[`image_${col}`] ? 'bg-green-500' : 'bg-gray-200 opacity-30'}`}
                                                ></div>
                                            ))}
                                        </div>
                                        <span className="text-[9px] text-gray-400">Hijau = Ada Gambar</span>
                                    </td>
                                    <td className="p-4 border-b">
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="text-red-500 hover:underline text-sm font-bold"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
