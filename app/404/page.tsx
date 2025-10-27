"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF7E4] px-6 text-center">
      <motion.h1
        className="text-9xl font-bold text-gray-800 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Sajnos, a keresett oldal nem található. Lehet, hogy áthelyeztük, vagy töröltük.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link
          href="/"
          className="inline-block bg-[#A0937D] hover:bg-[#8a836e] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all"
        >
          Vissza a főoldalra
        </Link>
      </motion.div>
    </div>
  );
}
