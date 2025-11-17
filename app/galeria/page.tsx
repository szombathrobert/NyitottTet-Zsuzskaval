"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function GaleriaPage() {
  const [kepek, setKepek] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Backend meghívása
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:5000/galeria");
        const data = await res.json();

        if (data.success) {
          setKepek(data.kepek); // itt egy tömböt vár: ["url1", "url2"...]
        }
      } catch (err) {
        console.error("Hiba a képek lekérésénél:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <Link
        href="/"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition mt-5"
      >
        ← Vissza a kezdőlapra
      </Link>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Galéria
      </h1>

      {loading && (
        <p className="text-center text-gray-500 text-lg">Képek betöltése...</p>
      )}

      {/* Képrács */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {kepek.map((url, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="overflow-hidden rounded-xl shadow-md cursor-pointer group"
            onClick={() => setSelected(url)}
          >
            <Image
              src={url}
              alt="Galéria kép"
              width={500}
              height={350}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      {/* MODAL – nagyított kép */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <Image
                src={selected}
                alt="Kép"
                width={1200}
                height={800}
                className="rounded-xl shadow-lg mx-auto"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-white/80 text-black px-3 py-1 rounded-full shadow hover:bg-white transition"
              >
                Bezárás ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
