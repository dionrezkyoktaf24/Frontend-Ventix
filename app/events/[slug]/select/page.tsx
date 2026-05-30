import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeatSelectionClient from "@/components/events/SeatSelectionClient";

export default async function SelectPage(props: any) {
  const { slug } = await props.params;
  const res = await fetch(`
    https://event-hub-backend-production-20ee.up.railway.app/events/slug/${slug}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    return (
      <main>
        <Navbar />
        <div className="max-w-3xl mx-auto p-8">Event not found</div>
        <Footer />
      </main>
    );
  }

  const event = await res.json();

  return (
    <main className="min-h-screen bg-background text-on-background font-body-md overflow-x-hidden">
      <Navbar />
      <SeatSelectionClient slug={slug} event={event} />
      <Footer />
    </main>
  );
}
