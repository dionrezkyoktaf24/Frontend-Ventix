"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/lib/api";

function DashboardView({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [bookingsRes, profileRes] = await Promise.all([
          api.get("/bookings", { headers }),
          api.get("/auth/profile", { headers }),
        ])

        setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : bookingsRes.data.data ?? []);
        setUser(profileRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  const activeTickets = bookings.filter(b => b.paymentStatus === "PAID").length;
  const totalSpent = bookings
    .filter(b => b.paymentStatus === "PAID")
    .reduce((acc, b) => acc + b.totalPrice, 0);

  return (
    <>
      {/* Top Profile Summary */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px] mb-[64px]">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[32px] font-[700] leading-[1.2] text-[#141b2b]">Welcome back,{user?.name ?? "..."}</h1>
          <p className="font-['Inter',_sans-serif] text-[16px] font-[400] leading-[1.5] text-[#464555]">Here's what's happening with your events today.</p>
        </div>
        <div className="flex items-center gap-[16px] bg-[#f1f3ff] p-2 rounded-full border border-[#c7c4d8]/30 shadow-sm pr-6">
          <img alt="User Profile" className="w-12 h-12 rounded-full object-cover border-2 border-[#675df9]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgYiQTiwnf-Heo2otmj3ZTjFiVJXYjg9_VTj_ZGZFJJFeZxspXf2vCqKhMsIRkS5CYBRBIvbCf29k7UZYDXb1u33AYyElGDU5OR8K-grWcVjexpZETQPygNb18yAAmOggq5k_5a2LlnE1Pzp9LrUuiWRPM-zffJc6fpxn5tSMu0QnJTaP7v_NdYsCNYN2M1kBRdzf1cfTTH4vTfbfuAncbNx5QWKqGpgMiTL5jSum-Y0fHmFOLCiAtLZ6UuoJB8qy-88P6_eKmXrX4" />
          <div className="flex flex-col">
            <span className="font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em] text-[#141b2b]">{user?.name ?? "..."}</span>
            <span className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] text-[#464555]">{user?.role ?? "Member"}</span>
          </div>
        </div>
      </header>
      {/* Quick Stats / Bento Area */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-[32px] mb-[64px]">
        <div className="bg-[#f1f3ff] p-[32px] rounded-lg border border-[#c7c4d8]/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#4d41df]/10 flex items-center justify-center text-[#4d41df] mb-4">
            <span className="material-symbols-outlined" data-icon="confirmation_number">confirmation_number</span>
          </div>
          <span className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] text-[#464555] uppercase tracking-wider">Active Tickets</span>
          <p className="font-['Plus_Jakarta_Sans',_sans-serif] text-[32px] font-[700] leading-[1.2] mt-1">{activeTickets.toString().padStart(2, '0')}</p>
        </div>
        <div className="bg-[#f1f3ff] p-[32px] rounded-lg border border-[#c7c4d8]/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#4b41e1]/10 flex items-center justify-center text-[#4b41e1] mb-4">
            <span className="material-symbols-outlined" data-icon="event_available">event_available</span>
          </div>
          <span className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] text-[#464555] uppercase tracking-wider">Events Attended</span>
          <p className="font-['Plus_Jakarta_Sans',_sans-serif] text-[32px] font-[700] leading-[1.2] mt-1">{bookings.length.toString().padStart(2, '0')}</p>
        </div>
        <div className="bg-[#f1f3ff] p-[32px] rounded-lg border border-[#c7c4d8]/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#914800]/10 flex items-center justify-center text-[#914800] mb-4">
            <span className="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
          </div>
          <span className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] text-[#464555] uppercase tracking-wider">Total Spent</span>
          <p className="font-['Plus_Jakarta_Sans',_sans-serif] text-[32px] font-[700] leading-[1.2] mt-1">Rp {(totalSpent / 1000000).toFixed(1)}M</p>
        </div>
      </section>
      {/* Tiket Saya Grid */}
      <section className="mb-[64px]">
        <div className="flex justify-between items-end mb-[32px]">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[24px] font-[700] leading-[1.3]">Tiket Saya</h2>
            <p className="font-['Inter',_sans-serif] text-[14px] font-[400] leading-[1.5] text-[#464555]">Upcoming events you are attending</p>
          </div>
          <button onClick={() => setActiveNav("tickets")} className="text-[#4d41df] font-['Inter',_sans-serif] hover:underline transition-all">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {loading ? (
            <p className="text-[#464555]">Memuat tiket...</p>
          ) : bookings.length === 0 ? (
            <p className="text-[#464555]">Belum ada tiket.</p>
          ) : (
            bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="group bg-[#ffffff] rounded-lg overflow-hidden border border-[#c7c4d8]/20 shadow-[0_24px_32px_-12px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">{booking.event?.title?.[0]}</span>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#4d41df] text-white font-['Inter',_sans-serif] rounded-full text-xs">{booking.event?.category ?? "Event"}</div>
                </div>
                <div className="p-[16px]">
                  <h3 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[18px] font-[700] leading-[1.3] mb-2">{booking.event?.title}</h3>
                  <div className="flex items-center gap-2 text-[#464555] mb-4">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="font-['Inter',_sans-serif] text-[14px] font-[400] leading-[1.5]">
                      {booking.event?.date ? new Date(booking.event.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#c7c4d8]/10">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-800" :
                      booking.paymentStatus === "CANCELLED" ? "bg-red-100 text-red-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>{booking.paymentStatus}</span>
                    <Link href={booking.paymentStatus === "PAID" ? `/tickets/${booking.id}` : `/bookings/${booking.id}/pay`} className="bg-[#4b41e1] text-white px-4 py-2 rounded-lg font-['Inter',_sans-serif] hover:brightness-110 transition-all text-sm">Details</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      {/* Transaction History */}
      <section className="bg-[#ffffff] rounded-xl border border-[#c7c4d8]/20 shadow-sm overflow-hidden">
        <div className="p-[32px] flex justify-between items-center border-b border-[#c7c4d8]/10">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[24px] font-[700] leading-[1.3]">Transaction History</h2>
            <p className="font-['Inter',_sans-serif] text-[14px] font-[400] leading-[1.5] text-[#464555]">Manage your recent payments and invoices</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#c7c4d8] rounded-lg font-['Inter',_sans-serif] hover:bg-[#f1f3ff] transition-colors">
            <span className="material-symbols-outlined text-[20px]" data-icon="filter_list">filter_list</span>
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f1f3ff] text-[#464555] border-b border-[#c7c4d8]/10">
                <th className="px-6 py-4 font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Order ID</th>
                <th className="px-6 py-4 font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Event</th>
                <th className="px-6 py-4 font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Date</th>
                <th className="px-6 py-4 font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Amount</th>
                <th className="px-6 py-4 font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Status</th>
                <th className="px-6 py-4 font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-[#f1f3ff]/50 transition-colors">
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b]">#{booking.invoiceCode?.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b]">{booking.event?.title}</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#464555]">{new Date(booking.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b] font-semibold">Rp {booking.totalPrice?.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-800" :
                      booking.paymentStatus === "CANCELLED" ? "bg-red-100 text-red-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>{booking.paymentStatus}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href={booking.paymentStatus === "PAID" ? `/tickets/${booking.id}` : `/bookings/${booking.id}/pay`} className="text-[#4b41e1] hover:text-[#4d41df] transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                      </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function PlaceholderView({ title, icon, desc }: { title: string, icon: string, desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
      <div className="w-24 h-24 bg-[#f1f3ff] rounded-full flex items-center justify-center text-[#4d41df] mb-6 shadow-sm border border-[#c7c4d8]/20">
        <span className="material-symbols-outlined text-[48px]">{icon}</span>
      </div>
      <h2 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[32px] font-[700] text-[#141b2b] mb-4">{title}</h2>
      <p className="font-['Inter',_sans-serif] text-[16px] text-[#464555] max-w-md">{desc}</p>
    </div>
  );
}

function TicketsView() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await api.get("/bookings", { headers });
        setBookings(Array.isArray(res.data) ? res.data : res.data.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-[32px]">
        <h2 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[24px] font-[700] leading-[1.3]">My Tickets</h2>
        <p className="font-['Inter',_sans-serif] text-[14px] font-[400] leading-[1.5] text-[#464555]">Semua tiket yang kamu miliki</p>
      </div>

      {loading ? (
        <p className="text-[#464555]">Memuat tiket...</p>
      ) : bookings.length === 0 ? (
        <p className="text-[#464555]">Belum ada tiket.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {bookings.map((booking) => (
            <div key={booking.id} className="group bg-[#ffffff] rounded-lg overflow-hidden border border-[#c7c4d8]/20 shadow-[0_24px_32px_-12px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-6xl font-bold">{booking.event?.title?.[0]}</span>
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#4d41df] text-white font-['Inter',_sans-serif] rounded-full text-xs">{booking.event?.category ?? "Event"}</div>
              </div>
              <div className="p-[16px]">
                <h3 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[18px] font-[700] leading-[1.3] mb-2">{booking.event?.title}</h3>
                <p className="font-['Inter',_sans-serif] text-[14px] text-[#464555] mb-2">
                  {booking.tickets?.map((t: any) => t.seat?.seatNumber).join(", ")}
                </p>
                <div className="flex items-center gap-2 text-[#464555] mb-4">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  <span className="font-['Inter',_sans-serif] text-[14px] font-[400] leading-[1.5]">
                    {booking.event?.date ? new Date(booking.event.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#c7c4d8]/10">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-800" :
                      booking.paymentStatus === "CANCELLED" ? "bg-red-100 text-red-800" :
                        "bg-amber-100 text-amber-800"
                    }`}>{booking.paymentStatus}</span>
                  <Link href={booking.paymentStatus === "PAID" ? `/tickets/${booking.id}` : `/bookings/${booking.id}/pay`} className="bg-[#4b41e1] text-white px-4 py-2 rounded-lg font-['Inter',_sans-serif] hover:brightness-110 transition-all text-sm">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CustomerDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardView setActiveNav={setActiveNav} />;
      case "tickets":
        return <TicketsView />;
      case "payments":
        return <PlaceholderView title="Payments" icon="payments" desc="Manage your payment methods and view billing history." />;
      case "settings":
        return <PlaceholderView title="Settings" icon="settings" desc="Update your profile, notification preferences, and account details." />;
      case "help":
        return <PlaceholderView title="Help Center" icon="help" desc="Find answers to common questions or contact our support team." />;
      default:
        return <DashboardView setActiveNav={setActiveNav} />;
    }
  };

  const getDesktopNavClass = (navName: string) => {
    return activeNav === navName
      ? "flex items-center gap-4 bg-[#645efb] text-[#fffbff] rounded-xl px-4 py-3 mx-2 translate-x-1 transition-transform"
      : "flex items-center gap-4 text-[#464555] hover:bg-[#dce2f7] rounded-xl px-4 py-3 mx-2 transition-all";
  };

  const getMobileNavClass = (navName: string) => {
    return activeNav === navName
      ? "flex flex-col items-center gap-1 text-[#4d41df]"
      : "flex flex-col items-center gap-1 text-[#464555]";
  };

  return (
    <div className="flex min-h-screen bg-[#f9f9ff]">
      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#f1f3ff] dark:bg-[#293040] shadow-md py-[16px] z-40 transition-all">
        <div className="px-6 mb-[64px]">
          <span className="font-['Plus_Jakarta_Sans',_sans-serif] text-[48px] font-[800] leading-[1.1] tracking-[-0.02em] font-black text-[#4d41df] tracking-tighter">Ventix</span>
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          {/* Nav Items */}
          <button onClick={() => setActiveNav("dashboard")} className={getDesktopNavClass("dashboard")}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Dashboard</span>
          </button>
          <button onClick={() => setActiveNav("tickets")} className={getDesktopNavClass("tickets")}>
            <span className="material-symbols-outlined">confirmation_number</span>
            <span className="font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">My Tickets</span>
          </button>
          <button onClick={() => window.location.href = '/events'} className={getDesktopNavClass("events")}>
            <span className="material-symbols-outlined">explore</span>
            <span className="font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Browse Events</span>
          </button>
          <button onClick={() => setActiveNav("payments")} className={getDesktopNavClass("payments")}>
            <span className="material-symbols-outlined">payments</span>
            <span className="font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Payments</span>
          </button>
          <button onClick={() => setActiveNav("settings")} className={getDesktopNavClass("settings")}>
            <span className="material-symbols-outlined">settings</span>
            <span className="font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Settings</span>
          </button>
          <div className="mt-auto pt-[16px] border-t border-[#c7c4d8]/20">
            <button onClick={() => setActiveNav("help")} className={getDesktopNavClass("help")}>
              <span className="material-symbols-outlined">help</span>
              <span className="font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em]">Help Center</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow md:ml-64 min-h-screen p-[20px] md:p-[64px]">
        {renderContent()}

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-center py-[64px] mt-[64px] border-t border-[#c7c4d8]/20 gap-[16px] text-[#464555]">
          <p className="font-['Inter',_sans-serif] text-[14px] font-[400] leading-[1.5]">© 2024 Ventix Ticketing. All rights reserved.</p>
          <div className="flex gap-[16px]">
            <Link href="/privacy" className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] hover:underline transition-all">Privacy Policy</Link>
            <Link href="/terms" className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] hover:underline transition-all">Terms of Service</Link>
            <Link href="/support" className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] hover:underline transition-all">Support</Link>
          </div>
        </footer>
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#f9f9ff]/80 backdrop-blur-md border-t border-[#c7c4d8]/10 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setActiveNav("dashboard")} className={getMobileNavClass("dashboard")}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className={`text-[10px] ${activeNav === "dashboard" ? "font-bold" : "font-medium"}`}>Dashboard</span>
        </button>
        <button onClick={() => setActiveNav("tickets")} className={getMobileNavClass("tickets")}>
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className={`text-[10px] ${activeNav === "tickets" ? "font-bold" : "font-medium"}`}>Tickets</span>
        </button>
        <button onClick={() => window.location.href = '/events'} className={getMobileNavClass("events")}>
          <span className="material-symbols-outlined">explore</span>
          <span className={`text-[10px] ${activeNav === "events" ? "font-bold" : "font-medium"}`}>Events</span>
        </button>
        <button onClick={() => setActiveNav("payments")} className={getMobileNavClass("payments")}>
          <span className="material-symbols-outlined">payments</span>
          <span className={`text-[10px] ${activeNav === "payments" ? "font-bold" : "font-medium"}`}>History</span>
        </button>
        <button onClick={() => setActiveNav("settings")} className={getMobileNavClass("settings")}>
          <span className="material-symbols-outlined">settings</span>
          <span className={`text-[10px] ${activeNav === "settings" ? "font-bold" : "font-medium"}`}>Settings</span>
        </button>
      </nav>
    </div>
  );
}
