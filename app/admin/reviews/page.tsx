"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";

interface Review {
  id: number;
  name: string;
  text: string;
  date: string;
}

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (!savedToken) {
      router.push("/admin");
    } else {
      setToken(savedToken);
    }
  }, [router]);

  useEffect(() => {
    if (!token) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        alert("Hiba történt a vélemények lekérésekor.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [token]);

  const openModal = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedId(null);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedId || !token) return;
    setDeleting(true);

    try {
      await fetch(`http://localhost:5000/admin/reviews/${selectedId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prev) => prev.filter((r) => r.id !== selectedId));
    } catch (err) {
      console.error(err);
      alert("Hiba történt a vélemény törlésekor.");
    } finally {
      setDeleting(false);
      closeModal();
    }
  };

  if (!token) return <div className="p-8 text-center">Jogosultság szükséges...</div>;
  if (loading) return <div className="p-8 text-center">Betöltés...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto mt-16">
      <Link
        href="/admin/dashboard"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        ← Vissza a Dashboardra
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Vélemények kezelése</h1>
        <button
          onClick={() => router.push("/admin/reviews/new")}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          <FaPlus /> Új vélemény
        </button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <div className="text-gray-800 font-semibold  text-3xl mb-1">{r.name}</div>
              <p className="text-gray-600 mb-2 text-2xl">{r.text}</p>
              <div className="text-gray-400 text-2xl">
                {new Date(r.date).toLocaleDateString("hu-HU")}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => router.push(`/admin/reviews/${r.id}`)}
                className="text-blue-500 text-2xl hover:text-blue-600 transition"
                title="Szerkesztés"
              >
                <FaPen />
              </button>
              <button
                onClick={() => openModal(r.id)}
                className="text-red-500 text-2xl hover:text-red-600 transition"
                title="Törlés"
                disabled={deleting && selectedId === r.id}
              >
                <FaTrash /> {deleting && selectedId === r.id ? "Törlés..." : ""}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Biztos törlöd a véleményt?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDelete}
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
