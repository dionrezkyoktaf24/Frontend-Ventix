"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/events/EventCard";
import { api } from "@/lib/api";

const pageSize = 8;

const priceOptions = [
  { label: "All", value: "All" },
  { label: "Gratis", value: "Free" },
  { label: "Di bawah Rp 150K", value: "Under150" },
  { label: "Rp 150K - Rp 300K", value: "150to300" },
  { label: "Di atas Rp 300K", value: "Over300" },
];

export default function BrowseEvent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDate, setActiveDate] = useState("All");
  const [activePrice, setActivePrice] = useState("All");
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        const data = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    console.log("events", events);
  }, [events]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(events.map((event) => event.category)))],
    [events]
  );

  const dateOptions = useMemo(
    () => [
      "ALL",
      ...Array.from(
        new Set(
          events.map((event) =>
            new Date(event.date).toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            }))
        )
      ),
    ],
    [events]
  )

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    console.log("events di filter:", events.length, "query:", q, "category:", activeCategory, "date:", activeDate, "price:", activePrice);
    return events.filter((event) => {
      if (activeCategory !== "All" && event.category !== activeCategory) {
        return false;
      }

      if (activeDate !== "All") {
        const eventMonth = new Date(event.date).toLocaleDateString("id-ID", {
          month: "long",
          year: "numeric",
        });
        if (eventMonth !== activeDate) {
          return false;
        }
      }

      if (activePrice !== "All") {
        if (activePrice === "Free" && event.price !== 0) return false;
        if (activePrice === "Under150" && event.price >= 150000) return false;
        if (activePrice === "150to300" && (event.price < 150000 || event.price > 300000)) return false;
        if (activePrice === "Over300" && event.price <= 300000) return false;
      }

      if (!q) return true;

      return (
        event.title.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory, activeDate, activePrice, events]);

  const sortedEvents = useMemo(() => {
    const sorted = [...filteredEvents];
    if (sortBy === "Newest") {
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    if (sortBy === "Lowest Price") {
      return sorted.sort((a, b) => a.price - b.price);
    }
    return sorted;
  }, [filteredEvents, sortBy]);

  const pageCount = Math.max(1, Math.ceil(sortedEvents.length / pageSize));
  const pageEvents = sortedEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  console.log("filteredEvents", filteredEvents);
  console.log("pageEvents", pageEvents);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeCategory, activeDate, activePrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#111827] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Discover Extraordinary Moments
        </h1>
        <p className="text-gray-500 max-w-2xl">
          From intimate music sessions to global tech conferences. Find the events that matter to you, all in one premium platform.
        </p>
      </div>

      <div className="sticky top-24 z-40 bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl p-4 mb-6 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr] items-center">
          <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full bg-transparent outline-none text-sm text-slate-700"
            />
          </div>

          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={activeDate}
            onChange={(e) => setActiveDate(e.target.value)}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
          >
            {dateOptions.map((dateLabel) => (
              <option key={dateLabel} value={dateLabel}>
                {dateLabel}
              </option>
            ))}
          </select>

          <select
            value={activePrice}
            onChange={(e) => setActivePrice(e.target.value)}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
          >
            {priceOptions.map((price) => (
              <option key={price.value} value={price.value}>
                {price.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full text-sm ${activeCategory === category ? "bg-[#645efb] text-white" : "bg-gray-50 text-gray-600"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none"
            >
              <option>Most Relevant</option>
              <option>Newest</option>
              <option>Lowest Price</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="col-span-full py-20 text-center text-gray-500">Memuat event...</div>
      ) : pageEvents.length === 0 ? (
        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
          <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-6xl text-gray-400">search_off</span>
          </div>
          <h2 className="text-2xl font-semibold mb-2">No events found</h2>
          <p className="text-gray-500 mb-6 max-w-sm">
            We couldn't find any events matching your criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
              setActiveDate("All");
              setActivePrice("All");
              setSortBy("Most Relevant");
            }}
            className="border border-[#4F46E5] text-[#4F46E5] px-6 py-2 rounded-full"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        pageEvents.map((event) => <EventCard key={event.id} {...event} />)
      )}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50"
        >
          ◀
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg ${currentPage === page ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-500"}`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setCurrentPage((value) => Math.min(pageCount, value + 1))}
          disabled={currentPage === pageCount}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
