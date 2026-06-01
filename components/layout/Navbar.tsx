"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Ticket, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext"

const navLinks = [
  { label: "Events", href: "/events" },
  { label: "Kategori", href: "/events?tab=category" },
  { label: "Tentang", href: "/about" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 flex items-center justify-center">
              <Image src="/ventix-mark.png" alt="Ventix" width={28} height={28} />
            </div>
            <span
              className="text-xl font-bold text-[#111827]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Ventix
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#6C63FF] rounded-lg hover:bg-indigo-50 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link href={user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
                  <Button variant="ghost" size="sm">{user.name}</Button>
                </Link>
                <Button size="sm" variant="secondary" onClick={logout}>
                  Keluar
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600">Masuk</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Daftar Gratis</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white rounded-b-2xl shadow-lg">
            <div className="flex flex-col gap-1 px-2 pb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-[#6C63FF] hover:bg-indigo-50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 px-4 pt-3 border-t border-gray-100">
              {user ? (
                <>
                  <Link href={user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"} onClick={() => setIsOpen(false)}>
                    <Button variant="secondary" className="w-full">{user.name}</Button>
                  </Link>
                  <Button className="w-full" onClick={() => { logout(); setIsOpen(false); }}>
                    Keluar
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="secondary" className="w-full">Masuk</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Daftar Gratis</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
