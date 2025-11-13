"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Kezeles {
  id: number;
  cim: string;
  slug: string;
  tartalom: string;
  ar?: string;
}

export default function KezelesekLista() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [kezelesek, setKezelesek] = useState<Kezeles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (!savedToken) {
      router.push("/admin"); // átirányítás loginra
    } else {
      setToken(savedToken);
    }
  }, [router]);

  useEffect(() => {
    if (!token) return;

    const fetchKezelesek = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/kezelesek", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setKezelesek(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKezelesek();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("Biztosan törlöd a kezelést?")) return;

    try {
      await fetch(`http://localhost:5000/admin/kezelesek/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setKezelesek(kezelesek.filter((k) => k.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) return null;

if (loading) {
  // Skeleton loader: 6 darab helyőrző kártya
  return (
    <div className="p-6 max-w-7xl mx-auto mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-gray-200 rounded-2xl p-6 flex flex-col justify-between animate-pulse h-64"
        >
          <div className="mb-4">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="flex gap-2 mt-auto">
            <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

  return (
    <div className="p-6 max-w-7xl mx-auto mt-10">
      <Link
        href="/admin/dashboard"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition mt-5"
      >
        ← Vissza a dashboardra
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Kezelések listája
      </h1>

      {kezelesek.length === 0 ? (
        <p className="text-gray-600">Nincs megjeleníthető kezelés.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kezelesek.map((k) => (
            <div
              key={k.id}
              className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl flex flex-col justify-between animate-fade-in"
            >
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2 ">
                  {k.cim}
                </h2>
                {k.ar && (
                  <p className="text-pink-600 font-bold mb-2 text-2xl">{k.ar} Ft</p>
                )}
                <p className="text-gray-500 truncate text-xl">{k.slug}</p>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => router.push(`/admin/editor/${k.id}`)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg transition cursor-pointer"
                  title="Szerkesztés"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(k.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition cursor-pointer"
                  title="Törlés"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
