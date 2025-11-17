"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaEdit, FaTags, FaCommentDots, FaCalendarAlt, FaCogs, FaUpload, FaImages } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (!savedToken) router.push("/admin");
    else {
      setToken(savedToken);
      // Szimulálunk rövid betöltést a demo kedvéért
      setTimeout(() => setLoading(false), 500);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin");
  };

if (!token) return null; // ide nem jut el, mert a hook átirányít

  const cards = [
    {
      title: "Új Kezelés",
      desc: "Új kezelés felvétele",
      icon: <FaCogs className="text-blue-500 text-4xl mb-4" />,
      onClick: () => router.push("/admin/tartalom-felvetel"),
    },
    {
      title: "Kezelések Szerkesztése",
      desc: "Meglévő kezelések szerkesztése",
      icon: <FaEdit className="text-pink-500 text-4xl mb-4" />,
      onClick: () => router.push("/admin/kezelesek-lista"),
    },
    {
      title: "Árak",
      desc: "Kezelések árainak gyors szerkesztése",
      icon: <FaTags className="text-blue-500 text-4xl mb-4" />,
      onClick: () => router.push("/admin/arak"),
    },
    {
      title: "Vélemények",
      desc: "Felhasználói visszajelzések kezelése",
      icon: <FaCommentDots className="text-green-500 text-4xl mb-4" />,
      onClick: () => router.push("/admin/reviews"),
    },
    {
      title: "Események",
      desc: "Események és programok kezelése",
      icon: <FaCalendarAlt className="text-yellow-500 text-4xl mb-4" />,
      onClick: () => router.push("/admin/events"),
    },
    {
      title: "Kép feltöltés",
      desc: "Képek feltöltése az adatbázisba",
      icon: <FaUpload className="text-yellow-500 text-4xl mb-4" />,
      onClick: () => router.push("/admin/kep_feltoltes"),
    },
    {
      title: "Galéria",
      desc: "Galériában lévő képek szerkesztése és új hozzáadása",
      icon: <FaImages className="text-yellow-500 text-4xl mb-4" />,
      onClick: () => router.push("/admin/galeria"),
    }
  ];

  return (
    <div className="min-h-screen p-8 mt-20">
      {/* Header */}
            <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition mb-5"
        >
          <FaSignOutAlt />
          Kijelentkezés
        </button>
      </div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">Admin Dashboard</h1>
      </div>


      {/* Menükártyák */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              onClick={card.onClick}
              className="cursor-pointer bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col items-center text-center transition transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              {card.icon}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h2>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
