'use client';

import data from "@/data/artists.json";
import { useCategory } from "../../context/CategoryContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ArtistCard from "@/app/components/ArtistCard";
import Quotation from "@/app/components/Quotation";
import Filters, { filterByPriceRange } from "@/app/components/Filters";

type Artist = {
  id: number;
  name: string;
  category: string;
  price: string;
  location: string;
  url?: string; 
};


export default function ArtistListing() {
  const { category, setCategory } = useCategory();
  const urlCategory = useSearchParams().get("category");
  const [loc, setLoc] = useState("All");
  const [price, setPrice] = useState("All");
const [selArt, setSelArt] = useState<Artist | null>(null);
  const [isOpen, setOpen] = useState(false);

  // Sync category from URL
  useEffect(() => {
    if (urlCategory && !category) setCategory(urlCategory);
  }, [urlCategory, category, setCategory]);

  // Filter artists based on category, location, and price range
  const filtered = data.filter((a) =>
    (!category || a.category.toLowerCase() === category.toLowerCase()) &&
    (loc === "All" || a.location === loc) &&
    filterByPriceRange(a.price, price)
  );

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#f5f5fa] via-white to-[#f0f9ff]">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-700 mb-6 sm:mb-8">
        {category ? `${category}s` : "All Artists"}
      </h2>

      <Filters
        data={data}
        selectedLocation={loc}
        selectedPrice={price}
        setSelectedLocation={setLoc}
        setSelectedPrice={setPrice}
        resetFilters={() => {
          setLoc("All");
          setPrice("All");
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((artist, i) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            index={i}
            onQuoteClick={(a) => {
              setSelArt(a);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <Quotation
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        selectedArtist={selArt}
      />
    </main>
  );
}
