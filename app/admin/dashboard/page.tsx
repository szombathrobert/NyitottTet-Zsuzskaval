"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [showKezelesOpcio, setShowKezelesOpcio] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("adminToken");
        console.log("Admin token:", savedToken);
      if (savedToken) setToken(savedToken);
    }
  }, []);

  if (!token) return <div className="p-8">Jelentkezz be az admin felülethez!</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Fő menüpontok */}
      <div className="flex gap-4 mb-6">
        <div className="relative">
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={() => setShowKezelesOpcio(!showKezelesOpcio)}
          >
            Kezelések
          </button>

          {/* Kezelés opciók */}
          {showKezelesOpcio && (
            <div className="absolute mt-2 flex flex-col gap-2 bg-white shadow p-2 rounded z-10">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-left"
                onClick={() => router.push("/admin/kezelesek-lista")}
              >
                Meglévő kezelések szerkesztése
              </button>
              <button
                className="px-3 py-1 rounded bg-pink-500 text-white hover:bg-pink-600 text-left"
                onClick={() => router.push("/admin/tartalom-felvetel")}
              >
                Új kezelés felvétele
              </button>
            </div>
          )}
        </div>

        <button
          className={`px-4 py-2 rounded ${activeTab === "arak" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("arak")}
        >
          Árak
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "velemenyek" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("velemenyek")}
        >
          Vélemények
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "esemenyek" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("esemenyek")}
        >
          Események
        </button>
      </div>
    </div>
  );
}
