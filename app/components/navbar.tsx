"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [kezelésekOpen, setKezelésekOpen] = useState(false);
  const [testkezelésekOpen, setTestkezelésekOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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

  // --- Menü bezárásakor csukjon be minden almenüt ---
  useEffect(() => {
    if (!menuOpen) {
      setKezelésekOpen(false);
      setTestkezelésekOpen(false);
    }
  }, [menuOpen]);

  // --- Kezelések bezárásakor csukja be a testkezeléseket ---
  useEffect(() => {
    if (!kezelésekOpen) setTestkezelésekOpen(false);
  }, [kezelésekOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-[#FFF] backdrop-blur-md shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="text-4xl font-bold text-gray-800">NyitottTér</Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/"
            className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Főoldal
          </Link>

          <Link
            href="#rolam"
            className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Rólam
          </Link>

          {/* KEZELÉSEK */}
          <div className="relative">
            <button
              onClick={() => setKezelésekOpen((prev) => !prev)}
              className="text-2xl flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Kezelések <ChevronDown className="ml-1 w-4 h-4" />
            </button>

            <AnimatePresence>
              {kezelésekOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xl absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-2 space-y-1"
                >
                  <Link
                    href="#accessbars"
                    className="text-xl block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Access Bars
                  </Link>
                  <Link
                    href="#accessbars-gyerekeknek"
                    className="text-xl block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Access Bars gyerekeknek
                  </Link>
                  <Link
                    href="#accessfacelift"
                    className="text-xl block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Access Facelift
                  </Link>

                  {/* TESTKEZELÉSEK */}
                  <div className="relative">
                    <button
                      onClick={() => setTestkezelésekOpen((prev) => !prev)}
                      className="text-xl w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100 rounded-md"
                    >
                      Testkezelések <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {testkezelésekOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xl mt-1 ml-2 bg-gray-50 rounded-lg shadow p-2 space-y-1"
                        >
                          {[
                            "MTVSS",
                            "Látás és látásmód helyreállítás",
                            "Midas és Krőzus",
                            "Metamorf Masszázs",
                          ].map((item) => (
                            <Link
                              key={item}
                              href={`#${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="block px-4 py-2 hover:bg-gray-100 rounded-md"
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

          <Link
            href="#arak"
            className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Árak
          </Link>

          <Link
            href="#kapcsolat"
            className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Kapcsolat
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/90 text-xl backdrop-blur-md shadow-md px-6 py-4 space-y-3"
          >
            <Link
              href="#fooldal"
              className="block text-gray-700 hover:text-indigo-600"
            >
              Főoldal
            </Link>

            <Link
              href="#rolam"
              className="block text-gray-700 hover:text-indigo-600"
            >
              Rólam
            </Link>

            {/* KEZELÉSEK */}
            <div>
              <button
                onClick={() => setKezelésekOpen((prev) => !prev)}
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
                    <Link
                      href="#accessbars"
                      className="block hover:text-indigo-600"
                    >
                      Access Bars
                    </Link>
                    <Link
                      href="#accessbars-gyerekeknek"
                      className="block hover:text-indigo-600"
                    >
                      Access Bars gyerekeknek
                    </Link>
                    <Link
                      href="#accessfacelift"
                      className="block hover:text-indigo-600"
                    >
                      Access Facelift
                    </Link>

                    {/* TESTKEZELÉSEK MOBILON */}
                    <div>
                      <button
                        onClick={() =>
                          setTestkezelésekOpen((prev) => !prev)
                        }
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
                            {[
                              "MTVSS",
                              "Látás és látásmód helyreállítás",
                              "Midas és Krőzus",
                              "Metamorf Masszázs",
                            ].map((item) => (
                              <Link
                                key={item}
                                href={`#${item
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
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

            <a
              href="#arak"
              className="block text-gray-700 hover:text-indigo-600"
            >
              Árak
            </a>

            <a
              href="#kapcsolat"
              className="block text-gray-700 hover:text-indigo-600"
            >
              Kapcsolat
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
