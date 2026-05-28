"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

type Seat = {
  id: string;
  category: string;
  price: number;
  occupied: boolean;
};

type SelectedSeat = Omit<Seat, "occupied">;

const STORAGE_KEY_PREFIX = "ventix:selectedSeats:";

function loadSelectedSeats(slug: string): SelectedSeat[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(`${STORAGE_KEY_PREFIX}${slug}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSelectedSeats(slug: string, seats: SelectedSeat[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${STORAGE_KEY_PREFIX}${slug}`, JSON.stringify(seats));
}

export default function SeatSelectionClient({ slug, event }: { slug: string; event: any }) {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [hoverInfo, setHoverInfo] = useState<{ id: string; price: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;
    setSelectedSeats(loadSelectedSeats(slug));
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    saveSelectedSeats(slug, selectedSeats);
  }, [slug, selectedSeats]);

  if (!event) return <div className="p-8">Event not found</div>;

  const seats: Seat[] = useMemo(
    () => [
      { id: "A1", category: "VIP", price: 2500000, occupied: false },
      { id: "A2", category: "VIP", price: 2500000, occupied: false },
      { id: "A3", category: "VIP", price: 2500000, occupied: true },
      { id: "A4", category: "VIP", price: 2500000, occupied: false },
      { id: "B1", category: "Regular", price: 1200000, occupied: false },
      { id: "B2", category: "Regular", price: 1200000, occupied: false },
      { id: "B3", category: "Regular", price: 1200000, occupied: false },
      { id: "B4", category: "Regular", price: 1200000, occupied: true },
      { id: "C1", category: "Economy", price: 750000, occupied: false },
      { id: "C2", category: "Economy", price: 750000, occupied: false },
      { id: "C3", category: "Economy", price: 750000, occupied: false },
      { id: "C4", category: "Economy", price: 750000, occupied: true },
    ],
    []
  );

  const toggleSeat = (seat: Seat) => {
    if (seat.occupied) return;
    setSelectedSeats((current) => {
      const exists = current.find((item) => item.id === seat.id);
      if (exists) {
        return current.filter((item) => item.id !== seat.id);
      }
      return [...current, { id: seat.id, category: seat.category, price: seat.price }];
    });
  };

  const removeSeat = (id: string) => {
    setSelectedSeats((current) => current.filter((seat) => seat.id !== id));
  };

  const total = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);

  return (
    <div className="max-w-container-max mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="rounded-[32px] border border-slate-200/60 bg-white p-8 shadow-[0_50px_120px_-70px_rgba(59,130,246,0.45)]">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Select Your Seats</h1>
                <p className="mt-2 text-sm text-slate-500">{event.title} • {new Date(event.date).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 p-3 text-sm text-slate-600 shadow-sm">
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
                  <span className="h-3.5 w-3.5 rounded-full bg-emerald-500" />
                  Available
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
                  <span className="h-3.5 w-3.5 rounded-full bg-rose-500" />
                  Occupied
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
                  <span className="h-3.5 w-3.5 rounded-full bg-amber-400" />
                  Selected
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200/70 bg-slate-50 p-6 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.2)]">
              <div className="mb-6 flex items-center justify-center rounded-[30px] bg-white/80 py-4 shadow-sm">
                <span className="text-sm tracking-[0.4em] uppercase text-slate-500">STAGE</span>
              </div>

              <div className="space-y-4">
                {['A', 'B', 'C'].map((row) => (
                  <div key={row} className="flex justify-center gap-4">
                    {seats.filter((seat) => seat.id.startsWith(row)).map((seat) => {
                      const isSelected = selectedSeats.some((item) => item.id === seat.id);
                      return (
                        <button
                          key={seat.id}
                          type="button"
                          onMouseEnter={() => setHoverInfo({ id: seat.id, price: seat.price })}
                          onMouseLeave={() => setHoverInfo(null)}
                          onClick={() => toggleSeat(seat)}
                          disabled={seat.occupied}
                          className={`relative flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-3xl border text-xs font-semibold transition-all duration-200 ${
                            seat.occupied
                              ? 'cursor-not-allowed border-rose-200 bg-rose-100 text-rose-700'
                              : isSelected
                              ? 'border-amber-300 bg-amber-400 text-slate-950 shadow-[0_20px_40px_-20px_rgba(245,158,11,0.8)]'
                              : 'border-slate-200 bg-emerald-100 text-slate-900 hover:-translate-y-1 hover:bg-emerald-200'
                          }`}
                        >
                          <span>{seat.id}</span>
                          <span className="text-[10px] text-slate-500">{seat.category}</span>
                          {seat.occupied && <span className="absolute -top-2 right-0 rounded-full bg-rose-500 px-1 text-[10px] text-white">X</span>}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-slate-700">
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">VIP</div>
                  <div className="font-semibold">{formatCurrency(2500000)}</div>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Regular</div>
                  <div className="font-semibold">{formatCurrency(1200000)}</div>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Economy</div>
                  <div className="font-semibold">{formatCurrency(750000)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 sticky top-24">
          <div className="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.18)]">
            <div className="mb-6 rounded-3xl bg-slate-50 p-5 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Your Selection</h3>
              <p className="mt-2 text-sm text-slate-500">Tap a seat to start booking</p>
            </div>

            <div className="space-y-4 mb-6">
              {selectedSeats.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-400">
                  <span className="material-symbols-outlined text-4xl">event_seat</span>
                  <p className="mt-4 text-sm">Choose a seat to continue</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="rounded-3xl border border-slate-200 p-4 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-base font-semibold">{seat.id}</div>
                          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{seat.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900">{formatCurrency(seat.price)}</div>
                          <button className="mt-2 text-xs text-rose-600 hover:text-rose-700" onClick={() => removeSeat(seat.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                <span>Total Amount</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <button
                type="button"
                disabled={selectedSeats.length === 0}
                onClick={() => router.push(`/events/${slug}/checkout`)}
                className={`w-full rounded-3xl px-5 py-4 text-sm font-semibold transition-all duration-200 ${
                  selectedSeats.length === 0
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-violet-600 text-white shadow-xl shadow-violet-500/20 hover:bg-violet-700 active:scale-[0.98]'
                }`}
              >
                {selectedSeats.length === 0 ? 'Select seats first' : 'Proceed to Payment →'}
              </button>
            </div>

            <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">
              <p className="font-medium text-slate-900">Seats reserved for 15:00 minutes.</p>
              <p className="mt-2">By proceeding, you agree to our booking policies and terms of service.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
