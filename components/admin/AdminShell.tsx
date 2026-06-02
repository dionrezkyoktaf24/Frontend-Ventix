"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavItemDef = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

type AdminUser = {
  name?: string;
  role?: string;
};

const mainNavItems: NavItemDef[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "/admin/dashboard" },
  { id: "events", label: "Events", icon: "confirmation_number", href: "/admin/events" },
  { id: "orders", label: "Orders", icon: "shopping_cart", href: "/admin/orders" },
  { id: "users", label: "Users", icon: "group", href: "/admin/users" },
  { id: "analytics", label: "Analytics", icon: "analytics", href: "/admin/analytics" },
];

const supportNavItems: NavItemDef[] = [
  { id: "settings", label: "Settings", icon: "settings", href: "/admin/settings" },
  { id: "help", label: "Help Center", icon: "help", href: "/admin/help-center" },
];

const colors = {
  background: "#f9f9ff",
  surface: "#ffffff",
  surfaceContainerLow: "#f1f3ff",
  surfaceContainerHighest: "#dce2f7",
  outlineVariant: "rgba(199,196,216,0.3)",
  primary: "#4d41df",
  onSurface: "#141b2b",
  onSurfaceVariant: "#464555",
  onSecondaryContainer: "#fffbff",
  primaryContainer: "#675df9",
};

function getActiveNav(pathname: string | null) {
  if (!pathname) return "dashboard";
  if (pathname.startsWith("/admin/orders")) return "orders";
  if (pathname.startsWith("/admin/users")) return "users";
  if (pathname.startsWith("/admin/analytics")) return "analytics";
  if (pathname.startsWith("/admin/settings")) return "settings";
  if (pathname.startsWith("/admin/help-center")) return "help";
  if (pathname.startsWith("/admin/events")) return "events";
  return "dashboard";
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const activeNav = getActiveNav(pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("https://event-hub-backend-production-20ee.up.railway.app/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAdminUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f9f9ff] text-[#141b2b]">
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r bg-white py-6 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`} style={{ borderColor: colors.outlineVariant }}>
        <div className="px-6 mb-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-3">
            <span className="text-2xl font-black tracking-tighter" style={{ color: colors.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ventix
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 space-y-2">
          <div className="px-4 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">Main Menu</p>
          </div>
          {mainNavItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-[#e3dfff] text-[#4d41df]" : "text-slate-700 hover:bg-slate-100"}`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/admin/events/create"
            className="flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold text-[#4d41df] hover:bg-slate-100"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              add_circle
            </span>
            Create Event
          </Link>

          <div className="px-4 py-2 mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">Support</p>
          </div>

          {supportNavItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-[#e3dfff] text-[#4d41df]" : "text-slate-700 hover:bg-slate-100"}`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t" style={{ borderColor: colors.outlineVariant }}>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-[#e3dfff] flex items-center justify-center text-lg font-bold text-[#4d41df]">
              {adminUser?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div>
              <p className="text-sm font-semibold">{adminUser?.name ?? "Admin"}</p>
              <p className="text-xs text-slate-500">{adminUser?.role ?? "Admin"}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full rounded-2xl bg-[#4d41df] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3b35c4]"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-0 min-h-screen w-full md:ml-72">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-[#f9f9ff] px-6 py-4 md:hidden">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="rounded-full bg-white p-2 shadow-sm"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div>
            <p className="text-sm font-semibold">Admin Panel</p>
          </div>
        </div>
        <div className="min-h-screen bg-[#f9f9ff] p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
