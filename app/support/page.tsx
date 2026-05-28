import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const faqs = [
  {
    question: "Bagaimana cara memesan tiket?",
    answer: "Pilih event, tentukan jumlah tiket, lalu lanjutkan ke halaman checkout untuk menyelesaikan pembayaran.",
  },
  {
    question: "Apakah saya menerima e-ticket setelah pembayaran?",
    answer: "Ya, e-ticket akan tersedia segera setelah proses checkout selesai dan dapat dilihat di halaman tiket Anda.",
  },
  {
    question: "Bagaimana jika event dibatalkan?",
    answer: "Tim kami akan menghubungi Anda dan mengatur proses refund sesuai kebijakan event.",
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6C63FF]">Support Center</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">Pertanyaan yang sering diajukan</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Temukan jawaban cepat untuk pertanyaan umum tentang pemesanan tiket, e-ticket, dan dukungan event.
          </p>
        </div>

        <div className="mt-14 grid gap-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-gray-200 bg-[#F8FAFC] p-8 shadow-sm">
              <p className="text-lg font-semibold text-slate-900">{faq.question}</p>
              <p className="mt-3 text-gray-600 leading-7">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Tidak menemukan jawaban?</h2>
          <p className="mt-4 text-gray-600 leading-7">Silakan hubungi tim kami untuk bantuan lebih lanjut.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-[#6C63FF] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#5849e5] transition-colors">
              Kontak Support
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
