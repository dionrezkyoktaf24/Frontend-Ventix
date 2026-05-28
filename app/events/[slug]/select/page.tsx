import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeatSelectionClient from "@/components/events/SeatSelectionClient";
import mockEvents from "@/lib/mockEvents";

export default async function SelectPage(props: any) {
  const { slug } = await props.params;
  const event = mockEvents.find((e) => e.slug === slug);

  if (!event) {
    return (
      <main>
        <Navbar />
        <div className="max-w-3xl mx-auto p-8">Event not found</div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-on-background font-body-md overflow-x-hidden">
      <Navbar />
      <SeatSelectionClient slug={slug} event={event} />
      <Footer />
    </main>
  );
}
