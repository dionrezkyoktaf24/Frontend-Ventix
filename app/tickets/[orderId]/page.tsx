import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ETicketClient from "@/components/ticket/ETicketClient";

export default async function TicketPage(props: any) {
  const { orderId } = await props.params;

  return (
    <main className="min-h-screen bg-background text-on-background font-body-md">
      <Navbar />
      {/* @ts-ignore */}
      <ETicketClient orderId={orderId} />
      <Footer />
    </main>
  );
}
