import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-[#F8FAFC] p-10 shadow-sm">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#111827]">Hubungi Kami</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Tim Ventix selalu siap membantu. Kirim pertanyaan Anda, laporkan masalah, atau diskusikan event Anda bersama kami.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-slate-900">Email Support</h2>
              <p className="mt-3 text-sm text-gray-600">customersupport@ventix.id</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-slate-900">Telepon</h2>
              <p className="mt-3 text-sm text-gray-600">+62 812-3414-1811</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-slate-900">Alamat</h2>
              <p className="mt-3 text-sm text-gray-600">Malang, Jawa Timur, Indonesia</p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-slate-900">Butuh bantuan cepat?</h2>
            <p className="mt-3 text-gray-600 leading-7">Kirim email ke tim support kami dan kami akan merespons secepat mungkin.</p>
            <a href="mailto:customersupport@ventix.id" className="mt-6 inline-flex rounded-full bg-[#6C63FF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5849e5] transition-colors">
              Kirim Email</a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
