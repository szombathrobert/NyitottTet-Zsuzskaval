"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Kezeles {
  id: number;
  cim: string;
  ar?: string;
}

export default function ArakPage() {
  const [kezelesek, setKezelesek] = useState<Kezeles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Publikus végpont token nélkül
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/kezelesek");
        if (!res.ok) throw new Error("Hálózati hiba");
        const data: Kezeles[] = await res.json();
        setKezelesek(data);
      } catch (err) {
        console.error(err);
        setKezelesek([]); // ha hiba van, üres tömb
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 mt-5">
            <Link
        href="/"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        ← Vissza a kezdőlapra
      </Link>
      <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-12">
        Árak
      </h1>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/30 border border-pink-100 rounded-2xl p-6 shadow-md animate-pulse"
            >
              <div className="h-6 w-3/4 bg-gray-300 mb-4 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : kezelesek.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">Nincs megjeleníthető kezelés</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {kezelesek.map((k, idx) => (
            <div
              key={k.id}
              className="bg-white/70 border border-pink-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-500 opacity-0 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-semibold text-gray-800">{k.cim}</h3>
                {k.ar && (
                  <span className="text-lg font-bold text-pink-600">
                    {k.ar} Ft
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
