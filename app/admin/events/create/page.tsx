"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AdminCreateEventPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Konser");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setMessage("Event Anda berhasil disimpan sebagai draft. Anda dapat mengelolanya di Admin Dashboard.");
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl border border-gray-200 bg-[#F8FAFC] p-10 shadow-sm">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#111827]">Create Event</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">Isi detail event Anda untuk mulai menjual tiket dan mengelola acara dengan Ventix.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-900">Nama Event</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                placeholder="Contoh: Konser Jazz Malam"
                required
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-900">Kategori</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
              >
                <option>Konser</option>
                <option>Seminar</option>
                <option>Workshop</option>
                <option>Festival</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-900">Tanggal</span>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                required
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-900">Lokasi</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                placeholder="Misalnya: Jakarta Convention Center"
                required
              />
            </label>
          </div>

          {message ? (
            <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-5 text-emerald-700">
              {message}
            </div>
          ) : null}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Simpan progress Anda di sini.</p>
              <p className="text-sm text-gray-600">Draft akan tersimpan secara lokal dalam sesi browser Anda.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#6C63FF] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#5849e5] transition-colors">
                Simpan Draft
              </button>
              <Link href="/admin/dashboard" className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-gray-50 transition-colors">
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
