"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ArrowRight,
  Ticket,
  Music,
  BookOpen,
  Laptop,
  Trophy,
  Zap,
  Star,
  Users,
  TrendingUp,
  Shield,
  Smartphone,
  Play,
  ChevronRight,
  MapPin,
  Calendar,
  Globe,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/events/EventCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatCurrency } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const categories = [
  { id: "konser", label: "Konser", icon: Music, color: "from-pink-500 to-rose-600", bg: "bg-pink-50", text: "text-pink-600", count: 24 },
  { id: "seminar", label: "Seminar", icon: BookOpen, color: "from-blue-500 to-cyan-600", bg: "bg-blue-50", text: "text-blue-600", count: 18 },
  { id: "workshop", label: "Workshop", icon: Zap, color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-600", count: 31 },
  { id: "webinar", label: "Webinar", icon: Laptop, color: "from-indigo-500 to-violet-600", bg: "bg-indigo-50", text: "text-indigo-600", count: 42 },
  { id: "olahraga", label: "Olahraga", icon: Trophy, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", text: "text-emerald-600", count: 15 },
  { id: "festival", label: "Festival", icon: Star, color: "from-purple-500 to-fuchsia-600", bg: "bg-purple-50", text: "text-purple-600", count: 9 },
  { id: "komunitas", label: "Komunitas", icon: Users, color: "from-rose-500 to-pink-600", bg: "bg-rose-50", text: "text-rose-600", count: 27 },
  { id: "lainnya", label: "Lainnya", icon: Globe, color: "from-gray-500 to-slate-600", bg: "bg-gray-50", text: "text-gray-600", count: 56 },
];

const featuredEvents = [
  {
    id: "1",
    slug: "java-jazz-festival-2025",
    title: "Java Jazz Festival 2025",
    category: "Konser",
    categoryColor: "pink" as const,
    date: "2025-08-15",
    location: "Jakarta Convention Center",
    price: 350000,
    availableSeats: 120,
    totalSeats: 1500,
    imageColor: "from-pink-500 via-rose-500 to-orange-400",
    organizer: "Java Jazz Inc.",
    isFeatured: true,
  },
  {
    id: "2",
    slug: "nextjs-conf-indonesia-2025",
    title: "Next.js Conference Indonesia 2025",
    category: "Seminar",
    categoryColor: "blue" as const,
    date: "2025-07-20",
    location: "Bali International Convention Centre",
    price: 150000,
    availableSeats: 45,
    totalSeats: 500,
    imageColor: "from-indigo-500 via-blue-500 to-cyan-400",
    organizer: "Vercel Indonesia",
    isFeatured: true,
  },
  {
    id: "3",
    slug: "ui-ux-masterclass-surabaya",
    title: "UI/UX Design Masterclass Surabaya",
    category: "Workshop",
    categoryColor: "orange" as const,
    date: "2025-07-05",
    location: "Surabaya Tech Hub",
    price: 250000,
    availableSeats: 28,
    totalSeats: 50,
    imageColor: "from-amber-500 via-orange-500 to-red-400",
    organizer: "DesignLab ID",
    isFeatured: false,
  },
  {
    id: "4",
    slug: "free-webinar-digital-marketing",
    title: "Webinar Gratis: Strategi Digital Marketing 2025",
    category: "Webinar",
    categoryColor: "default" as const,
    date: "2025-06-30",
    location: "Online - Zoom",
    price: 0,
    availableSeats: 850,
    totalSeats: 1000,
    imageColor: "from-violet-500 via-purple-500 to-fuchsia-400",
    organizer: "GrowthHack Academy",
    isFeatured: false,
  },
  {
    id: "5",
    slug: "indonesia-esports-championship",
    title: "Indonesia Esports Championship 2025",
    category: "Olahraga",
    categoryColor: "success" as const,
    date: "2025-09-10",
    location: "Istora Senayan, Jakarta",
    price: 125000,
    availableSeats: 2200,
    totalSeats: 5000,
    imageColor: "from-emerald-500 via-teal-500 to-cyan-400",
    organizer: "IESF Indonesia",
    isFeatured: true,
  },
  {
    id: "6",
    slug: "bandung-music-festival",
    title: "Bandung Music Festival 2025",
    category: "Festival",
    categoryColor: "purple" as const,
    date: "2025-08-28",
    location: "Stadion Persib, Bandung",
    price: 175000,
    availableSeats: 3100,
    totalSeats: 8000,
    imageColor: "from-purple-500 via-fuchsia-500 to-pink-400",
    organizer: "Festival Nusantara",
    isFeatured: false,
  },
];

const stats = [
  { label: "Event Aktif", value: "2,400+", icon: Calendar, color: "text-[#6C63FF]", bg: "bg-indigo-50" },
  { label: "Pengguna Aktif", value: "150K+", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Tiket Terjual", value: "1.2M+", icon: Ticket, color: "text-pink-600", bg: "bg-pink-50" },
  { label: "Kota Terjangkau", value: "120+", icon: MapPin, color: "text-amber-600", bg: "bg-amber-50" },
];

const features = [
  {
    icon: Ticket,
    title: "E-Ticket Digital",
    description: "Tiket digital dengan QR Code unik. Mudah disimpan dan digunakan langsung dari smartphone kamu.",
    color: "from-[#6C63FF] to-[#4F46E5]",
  },
  {
    icon: Shield,
    title: "Pembayaran Aman",
    description: "Transaksi terlindungi dengan enkripsi end-to-end. Support QRIS, transfer bank, dan e-wallet.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Desain responsif yang sempurna di semua perangkat. Pesan tiket kapan saja, di mana saja.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: TrendingUp,
    title: "Analitik Real-time",
    description: "Dashboard lengkap untuk organizer. Pantau penjualan dan performa event secara real-time.",
    color: "from-amber-500 to-orange-600",
  },
];

const testimonials = [
  {
    name: "Rafi Ananda",
    role: "Event Organizer",
    avatar: "RA",
    avatarColor: "from-purple-500 to-indigo-600",
    content: "Ventix benar-benar mengubah cara saya mengelola event. Dashboard analytics-nya luar biasa, bisa pantau penjualan tiket secara real-time!",
    rating: 5,
  },
  {
    name: "Sari Dewi",
    role: "Penonton Setia",
    avatar: "SD",
    avatarColor: "from-pink-500 to-rose-600",
    content: "Beli tiket konser jadi sangat mudah! QR code-nya langsung muncul, tinggal tunjukin ke panitia. Gak perlu cetak fisik lagi.",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Peserta Workshop",
    avatar: "BS",
    avatarColor: "from-emerald-500 to-teal-600",
    content: "Proses checkout cepat dan aman. Saya suka fitur seat picker-nya yang interaktif. Recommended banget buat event digital!",
    rating: 5,
  },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F7FA]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#6C63FF]/10 to-[#4F46E5]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/8 to-pink-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#6C63FF]/5 to-transparent blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6C63FF 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Launch badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full px-4 py-2 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-600">
              🎉 Platform tiket event #1 di Indonesia
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#111827] leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Temukan &{" "}
            <span className="gradient-text">Pesan Tiket</span>
            <br />
            Event Terbaik
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
            Dari konser musik hingga seminar teknologi — temukan ribuan event seru di seluruh Indonesia. Pesan tiket dengan mudah, cepat, dan aman.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lg shadow-gray-200/80 border border-gray-100 p-2">
              <div className="flex items-center gap-2 flex-1 pl-3">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Cari event, konser, seminar..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
                />
              </div>
              <Link href={`/events${query ? `?q=${encodeURIComponent(query)}` : ""}`}>
                <Button size="default" className="rounded-xl">
                  <Search className="w-4 h-4 mr-1" />
                  Cari
                </Button>
              </Link>
            </div>

            {/* Popular searches */}
            <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
              <span className="text-xs text-gray-400">Populer:</span>
              {["Java Jazz", "Workshop UI/UX", "Webinar Gratis", "Esports"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs text-gray-500 hover:text-[#6C63FF] bg-white border border-gray-200 hover:border-indigo-200 rounded-full px-3 py-1 transition-all duration-150"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events">
              <Button size="lg" className="rounded-xl gap-2">
                Jelajahi Event
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="rounded-xl gap-2">
                Buat Event Gratis
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mini stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-14">
            {[
              { label: "Event Aktif", value: "2,400+" },
              { label: "Kota", value: "120+" },
              { label: "Pengguna", value: "150K+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-2xl font-bold text-[#111827]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <div className="w-6 h-9 border-2 border-gray-300 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ─────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="flex items-center gap-4">
              <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p
                  className="text-2xl font-bold text-[#111827]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {value}
                </p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Categories Section ────────────────────────────────────────────────────────
function CategoriesSection() {
  return (
    <section className="py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4">Kategori Event</Badge>
          <h2
            className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Semua Jenis Event Ada di Sini
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Dari hiburan hingga edukasi, temukan event yang sesuai minat kamu
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map(({ id, label, icon: Icon, color, bg, text, count }) => (
            <Link
              key={id}
              href={`/events?category=${id}`}
              className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-sm`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#111827] group-hover:text-[#6C63FF] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{count} event</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Events Section ───────────────────────────────────────────────────
function FeaturedEventsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <Badge className="mb-4">🔥 Featured</Badge>
            <h2
              className="text-3xl lg:text-4xl font-bold text-[#111827]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Event Unggulan
            </h2>
            <p className="text-gray-500 mt-2">Event terpilih yang paling banyak diminati</p>
          </div>
          <Link href="/events">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/events">
            <Button variant="outline" className="gap-2">
              Lihat Semua Event
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4">Fitur Unggulan</Badge>
          <h2
            className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Kenapa Pilih Ventix?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Teknologi modern yang membuat pengalaman event kamu lebih menyenangkan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3
                className="font-bold text-[#111827] mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4">Testimoni</Badge>
          <h2
            className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Dipercaya Ribuan Pengguna
          </h2>
          <p className="text-gray-500">Apa kata mereka tentang Ventix</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, avatar, avatarColor, content, rating }) => (
            <div
              key={name}
              className="bg-[#F5F7FA] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">{`"${content}"`}</p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-xs font-bold">{avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {name}
                  </p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#6C63FF] via-[#4F46E5] to-[#7C3AED] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <Heart className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Gratis untuk mulai</span>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Siap Membuat Event{" "}
          <span className="text-yellow-300">Pertama Kamu?</span>
        </h2>

        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Daftarkan diri kamu sekarang dan mulai buat event impianmu. Gratis selamanya untuk event kecil, tanpa batas untuk event besar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button size="xl" variant="white" className="rounded-xl gap-2 font-bold">
              Mulai Gratis Sekarang
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/events">
            <Button
              size="xl"
              className="rounded-xl gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold backdrop-blur-sm shadow-none"
            >
              <Play className="w-4 h-4" />
              Lihat Demo
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Sudah 150,000+ pengguna aktif · Tanpa kartu kredit · Setup dalam 2 menit
        </p>
      </div>
    </section>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedEventsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
