import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function History({ sales }) {
    return (
        <div className="p-10 min-h-screen font-sans" style={{ backgroundColor: "#F7F8F0", color: "#355872" }}>
            <Head title="MOTOPART - Riwayat" />

            <header className="mb-10 border-b pb-4" style={{ borderColor: "#7AAACE" }}>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter">RIWAYAT <span style={{ color: "#7AAACE" }}>PENJUALAN</span></h1>
                        <p className="text-sm opacity-70">Daftar transaksi kasir MOTOPART</p>
                    </div>
                    <Link href="/pos" className="bg-[#355872] text-white px-6 py-2 rounded-lg font-bold hover:brightness-125 transition-all">
                        ← Kembali ke Kasir
                    </Link>
                </div>
            </header>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#7AAACE]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr style={{ backgroundColor: "#355872", color: "#F7F8F0" }}>
                            <th className="p-4">ID Transaksi</th>
                            <th className="p-4">Tanggal & Waktu</th>
                            <th className="p-4 text-right">Total Harga</th>
                            <th className="p-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length > 0 ? (
                            sales.map((sale) => (
                                <tr key={sale.id} className="border-b border-gray-100 hover:bg-[#9CD5FF22] transition-colors">
                                    <td className="p-4 font-mono font-bold">#TRX-{sale.id.toString().padStart(4, '0')}</td>
                                    <td className="p-4 text-sm">
                                        {new Date(sale.created_at).toLocaleString('id-ID')}
                                    </td>
                                    <td className="p-4 text-right font-bold text-[#355872]">
                                        Rp {sale.total_price.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                            Selesai
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-10 text-center italic text-gray-400">
                                    Belum ada data transaksi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
