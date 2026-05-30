"use client";

import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

type SelectedSeat = {
  id: string;
  category: string;
  price: number;
};

const STORAGE_KEY_PREFIX = "ventix:selectedSeats:";
const ORDER_KEY_PREFIX = "ventix:order:";
const AUTH_KEY = "ventix:auth";

function loadSelectedSeats(slug: string): SelectedSeat[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(`${STORAGE_KEY_PREFIX}${slug}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveOrder(orderId: string, payload: any) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${ORDER_KEY_PREFIX}${orderId}`, JSON.stringify(payload));
}

function clearSelectedSeats(slug: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(`${STORAGE_KEY_PREFIX}${slug}`);
}

function isUserAuthenticated() {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const auth = JSON.parse(raw);
    return auth?.isAuthenticated === true;
  } catch {
    return false;
  }
}

export default function CheckoutClient({ slug, event }: { slug: string; event: any }) {
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
    if (!slug) return;
    setSelectedSeats(loadSelectedSeats(slug));
    setIsAuthenticated(isUserAuthenticated());
  }, [slug]);

  useEffect(() => {
    if (!isHydrated || isAuthenticated === null || !slug) return;
    if (!isAuthenticated) {
      router.push(`/login?next=${encodeURIComponent(`/events/${slug}/checkout`)}`);
    }
  }, [isHydrated, isAuthenticated, slug, router]);

  const subtotal = useMemo(() => selectedSeats.reduce((acc, seat) => acc + seat.price, 0), [selectedSeats]);
  const serviceFee = 25000;
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + serviceFee + tax - discount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "VENTIX10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setDiscount(0);
    }
  };

  const handlePayment = () => {
    if (!slug || selectedSeats.length === 0) return;
    if (isAuthenticated === false) {
      router.push(`/login?next=${encodeURIComponent(`/events/${slug}/checkout`)}`);
      return;
    }
    setLoading(true);
    const orderId = `ORD-${Date.now()}`;
    const orderPayload = {
      id: orderId,
      slug,
      seats: selectedSeats,
      subtotal,
      serviceFee,
      tax,
      discount,
      total,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      clearSelectedSeats(slug);
      saveOrder(orderId, orderPayload);
      setLoading(false);
      router.push(`/tickets/${orderId}`);
    }, 1200);
  };

  if (!isHydrated) {
    return <div className="p-6 text-slate-500">Loading checkout...</div>;
  }

  if (isAuthenticated === false) {
    return <div className="p-6 text-slate-500">Anda harus login terlebih dahulu untuk melanjutkan checkout. Mengalihkan ke halaman login...</div>;
  }

  if (selectedSeats.length === 0) {
    return <div className="p-6 text-slate-500">Tidak ada kursi yang dipilih. Kembali ke halaman pemilihan kursi untuk melanjutkan.</div>;
  }

  const paymentOptions = [
    { id: "qris", title: "QRIS", subtitle: "Gopay, OVO, Dana, LinkAja", badge: "QR" },
    { id: "bca", title: "BCA Virtual Account", subtitle: "Transfer via BCA", badge: "BCA" },
    { id: "mandiri", title: "Mandiri Virtual Account", subtitle: "Transfer via Mandiri", badge: "MD" },
    { id: "gopay", title: "GoPay", subtitle: "E-Wallet", badge: "GP" },
    { id: "ovo", title: "OVO", subtitle: "E-Wallet", badge: "OV" },
  ];

  const selectedMethod = paymentOptions.find((item) => item.id === paymentMethod);
  const promoMessage = promoCode.trim().length === 0 ? null : discount > 0 ? "Kode promo berhasil diterapkan." : "Kode promo tidak valid.";

  return (
    <div className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-slate-200/70 bg-white p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.12)]">
          <div className="mb-10 flex flex-col gap-6 rounded-[32px] border border-slate-200/80 bg-slate-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <span className="inline-flex rounded-full bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-700">Checkout</span>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <h1 className="text-3xl font-semibold text-slate-950">Selesaikan Pembayaran</h1>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
                  {selectedSeats.length} Kursi Dipilih
                </span>
              </div>
              <p className="max-w-2xl text-sm text-slate-600">Pilih metode pembayaran, masukkan kode promo, lalu lanjutkan untuk mendapatkan tiket digital secara instan.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm text-slate-500 sm:grid-cols-3">
              {[
                { label: "1. Pilih Kursi", active: false },
                { label: "2. Checkout", active: true },
                { label: "3. E-Ticket", active: false },
              ].map((step, index) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${step.active ? "bg-violet-700 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {index + 1}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Langkah</p>
                    <p className={`text-sm font-semibold ${step.active ? "text-slate-950" : "text-slate-500"}`}>{step.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-8">
              <section className="space-y-4 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Metode Pembayaran</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">Pilih cara bayar favoritmu</h2>
                  </div>
                  <div className="rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">{selectedMethod?.title}</div>
                </div>
                <p className="text-sm text-slate-600">Kami menyediakan berbagai pilihan agar pembayaran kamu lebih cepat dan aman.</p>

                <div className="grid gap-4 md:grid-cols-2">
                  {paymentOptions.slice(0, 4).map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setPaymentMethod(option.id)}
                      className={`group flex items-center justify-between rounded-[28px] border px-5 py-5 text-left transition ${paymentMethod === option.id ? 'border-violet-600 bg-violet-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <div className="space-y-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-600 text-sm font-semibold text-white shadow-sm">{option.badge}</div>
                        <div>
                          <p className="font-semibold text-slate-950">{option.title}</p>
                          <p className="text-sm text-slate-500">{option.subtitle}</p>
                        </div>
                      </div>
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-white ${paymentMethod === option.id ? 'border-violet-600 bg-violet-600' : 'border-slate-300 bg-white text-slate-400 group-hover:border-violet-300'}`}>
                        {paymentMethod === option.id ? '✓' : '>'}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-[32px] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Kode Promo</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">Masukkan Voucher</h3>
                  </div>
                  <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">{discount > 0 ? 'Diskon aktif' : 'Belum terpakai'}</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="VENTIX10"
                    className="h-14 rounded-[22px] border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none transition focus:border-violet-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="inline-flex h-14 items-center justify-center rounded-[22px] bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-800"
                  >
                    Terapkan
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-sm ${discount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{promoMessage}</p>
                )}
                <p className="text-sm text-slate-500">Gunakan kode VENTIX10 untuk potongan 10% pada subtotal tiket.</p>
              </section>

              <section className="space-y-4 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rangkuman Pesanan</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">Detail tiket</h3>
                  </div>
                  <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">{selectedSeats.length} tiket</span>
                </div>

                <div className="space-y-3">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="flex items-center justify-between rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-4">
                      <div>
                        <p className="font-semibold text-slate-950">{seat.category}</p>
                        <p className="text-sm text-slate-500">Seat {seat.id}</p>
                      </div>
                      <p className="font-semibold text-slate-900">{formatCurrency(seat.price)}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-50 shadow-sm">
                <img src={event.image} alt={event.title} className="h-56 w-full object-cover" />
                <div className="space-y-3 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{event.category}</p>
                  <h2 className="text-2xl font-semibold text-slate-950">{event.title}</h2>
                  <p className="text-sm text-slate-600">{new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{selectedSeats.length} tiket</span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{event.location ?? 'Location belum tersedia'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Biaya layanan</span>
                  <span>{formatCurrency(serviceFee)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Pajak (11%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm text-emerald-600">
                    <span>Diskon</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between text-base font-semibold text-slate-950">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Bayar sekarang untuk menerima e-ticket langsung ke halaman tiket kamu.</p>
                </div>
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={handlePayment}
                className={`w-full rounded-[28px] px-6 py-4 text-base font-semibold text-white transition ${loading ? 'bg-slate-400' : 'bg-violet-700 shadow-xl shadow-violet-500/20 hover:bg-violet-800'}`}
              >
                {loading ? "Memproses Pembayaran..." : "Bayar Sekarang"}
              </button>

              <div className="rounded-[32px] border border-slate-200/80 bg-slate-50 p-5 text-sm text-slate-600 shadow-sm">
                <p className="font-semibold text-slate-950">Transaksi Aman</p>
                <p className="mt-2">Pembayaran kamu diproses melalui metode yang aman dan terlindungi.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
