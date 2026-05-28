"use client";

import { useState } from "react";
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

const chartBars = [
  { month: "Jan", pct: 40 },
  { month: "Feb", pct: 60 },
  { month: "Mar", pct: 45 },
  { month: "Apr", pct: 75 },
  { month: "May", pct: 90, highlight: true },
  { month: "Jun", pct: 65 },
  { month: "Jul", pct: 50 },
  { month: "Aug", pct: 80 },
];

const transactions: Transaction[] = [
  {
    id: "#VTX-99201",
    event: "Summer Jazz Night 2024",
    date: "Oct 24, 2024",
    amount: "Rp 450,000",
    status: "Paid",
  },
  {
    id: "#VTX-99198",
    event: "Tech Founders Summit",
    date: "Oct 23, 2024",
    amount: "Rp 1,200,000",
    status: "Pending",
  },
  {
    id: "#VTX-99195",
    event: "Modern Art Workshop",
    date: "Oct 23, 2024",
    amount: "Rp 350,000",
    status: "Paid",
  },
  {
    id: "#VTX-99192",
    event: "Indie Film Festival",
    date: "Oct 22, 2024",
    amount: "Rp 200,000",
    status: "Paid",
  },
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
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="payments" iconBg={C.primaryFixed} iconColor={C.primary} badge="+12%" label="Total Revenue" value="Rp 128.5M" />
        <StatCard icon="confirmation_number" iconBg={C.secondaryFixed} iconColor={C.secondary} badge="+5%" label="Tickets Sold" value="1,240" />
        <StatCard icon="event" iconBg={C.tertiaryFixed} iconColor={C.tertiary} label="Active Events" value="12" />
        <StatCard icon="person" iconBg={C.surfaceContainerHighest} iconColor={C.onSurfaceVariant} label="Total Users" value="850" />
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

function CreateEventView() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full pb-8">
      <header className="mb-16">
        <h1 className="text-3xl md:text-[48px] font-extrabold mb-2 text-[#141b2b] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Create New Event</h1>
        <p className="text-[18px] text-[#464555] mb-8">Fill in the details to launch your next unforgettable experience.</p>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-between relative mt-16 px-2">
          <div className="absolute h-[2px] bg-[rgba(199,196,216,0.3)] top-1/2 left-0 right-0 -z-10 -translate-y-1/2"></div>
          
          <div className="flex flex-col items-center gap-2 bg-[#f9f9ff] px-4 text-[#4d41df]">
            <div className="w-10 h-10 rounded-full border-2 border-[#4d41df] flex items-center justify-center font-bold text-sm transition-all duration-400 bg-[#4d41df] text-white">1</div>
            <span className="text-[14px] font-semibold tracking-wide">Basic Info</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 bg-[#f9f9ff] px-4 text-[#464555]">
            <div className="w-10 h-10 rounded-full border-2 border-[#c7c4d8] flex items-center justify-center font-bold text-sm bg-[#e9edff] transition-all duration-400">2</div>
            <span className="text-[14px] font-semibold tracking-wide">Media</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 bg-[#f9f9ff] px-4 text-[#464555]">
            <div className="w-10 h-10 rounded-full border-2 border-[#c7c4d8] flex items-center justify-center font-bold text-sm bg-[#e9edff] transition-all duration-400">3</div>
            <span className="text-[14px] font-semibold tracking-wide">Tickets</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 bg-[#f9f9ff] px-4 text-[#464555]">
            <div className="w-10 h-10 rounded-full border-2 border-[#c7c4d8] flex items-center justify-center font-bold text-sm bg-[#e9edff] transition-all duration-400">4</div>
            <span className="text-[14px] font-semibold tracking-wide">Settings</span>
          </div>
        </div>
      </header>

      <form className="space-y-16">
        {/* Section: Basic Info */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-[rgba(199,196,216,0.3)]">
          <h3 className="text-[24px] font-bold mb-8 text-[#4d41df] flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="material-symbols-outlined">info</span> Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[14px] font-semibold text-[#141b2b] mb-2">Event Name</label>
              <input className="w-full bg-[#f9f9ff] border border-[#777587] rounded-lg px-4 py-3 text-[16px] focus:outline-none focus:border-[#4d41df] focus:ring-2 focus:ring-[#4d41df]/10 transition-all duration-400" placeholder="e.g. Neon Nights Summer Festival 2024" type="text" />
            </div>
            
            <div>
              <label className="block text-[14px] font-semibold text-[#141b2b] mb-2">Category</label>
              <select className="w-full bg-[#f9f9ff] border border-[#777587] rounded-lg px-4 py-3 text-[16px] focus:outline-none focus:border-[#4d41df] focus:ring-2 focus:ring-[#4d41df]/10 transition-all duration-400">
                <option>Concert</option>
                <option>Seminar</option>
                <option>Workshop</option>
                <option>Networking</option>
                <option>Exhibition</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[14px] font-semibold text-[#141b2b] mb-2">Date & Time</label>
              <div className="relative">
                <input className="w-full bg-[#f9f9ff] border border-[#777587] rounded-lg px-4 py-3 text-[16px] focus:outline-none focus:border-[#4d41df] focus:ring-2 focus:ring-[#4d41df]/10 transition-all duration-400" type="datetime-local" />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[14px] font-semibold text-[#141b2b] mb-2">Location</label>
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#464555]">location_on</span>
                  <input className="w-full bg-[#f9f9ff] border border-[#777587] rounded-lg pl-10 pr-4 py-3 text-[16px] focus:outline-none focus:border-[#4d41df] focus:ring-2 focus:ring-[#4d41df]/10 transition-all duration-400" placeholder="Venue name or physical address" type="text" />
                </div>
                <button className="px-4 py-2 border border-[#4d41df] text-[#4d41df] rounded-lg text-[14px] font-semibold hover:bg-[#675df9]/10 transition-colors" type="button">Select on Map</button>
              </div>
              
              {/* Mock Map */}
              <div className="h-48 bg-[#dce2f7] rounded-lg overflow-hidden relative group">
                <img className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 transition-all duration-700" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxayYFEpbH6yvxsNaz7La6b5dJ56IWMmrpmMJAtBxIFEyPRUAP7EiFXMYnmglzee3UbNdZhWzoicfD1Tck5peAkxYDGuzmZ8QNTLIncyNjPsXyAwiBbCZchNRcfrf_wDbuOBIbNl0Eu-hKakiMsi7FyhO6kloiuA2LF2kw92L5-uOBLwLNlLp1X1QejMO9r5YbPU_TN0nCXvebK6luiRqMzFbQfHdXdZkvJqat7GKWkqnmqmCpbPtRLhpgJSEQPSVBjoHxyX_-5Xf" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#4d41df] text-4xl animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[14px] font-semibold text-[#141b2b] mb-2">Description</label>
              <div className="border border-[#777587] rounded-lg overflow-hidden">
                <div className="bg-[#e1e8fd] border-b border-[#777587] p-2 flex gap-2">
                  <button className="p-1 hover:bg-[#dce2f7] rounded" type="button"><span className="material-symbols-outlined text-sm">format_bold</span></button>
                  <button className="p-1 hover:bg-[#dce2f7] rounded" type="button"><span className="material-symbols-outlined text-sm">format_italic</span></button>
                  <button className="p-1 hover:bg-[#dce2f7] rounded" type="button"><span className="material-symbols-outlined text-sm">format_list_bulleted</span></button>
                  <button className="p-1 hover:bg-[#dce2f7] rounded ml-auto" type="button"><span className="material-symbols-outlined text-sm">link</span></button>
                </div>
                <textarea className="w-full bg-[#f9f9ff] border-none px-4 py-3 text-[16px] focus:ring-0 outline-none" placeholder="Tell people what makes your event special..." rows={5}></textarea>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Media */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-[rgba(199,196,216,0.3)]">
          <h3 className="text-[24px] font-bold mb-8 text-[#4d41df] flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="material-symbols-outlined">image</span> Event Media
          </h3>
          <div className="aspect-[21/9] border-2 border-dashed border-[#777587] rounded-xl bg-[#f1f3ff] flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-[#4d41df] transition-all duration-400 overflow-hidden relative">
            <div className="flex flex-col items-center z-10">
              <span className="material-symbols-outlined text-5xl text-[#777587] mb-2 group-hover:text-[#4d41df] group-hover:scale-110 transition-all duration-400">cloud_upload</span>
              <p className="text-[14px] font-semibold text-[#141b2b]">Drag and drop your banner here</p>
              <p className="text-[14px] text-[#464555]">Recommended size: 1920x820px (Max 5MB)</p>
            </div>
            <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
          </div>
        </section>

        {/* Section: Tickets */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-[rgba(199,196,216,0.3)]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[24px] font-bold text-[#4d41df] flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="material-symbols-outlined">confirmation_number</span> Ticket Options
            </h3>
            <button className="flex items-center gap-2 text-[#4d41df] text-[14px] font-semibold hover:underline" type="button">
              <span className="material-symbols-outlined text-sm">add</span> Add New Tier
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Ticket Row */}
            <div className="flex flex-wrap md:flex-nowrap items-end gap-6 bg-[#f1f3ff] p-6 rounded-lg border border-[rgba(199,196,216,0.1)]">
              <div className="w-full md:w-1/2">
                <label className="block text-[14px] font-semibold text-[#141b2b] mb-2">Ticket Name</label>
                <input className="w-full bg-[#f9f9ff] border border-[#777587] rounded-lg px-4 py-3 text-[16px] focus:outline-none focus:border-[#4d41df] focus:ring-2 focus:ring-[#4d41df]/10 transition-all duration-400" type="text" defaultValue="General Admission" />
              </div>
              <div className="w-full md:w-1/4">
                <label className="block text-[14px] font-semibold text-[#141b2b] mb-2">Price ($)</label>
                <input className="w-full bg-[#f9f9ff] border border-[#777587] rounded-lg px-4 py-3 text-[16px] focus:outline-none focus:border-[#4d41df] focus:ring-2 focus:ring-[#4d41df]/10 transition-all duration-400" type="number" defaultValue={45} />
              </div>
              <div className="w-full md:w-1/4">
                <label className="block text-[14px] font-semibold text-[#141b2b] mb-2">Quantity</label>
                <input className="w-full bg-[#f9f9ff] border border-[#777587] rounded-lg px-4 py-3 text-[16px] focus:outline-none focus:border-[#4d41df] focus:ring-2 focus:ring-[#4d41df]/10 transition-all duration-400" type="number" defaultValue={500} />
              </div>
              <button className="p-3 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-colors" type="button">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </section>

        {/* Sticky Footer Actions */}
        <div className="sticky bottom-8 bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-xl border border-[rgba(199,196,216,0.3)] flex flex-col sm:flex-row justify-between items-center gap-4 z-40">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#914800]">visibility</span>
            <p className="text-[14px] text-[#464555]">Your changes are automatically saved to drafts.</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-8 py-3 border border-[#c7c4d8] text-[#464555] rounded-full text-[14px] font-semibold hover:bg-[#dce2f7] transition-colors" type="button">Save Draft</button>
            <button className="flex-1 sm:flex-none px-10 py-3 bg-[#4d41df] text-white rounded-full text-[14px] font-semibold hover:opacity-90 shadow-lg shadow-[#4d41df]/20 transform active:scale-95 transition-all duration-400" type="submit" onClick={(e) => { e.preventDefault(); e.currentTarget.innerText = "Publishing..."; setTimeout(() => { e.currentTarget.innerText = "Event Published!"; e.currentTarget.classList.replace('bg-[#4d41df]', 'bg-[#914800]'); }, 1500);}}>Publish Event</button>
          </div>
        </div>
      </form>
    </div>
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
export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
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
      case "create-event":
        return <CreateEventView />;
      case "events":
        return <PlaceholderView title="Events Management" description="View, edit, and manage all your upcoming and past events from this central hub." icon="confirmation_number" />;
      case "orders":
        return <PlaceholderView title="Orders & Transactions" description="Track ticket sales, refunds, and general transaction history securely." icon="shopping_cart" />;
      case "users":
        return <PlaceholderView title="User Administration" description="Manage attendees, staff members, and control user access levels." icon="group" />;
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
          <button
            onClick={() => { setActiveNav("create-event"); setSidebarOpen(false); }}
            className="flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 text-left mt-2"
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              width: "calc(100% - 2rem)",
              backgroundColor: activeNav === "create-event" ? C.secondaryContainer : "transparent",
              color: activeNav === "create-event" ? C.onSecondaryContainer : C.onSurfaceVariant,
              transform: activeNav === "create-event" ? "translateX(4px)" : "none",
            }}
            onMouseEnter={(e) => {
              if (activeNav !== "create-event") e.currentTarget.style.backgroundColor = C.surfaceContainerHighest;
            }}
            onMouseLeave={(e) => {
              if (activeNav !== "create-event") e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "22px", color: activeNav === "create-event" ? "inherit" : C.primary }}>
              add_circle
            </span>
            <span className="text-sm font-semibold">Create Event</span>
          </button>

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
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: C.primaryContainer, color: C.onSecondaryContainer }}
            >
              AP
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-semibold truncate" style={{ color: C.onSurface }}>
                Aditama Putra
              </p>
              <p className="text-xs" style={{ color: C.onSurfaceVariant }}>
                Admin
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
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                logout
              </span>
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
                 activeNav === "create-event" ? "Create Event" :
                 activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
              </h1>
              <p className="text-xs" style={{ color: C.onSurfaceVariant }}>
                {activeNav === "dashboard" ? "Welcome back, Aditama." : "Manage your platform efficiently."}
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
                <button
                  onClick={() => setActiveNav("create-event")}
                  className="hidden sm:flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200"
                  style={{ backgroundColor: C.primary, color: "white" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    add
                  </span>
                  Create New Event
                </button>
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
