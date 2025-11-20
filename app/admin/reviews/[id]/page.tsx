"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditReviewPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    if (!token || !id) return;

    const fetchReview = async () => {
      try {
        const res = await fetch(`http://localhost:5000/admin/reviews`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const review = data.find((r: any) => r.id === parseInt(id as string));
        if (!review) {
          alert("Vélemény nem található!");
          router.push("/admin/reviews");
          return;
        }
        setName(review.name);
        setText(review.text);
        setDate(review.date?.split("T")[0] || "");
      } catch (err) {
        console.error(err);
        alert("Hiba történt a betöltéskor.");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id, token, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !id) return;

    try {
      const res = await fetch(`http://localhost:5000/admin/reviews/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ name, text, date }),
      });
      const data = await res.json();
      if (data.success) router.push("/admin/reviews");
      else alert("Hiba a mentés során.");
    } catch (err) {
      console.error(err);
      alert("Hiba a mentés során.");
    }
  };

  if (loading) return <div className="p-8 text-center">Betöltés...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto mt-16">
        <Link
            href="/admin/reviews"
            className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
        >
            ← Vissza a Véleményekre
      </Link>
      <h1 className="text-3xl font-bold mb-6">Vélemény szerkesztése</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          placeholder="Név"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400"
          required
        />
        <textarea
          placeholder="Vélemény szövege"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400"
          rows={5}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Mentés
        </button>
      </form>
    </div>
  );
}
