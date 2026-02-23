import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';

export default function Index({ products }) {
    const { data, setData, post, put, reset, errors } = useForm({
        name: '', brand: '', price: '', stock: ''
    });

    const [editId, setEditId] = useState(null);

const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {

        router.post(`/inventory/${editId}`, {
            ...data,
            _method: 'PUT',
        }, {
            onSuccess: () => {
                reset();
                setEditId(null);
                alert("Barang berhasil diperbarui!");
            }
        });
    } else {
        post('/inventory', { onSuccess: () => reset() });
    }
};

    const handleEdit = (p) => {
        setEditId(p.id);
        setData({ name: p.name, brand: p.brand, price: p.price, stock: p.stock });
    };

    const handleDelete = (id) => {
        if (confirm("Hapus barang ini?")) {
            router.delete(`/inventory/${id}`);
        }
    };

    return (
        <div className="p-10 min-h-screen font-sans" style={{ backgroundColor: "#F7F8F0", color: "#355872" }}>
            <Head title="MOTOPART - Inventory" />

            <header className="mb-10 border-b pb-4 flex justify-between items-center" style={{ borderColor: "#7AAACE" }}>
                <h1 className="text-4xl font-black tracking-tighter">MANAJEMEN <span style={{ color: "#7AAACE" }}>STOK</span></h1>
                <Link href="/pos" className="text-sm font-bold bg-[#355872] text-white px-4 py-2 rounded">← Kembali ke Kasir</Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* FORM TAMBAH/EDIT */}
                <div className="bg-white p-6 rounded-2xl shadow-xl h-fit border border-[#7AAACE]">
                    <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Barang' : 'Tambah Barang Baru'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Nama Part" className="w-full p-2 border rounded" value={data.name} onChange={e => setData('name', e.target.value)} />
                        <input type="text" placeholder="Brand" className="w-full p-2 border rounded" value={data.brand} onChange={e => setData('brand', e.target.value)} />
                        <input type="number" placeholder="Harga (Rp)" className="w-full p-2 border rounded" value={data.price} onChange={e => setData('price', e.target.value)} />
                        <input type="number" placeholder="Stok Awal" className="w-full p-2 border rounded" value={data.stock} onChange={e => setData('stock', e.target.value)} />
                        <button className="w-full py-3 bg-[#355872] text-white font-bold rounded-xl hover:brightness-125">
                            {editId ? 'UPDATE BARANG' : 'SIMPAN BARANG'}
                        </button>
                        {editId && <button type="button" onClick={() => {setEditId(null); reset();}} className="w-full text-sm underline text-gray-500">Batal Edit</button>}
                    </form>
                </div>

                {/* TABEL BARANG */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-[#7AAACE]">
                    <table className="w-full text-left">
                        <thead className="bg-[#355872] text-white">
                            <tr>
                                <th className="p-4">Nama Barang</th>
                                <th className="p-4">Brand</th>
                                <th className="p-4">Harga</th>
                                <th className="p-4 text-center">Stok</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-bold">{p.name}</td>
                                    <td className="p-4 text-sm">{p.brand}</td>
                                    <td className="p-4">Rp {p.price.toLocaleString()}</td>
                                    <td className="p-4 text-center font-mono">{p.stock}</td>
                                    <td className="p-4 flex justify-center gap-2">
                                        <button onClick={() => handleEdit(p)} className="bg-yellow-400 p-2 rounded text-xs font-bold">EDIT</button>
                                        <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white p-2 rounded text-xs font-bold">HAPUS</button>
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
