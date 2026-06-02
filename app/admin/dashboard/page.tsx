"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItemDef = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

type Transaction = {
  id: string;
  event: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Refunded";
};

// ─── Static Data ──────────────────────────────────────────────────────────────
const mainNavItems: NavItemDef[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "#" },
  { id: "events", label: "Events", icon: "confirmation_number", href: "#" },
  { id: "orders", label: "Orders", icon: "shopping_cart", href: "#" },
  { id: "users", label: "Users", icon: "group", href: "#" },
  { id: "analytics", label: "Analytics", icon: "analytics", href: "#" },
];

const supportNavItems: NavItemDef[] = [
  { id: "settings", label: "Settings", icon: "settings", href: "#" },
  { id: "help", label: "Help Center", icon: "help", href: "#" },
];

const chartBars: any[] = [];

const transactions: Transaction[] = [
];

// ─── Color Tokens ─────────────────────────────────────────────────────────────
const C = {
  background: "#f9f9ff",
  surface: "#ffffff",
  surfaceContainerLow: "#f1f3ff",
  surfaceContainerHighest: "#dce2f7",
  onSurface: "#141b2b",
  onSurfaceVariant: "#464555",
  primary: "#4d41df",
  secondary: "#4b41e1",
  outline: "#777587",
  outlineVariant: "rgba(199, 196, 216, 0.3)",
  primaryFixed: "#e3dfff",
  secondaryFixed: "#e2dfff",
  tertiaryFixed: "#ffdcc6",
  tertiary: "#914800",
  primaryContainer: "#675df9",
  secondaryContainer: "#645efb",
  onSecondaryContainer: "#fffbff",
};

const statusStyle: Record<Transaction["status"], string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Refunded: "bg-red-100 text-red-700",
};



// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({ icon, iconBg, iconColor, badge, label, value }: any) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5 cursor-default select-none"
      style={{
        backgroundColor: C.surface,
        boxShadow: "0 10px 32px -4px rgba(79,70,229,0.06)",
        border: "1px solid rgba(229,231,235,0.5)",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: iconBg }}>
          <span className="material-symbols-outlined" style={{ color: iconColor, fontSize: "22px" }}>
            {icon}
          </span>
        </div>
        {badge && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium mb-1" style={{ color: C.onSurfaceVariant }}>
          {label}
        </p>
        <h3 className="text-2xl font-bold" style={{ color: C.onSurface, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {value}
        </h3>
      </div>
    </div>
  );
}

// ─── Views ────────────────────────────────────────────────────────────────────

function DashboardView() {
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="payments"
          iconBg={C.primaryFixed}
          iconColor={C.primary}
          label="Total Revenue"
          value={`Rp ${stats.totalRevenue.toLocaleString("id-ID")}`}
        />

        <StatCard
          icon="confirmation_number"
          iconBg={C.secondaryFixed}
          iconColor={C.secondary}
          label="Tickets Sold"
          value={stats.ticketsSold}
        />

        <StatCard
          icon="event"
          iconBg={C.tertiaryFixed}
          iconColor={C.tertiary}
          label="Active Events"
          value={stats.activeEvents}
        />

        <StatCard
          icon="person"
          iconBg={C.surfaceContainerHighest}
          iconColor={C.onSurfaceVariant}
          label="Total Users"
          value={stats.totalUsers}
        />
      </section>

      <section
        className="rounded-xl p-8 overflow-hidden relative"
        style={{
          backgroundColor: C.surface,
          boxShadow: "0 10px 32px -4px rgba(79,70,229,0.06)",
          border: "1px solid rgba(229,231,235,0.5)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: C.onSurface, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Revenue Growth
            </h2>
            <p className="text-sm mt-1" style={{ color: C.onSurfaceVariant }}>
              Visualizing monthly earnings for the year 2024
            </p>
          </div>
          <select
            className="self-start sm:self-auto rounded-lg px-4 py-2 text-sm outline-none border cursor-pointer"
            style={{ backgroundColor: C.surfaceContainerLow, borderColor: C.outlineVariant, color: C.onSurface }}
          >
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
          </select>
        </div>

        <div className="relative h-[300px] w-full mt-4 flex items-end gap-2">
          <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(77,65,223,0.10) 0%, rgba(77,65,223,0) 100%)" }} />
          {chartBars.map((bar) => (
            <div
              key={bar.month}
              className="flex-1 rounded-t-lg transition-all duration-200 cursor-pointer"
              style={{ height: `${bar.pct}%`, backgroundColor: bar.highlight ? C.primary : "rgba(77,65,223,0.20)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = bar.highlight ? "rgba(77,65,223,0.85)" : "rgba(77,65,223,0.40)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bar.highlight ? C.primary : "rgba(77,65,223,0.20)")}
            />
          ))}
        </div>

        <div className="flex justify-between mt-4 px-2">
          {chartBars.map((bar) => (
            <span key={bar.month} className="text-xs font-medium" style={{ color: C.outline }}>
              {bar.month}
            </span>
          ))}
        </div>
      </section>

      <section
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: C.surface,
          boxShadow: "0 10px 32px -4px rgba(79,70,229,0.06)",
          border: "1px solid rgba(229,231,235,0.5)",
        }}
      >
        <div className="p-8 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3" style={{ borderColor: "rgba(199,196,216,0.2)" }}>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: C.onSurface, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Recent Transactions
            </h2>
            <p className="text-sm mt-1" style={{ color: C.onSurfaceVariant }}>
              Manage and monitor latest payment activities
            </p>
          </div>
          <button
            className="text-sm font-semibold transition-all self-start sm:self-auto"
            style={{ color: C.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead style={{ backgroundColor: C.surfaceContainerLow, borderBottom: "1px solid rgba(199,196,216,0.2)" }}>
              <tr>
                {["Order ID", "Event Name", "Date", "Amount", "Status"].map((col) => (
                  <th key={col} className="px-8 py-4 text-sm font-semibold whitespace-nowrap" style={{ color: C.onSurfaceVariant }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr
                  key={tx.id}
                  className="transition-colors"
                  style={{ borderBottom: i < transactions.length - 1 ? "1px solid rgba(199,196,216,0.10)" : "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(241,243,255,0.55)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td className="px-8 py-5 text-sm whitespace-nowrap" style={{ color: C.onSurface }}>{tx.id}</td>
                  <td className="px-8 py-5 text-sm font-semibold whitespace-nowrap" style={{ color: C.onSurface }}>{tx.event}</td>
                  <td className="px-8 py-5 text-sm whitespace-nowrap" style={{ color: C.onSurfaceVariant }}>{tx.date}</td>
                  <td className="px-8 py-5 text-sm font-semibold whitespace-nowrap" style={{ color: C.onSurface }}>{tx.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[tx.status]}`}>{tx.status}</span>
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

function PlaceholderView({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-12">
      <div className="w-24 h-24 bg-[#e3dfff] rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[#4d41df] text-5xl">{icon}</span>
      </div>
      <h2 className="text-3xl font-bold text-[#141b2b] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {title}
      </h2>
      <p className="text-[#464555] max-w-md mx-auto text-lg">
        {description}
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function EventsView() {
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
      setEvents((prev) => prev.filter((e) => e.id !== id));
      alert("Event berhasil dihapus!");
    } catch {
      alert("Gagal menghapus event!");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: C.onSurface, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Events Management</h2>
          <p className="text-sm mt-1" style={{ color: C.onSurfaceVariant }}>Kelola semua event</p>
        </div>
        <Link
          href="/admin/events/create"
          className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: C.primary }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>add</span>
          Buat Event
        </Link>
      </div>

      {loading ? (
        <p style={{ color: C.onSurfaceVariant }}>Memuat events...</p>
      ) : events.length === 0 ? (
        <p style={{ color: C.onSurfaceVariant }}>Belum ada event.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: C.outlineVariant }}>
          <table className="w-full text-left">
            <thead style={{ backgroundColor: C.surfaceContainerLow }}>
              <tr>
                {["Title", "Category", "Date", "Location", "Price", "Action"].map((col) => (
                  <th key={col} className="px-6 py-4 text-sm font-semibold" style={{ color: C.onSurfaceVariant }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t" style={{ borderColor: C.outlineVariant }}>
                  <td className="px-6 py-4 font-semibold" style={{ color: C.onSurface }}>{event.title}</td>
                  <td className="px-6 py-4" style={{ color: C.onSurfaceVariant }}>{event.category}</td>
                  <td className="px-6 py-4" style={{ color: C.onSurfaceVariant }}>{new Date(event.date).toLocaleDateString("id-ID")}</td>
                  <td className="px-6 py-4" style={{ color: C.onSurfaceVariant }}>{event.location}</td>
                  <td className="px-6 py-4" style={{ color: C.onSurface }}>Rp {event.price?.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: "#ba1a1a" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffdad6")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>delete</span>
                    </button>
                    <Link
                      href={`/admin/events/edit?id=${event.id}`}
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: C.primary }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.primaryFixed)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>edit</span>
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

function UsersView() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://event-hub-backend-production-20ee.up.railway.app/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold" style={{ color: C.onSurface, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>User Management</h2>
        <p className="text-sm mt-1" style={{ color: C.onSurfaceVariant }}>Daftar semua pengguna terdaftar</p>
      </div>

      {loading ? (
        <p style={{ color: C.onSurfaceVariant }}>Memuat users...</p>
      ) : users.length === 0 ? (
        <p style={{ color: C.onSurfaceVariant }}>Belum ada user.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: C.outlineVariant }}>
          <table className="w-full text-left">
            <thead style={{ backgroundColor: C.surfaceContainerLow }}>
              <tr>
                {["ID", "Nama", "Email", "Role", "Bergabung"].map((col) => (
                  <th key={col} className="px-6 py-4 text-sm font-semibold" style={{ color: C.onSurfaceVariant }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t" style={{ borderColor: C.outlineVariant }}>
                  <td className="px-6 py-4" style={{ color: C.onSurfaceVariant }}>#{user.id}</td>
                  <td className="px-6 py-4 font-semibold" style={{ color: C.onSurface }}>{user.name}</td>
                  <td className="px-6 py-4" style={{ color: C.onSurfaceVariant }}>{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4" style={{ color: C.onSurfaceVariant }}>
                    {new Date(user.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
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

function OrdersView() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://event-hub-backend-production-20ee.up.railway.app/bookings/admin/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    <div className="w-full">
      <div className="mb-8">
        <h2
          className="text-2xl font-bold"
          style={{
            color: C.onSurface,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Orders Management
        </h2>

        <p
          className="text-sm mt-1"
          style={{ color: C.onSurfaceVariant }}
        >
          Daftar semua transaksi pemesanan tiket
        </p>
      </div>

      {loading ? (
        <p style={{ color: C.onSurfaceVariant }}>
          Memuat orders...
        </p>
      ) : (
        <div
          className="overflow-x-auto rounded-xl border"
          style={{ borderColor: C.outlineVariant }}
        >
          <table className="w-full text-left">
            <thead
              style={{ backgroundColor: C.surfaceContainerLow }}
            >
              <tr>
                {[
                  "Order ID",
                  "Invoice",
                  "User",
                  "Event",
                  "Total",
                  "Status",
                  "Date",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-4 text-sm font-semibold"
                    style={{ color: C.onSurfaceVariant }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t"
                  style={{
                    borderColor: C.outlineVariant,
                  }}
                >
                  <td
                    className="px-6 py-4"
                    style={{ color: C.onSurface }}
                  >
                    #{order.id}
                  </td>

                  <td
                    className="px-6 py-4"
                    style={{ color: C.onSurfaceVariant }}
                  >
                    {order.invoiceCode}
                  </td>

                  <td
                    className="px-6 py-4 font-medium"
                    style={{ color: C.onSurface }}
                  >
                    {order.user?.name}
                  </td>

                  <td
                    className="px-6 py-4"
                    style={{ color: C.onSurfaceVariant }}
                  >
                    {order.event?.title}
                  </td>

                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: C.onSurface }}
                  >
                    Rp{" "}
                    {order.totalPrice?.toLocaleString("id-ID")}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td
                    className="px-6 py-4"
                    style={{ color: C.onSurfaceVariant }}
                  >
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("id-ID")}
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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://event-hub-backend-production-20ee.up.railway.app/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAdminUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };


  const renderNavItem = (item: NavItemDef) => {
    const isActive = activeNav === item.id;
    return (
      <button
        key={item.id}
        onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
        className="flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 text-left"
        style={{
          marginLeft: "1rem",
          marginRight: "1rem",
          width: "calc(100% - 2rem)",
          backgroundColor: isActive ? C.secondaryContainer : "transparent",
          color: isActive ? C.onSecondaryContainer : C.onSurfaceVariant,
          transform: isActive ? "translateX(4px)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = C.surfaceContainerHighest;
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
          {item.icon}
        </span>
        <span className="text-sm font-semibold">{item.label}</span>
      </button>
    );
  };

  // Select the appropriate view based on activeNav
  const renderView = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardView />;
      case "events":
        return <EventsView />;
      case "orders":
        return <OrdersView />;
      case "users":
        return <UsersView />;
      case "analytics":
        return <PlaceholderView title="Analytics & Reports" description="Dive deep into performance metrics, demographics, and sales insights." icon="analytics" />;
      case "settings":
        return <PlaceholderView title="Platform Settings" description="Configure your organization profile, payment gateways, and global preferences." icon="settings" />;
      case "help":
        return <PlaceholderView title="Help Center" description="Access documentation, video tutorials, and contact our support team." icon="help" />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: C.background, color: C.onSurface }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col w-64 border-r py-4 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ backgroundColor: C.surfaceContainerLow, borderColor: C.outlineVariant }}
      >
        {/* Logo */}
        <div className="px-6 mb-6">
          <button onClick={() => { setActiveNav("dashboard"); setSidebarOpen(false); }}>
            <span className="text-2xl font-black tracking-tighter" style={{ color: C.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ventix
            </span>
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          <div className="px-4 py-2 mb-2">
            <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: C.onSurfaceVariant }}>
              Main Menu
            </p>
          </div>

          {mainNavItems.map(renderNavItem)}

          {/* Add a specific "Create Event" button to the sidebar for easy access */}
          <Link
            href="/admin/events/create"
            className="flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 text-left mt-2"
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              width: "calc(100% - 2rem)",
              color: C.primary,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>add_circle</span>
            <span className="text-sm font-semibold">Create Event</span>
          </Link>

          <div className="px-4 py-2 mt-4 mb-2">
            <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: C.onSurfaceVariant }}>
              Support
            </p>
          </div>

          {supportNavItems.map(renderNavItem)}
        </nav>

        {/* User profile footer */}
        <div className="px-6 py-4 mt-auto border-t" style={{ borderColor: "rgba(199,196,216,0.2)" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: C.primaryContainer, color: C.onSecondaryContainer }}
            >
              {adminUser?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-semibold truncate" style={{ color: C.onSurface }}>
                {adminUser?.name ?? "Admin"}
              </p>
              <p className="text-xs" style={{ color: C.onSurfaceVariant }}>
                {adminUser?.role ?? "Admin"}
              </p>
            </div>
            <button
              title="Logout"
              onClick={handleLogout}
              className="rounded-lg p-1.5 transition-colors flex-shrink-0"
              style={{ color: C.onSurfaceVariant }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.surfaceContainerHighest)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        {/* Top App Bar */}
        <header
          className="sticky top-0 z-30 h-20 flex items-center px-8 border-b"
          style={{
            backgroundColor: "rgba(249,249,255,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderColor: C.outlineVariant,
          }}
        >
          <div className="flex justify-between items-center w-full max-w-[1280px] mx-auto">
            {/* Mobile hamburger */}
            <button className="md:hidden mr-4 p-2 rounded-lg" onClick={() => setSidebarOpen(true)} style={{ color: C.onSurface }}>
              <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Page title */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold leading-tight" style={{ color: C.onSurface, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {activeNav === "dashboard" ? "Admin Dashboard" :
                  activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
              </h1>
              <p className="text-xs" style={{ color: C.onSurfaceVariant }}>
                {activeNav === "dashboard" ? `Welcome back, ${adminUser?.name ?? "Admin"}.` : "Manage your platform efficiently."}
              </p>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-6">
              {/* Search */}
              <div
                className="hidden lg:flex items-center gap-2 rounded-full px-4 py-2 border w-72"
                style={{ backgroundColor: C.surfaceContainerLow, borderColor: C.outlineVariant }}
              >
                <span className="material-symbols-outlined" style={{ color: C.outline, fontSize: "20px" }}>
                  search
                </span>
                <input className="bg-transparent border-none outline-none text-sm w-full" placeholder="Search events, users..." style={{ color: C.onSurface }} />
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button
                  className="h-10 w-10 flex items-center justify-center rounded-full transition-colors"
                  style={{ color: C.onSurface }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e1e8fd")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <span className="material-symbols-outlined">notifications</span>
                </button>

                {/* Create New Event */}
                <Link
                  href="/admin/events/create"
                  className="hidden sm:flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm"
                  style={{ backgroundColor: C.primary, color: "white" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>add</span>
                  Create New Event
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* ── Dashboard Body ────────────────────────────────────────────────── */}
        <div className="p-8 flex flex-col gap-16 max-w-[1280px] mx-auto w-full flex-1">
          {renderView()}
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="w-full py-8 mt-auto border-t" style={{ backgroundColor: C.surfaceContainerHighest, borderColor: "rgba(199,196,216,0.2)" }}>
          <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-[1280px] mx-auto gap-4">
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
              <span className="text-xl font-extrabold tracking-tighter" style={{ color: C.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Ventix
              </span>
              <span className="text-sm" style={{ color: C.onSurfaceVariant }}>
                © 2024 Ventix Ticketing. All rights reserved.
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Support"].map((link) => {
                const href =
                  link === "Privacy Policy"
                    ? "/privacy"
                    : link === "Terms of Service"
                      ? "/terms"
                      : link === "Cookie Policy"
                        ? "/cookies"
                        : "/support";

                return (
                  <a
                    key={link}
                    href={href}
                    className="text-xs font-medium transition-colors"
                    style={{ color: C.onSurfaceVariant }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.secondary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.onSurfaceVariant)}
                  >
                    {link}
                  </a>
                );
              })}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
