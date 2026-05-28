import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#111827]">Terms of Service</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Dengan menggunakan Ventix, Anda menyetujui syarat dan ketentuan berikut.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Akses dan penggunaan</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Anda menerima bahwa semua aktivitas di akun Anda untuk layanan Ventix adalah tanggung jawab Anda.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Pembayaran dan pembatalan</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Semua transaksi tunduk pada kebijakan pembayaran, refund, dan syarat event yang ditentukan oleh penyelenggara.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Perubahan layanan</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Ventix dapat memperbarui layanan atau syarat kapan saja. Perubahan akan diumumkan melalui platform sesuai kebijakan kami.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
