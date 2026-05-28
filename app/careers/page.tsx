import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const openings = [
  { title: "Event Marketing Specialist", location: "Remote / Jakarta", type: "Full-time" },
  { title: "Product Designer", location: "Remote", type: "Full-time" },
  { title: "Customer Success Lead", location: "Jakarta", type: "Part-time" },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6C63FF]">Careers</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">Bergabunglah membangun masa depan penyelenggaraan event digital.</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Kami mencari talenta kreatif dan bersemangat untuk mendukung komunitas event Indonesia. Temukan posisi yang pas untuk Anda.
          </p>
        </div>

        <div className="grid gap-6">
          {openings.map((job) => (
            <div key={job.title} className="rounded-3xl border border-gray-200 bg-[#F8FAFC] p-8 shadow-sm hover:border-[#6C63FF] transition-all duration-200">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{job.title}</h2>
                  <p className="mt-2 text-sm text-gray-600">{job.location} • {job.type}</p>
                </div>
                <Link href="/contact" className="rounded-full bg-[#6C63FF] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#5849e5] transition-colors">
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
