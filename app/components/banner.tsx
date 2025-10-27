"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-screen md:h-screen overflow-hidden">
      {/* Háttérkép – eltolva balra */}
      <Image
        src="/banner-bg.webp"
        alt="NyitottTér Banner"
        fill
        className="object-cover object-[10%_50%] md:object-[30%_50%]"
        priority
      />

      {/* Szürkés overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-gray-800/40 to-black/50"></div>

      {/* Szöveg */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl"
        >
          NyitottTér – Zsuzskával
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow-md text-gray-200"
        >
          „Engedd, hogy a világod kitáruljon — minden pillanat egy választás!”
        </motion.p>

        <motion.a
          href="#treatments"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all"
        >
          Fedezd fel a kezeléseket
        </motion.a>
      </div>
    </section>
  );
}
