'use client';

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(2),
  bio: z.string().min(10),
  category: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
  fee: z.string(),
  location: z.string().min(2),
});

const categories = ["Singer", "Dancer", "DJ", "Speaker"];
const languages = ["English", "Hindi", "Tamil", "Telugu", "Punjabi"];

export default function OnboardingForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log("Artist submitted:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f7ff] via-white to-[#f3f9ff] py-10 px-4">
      <motion.div
        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Artist Onboarding
        </h2>

        {submitted && (
          <div className="mb-4 text-green-600 font-semibold text-center">
            Form submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

          <textarea
            {...register("bio")}
            placeholder="Short Bio"
            rows={3}
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
          />
          {errors.bio && <p className="text-red-500 text-sm">Bio is required</p>}

          {/* Category */}
          <label className="block font-semibold text-purple-700">Categories</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={cat}
                  {...register("category")}
                  className="accent-purple-600"
                />
                {cat}
              </label>
            ))}
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm">Select at least one category</p>
          )}

          {/* Languages */}
          <label className="block font-semibold text-purple-700">Languages</label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <label key={lang} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={lang}
                  {...register("languages")}
                  className="accent-purple-600"
                />
                {lang}
              </label>
            ))}
          </div>
          {errors.languages && (
            <p className="text-red-500 text-sm">Select at least one language</p>
          )}

          {/* Fee */}
          <select
            {...register("fee")}
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Fee Range</option>
            <option value="₹5k - ₹10k">₹5k - ₹10k</option>
            <option value="₹10k - ₹25k">₹10k - ₹25k</option>
            <option value="₹25k - ₹50k">₹25k - ₹50k</option>
          </select>
          {errors.fee && <p className="text-red-500 text-sm">Fee range required</p>}

          <input
            {...register("location")}
            placeholder="Location"
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
          />
          {errors.location && <p className="text-red-500 text-sm">Location is required</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </main>
  );
}
