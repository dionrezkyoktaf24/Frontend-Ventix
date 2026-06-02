"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function BookingPaymentClient({ orderId }: { orderId: string }) {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("Token");
        const res = await api.get(`/bookings/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });
        setBooking(res.data);
      } catch (err: any) {
        setError("Gagal mengambil data order.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [orderId]);

  const handlePay = async () => {
    setProcessing(true);
    setError(null);
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("Token");
      const res = await api.post(`/bookings/${orderId}/pay`, {}, { headers: { Authorization: `Bearer ${token}` } });

      // Prefer explicit redirect URL from backend
      const redirectUrl = res?.data?.paymentUrl || res?.data?.redirectUrl || res?.data?.url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      // If backend returned updated booking, navigate to ticket if paid
      if (res?.data?.paymentStatus === "PAID") {
        window.location.href = `/tickets/${orderId}`;
        return;
      }

      setError("Tidak dapat memproses pembayaran. Silakan coba lagi atau hubungi dukungan.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Terjadi kesalahan saat memproses pembayaran.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-6 text-slate-500">Memuat order...</div>;
  if (!booking) return <div className="p-6 text-red-500">Order tidak ditemukan.</div>;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-slate-700">
      <h1 className="text-2xl font-semibold mb-4">Selesaikan Pembayaran</h1>
      <p className="mb-6">Order <strong>#{booking.invoiceCode?.slice(-6).toUpperCase()}</strong> — Total: <strong>Rp {booking.totalPrice?.toLocaleString("id-ID")}</strong></p>

      {booking.paymentStatus === "PAID" ? (
        <div className="rounded-lg border p-6 bg-green-50">Pembayaran sudah diterima. <a className="text-violet-700 underline" href={`/tickets/${orderId}`}>Lihat E-Ticket</a></div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Lanjutkan ke metode pembayaran untuk menyelesaikan pesananmu dan menerima e-ticket.</p>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button onClick={handlePay} disabled={processing} className="rounded-[12px] bg-violet-700 px-5 py-3 text-white font-semibold disabled:opacity-60">
              {processing ? "Memproses..." : "Bayar Sekarang"}
            </button>
            <a href={`/events/${booking.event?.slug || ''}`} className="rounded-[12px] border px-5 py-3 text-sm">Kembali ke event</a>
          </div>
        </div>
      )}
    </div>
  );
}
