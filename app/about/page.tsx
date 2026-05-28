import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6C63FF]">Tentang Ventix</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">Sebuah platform event yang dibuat untuk semua orang.</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ventix membantu penyelenggara dan penonton menemukan acara terbaik di seluruh Indonesia. Kami menggabungkan teknologi tiket digital, pengalaman yang mudah, dan dukungan penuh untuk event kecil ataupun besar.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-[#F8FAFC] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Misi kami</h2>
            <p className="mt-4 text-gray-600 leading-7">Menyederhanakan seluruh proses event dari promosi sampai tiket digital, sehingga penyelenggara bisa fokus pada pengalaman dan peserta bisa bersenang-senang tanpa hambatan.</p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-[#F8FAFC] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Visi kami</h2>
            <p className="mt-4 text-gray-600 leading-7">Menjadi pilihan utama masyarakat Indonesia dalam mencari, membeli, dan mengelola tiket event secara online, dengan keamanan dan kenyamanan yang konsisten.</p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">Kenapa pilih Ventix?</h3>
          <ul className="mt-6 space-y-4 text-gray-600">
            <li>• Pembelian tiket cepat dan transparan.</li>
            <li>• Dukungan e-ticket dengan QR Code untuk keamanan dan kenyamanan masuk venue.</li>
            <li>• Laporan penjualan dan manajemen event yang mudah digunakan.</li>
            <li>• Layanan pelanggan lokal untuk membantu setiap langkah Anda.</li>
          </ul>
          <div className="mt-8">
            <Link href="/events" className="inline-flex items-center rounded-full bg-[#6C63FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6C63FF]/20 hover:bg-[#5849e5] transition-colors">
              Jelajahi Event Sekarang
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
