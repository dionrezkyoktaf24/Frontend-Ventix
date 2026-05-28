import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#111827]">Privacy Policy</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Ventix menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda saat menggunakan platform kami.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Informasi yang kami kumpulkan</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Kami mengumpulkan data yang diperlukan untuk memproses pemesanan tiket, mengirimkan e-ticket, dan meningkatkan layanan kami.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Bagaimana kami menggunakan informasi</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Informasi digunakan untuk memproses transaksi, mendukung komunikasi pelanggan, dan meningkatkan pengalaman Anda di platform Ventix.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Keamanan data</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Kami menerapkan langkah-langkah keamanan untuk melindungi data pengguna dan mencegah akses yang tidak sah.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
