import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function parseEventDate(input: string | Date | undefined, time?: string) {
  if (!input) return null;
  if (input instanceof Date) return input;

  // try native parse first
  const d = new Date(input as string);
  if (!isNaN(d.getTime())) return d;

  // try ISO-like with space (some APIs may return YYYY-MM-DD)
  const iso = (input as string).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const parsed = new Date(iso + "T" + (time || "00:00") + ":00");
    if (!isNaN(parsed.getTime())) return parsed;
  }

  // try Indonesian localized format like '15 Agustus 2027'
  const monthMap: { [k: string]: number } = {
    januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
    juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11,
  };

  const m = (input as string).toLowerCase().match(/(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})/);
  if (m) {
    const day = parseInt(m[1], 10);
    const monthName = m[2];
    const year = parseInt(m[3], 10);
    const month = monthMap[monthName] ?? NaN;
    if (!isNaN(month)) {
      const [hh = "00", mm = "00"] = (time || "00:00").split(":");
      return new Date(year, month, day, parseInt(hh, 10), parseInt(mm, 10));
    }
  }

  return null;
}
