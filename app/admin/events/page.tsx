"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
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

    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        alert("Hiba történt az események lekérésekor.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!confirm("Biztosan törölni szeretnéd az eseményt?")) return;
    try {
      await fetch(`http://localhost:5000/admin/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      alert("Hiba történt az esemény törlésekor.");
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
            ← Vissza a dashboardra
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl md:text-4xl font-bold">Események kezelése</h1>
        <button
          onClick={() => router.push("/admin/events/new")}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          <FaPlus /> Új esemény
        </button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <div
            key={e.id}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <div className="text-gray-800 font-semibold text-3xl md:text-4xl mb-1">{e.title}</div>
              <p className="text-gray-600 mb-2 text-2xl md:text-2xl">{e.description}</p>
              <div className="text-gray-400 text-2xl md:text-2xl">
                {new Date(e.date).toLocaleDateString("hu-HU")}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => router.push(`/admin/events/${e.id}`)}
                className="text-blue-500 text-2xl md:text-2xl hover:text-blue-600 transition cursor-pointer"
                title="Szerkesztés"
              >
                <FaPen />
              </button>
              <button
                onClick={() => handleDelete(e.id)}
                className="text-red-500 text-2xl md:text-2xl hover:text-red-600 transition cursor-pointer"
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
