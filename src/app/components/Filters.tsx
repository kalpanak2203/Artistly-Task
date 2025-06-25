'use client';

import { useMemo } from "react";

interface FiltersProps {
  data: any[];
  selectedLocation: string;
  selectedPrice: string;
  setSelectedLocation: (loc: string) => void;
  setSelectedPrice: (price: string) => void;
  resetFilters: () => void;
}

function parsePriceRange(priceStr: string): number[] {
  const cleaned = priceStr.replace(/[₹$,]/g, "").toUpperCase();
  const [min, max] = cleaned.split("-").map((val) => {
    if (!val) return 0;
    if (val.includes("L")) return parseFloat(val) * 100000;
    if (val.includes("K")) return parseFloat(val) * 1000;
    return parseFloat(val);
  });

  return [min || 0, max || min || 0];
}

export default function Filters({
  data,
  selectedLocation,
  selectedPrice,
  setSelectedLocation,
  setSelectedPrice,
  resetFilters,
}: FiltersProps) {
  // to Extract unique locations
  const locations = useMemo(() => {
    const unique = [...new Set(data.map((a) => a.location))].sort();
    return ["All", ...unique];
  }, [data]);

  const priceRanges = [
    "All",
    "Under ₹10L",
    "₹10L - ₹30L",
    "₹30L - ₹60L",
    "Above ₹60L",
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6 sm:mb-8">
      {/* Location Dropdown */}
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="min-w-[140px] flex-1 sm:flex-none px-3 py-2 rounded-lg bg-white border border-purple-200 shadow-sm focus:ring-purple-400"
      >
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {/* Price Range Dropdown */}
      <select
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className="min-w-[140px] flex-1 sm:flex-none px-3 py-2 rounded-lg bg-white border border-pink-200 shadow-sm focus:ring-pink-400"
      >
        {priceRanges.map((pr) => (
          <option key={pr} value={pr}>
            {pr}
          </option>
        ))}
      </select>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm shadow hover:scale-105 transition-transform"
      >
        Reset Filters
      </button>
    </div>
  );
}

export function filterByPriceRange(artistPrice: string, selectedPrice: string): boolean {
  if (selectedPrice === "All") return true;

  const [min, max] = parsePriceRange(artistPrice);
  switch (selectedPrice) {
    case "Under ₹10L":
      return min < 1000000;
    case "₹10L - ₹30L":
      return min >= 1000000 && min <= 3000000;
    case "₹30L - ₹60L":
      return min > 3000000 && min <= 6000000;
    case "Above ₹60L":
      return min > 6000000;
    default:
      return true;
  }
}
