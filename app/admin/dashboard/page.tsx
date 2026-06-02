"use client";

import { useEffect, useState } from "react";

const C = {
  surface: "#ffffff",
  surfaceContainerLow: "#f1f3ff",
  outlineVariant: "rgba(199,196,216,0.3)",
  onSurface: "#141b2b",
  onSurfaceVariant: "#464555",
  primary: "#4d41df",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    ticketsSold: 0,
    activeEvents: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://event-hub-backend-production-20ee.up.railway.app/bookings/admin/dashboard-stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-600">Ringkasan performa Ventix dan statistik penjualan tiket.</p>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Revenue</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">Rp {stats.totalRevenue.toLocaleString("id-ID")}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Tickets Sold</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">{stats.ticketsSold}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Active Events</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">{stats.activeEvents}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Users</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Revenue Summary</h2>
          <p className="text-sm text-slate-600">Laporan ringkas pendapatan dari event dan transaksi terbaru.</p>
        </div>
        <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-slate-500">
          Grafik akan ditampilkan di halaman analytics.
        </div>
      </section>
    </div>
  );
}
