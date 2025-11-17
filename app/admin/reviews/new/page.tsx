"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "../../hook/useAdminAuth";

export default function NewReviewPage() {
  const router = useRouter();
  const { token, loading } = useAdminAuth(); // Hook mindig itt fut le!

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // A JSX-ben kezeljük a korai visszatérést
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow mt-40">
      {loading && <div className="p-8 text-center">Betöltés...</div>}
      {!loading && !token && <div className="p-8 text-center">Jelentkezz be az admin felülethez!</div>}

      {!loading && token && (
        <>
          <Link href="/admin/reviews" className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
            ← Vissza a véleményekhez
          </Link>

          <h1 className="text-2xl font-bold mb-6">Új vélemény hozzáadása</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoadingSubmit(true);
              try {
                const res = await fetch("http://localhost:5000/admin/reviews", {
                  method: "POST",
                  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                  body: JSON.stringify({ name, text, date }),
                });
                const data = await res.json();
                if (data.success) router.push("/admin/reviews");
                else alert("Hiba történt az esemény mentésekor.");
              } catch (err) {
                console.error(err);
                alert("Hálózati hiba történt.");
              } finally {
                setLoadingSubmit(false);
              }
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Név"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 text-3xl md:text-4xl"
              required
            />
            <textarea
              placeholder="Vélemény"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 text-3xl md:text-4xl"
              rows={4}
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 text-3xl md:text-4xl"
              required
            />

            <button
              type="submit"
              disabled={loadingSubmit}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition text-3xl md:text-4xl"
            >
              {loadingSubmit ? "Mentés..." : "Mentés"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
