import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const posts = [
  {
    title: "Panduan Memulai Event Pertama Anda",
    description: "Langkah demi langkah untuk mempromosikan event, menjual tiket, dan meningkatkan kehadiran.",
  },
  {
    title: "Tren Event Digital 2025",
    description: "Insight tentang apa yang dicari penonton dan bagaimana menyusun pengalaman acara yang menarik.",
  },
  {
    title: "5 Tips Manajemen Tiket Aman",
    description: "Cara melindungi acara Anda dengan e-ticket dan sistem pembayaran digital yang efektif.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6C63FF]">Blog</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">Cerita, ide, dan inspirasi event untuk Anda.</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Baca artikel terbaru dari Ventix untuk memperdalam strategi event, pengalaman pengunjung, dan teknologi tiket digital.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="rounded-3xl border border-gray-200 bg-[#F8FAFC] p-8 shadow-sm hover:border-[#6C63FF] hover:shadow-lg transition-all">
              <h2 className="text-2xl font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-4 text-gray-600 leading-7">{post.description}</p>
              <Link href="/contact" className="mt-6 inline-flex items-center text-sm font-semibold text-[#6C63FF] hover:text-[#4a4fe5]">
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
