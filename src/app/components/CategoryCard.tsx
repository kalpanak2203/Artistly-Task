'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Props {
  category: string;
  index: number;
  onSelect: (category: string) => void;
}

export default function CategoryCard({ category, index, onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <Card
        onClick={() => onSelect(category)}
        className="text-center hover:shadow-xl hover:scale-105 transition-transform bg-white rounded-2xl border-2 border-purple-100"
      >
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-purple-700">{category}</h2>
          <Link href={`/Screens/ArtistListing?category=${encodeURIComponent(category)}`}>
            <p className="text-pink-500 mt-3 hover:underline">Explore {category}s</p>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
