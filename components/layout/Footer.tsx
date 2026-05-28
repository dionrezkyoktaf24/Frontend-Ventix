import Link from "next/link";
import Image from "next/image";
import { Ticket, Mail, MapPin } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Browse Events", href: "/events" },
    { label: "Buat Event", href: "/admin/events/create" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "E-Ticket", href: "/tickets" },
  ],
  categories: [
    { label: "Konser & Musik", href: "/events?category=konser" },
    { label: "Seminar & Workshop", href: "/events?category=seminar" },
    { label: "Festival", href: "/events?category=festival" },
    { label: "Olahraga", href: "/events?category=olahraga" },
    { label: "Webinar", href: "/events?category=webinar" },
  ],
  company: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Karir", href: "/careers" },
    { label: "Kontak", href: "/contact" },
  ],
};

// Inline SVG social icons (brand icons removed from lucide-react)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const socials = [
  { Icon: InstagramIcon, href: "https://instagram.com/ventix", label: "Instagram" },
  { Icon: TwitterIcon, href: "https://twitter.com/ventix", label: "Twitter / X" },
  { Icon: YoutubeIcon, href: "https://youtube.com/ventix", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 flex items-center justify-center">
                  <Image src="/ventix-mark.png" alt="Ventix" width={28} height={28} />
                </div>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Ventix
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-xs">
              Platform digital terdepan untuk pemesanan dan pengelolaan tiket event. Dari konser hingga seminar, kami hadir untuk kamu.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-[#6C63FF] text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-[#6C63FF]" />
                <span>customersupport@ventix.id</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#6C63FF]" />
                <span>Kota Malang, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-white font-semibold text-sm mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Produk
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#6C63FF] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-white font-semibold text-sm mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Kategori
            </h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#6C63FF] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-white font-semibold text-sm mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Perusahaan
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#6C63FF] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Ventix. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-gray-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
