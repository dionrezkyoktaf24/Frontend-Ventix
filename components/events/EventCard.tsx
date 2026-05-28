import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";

interface EventCardProps {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryColor?: "default" | "purple" | "pink" | "blue" | "orange" | "success";
  date: string;
  location: string;
  price: number;
  availableSeats?: number;
  totalSeats?: number;
  imageColor?: string;
  organizer?: string;
  isFeatured?: boolean;
}

export default function EventCard({
  slug,
  title,
  category,
  categoryColor = "default",
  date,
  location,
  price,
  availableSeats,
  totalSeats,
  imageColor = "from-indigo-500 to-purple-600",
  organizer,
  isFeatured,
}: EventCardProps) {
  const seatNumber = Number(availableSeats);
  const totalNumber = Number(totalSeats);
  const hasSeatInfo = Number.isFinite(seatNumber) && Number.isFinite(totalNumber) && totalNumber > 0;
  const soldPercent = hasSeatInfo ? Math.round(((totalNumber - seatNumber) / totalNumber) * 100) : 0;
  const isAlmostFull = hasSeatInfo ? seatNumber < totalNumber * 0.2 : false;

  return (
    <Link href={`/events/${slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
        {/* Image / Banner */}
        <div className={`relative h-48 bg-gradient-to-br ${imageColor} overflow-hidden`}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-24 h-24 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-xl" />
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={categoryColor} className="shadow-sm">
              {category}
            </Badge>
          </div>

          {/* Featured tag */}
          {isFeatured && (
            <div className="absolute top-3 right-3">
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                ⭐ Featured
              </span>
            </div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white font-bold text-lg leading-tight line-clamp-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {title}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Meta info */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-3.5 h-3.5 text-[#6C63FF] flex-shrink-0" />
              <span className="truncate">{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-[#6C63FF] flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Users className="w-3.5 h-3.5 text-[#6C63FF] flex-shrink-0" />
              <span>
                {hasSeatInfo ? (
                  <>
                    {seatNumber.toLocaleString()} kursi tersedia
                    {isAlmostFull && (
                      <span className="ml-1 text-orange-500 font-medium">· Hampir penuh!</span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400">Ketersediaan kursi belum tersedia</span>
                )}
              </span>
            </div>
          </div>

          {/* Seat progress bar */}
          <div className="mb-4">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isAlmostFull
                    ? "bg-gradient-to-r from-orange-400 to-red-400"
                    : "bg-gradient-to-r from-[#6C63FF] to-[#4F46E5]"
                }`}
                style={{ width: `${soldPercent}%` }}
              />
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div>
              {price === 0 ? (
                <span className="text-emerald-600 font-bold text-base">Gratis</span>
              ) : (
                <div>
                  <span className="text-xs text-gray-400 block">Mulai dari</span>
                  <span className="text-[#4F46E5] font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {formatCurrency(price)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-[#6C63FF] text-sm font-semibold group-hover:gap-2 transition-all duration-200">
              <span>Detail</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
