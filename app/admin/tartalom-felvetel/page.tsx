"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TartalomFelvetel() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [cim, setCim] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [ar, setAr] = useState("");
  const [kepUrl, setKepUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [htmlPreview, setHtmlPreview] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("adminToken");
      if (!savedToken) router.push("/admin");
      else setToken(savedToken);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!cim || !slug || (!file && !kepUrl)) {
      setError("Kérlek töltsd ki a szükséges mezőket (fájl vagy kép URL)!");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("cim", cim);
    formData.append("slug", slug);
    formData.append("shortDescription", shortDescription);
    formData.append("ar", ar);
    formData.append("kepUrl", kepUrl);

    try {
      const res = await fetch("http://localhost:5000/admin/kezelesek", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setHtmlPreview(data.kezes.tartalom);
        setCim(""); setSlug(""); setshortDescription(""); setAr(""); setFile(null); setKepUrl("");
      } else {
        setError(data.error || "Hiba történt a feltöltés során.");
      }
    } catch (err) {
      console.error(err);
      setError("Hálózati hiba történt.");
    }
  };

  if (!token) return null;

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 border border-gray-200 rounded-xl shadow-md bg-white">
      <Link href="/admin/dashboard" className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
        ← Vissza a dashboardra
      </Link>

      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Új kezelés felvétele</h2>

      {success && <p className="text-green-600 mb-3 text-center font-medium">✅ Sikeresen feltöltve!</p>}
      {error && <p className="text-red-500 mb-3 text-center font-medium">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input type="text" placeholder="Kezelés neve" value={cim} onChange={(e) => setCim(e.target.value)} className="border p-2 rounded focus:ring-2 focus:ring-pink-400 focus:outline-none" />
        <input type="text" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="border p-2 rounded focus:ring-2 focus:ring-pink-400 focus:outline-none" />
        <input type="text" placeholder="rövid leírás" value={shortDescription} onChange={(e) => setshortDescription(e.target.value)} className="border p-2 rounded focus:ring-2 focus:ring-pink-400 focus:outline-none" />
        <input type="text" placeholder="Ár (pl. 12 000 Ft)" value={ar} onChange={(e) => setAr(e.target.value)} className="border p-2 rounded focus:ring-2 focus:ring-pink-400 focus:outline-none" />
        <input type="text" placeholder="Kép URL (ha nincs fájl)" value={kepUrl} onChange={(e) => setKepUrl(e.target.value)} className="border p-2 rounded focus:ring-2 focus:ring-pink-400 focus:outline-none" />
        <input type="file" accept=".doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2 rounded file:bg-pink-500 file:text-white file:py-1 file:px-3 file:rounded file:border-none hover:file:bg-pink-600" />
        <button type="submit" className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition font-semibold">Feltöltés</button>
      </form>

      {htmlPreview && (
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Előnézet:</h3>
          <div className="prose prose-lg max-w-none border rounded-lg p-4 bg-gray-50" dangerouslySetInnerHTML={{ __html: htmlPreview }} />
        </div>
      )}
    </div>
  );
}
