"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function TartalomFelvetel() {
  const [token, setToken] = useState<string | null>(null);
  const [cim, setCim] = useState("");
  const [slug, setSlug] = useState("");
  const [ar, setAr] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("adminToken");
      if (savedToken) setToken(savedToken);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!file || !cim || !slug) {
      setError("Kérlek töltsd ki az összes mezőt!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cim", cim);
    formData.append("slug", slug);
    formData.append("ar", ar);

    try {
      const res = await fetch("http://localhost:5000/admin/kezelesek", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setCim("");
        setSlug("");
        setAr("");
        setFile(null);
      } else {
        setError("Hiba történt a feltöltés során.");
      }
    } catch (err) {
      console.error(err);
      setError("Hálózati hiba történt.");
    }
  };

  if (!token) return <div className="p-8">Jelentkezz be az admin felülethez!</div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-gray-200 rounded-xl shadow-md bg-white">
      <Link
        href="/admin/dashboard"
        className="inline-block px-4 py-2 mb-4 text-gray-700 rounded hover:bg-gray-100 transition"
      >
        ← Vissza a dashboardra
      </Link>

      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Új kezelés felvétele</h2>

      {success && <p className="text-green-600 mb-3 text-center font-medium">Sikeresen feltöltve!</p>}
      {error && <p className="text-red-500 mb-3 text-center font-medium">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Kezelés neve"
          value={cim}
          onChange={(e) => setCim(e.target.value)}
          className="border p-2 rounded focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border p-2 rounded focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Ár (pl. 12 000 Ft)"
          value={ar}
          onChange={(e) => setAr(e.target.value)}
          className="border p-2 rounded focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <input
          type="file"
          accept=".doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 rounded file:bg-pink-500 file:text-white file:py-1 file:px-3 file:rounded file:border-none hover:file:bg-pink-600"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition font-semibold"
        >
          Feltöltés
        </button>
      </form>
    </div>
  );
}
