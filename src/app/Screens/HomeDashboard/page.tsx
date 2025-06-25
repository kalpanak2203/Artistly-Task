'use client';
import { motion } from "framer-motion";
import CategoryCard from "@/app/components/CategoryCard";
import { useCategory } from "@/app/context/CategoryContext";

export default function HomeDashboard() {
  const categories = ["Singer", "Dancer", "DJ", "Speaker"];
  const { setCategory } = useCategory();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f9f5ff] via-white to-[#f5faff] p-4 sm:p-6 lg:p-8">
      <header className="text-center py-8 sm:py-12">
        <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-700"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Welcome to Artistly.com
        </motion.h1>
        <motion.p className="mt-2 text-gray-600 text-sm sm:text-base"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Connect with top artists for your event right away !!
        </motion.p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {categories.map((cat, i) => (
          <CategoryCard key={cat} category={cat} index={i} onSelect={setCategory} />
        ))}
      </section>
    </main>
  );
}
