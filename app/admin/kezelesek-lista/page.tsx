"use client";

import { useEffect, useState } from "react";
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
  const [token, setToken] = useState<string | null>(null);
  const [kezelesek, setKezelesek] = useState<Kezeles[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("adminToken");
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchKezelesek = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/kezelesek", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Fetched kezelések:", data);
        setKezelesek(data);
      } catch (err) {
        console.error(err);
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

  if (!token) return <div>Jelentkezz be az admin felülethez!</div>;

  return (
    <div className="p-8 mt-5">
      <Link
        href="/admin/dashboard"
        className="inline-block mt-8 px-6 py-3 text-gray-800 rounded-lg transition-colors"
      >
        ← Vissza a dashboardra
      </Link>

      <h1 className="text-3xl font-bold mb-6">Kezelések listája</h1>

      {kezelesek.length === 0 ? (
        <p>Nincs megjeleníthető kezelés.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Cím</th>
              <th className="border px-4 py-2">Slug</th>
              <th className="border px-4 py-2">Ár</th>
              <th className="border px-4 py-2">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {kezelesek.map((k) => (
              <tr key={k.id}>
                <td className="border px-4 py-2">{k.id}</td>
                <td className="border px-4 py-2">{k.cim}</td>
                <td className="border px-4 py-2">{k.slug}</td>
                <td className="border px-4 py-2">{k.ar}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/editor/${k.id}`)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(k.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
