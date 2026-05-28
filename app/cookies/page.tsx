import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#111827]">Cookie Policy</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Ventix menggunakan cookie untuk meningkatkan pengalaman pengguna dan memberikan layanan yang lebih sesuai.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Jenis cookies</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Kami menggunakan cookies fungsional, analitik, dan preferensi untuk membuat pengalaman Anda lebih cepat dan personal.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Penggunaan data</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Cookie membantu kami memahami cara penggunaan platform dan memelihara sesi pengguna secara aman.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Kontrol cookie</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Anda dapat mengatur preferensi cookie melalui pengaturan browser dan memilih untuk menonaktifkan cookie tertentu sesuai kebutuhan.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
