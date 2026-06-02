"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function EventDetailClient({ event }: { event: any }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleOrderClick = () => {
    if (!user) {
      router.push(`/register?next=${encodeURIComponent(`/events/${event.slug}/select`)}`);
      return;
    }
    router.push(`/events/${event.slug}/select`);
  };
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!event) return;
    const { parseEventDate } = require("@/lib/utils");
    const dt = parseEventDate(event.date, event.time || "19:00");
    if (!dt) return;
    const target = dt.getTime();

    const tick = () => {
      const now = Date.now();
      const distance = target - now;
      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setStarted(true);
        return;
      }
      setStarted(false);
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event]);

  if (!event) return null;

  const tags = Array.isArray(event.tags) ? event.tags : [];
  const lineup = Array.isArray(event.lineup) ? event.lineup : [];

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
      {/* Hero */}
      <section className="relative h-125 w-full rounded-xl overflow-hidden mb-stack-lg">
        <img src={event.image} alt="Event Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient flex flex-col justify-end p-stack-lg">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {tags.map((t: string) => (
              <span key={t} className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-sm text-label-sm">
                {t}
              </span>
            ))}
            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full font-label-sm text-label-sm">EXCLUSIVE</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-white mb-2">{event.title}</h1>
          <p className="text-white/80 font-body-lg text-body-lg max-w-2xl">Experience an immersive journey through sound and light featuring world-class digital artists and performers.</p>
        </div>
      </section>

      {/* Countdown */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-primary">{started ? "Event sedang berlangsung" : "Countdown to event"}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-stack-xl">
        <div className="bg-surface-container-low p-6 rounded-lg text-center premium-shadow">
          <div className="font-display-lg text-display-lg text-primary">{timeLeft.days}</div>
          <div className="font-label-md text-label-md text-on-surface-variant">DAYS</div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-lg text-center premium-shadow">
          <div className="font-display-lg text-display-lg text-primary">{timeLeft.hours}</div>
          <div className="font-label-md text-label-md text-on-surface-variant">HOURS</div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-lg text-center premium-shadow">
          <div className="font-display-lg text-display-lg text-primary">{timeLeft.minutes}</div>
          <div className="font-label-md text-label-md text-on-surface-variant">MINUTES</div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-lg text-center premium-shadow">
          <div className="font-display-lg text-display-lg text-primary">{timeLeft.seconds}</div>
          <div className="font-label-md text-label-md text-on-surface-variant">SECONDS</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left */}
        <div className="lg:col-span-8 space-y-stack-xl">
          <section>
            <h2 className="font-headline-lg text-headline-lg mb-stack-md text-primary">About This Event</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed font-body-md text-body-md">
              <p>Join us for an unforgettable evening where classical orchestration meets cutting-edge electronic synthesis. Starlight Symphony is more than just a concert; it's a sensory exploration designed to push the boundaries of modern music performance.</p>
              <p>This year's edition features a bespoke lighting rig specifically engineered for the venue, synchronized to every beat. Guests will be treated to a 4-hour continuous performance that evolves from ambient soundscapes to high-energy dance anthems.</p>
            </div>
          </section>

          <section>
            <h2 className="font-headline-lg text-headline-lg mb-stack-md text-primary">Event Lineup</h2>
            <div className="space-y-4">
              {lineup.map((l: any) => (
                <div key={l.time} className="flex items-center gap-6 p-4 rounded-lg bg-white border border-outline-variant/30 hover:border-primary/30 transition-all premium-shadow">
                  <div className="text-primary font-bold font-headline-md text-headline-md w-16">{l.time}</div>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">{l.title}</h4>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-headline-lg text-headline-lg mb-stack-md text-primary">Location</h2>
            <div className="w-full h-80 rounded-xl overflow-hidden bg-surface-container-high relative group">
              <img alt="Map View" className="w-full h-full object-cover filter grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxs5yF0lkGA6O005-iGJOWqnVQ-nUTtDoyJkzYvF5DDoTdubw1Rel1F0CU2iH_QjEq0H7S-3O9b85Ab2OSOdcYlH3U1yT_GuuVAAPEkWoxOrH-Adxheb2-chv9zogvb4siNRPlGySBVlWkWVXV-P7Q1ABhmAG4Nw8JZ_8s2Mmv5WJ-o5_5nemp8wkuORPmiFY7oWF2-4yMRMVjfFV1NgjGqdlq6WtaooQaRxrKpDSEf8bIjym_QnC95nC3Okh3ZDsZSs6FQhzYAv6-" />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-all"></div>
              <div className="absolute bottom-6 left-6 glass-card p-4 rounded-lg shadow-xl">
                <p className="font-label-md text-label-md text-on-surface">{event.location}</p>
                <p className="text-on-surface-variant font-body-sm text-body-sm">Jl. Sunter Permai Raya, Jakarta Utara</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 sticky top-28">
          <div className="glass-card p-8 rounded-xl premium-shadow space-y-6">
            <div>
              <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">TICKET STARTS FROM</span>
              <div className="flex items-baseline gap-2">
                <span className="text-primary font-display-lg text-display-lg">{formatCurrency(event.price)}</span>
                <span className="text-on-surface-variant font-body-sm text-body-sm">/ pax</span>
              </div>
            </div>

            <hr className="border-outline-variant/30" />

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Date</p>
                  <p className="text-on-surface-variant font-body-sm text-body-sm">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Time</p>
                  <p className="text-on-surface-variant font-body-sm text-body-sm">{event.time} WIB</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">apartment</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Venue</p>
                  <p className="text-on-surface-variant font-body-sm text-body-sm">{event.venue}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOrderClick}
              className="w-full inline-flex justify-center bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md hover:bg-secondary transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              Pesan Tiket
            </button>

            <div className="text-center">
              <p className="text-on-surface-variant font-body-sm text-body-sm">Limited seats available. Secure yours now.</p>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </div>

          <div className="mt-stack-md p-6 bg-surface-container-low rounded-xl flex items-center gap-4">
            <img alt="Organizer" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7UQJvmt8bFwPc0NOcuvg4YY87PpuCcBK-b1Vc00NtQ95R_8OwQyS-jyVSax-V-b9Jc-khsqfI4C50ZnchLtAcr-Y1rmgIi1sIkY-d4kDGqeHwlWTzsdg-b-CcGcAt-6I4M_T0IPcsrkw2sJlB2wlTZ-OZ2jvNzY53f3M3vAlROXH_6dCYgJ6X-IGJuux5yoVXtpA4QiHZmb3Rx_N7BkDVvqurfyLFFXlfGPD_fCYeVi-C-bVOyWN2lu3-hFGioZTBBLEu_f7D5PF9" />
            <div>
              <p className="text-on-surface-variant font-label-sm text-label-sm">Organized by</p>
              <p className="font-label-md text-label-md text-on-surface">{event.organizer}</p>
            </div>
            <button className="ml-auto text-primary">
              <span className="material-symbols-outlined">verified</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
