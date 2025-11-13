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

  const handleDelete = async (id: number) => {
    if (!confirm("Biztosan törölni szeretnéd ezt a véleményt?")) return;
    try {
      await fetch(`http://localhost:5000/admin/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Hiba történt a vélemény törlésekor.");
    }
  };

  if (!token) return <div className="p-8 text-center">Jogosultság szükséges...</div>;
  if (loading) return <div className="p-8 text-center">Betöltés...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto mt-16">
        <Link
                href="/admin/dashboard"
                className="inline-block px-6 py-3 text-gray-800 rounded-lg transition-colors"
            >
                ← Vissza a Dashboardra
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vélemények kezelése</h1>
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
              <div className="text-gray-800 font-semibold text-lg mb-1">{r.name}</div>
              <p className="text-gray-600 mb-2">{r.text}</p>
              <div className="text-gray-400 text-sm">
                {new Date(r.date).toLocaleDateString("hu-HU")}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => router.push(`/admin/reviews/${r.id}`)}
                className="text-blue-500 hover:text-blue-600 transition"
                title="Szerkesztés"
              >
                <FaPen />
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="text-red-500 hover:text-red-600 transition"
                title="Törlés"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
