"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatCurrency, formatDate } from "@/lib/utils";

type OrderPayload = {
  id: string;
  slug: string;
  seats: Array<{ id: string; category: string; price: number }>;
  subtotal: number;
  serviceFee: number;
  tax: number;
  discount?: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
};

const ORDER_KEY_PREFIX = "ventix:order:";

function loadOrders(): OrderPayload[] {
  if (typeof window === "undefined") return [];

  const orders: OrderPayload[] = [];
  Object.keys(window.localStorage).forEach((key) => {
    if (!key.startsWith(ORDER_KEY_PREFIX)) return;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return;
      const parsed = JSON.parse(raw) as OrderPayload;
      if (parsed?.id && parsed?.slug) {
        orders.push(parsed);
      }
    } catch {
      // ignore invalid cache entries
    }
  });

  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export default function TicketsPage() {
  const [orders, setOrders] = useState<OrderPayload[]>([]);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6C63FF]">My Tickets</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#111827]">Daftar Order Anda</h1>
          </div>
          <Link href="/events" className="inline-flex items-center rounded-full bg-[#6C63FF] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#5849e5] transition-colors">
            Jelajahi Event
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-[#F8FAFC] p-12 text-center shadow-sm">
            <p className="text-xl font-semibold text-slate-900">Belum ada order tiket ditemukan</p>
            <p className="mt-3 text-gray-600">Selesaikan pembelian tiket pertama kamu di halaman event untuk melihat e-ticket di sini.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{order.id}</p>
                    <p className="mt-2 text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="rounded-3xl bg-[#eef2ff] px-4 py-2 text-sm font-semibold text-[#4338ca]">{order.seats.length} tiket</div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{formatCurrency(order.total)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Metode Pembayaran</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{order.paymentMethod.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tiket</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{order.seats.map((seat) => seat.id).join(", ")}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link href={`/tickets/${order.id}`} className="inline-flex items-center justify-center rounded-full bg-[#6C63FF] px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#5849e5] transition-colors">
                    Lihat E-Ticket
                  </Link>
                  <span className="text-sm text-gray-500">Created {formatDate(order.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
