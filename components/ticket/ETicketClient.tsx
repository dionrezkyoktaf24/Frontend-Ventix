"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import mockEvents from "@/lib/mockEvents";
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

function formatOrderCode(orderId: string) {
  const suffix = orderId.replace(/^ORD-/, "");
  return `VTX-${suffix.slice(-6).toUpperCase()}`;
}

function calculateCountdown(eventDate: Date) {
  const now = new Date();
  const diffMs = eventDate.getTime() - now.getTime();
  if (diffMs <= 0) return "LIVE NOW";
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return `LIVE IN ${days} DAY${days === 1 ? "" : "S"}`;
}

export default function ETicketClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderPayload | null>(null);

  useEffect(() => {
    if (!orderId) return;
    try {
      const raw = window.localStorage.getItem(`${ORDER_KEY_PREFIX}${orderId}`);
      if (!raw) return;
      const parsed: OrderPayload = JSON.parse(raw);
      setOrder(parsed);
    } catch {
      setOrder(null);
    }
  }, [orderId]);

  const event = order ? mockEvents.find((item) => item.slug === order.slug) : null;

  const eventDate = useMemo(() => {
    if (!event) return new Date();
    const time = event.time ? event.time : "19:00";
    return new Date(`${event.date}T${time}:00`);
  }, [event]);

  const countdown = useMemo(() => calculateCountdown(eventDate), [eventDate]);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center text-slate-500">
        <p className="text-lg font-semibold">Order tidak ditemukan</p>
        <p className="mt-3">Pastikan kamu telah menyelesaikan pembayaran atau kembali ke halaman acara untuk mencoba lagi.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-700">{countdown}</p>
            <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">Your E-Ticket</h1>
            <p className="text-sm text-slate-500">Order {formatOrderCode(order.id)}</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Print Ticket
          </button>
        </div>

        <div className="overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.12)]">
          <div className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-indigo-700 to-slate-950 px-8 py-8 text-white sm:px-12 sm:py-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">{event?.category ?? "Event Category"}</span>
                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{event?.title ?? "Unknown Event"}</h2>
              </div>
              <div className="rounded-[28px] border border-white/20 bg-white/10 px-4 py-3 text-right text-sm text-white shadow-lg shadow-black/20 sm:px-6">
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-white/70">VIP PASS</p>
                <p className="mt-3 text-3xl font-semibold">{order.seats.length}x</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Days", value: 3 },
                { label: "Hours", value: 14 },
                { label: "Mins", value: 22 },
              ].map((item) => (
                <div key={item.label} className="rounded-[28px] border border-white/20 bg-white/10 px-5 py-4 text-center">
                  <p className="text-3xl font-semibold">{item.value.toString().padStart(2, "0")}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/80">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200/80 bg-slate-50 px-8 py-8 sm:px-12">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Date</p>
                    <p className="mt-3 text-sm font-semibold text-slate-950">{event?.date ? new Date(event.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" }) : "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Time</p>
                    <p className="mt-3 text-sm font-semibold text-slate-950">{event?.time ?? "19:00"} GMT+7</p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Venue</p>
                    <p className="mt-3 text-sm font-semibold text-slate-950">{event?.venue ?? event?.location ?? "Unknown Venue"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Seat / Row</p>
                    <p className="mt-3 text-sm font-semibold text-slate-950">{order.seats.map((seat) => seat.id).join(" · ")}</p>
                  </div>
                </div>

                <div className="rounded-[28px] bg-slate-100 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Map View</p>
                      <p className="mt-2 text-sm text-slate-700">Preview venue location and directions.</p>
                    </div>
                    <button className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">View Venue Map</button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button className="rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 transition hover:border-slate-300">Add to Calendar</button>
                  <button className="rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 transition hover:border-slate-300">Directions</button>
                </div>
              </div>

              <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="overflow-hidden rounded-[28px] bg-slate-950 p-6 text-center text-white shadow-lg shadow-slate-950/10">
                  <div className="mx-auto mb-6 h-40 w-40 rounded-[32px] bg-white/10 p-6">
                    <div className="grid h-full w-full place-items-center rounded-[24px] bg-white text-slate-950">QR</div>
                  </div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Encrypted Token</p>
                  <p className="mt-3 text-lg font-semibold">#{formatOrderCode(order.id).replace("VTX-", "")}</p>
                  <p className="mt-4 text-xs text-slate-400">Keep screen brightness high for scanning</p>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-100 px-4 py-3 text-center text-xs tracking-[0.12em] text-slate-500">
                  Authorized Digital Asset for ticket holder · Subject to Security Protocol
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-[28px] bg-violet-700 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-800"
          >
            Download Ticket (PDF)
          </button>
          <button
            type="button"
            className="rounded-[28px] border border-slate-200 bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Save to Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
