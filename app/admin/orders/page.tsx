"use client";

import { useEffect, useState } from "react";

const C = {
  surface: "#ffffff",
  surfaceContainerLow: "#f1f3ff",
  outlineVariant: "rgba(199,196,216,0.3)",
  onSurface: "#141b2b",
  onSurfaceVariant: "#464555",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://event-hub-backend-production-20ee.up.railway.app/bookings/admin/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
          <p className="text-sm text-slate-600">Lihat semua transaksi pemesanan tiket.</p>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500">Memuat orders...</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-[#f1f3ff]">
              <tr>
                {["Order ID", "Invoice", "User", "Event", "Total", "Status", "Date"].map((col) => (
                  <th key={col} className="px-6 py-4 text-sm font-semibold text-slate-600">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-slate-200">
                  <td className="px-6 py-4 text-slate-900">#{order.id}</td>
                  <td className="px-6 py-4 text-slate-600">{order.invoiceCode}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{order.user?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{order.event?.title}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">Rp {order.totalPrice?.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{new Date(order.createdAt).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
