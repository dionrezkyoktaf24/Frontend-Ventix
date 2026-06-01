"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";

export default function AdminEditEventPage() {
    const router = useRouter();
    const [id, setId] = useState<string | null | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Konser");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [availableSeats, setAvailableSeats] = useState("");
    const [totalSeats, setTotalSeats] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setId(params.get("id"));
    }, []);

    useEffect(() => {
        if (id === undefined) return;
        if (!id) {
            setError("ID event tidak ditemukan");
            setFetching(false);
            return;
        }

        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`https://event-hub-backend-production-20ee.up.railway.app/events/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setTitle(data.title ?? "");
                setDescription(data.description ?? "");
                setCategory(data.category ?? "Konser");
                setDate(data.date ? new Date(data.date).toISOString().slice(0, 16) : "");
                setLocation(data.location ?? "");
                setPrice(String(data.price ?? ""));
                setOrganizer(data.organizer ?? "");
                setAvailableSeats(String(data.availableSeats ?? ""));
                setTotalSeats(String(data.totalSeats ?? ""));
            } catch (err) {
                setError("Gagal memuat data event");
            } finally {
                setFetching(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://event-hub-backend-production-20ee.up.railway.app/events/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    category,
                    date: new Date(date).toISOString(),
                    location,
                    price: Number(price),
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(Array.isArray(errData.message) ? errData.message.join(", ") : errData.message);
            }

            setMessage("Event berhasil diupdate!");
            setTimeout(() => router.push("/admin/dashboard"), 1500);
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-8 text-center">Memuat data event...</div>;
    if (!id) return <div className="p-8 text-center">ID event tidak ditemukan.</div>;

    return (
        <main className="min-h-screen bg-white text-slate-900">
            <Navbar />
            <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="mb-10 rounded-3xl border border-gray-200 bg-[#F8FAFC] p-10 shadow-sm">
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#111827]">Edit Event</h1>
                    <p className="mt-4 text-lg leading-8 text-gray-600">Update detail event kamu.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
                    <div className="grid gap-6 md:grid-cols-2">
                        <label className="space-y-2">
                            <span className="text-sm font-semibold text-slate-900">Nama Event</span>
                            <input value={title} onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                                placeholder="Contoh: Konser Jazz Malam" required />
                        </label>
                        <label className="space-y-2">
                            <span className="text-sm font-semibold text-slate-900">Kategori</span>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10">
                                <option>Konser</option>
                                <option>Seminar</option>
                                <option>Workshop</option>
                                <option>Festival</option>
                            </select>
                        </label>
                        <label className="space-y-2">
                            <span className="text-sm font-semibold text-slate-900">Tanggal</span>
                            <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                                required />
                        </label>
                        <label className="space-y-2">
                            <span className="text-sm font-semibold text-slate-900">Lokasi</span>
                            <input value={location} onChange={(e) => setLocation(e.target.value)}
                                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                                placeholder="Misalnya: Jakarta Convention Center" required />
                        </label>
                        <label className="space-y-2 md:col-span-2">
                            <span className="text-sm font-semibold text-slate-900">Deskripsi</span>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                                placeholder="Deskripsi event..." rows={4} required />
                        </label>
                        <label className="space-y-2">
                            <span className="text-sm font-semibold text-slate-900">Harga Tiket (Rp)</span>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                                placeholder="Contoh: 150000" required />
                        </label>
                    </div>

                    {message && (
                        <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-5 text-emerald-700">{message}</div>
                    )}
                    {error && (
                        <div className="rounded-3xl bg-red-50 border border-red-200 p-5 text-red-700">{error}</div>
                    )}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button type="submit" disabled={loading}
                                className="inline-flex items-center justify-center rounded-full bg-[#6C63FF] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#5849e5] transition-colors disabled:opacity-50">
                                {loading ? "Menyimpan..." : "Update Event"}
                            </button>
                            <Link href="/admin/dashboard"
                                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-gray-50 transition-colors">
                                Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </main>
    );
}