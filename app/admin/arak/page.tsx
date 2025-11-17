"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Kezeles {
  id: number;
  cim: string;
  ar?: string;
}

export default function AdminArak() {
  const router = useRouter();
  const [kezelesek, setKezelesek] = useState<Kezeles[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [mentesId, setMentesId] = useState<number | null>(null);

  // Token ellenőrzés
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (!savedToken) {
      router.push("/admin"); // ha nincs token, átirányít a loginhoz
    } else {
      setToken(savedToken);
    }
  }, [router]);

  // Kezelések lekérdezése
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/admin/kezelesek", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setKezelesek(data));
  }, [token]);

  const handlePriceChange = async (id: number, ar: string) => {
    if (!token) return;
    setMentesId(id);

    await fetch(`http://localhost:5000/admin/kezelesek/${id}/ar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ar }),
    });

    setKezelesek((prev) =>
      prev.map((k) => (k.id === id ? { ...k, ar } : k))
    );
    setMentesId(null);
  };

  // Ha még nincs token (még töltődik), ne jelenítsünk meg semmit
  if (!token) return null;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-8 bg-white/70 rounded-2xl shadow-lg">
      <Link
        href="/admin/dashboard"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        ← Vissza a dashboardra
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Árak szerkesztése</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-pink-100">
            <th className="border px-4 py-2 text-left">Kezelés neve</th>
            <th className="border px-4 py-2 text-left">Ár (Ft)</th>
          </tr>
        </thead>
        <tbody>
          {kezelesek.map((k) => (
            <tr key={k.id}>
              <td className="border px-4 py-2 font-medium">{k.cim}</td>
              <td className="border px-4 py-2">
                <input
                  defaultValue={k.ar || ""}
                  onBlur={(e) => handlePriceChange(k.id, e.target.value)}
                  className="border rounded-lg px-3 py-1 w-32 text-right focus:outline-pink-500"
                  placeholder="pl. 12 000"
                />
                {mentesId === k.id && (
                  <span className="text-sm text-gray-500 ml-2">Mentés...</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
