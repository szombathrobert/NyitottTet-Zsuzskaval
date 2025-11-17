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

  // Modal state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (!savedToken) router.push("/admin");
    else setToken(savedToken);
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

  const confirmDelete = async () => {
    if (!deleteId || !token) return;
    setDeleting(true);
    try {
      await fetch(`http://localhost:5000/admin/events/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert("Hiba történt az esemény törlésekor.");
    } finally {
      setDeleting(false);
    }
  };

  if (!token) return <div className="p-8 text-center">Jogosultság szükséges...</div>;
  if (loading) return <div className="p-8 text-center">Betöltés...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto mt-15">
      <Link
        href="/admin/dashboard"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        ← Vissza a dashboardra
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Események kezelése</h1>
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
              <div className="text-gray-800 font-semibold text-3xl mb-1">{e.title}</div>
              <p className="text-gray-600 mb-2 text-2xl">{e.description}</p>
              <div className="text-gray-400 text-2xl">{new Date(e.date).toLocaleDateString("hu-HU")}</div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => router.push(`/admin/events/${e.id}`)}
                className="text-blue-500 text-2xl hover:text-blue-600 transition cursor-pointer"
                title="Szerkesztés"
              >
                <FaPen />
              </button>
              <button
                onClick={() => setDeleteId(e.id)}
                className="text-red-500 text-2xl hover:text-red-600 transition cursor-pointer"
                title="Törlés"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg">
            <p className="text-gray-800 mb-4 text-xl">Biztosan törölni szeretnéd az eseményt?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                {deleting ? "Törlés..." : "Igen, törlés"}
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Mégsem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
