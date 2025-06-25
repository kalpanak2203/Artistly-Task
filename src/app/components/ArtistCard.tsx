'use client';
import Image from "next/image";
import { motion } from "framer-motion";

interface ArtistCardProps {
  artist: { id:number; name:string; category:string; location:string; price:string; url?:string };
  index: number;
  onQuoteClick: (artist:any) => void;
}
export default function ArtistCard({ artist, index, onQuoteClick }: ArtistCardProps) {
  return (
    <motion.div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
      initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:index*0.05 }}
    >
      <div className="relative w-full h-48 sm:h-56">
        <Image src={artist.url||"/default.jpg"} alt={artist.name} layout="fill" objectFit="cover" className="w-full h-full" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{artist.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{artist.category}</p>
        <p className="text-sm text-gray-600">📍 {artist.location}</p>
        <p className="text-sm text-gray-600 mt-auto">💰 {artist.price}</p>
        <button onClick={() => onQuoteClick(artist)}
          className="mt-3 self-start bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform"
        >
          Ask for Quote
        </button>
      </div>
    </motion.div>
  );
}
