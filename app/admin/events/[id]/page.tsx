"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin"); // nincs token → vissza a loginra
      return;
    }

    fetch(`http://localhost:5000/admin/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <div className="text-center py-8">Betöltés...</div>;
  if (!event) return <div className="text-center py-8">Nincs ilyen esemény</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20 bg-white rounded-2xl shadow-lg">
        <Link
            href="/admin/events"
            className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
        >
            ← Vissza az eseményekhez
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Esemény szerkesztése</h1>
      <input
        type="text"
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
        className="w-full p-2 border rounded mb-4 text-2xl md:text-3xl"
      />
      <textarea
        value={event.description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
        className="w-full p-2 border rounded mb-4 text-2xl md:text-3xl"
        rows={6}
      />
      <input
        type="date"
        value={event.date.slice(0, 10)}
        onChange={(e) => setEvent({ ...event, date: e.target.value })}
        className="w-full p-2 border rounded mb-4 text-2xl md:text-3xl"
      />
      <button
        onClick={() => {
          const token = localStorage.getItem("adminToken");
          fetch(`http://localhost:5000/admin/events/${id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
          }).then(() => router.push("/admin/events"));
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-2xl md:text-3xl"
      >
        Mentés
      </button>
    </div>
  );
}
