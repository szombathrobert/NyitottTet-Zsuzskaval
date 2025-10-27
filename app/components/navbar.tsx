"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [kezelésekOpen, setKezelésekOpen] = useState(false);
  const [testkezelésekOpen, setTestkezelésekOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const testkezelések = [
    "MTVSS",
    "Látás és látásmód helyreállítás",
    "Midas és Krőzus",
    "Metamorf Masszázs",
  ];

  // --- Kattintás a navbaron kívül ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setKezelésekOpen(false);
        setTestkezelésekOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Menü bezárásakor minden almenü csukódjon ---
  useEffect(() => {
    if (!menuOpen) {
      setKezelésekOpen(false);
      setTestkezelésekOpen(false);
    }
  }, [menuOpen]);

  // --- Kezelések bezárásakor testkezelések is zárjon ---
  useEffect(() => {
    if (!kezelésekOpen) setTestkezelésekOpen(false);
  }, [kezelésekOpen]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50">

      {/* DESKTOP */}
      <div className="hidden md:block">

        {/* Fő navbar */}
        <div className="w-full bg-white backdrop-blur-md shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/" className="text-4xl font-bold text-gray-800">NyitottTér</Link>

            <div className="flex space-x-8 items-center">
              <Link href="/" className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors">Főoldal</Link>
              <Link href="#about" className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors">Rólam</Link>

              <button
                onClick={() => setKezelésekOpen(prev => !prev)}
                className="text-2xl flex items-center text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Kezelések <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              <Link href="/arak" className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors">Árak</Link>
              <Link href="/contact" className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors">Kapcsolat</Link>
            </div>
          </div>
        </div>

        {/* Kezelések lenyíló sáv */}
        <AnimatePresence>
          {kezelésekOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-white backdrop-blur-md shadow-md z-40"
            >
              <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center gap-8">
                <Link href="/kezelesek/access-bars" className="text-xl text-gray-700 hover:text-indigo-600">Access Bars</Link>
                <Link href="/kezelesek/access-bars-gyerekeknek" className="text-xl text-gray-700 hover:text-indigo-600">Access Bars gyerekeknek</Link>
                <Link href="/kezelesek/access-facelift" className="text-xl text-gray-700 hover:text-indigo-600">Access Facelift</Link>

                <button
                  onClick={() => setTestkezelésekOpen(prev => !prev)}
                  className="text-xl flex items-center text-gray-700 hover:text-indigo-600 cursor-pointer"
                >
                  Testkezelések <ChevronDown className="ml-1 w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testkezelések lenyíló sáv */}
        <AnimatePresence>
          {testkezelésekOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-white backdrop-blur-md shadow-md z-30"
            >
              <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center gap-8">
                {testkezelések.map(item => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-xl text-gray-700 hover:text-indigo-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        {/* Fő navbar + hamburger */}
        <div className="w-full bg-white/90 backdrop-blur-md shadow-md flex justify-between items-center px-6 py-3">
          <Link href="/" className="text-4xl font-bold text-gray-800">NyitottTér</Link>
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMenuOpen(prev => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobil menü */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/90 text-xl backdrop-blur-md shadow-md px-6 py-4 space-y-3"
            >
              <Link href="/" className="block text-gray-700 hover:text-indigo-600">Főoldal</Link>
              <Link href="#about" className="block text-gray-700 hover:text-indigo-600">Rólam</Link>

              {/* Kezelések mobilon */}
              <div>
                <button
                  onClick={() => setKezelésekOpen(prev => !prev)}
                  className="w-full flex justify-between items-center text-gray-700 hover:text-indigo-600"
                >
                  Kezelések <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {kezelésekOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mt-2 pl-4 space-y-1"
                    >
                      <Link href="/kezelesek/access-bars" className="block hover:text-indigo-600">Access Bars</Link>
                      <Link href="/kezelesek/access-bars-gyerekeknek" className="block hover:text-indigo-600">Access Bars gyerekeknek</Link>
                      <Link href="/kezelesek/access-facelift" className="block hover:text-indigo-600">Access Facelift</Link>

                      {/* Testkezelések mobilon */}
                      <div>
                        <button
                          onClick={() => setTestkezelésekOpen(prev => !prev)}
                          className="flex items-center justify-between w-full hover:text-indigo-600"
                        >
                          Testkezelések <ChevronDown className="w-4 h-4" />
                        </button>

                        <AnimatePresence>
                          {testkezelésekOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="mt-2 pl-4 space-y-1"
                            >
                              {testkezelések.map(item => (
                                <Link
                                  key={item}
                                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="block hover:text-indigo-600"
                                >
                                  {item}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="#arak" className="block text-gray-700 hover:text-indigo-600">Árak</Link>
              <Link href="#kapcsolat" className="block text-gray-700 hover:text-indigo-600">Kapcsolat</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
