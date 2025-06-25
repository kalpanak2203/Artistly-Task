'use client';
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

interface QuotationProps {
  isOpen:boolean; onClose:()=>void; onSubmit:(e:React.FormEvent)=>void; selectedArtist:any;
}

export default function Quotation({ isOpen, onClose, onSubmit, selectedArtist }: QuotationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <motion.div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}} transition={{duration:0.3}}
          >
            <Dialog.Title className="text-xl font-semibold text-purple-700 mb-4">
              Quote for {selectedArtist?.name}
            </Dialog.Title>
            <form onSubmit={onSubmit} className="flex flex-col space-y-4">
              <input type="text" placeholder="Your Name" required
                className="w-full px-3 py-2 border rounded-lg focus:ring-purple-400" />
              <input type="email" placeholder="Email" required
                className="w-full px-3 py-2 border rounded-lg focus:ring-purple-400" />
              <textarea placeholder="Event Details" rows={3} required
                className="w-full px-3 py-2 border rounded-lg focus:ring-purple-400" />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={onClose}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 transition"
                >Cancel</button>
                <button type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >Send</button>
              </div>
            </form>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
