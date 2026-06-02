import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingPaymentClient from "@/components/ticket/BookingPaymentClient";

export default async function BookingPayPage(props: any) {
  const { orderId } = await props.params;

  return (
    <main className="min-h-screen bg-background text-on-background font-body-md">
      <Navbar />
      {/* @ts-ignore */}
      <BookingPaymentClient orderId={orderId} />
      <Footer />
    </main>
  );
}
