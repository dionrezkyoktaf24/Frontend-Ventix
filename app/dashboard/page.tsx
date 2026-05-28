"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

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

function DashboardView({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  useEffect(() => {
    // Simple table row highlight animation
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
      (row as HTMLElement).style.opacity = '0';
      (row as HTMLElement).style.transform = 'translateY(10px)';
      setTimeout(() => {
        (row as HTMLElement).style.transition = 'all 0.4s ease-out';
        (row as HTMLElement).style.opacity = '1';
        (row as HTMLElement).style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  return (
    <>
        {/* Top Profile Summary */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px] mb-[64px]">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[32px] font-[700] leading-[1.2] text-[#141b2b]">Welcome back, Aditama</h1>
            <p className="font-['Inter',_sans-serif] text-[16px] font-[400] leading-[1.5] text-[#464555]">Here's what's happening with your events today.</p>
          </div>
          <div className="flex items-center gap-[16px] bg-[#f1f3ff] p-2 rounded-full border border-[#c7c4d8]/30 shadow-sm pr-6">
            <img alt="User Profile" className="w-12 h-12 rounded-full object-cover border-2 border-[#675df9]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgYiQTiwnf-Heo2otmj3ZTjFiVJXYjg9_VTj_ZGZFJJFeZxspXf2vCqKhMsIRkS5CYBRBIvbCf29k7UZYDXb1u33AYyElGDU5OR8K-grWcVjexpZETQPygNb18yAAmOggq5k_5a2LlnE1Pzp9LrUuiWRPM-zffJc6fpxn5tSMu0QnJTaP7v_NdYsCNYN2M1kBRdzf1cfTTH4vTfbfuAncbNx5QWKqGpgMiTL5jSum-Y0fHmFOLCiAtLZ6UuoJB8qy-88P6_eKmXrX4" />
            <div className="flex flex-col">
              <span className="font-['Inter',_sans-serif] text-[14px] font-[600] leading-[1] tracking-[0.01em] text-[#141b2b]">Aditama Putra</span>
              <span className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] text-[#464555]">Pro Member</span>
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
            <p className="font-['Plus_Jakarta_Sans',_sans-serif] text-[32px] font-[700] leading-[1.2] mt-1">04</p>
          </div>
          <div className="bg-[#f1f3ff] p-[32px] rounded-lg border border-[#c7c4d8]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#4b41e1]/10 flex items-center justify-center text-[#4b41e1] mb-4">
              <span className="material-symbols-outlined" data-icon="event_available">event_available</span>
            </div>
            <span className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] text-[#464555] uppercase tracking-wider">Events Attended</span>
            <p className="font-['Plus_Jakarta_Sans',_sans-serif] text-[32px] font-[700] leading-[1.2] mt-1">12</p>
          </div>
          <div className="bg-[#f1f3ff] p-[32px] rounded-lg border border-[#c7c4d8]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#914800]/10 flex items-center justify-center text-[#914800] mb-4">
              <span className="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
            </div>
            <span className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em] text-[#464555] uppercase tracking-wider">Total Spent</span>
            <p className="font-['Plus_Jakarta_Sans',_sans-serif] text-[32px] font-[700] leading-[1.2] mt-1">Rp 2.4M</p>
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
            {/* Ticket Card 1 */}
            <div className="group bg-[#ffffff] rounded-lg overflow-hidden border border-[#c7c4d8]/20 shadow-[0_24px_32px_-12px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBay41PCF2S9HCswGnjgEWnkgGlsLKkp85DvOdQ9fHsrVGSpg_KLz8DQZy6TvpteTC4duh37Y8vw8tZQPDjpC552tEImH36V4cOTet64iTMyXBOGcNb-09e0YLLbrCzDTfVcEOL0nvRUDGB0lwHLBZRyUy3uQtJlONiB-80M6RMi6PJ4sp1-n9l6JC_wc-1vNi70nyMBe7-4b9BUFSwysLEZ2sBwAcoeTMMvhjSOPw2T60SRbpZGV118sDE_wGadlR7fdFcg6E2wm_0" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white font-['Inter',_sans-serif] rounded-full">Music</div>
              </div>
              <div className="p-[16px]">
                <h3 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[24px] font-[700] leading-[1.3] mb-2">Summer Soundwave 2024</h3>
                <div className="flex items-center gap-2 text-[#464555] mb-4">
                  <span className="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
                  <span className="font-['Inter',_sans-serif] text-[14px] font-[400] leading-[1.5]">15 July, 2024 • 19:00</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#c7c4d8]/10">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-[#dce2f7] flex items-center justify-center text-[10px] font-bold">+3</div>
                  </div>
                  <button className="bg-[#4b41e1] text-white px-4 py-2 rounded-lg font-['Inter',_sans-serif] hover:brightness-110 transition-all">Details</button>
                </div>
              </div>
            </div>
            {/* Ticket Card 2 */}
            <div className="group bg-[#ffffff] rounded-lg overflow-hidden border border-[#c7c4d8]/20 shadow-[0_24px_32px_-12px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6cVonacnScdO1IW4O1tP-Fe6GcZOAXbR_zaCO9bhae26AFCdCWOFsuGfVakIX8FcYrM_RvukS08mEaThDWAcoHNzE8l4SQpli8tQJuNh4TawwUh4j9sD7781uWQGEPlrarMyy1buGYR6K82LWfJ15aPsE0JfZBmQgEh8-XmqhHDuNH6poIi5NpnStlWzy_Lo8DFuIqfBcv6LhGoGLRMc-ma0rbY8-d5G2Oi6aqnRfH_pcxDXMSyUHpp6QxUUxCMLrV9XYo9DfpvW-" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#914800] text-white font-['Inter',_sans-serif] rounded-full">Tech</div>
              </div>
              <div className="p-[16px]">
                <h3 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[24px] font-[700] leading-[1.3] mb-2">Future Tech Summit</h3>
                <div className="flex items-center gap-2 text-[#464555] mb-4">
                  <span className="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
                  <span className="font-['Inter',_sans-serif] text-[14px] font-[400] leading-[1.5]">22 Aug, 2024 • 09:00</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#c7c4d8]/10">
                  <div className="flex items-center gap-1 text-[#464555]">
                    <span className="material-symbols-outlined text-[18px]" data-icon="location_on">location_on</span>
                    <span className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em]">Jakarta, ID</span>
                  </div>
                  <button className="bg-[#4b41e1] text-white px-4 py-2 rounded-lg font-['Inter',_sans-serif] hover:brightness-110 transition-all">Details</button>
                </div>
              </div>
            </div>
            {/* Ticket Card 3 */}
            <div className="group bg-[#ffffff] rounded-lg overflow-hidden border border-[#c7c4d8]/20 shadow-[0_24px_32px_-12px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkkMeN-0-Ri0ZK6zXODWbclFCTGNotuYsjYcfEh6-cRLhxxtAt2PK68Z8PEhUd-vWdhRk2C67uZMifC2FSclWlU9U5NSspv6ajEx8l1CmlIHrKOdQ9j1XgvAiGMmMCMb-P50Pyeacsea40glLZYx2L0Z4ttbbBA3KrNXTZIWEAT4Gt1ylO2BaYfW6k9QbH6bCiI6VK3TezEuUbeGlx3ih7_h2N3gjF8elhPKua9cARAaTqJHjpcXiuAw1oaO2w5UNAK4z8RG3k11UZ" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#675df9] text-white font-['Inter',_sans-serif] rounded-full">Food</div>
              </div>
              <div className="p-[16px]">
                <h3 className="font-['Plus_Jakarta_Sans',_sans-serif] text-[24px] font-[700] leading-[1.3] mb-2">Gourmet Night 2024</h3>
                <div className="flex items-center gap-2 text-[#464555] mb-4">
                  <span className="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
                  <span className="font-['Inter',_sans-serif] text-[14px] font-[400] leading-[1.5]">05 Sept, 2024 • 20:00</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#c7c4d8]/10">
                  <div className="flex items-center gap-1 text-[#464555]">
                    <span className="material-symbols-outlined text-[18px]" data-icon="confirmation_number">confirmation_number</span>
                    <span className="font-['Inter',_sans-serif] text-[12px] font-[500] leading-[1] tracking-[0.02em]">2 Tickets</span>
                  </div>
                  <button className="bg-[#4b41e1] text-white px-4 py-2 rounded-lg font-['Inter',_sans-serif] hover:brightness-110 transition-all">Details</button>
                </div>
              </div>
            </div>
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
                <tr className="hover:bg-[#f1f3ff]/50 transition-colors">
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b]">#VX-9921</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b]">Summer Soundwave 2024</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#464555]">Jun 12, 2024</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b] font-semibold">Rp 850.000</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Paid</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-[#4b41e1] hover:text-[#4d41df] transition-colors">
                      <span className="material-symbols-outlined" data-icon="download">download</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-[#f1f3ff]/50 transition-colors">
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b]">#VX-8812</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b]">Future Tech Summit</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#464555]">Jun 05, 2024</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b] font-semibold">Rp 1.250.000</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Pending</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-[#4b41e1] hover:text-[#4d41df] transition-colors">
                      <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-[#f1f3ff]/50 transition-colors">
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b]">#VX-7723</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b]">Coffee Workshop</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#464555]">May 28, 2024</td>
                  <td className="px-6 py-4 font-['Inter',_sans-serif] text-[#141b2b] font-semibold">Rp 300.000</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Cancelled</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-[#464555] hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                    </button>
                  </td>
                </tr>
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

export default function CustomerDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardView setActiveNav={setActiveNav} />;
      case "tickets":
        return <PlaceholderView title="My Tickets" icon="confirmation_number" desc="View all your upcoming and past event tickets here." />;
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
