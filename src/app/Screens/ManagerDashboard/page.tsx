'use client';
import data from "@/data/artists.json";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

export default function ManagerDashboard() {
  const [isOpen, setOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);

  const openModal = (artist: any) => {
    setSelectedArtist(artist);
    setOpen(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdfbff] via-white to-[#f3f9ff] p-4 sm:p-6 lg:p-8">
      <motion.div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-xl sm:text-2xl font-bold text-purple-700 text-center mb-4 sm:mb-6">
          Manager Dashboard
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
              <tr>
                {["Name","Category","Location","Fee","Action"].map((h, i) => (
                  <th key={i} className="px-2 sm:px-4 py-2 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((artist, idx) => (
                <tr key={artist.id} className={`hover:bg-purple-50 ${idx % 2 ? "bg-gray-50" : "bg-white"}`}>
                  <td className="px-2 sm:px-4 py-2">{artist.name}</td>
                  <td className="px-2 sm:px-4 py-2">{artist.category}</td>
                  <td className="px-2 sm:px-4 py-2">{artist.location}</td>
                  <td className="px-2 sm:px-4 py-2">{artist.price}</td>
                  <td className="px-2 sm:px-4 py-2">
                    <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                      onClick={() => openModal(artist)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
        <motion.div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4 sm:p-6"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <Dialog.Title className="text-lg sm:text-xl font-semibold text-purple-700 mb-4">
            {selectedArtist?.name} Details
          </Dialog.Title>
          <div className="space-y-2 text-sm sm:text-base">
            <p><strong>Category:</strong> {selectedArtist?.category}</p>
            <p><strong>Location:</strong> {selectedArtist?.location}</p>
            <p><strong>Fee:</strong> {selectedArtist?.price}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400">
              Close
            </button>
          </div>
        </motion.div>
      </Dialog>
    </main>
  );
}
