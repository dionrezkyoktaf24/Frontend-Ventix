import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// Inter font (sudah ada)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Plus Jakarta Sans font (untuk headline, display)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ventix - Platform Tiket Event Digital",
  description:
    "Ventix adalah platform digital terdepan untuk pemesanan dan pengelolaan tiket event. Konser, seminar, workshop, festival, dan lebih banyak lagi.",
  keywords: ["tiket event", "konser", "seminar", "workshop", "festival", "ventix"],
  authors: [{ name: "Ventix Team" }],
  openGraph: {
    title: "Ventix - Platform Tiket Event Digital",
    description: "Temukan dan pesan tiket event terbaik di Ventix",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Preconnect untuk Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Material Symbols (ikon Google) - WAJIB untuk desain register */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        
        {/* Fallback link ke Plus Jakarta Sans via CDN (opsional, karena sudah pakai next/font) */}
        {/* Sebenarnya tidak perlu karena sudah diimport via next/font, namun biar aman */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}