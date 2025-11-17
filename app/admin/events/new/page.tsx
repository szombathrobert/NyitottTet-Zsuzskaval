"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Belépés ellenőrzés
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("adminToken");
      if (!savedToken) {
        router.push("/admin"); // nincs token → login oldal
      } else {
        setToken(savedToken);
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/admin/events", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, date, imageUrl }),
      });
      const data = await res.json();
      if (data.success) router.push("/admin/events");
      else alert("Hiba történt az esemény mentésekor.");
    } catch (err) {
      console.error(err);
      alert("Hálózati hiba történt.");
    } finally {
      setLoading(false);
    }
  };

  // Ha nincs token, ne jelenítsük a formot
  if (!token) return <div className="p-8 text-center">Jogosultság szükséges...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto mt-16">
      <Link
            href="/admin/events"
            className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
        >
            ← Vissza az eseményekhez
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Új esemény felvétele</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Cím"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 text-3xl md:text-4xl"
          required
        />
        <textarea
          placeholder="Leírás"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 text-3xl md:text-4xl"
          rows={4}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 text-3xl md:text-4xl"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-3xl md:text-4xl"
        >
          {loading ? "Mentés..." : "Mentés"}
        </button>
      </form>
    </div>
  );
}
