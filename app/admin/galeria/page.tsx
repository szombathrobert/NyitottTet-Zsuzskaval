"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Kep {
  id: number;
  url: string;
}

export default function AdminGaleria() {
  const [kepek, setKepek] = useState<Kep[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    if (!token) router.push("/admin/");
  }, [token, router]);

  const loadKepek = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/admin/galeria", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setKepek(data.kepek);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadKepek();
  }, [token]);

  const openModal = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedId(null);
    setModalOpen(false);
  };

  const torles = async () => {
    if (!selectedId || !token) return;
    setDeleting(selectedId);

    try {
      await fetch(`http://localhost:5000/admin/galeria/${selectedId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setKepek((prev) => prev.filter((k) => k.id !== selectedId));
    } catch (err) {
      console.error(err);
      alert("Hiba történt törléskor.");
    } finally {
      setDeleting(null);
      closeModal();
    }
  };

  if (loading) return <p className="text-center mt-20">Betöltés...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <Link
        href="/admin/dashboard"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        ← Vissza a Dashboardra
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Galéria képek</h1>
        <Link
          href="/admin/galeria_feltoltes"
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition"
        >
          + Új kép feltöltése
        </Link>
      </div>

      {kepek.length === 0 && (
        <p className="text-gray-600">Még nincs feltöltött kép.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {kepek.map((kep) => (
          <div
            key={kep.id}
            className="border rounded-xl p-3 shadow hover:shadow-lg transition"
          >
            <img
              src={kep.url}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <button
              onClick={() => openModal(kep.id)}
              disabled={deleting === kep.id}
              className={`w-full py-2 rounded bg-red-500 text-white hover:bg-red-600 transition ${
                deleting === kep.id ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {deleting === kep.id ? "Törlés..." : "Törlés"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Biztos törlöd a képet?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={torles}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Igen, Törlés
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Mégse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
