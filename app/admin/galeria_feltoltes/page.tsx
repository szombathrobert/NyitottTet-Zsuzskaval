"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GaleriaFeltoltes() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successUrl, setSuccessUrl] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  // Ha nincs token, átirányítás login oldalra
  useEffect(() => {
    if (!token) {
      router.push("/admin");
    }
  }, [token, router]);

  const handleUpload = async () => {
    if (!file) return alert("Nincs kiválasztott kép!");
    if (!token) return;

    const fd = new FormData();
    fd.append("image", file);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/admin/galeria-upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();

      if (data.success) {
        setSuccessUrl(data.url);
        setTimeout(() => {
          router.push("/admin/galeria");
        }, 1500);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl flex flex-col gap-6">
      <Link
        href="/admin/galeria"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        ← Vissza a galériához
      </Link>

      <h1 className="text-2xl font-bold mb-4">Galéria kép feltöltése</h1>

      <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-500 transition">
        {file ? file.name : "Húzd ide a képet vagy kattints a feltöltéshez"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500"
      >
        {loading ? "Feltöltés..." : "Feltöltés"}
      </button>

      {successUrl && (
        <div className="mt-4">
          <p className="text-green-600 font-bold">Siker!</p>
          <img src={successUrl} className="w-full rounded shadow mt-2" />
        </div>
      )}
    </div>
  );
}
