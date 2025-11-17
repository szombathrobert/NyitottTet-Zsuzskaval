"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

// --- Kezelések JSON (lehet később külön fájlban) ---
const kezelesek = [
  { name: "Access Bars", slug: "access-bars" },
  { name: "Access Bars gyerekeknek", slug: "access-bars-gyerekeknek" },
  { name: "Access Facelift", slug: "access-facelift" },
];

const testkezelesek = [
  { name: "MTVSS", slug: "mtvss" },
  { name: "Látás és látásmód helyreállítás", slug: "latas-es-latasmod-helyreallitas" },
  { name: "Midas és Krőzus", slug: "midas-es-krozus" },
  { name: "Metamorf Masszázs", slug: "metamorf-masszazs" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [kezelesekOpen, setKezelesekOpen] = useState(false);
  const [testkezelesekOpen, setTestkezelesekOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // --- Kattintás a navbaron kívül ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setKezelesekOpen(false);
        setTestkezelesekOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Menü bezárásakor minden almenü csukódjon ---
  useEffect(() => {
    if (!menuOpen) {
      setKezelesekOpen(false);
      setTestkezelesekOpen(false);
    }
  }, [menuOpen]);

  // --- Kezelések bezárásakor testkezelések is zárjon ---
  useEffect(() => {
    if (!kezelesekOpen) setTestkezelesekOpen(false);
  }, [kezelesekOpen]);

  // --- Oldalváltáskor mobilon bezárja a menüt ---
  const handleLinkClick = () => {
    setMenuOpen(false);
    setKezelesekOpen(false);
    setTestkezelesekOpen(false);
  };

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
              <Link href="/#about" className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors">Rólam</Link>

              <button
                onClick={() => setKezelesekOpen(prev => !prev)}
                className="text-2xl flex items-center text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Kezelések <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              <Link href="/arak" className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors">Árak</Link>
              <Link href="/galeria" className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors">Galéria</Link>
              <Link href="/kapcsolat" className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors">Kapcsolat</Link>
            </div>
          </div>
        </div>

        {/* Kezelések lenyíló sáv */}
        <AnimatePresence>
          {kezelesekOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-white backdrop-blur-md shadow-md z-40"
            >
              <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center gap-8">
                {kezelesek.map(item => (
                  <Link
                    key={item.slug}
                    href={`/kezelesek/${item.slug}`}
                    className="text-xl text-gray-700 hover:text-indigo-600"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </Link>
                ))}

                <button
                  onClick={() => setTestkezelesekOpen(prev => !prev)}
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
          {testkezelesekOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-white backdrop-blur-md shadow-md z-30"
            >
              <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center gap-8">
                {testkezelesek.map(item => (
                  <Link
                    key={item.slug}
                    href={`/kezelesek/${item.slug}`}
                    className="text-xl text-gray-700 hover:text-indigo-600"
                    onClick={handleLinkClick}
                  >
                    {item.name}
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
              <Link href="/" className="block text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}>Főoldal</Link>
              <Link href="/#about" className="block text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}>Rólam</Link>

              {/* Kezelések mobilon */}
              <div>
                <button
                  onClick={() => setKezelesekOpen(prev => !prev)}
                  className="w-full flex justify-between items-center text-gray-700 hover:text-indigo-600"
                >
                  Kezelések <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {kezelesekOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mt-2 pl-4 space-y-1"
                    >
                      {kezelesek.map(item => (
                        <Link
                          key={item.slug}
                          href={`/kezelesek/${item.slug}`}
                          className="block hover:text-indigo-600"
                          onClick={handleLinkClick}
                        >
                          {item.name}
                        </Link>
                      ))}

                      {/* Testkezelések mobilon */}
                      <div>
                        <button
                          onClick={() => setTestkezelesekOpen(prev => !prev)}
                          className="flex items-center justify-between w-full hover:text-indigo-600"
                        >
                          Testkezelések <ChevronDown className="w-4 h-4" />
                        </button>

                        <AnimatePresence>
                          {testkezelesekOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="mt-2 pl-4 space-y-1"
                            >
                              {testkezelesek.map(item => (
                                <Link
                                  key={item.slug}
                                  href={`/kezelesek/${item.slug}`}
                                  className="block hover:text-indigo-600"
                                  onClick={handleLinkClick}
                                >
                                  {item.name}
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

              <Link href="/arak" className="block text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}>Árak</Link>
              <Link href="/galeria" className="block text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}>Galéria</Link>
              <Link href="/kapcsolat" className="block text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}>Kapcsolat</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
