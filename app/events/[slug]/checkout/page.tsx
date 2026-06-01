import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";
import CheckoutClient from "@/components/events/CheckoutClient";

export default async function CheckoutPage(props: any) {
  const { slug } = await props.params;
  
  let event = null;
  try {
    const res = await fetch(`
    https://event-hub-backend-production-20ee.up.railway.app/events/slug/${slug}`,
    { cache: "no-store"}
  );
  if (res.ok) event = await res.json();
  } catch {
    event = null
  }

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
    <main className="min-h-screen bg-background text-on-background font-body-md">
      <Navbar />
      <CheckoutClient slug={slug} event={event} />
      <Footer />
    </main>
  );
}
