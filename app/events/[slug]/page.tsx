import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventDetailClient from "@/components/events/EventDetailClient";

export default async function EventDetailPage(props: any) {
  const params = props.params ? await props.params : null;
  const slug = params?.slug;
  const res = await fetch(`
    https://event-hub-backend-production-20ee.up.railway.app/events/slug/${slug}`,
    {
      cache: "no-store",
    }
  ) 
  
  if (!res.ok) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="max-w-3xl mx-auto p-8">Event not found.</div>
        <Footer />
      </main>
    );
  }

  const event = await res.json();

  return (
    <main className="min-h-screen bg-background text-on-background font-body-md overflow-x-hidden">
      <Navbar />
      <EventDetailClient event={event} />
      <Footer />
    </main>
  );
}
