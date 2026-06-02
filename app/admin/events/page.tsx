"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const C = {
  surface: "#ffffff",
  surfaceContainerLow: "#f1f3ff",
  outlineVariant: "rgba(199,196,216,0.3)",
  onSurface: "#141b2b",
  onSurfaceVariant: "#464555",
  primary: "#4d41df",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://event-hub-backend-production-20ee.up.railway.app/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : data.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus event ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`https://event-hub-backend-production-20ee.up.railway.app/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prev) => prev.filter((evt) => evt.id !== id));
      alert("Event berhasil dihapus!");
    } catch {
      alert("Gagal menghapus event!");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Events</h1>
          <p className="text-sm text-slate-600">Kelola semua event yang sudah dibuat.</p>
        </div>
        <Link
          href="/admin/events/create"
          className="inline-flex items-center gap-2 rounded-full bg-[#4d41df] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3b35c4]"
        >
          <span className="material-symbols-outlined">add</span>
          Buat Event
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-500">Memuat events...</p>
      ) : events.length === 0 ? (
        <p className="text-slate-500">Belum ada event.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-[#f1f3ff]">
              <tr>
                {['Title', 'Category', 'Date', 'Location', 'Price', 'Action'].map((col) => (
                  <th key={col} className="px-6 py-4 text-sm font-semibold text-slate-600">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t border-slate-200">
                  <td className="px-6 py-4 font-semibold text-slate-900">{event.title}</td>
                  <td className="px-6 py-4 text-slate-600">{event.category}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(event.date).toLocaleDateString("id-ID")}</td>
                  <td className="px-6 py-4 text-slate-600">{event.location}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">Rp {event.price?.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(event.id)}
                      className="rounded-full px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                    <Link
                      href={`/admin/events/edit?id=${event.id}`}
                      className="rounded-full px-3 py-2 text-sm font-semibold text-[#4d41df] transition hover:bg-slate-100"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
