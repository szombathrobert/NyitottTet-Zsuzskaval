"use client";

import { useState } from "react";

export default function TartalomFelvetel() {
  const [nev, setNev] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setStatus("Válassz ki egy Word dokumentumot!");

    const formData = new FormData();
    formData.append("nev", nev);
    formData.append("slug", slug);
    formData.append("file", file);

    const token = localStorage.getItem("adminToken");
    if (!token) return setStatus("Jelentkezz be újra!");

    const res = await fetch("http://localhost:5000/admin/kezelesek/uj", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setStatus("Sikeresen feltöltve!");
      setNev("");
      setSlug("");
      setFile(null);
    } else {
      setStatus("Hiba történt: " + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Kezelés neve"
        value={nev}
        onChange={(e) => setNev(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="file"
        accept=".doc,.docx"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-pink-500 text-white py-2 rounded">
        Feltöltés
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}
