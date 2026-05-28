import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventDetailClient from "@/components/events/EventDetailClient";
import mockEvents from "@/lib/mockEvents";

export default async function EventDetailPage(props: any) {
  const params = props.params ? await props.params : null;
  const slug = params?.slug ?? null;
  const event = mockEvents.find((e) => e.slug === slug);

  if (!event) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="max-w-3xl mx-auto p-8">Event not found.</div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-on-background font-body-md overflow-x-hidden">
      <Navbar />
      <EventDetailClient event={event} />
      <Footer />
    </main>
  );
}
