"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrowseEvent from "@/components/events/BrowseEvent";

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <BrowseEvent />
      <Footer />
    </main>
  );
}
