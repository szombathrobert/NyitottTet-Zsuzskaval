"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CloudinaryUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Token beolvasása a localStorage-ből
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("adminToken");
      if (!savedToken) {
        alert("Nem vagy bejelentkezve!");
        return;
      }
      setToken(savedToken);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    if (!token) return alert("Nem vagy bejelentkezve!");

    const formData = new FormData();
    formData.append("image", file); // 🔑 Ez a kulcs a Multer-nek kell a backend szerint

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/admin/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        throw new Error("Hiba a feltöltés során");
      }

      const data = await res.json();

      if (data.success) {
        setUrl(data.url);
        alert("Kép sikeresen feltöltve!");
      } else {
        alert("Hiba történt: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a feltöltés során");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl flex flex-col gap-6">
      <Link
        href="/admin/dashboard"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        ← Vissza a dashboardra
      </Link>
      <h1 className="text-2xl font-bold text-gray-800">Kép feltöltés</h1>

      {/* Drag & drop / file input */}
      <label
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-500 transition"
      >
        {file ? file.name : "Húzd ide a képet vagy kattints a feltöltéshez"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      {/* Feltöltés gomb */}
      <button
        onClick={handleUpload}
        className={`w-full py-2 rounded text-white font-medium transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-500"
        }`}
        disabled={loading}
      >
        {loading ? "Feltöltés..." : "Feltöltés"}
      </button>

      {/* Előnézet */}
      {url && (
        <div className="text-center">
          <p className="text-green-600 font-medium mb-2">Feltöltve!</p>
          <img src={url} alt="Feltöltött kép" className="mx-auto max-h-60 rounded-lg shadow-md" />
          <p className="text-sm text-gray-500 mt-2 break-all">{url}</p>
        </div>
      )}
    </div>
  );
}
