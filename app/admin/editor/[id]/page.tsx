"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Kezeles {
  id: number;
  cim: string;
  slug: string;
  tartalom: string;
  ar: string;
}

export default function EditorPage() {
  const { id } = useParams();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [cim, setCim] = useState("");
  const [slug, setSlug] = useState("");
  const [ar, setAr] = useState("");
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: { attributes: { class: "border p-4 rounded min-h-[200px]" } },
    immediatelyRender: false, // ❌ elkerüli a SSR hibát
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    const fetchKezeles = async () => {
      if (!token || !id) return;

      try {
        const res = await fetch(`http://localhost:5000/admin/kezelesek/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Fetched kezelés:", data);

        if (data.success && data.kezeles) {
          setCim(data.kezeles.cim || "");
          setSlug(data.kezeles.slug || "");
          setAr(data.kezeles.ar || "");
          editor?.commands.setContent(data.kezeles.tartalom || "");
        } else {
          alert("Nem található kezelés ezzel az ID-val.");
        }
      } catch (err) {
        console.error(err);
        alert("Hiba történt a kezelés betöltésekor");
      } finally {
        setLoading(false);
      }
    };

    fetchKezeles();
  }, [token, id, editor]);

  const handleSave = async () => {
    if (!token || !id) return;

    try {
      const res = await fetch(`http://localhost:5000/admin/kezelesek/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cim,
          ar,
          tartalom: editor?.getHTML(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Sikeresen mentve!");
        router.push("/admin/kezelesek-lista"); // ⬅ itt irányítás
      } else {
        alert("Hiba a mentés során!");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba a mentés során!");
    }
  };

  if (loading) return <div className="p-8">Betöltés...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kezelés szerkesztése</h1>

      <input
        type="text"
        value={cim}
        onChange={(e) => setCim(e.target.value)}
        placeholder="Kezelés neve"
        className="w-full mb-2 p-2 border rounded focus:ring-2 focus:ring-pink-400"
      />

        <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Kezelés slug címe"
        className="w-full mb-2 p-2 border rounded focus:ring-2 focus:ring-pink-400"
      />

      <input
        type="text"
        value={ar}
        onChange={(e) => setAr(e.target.value)}
        placeholder="Ár"
        className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-pink-400"
      />

      <EditorContent editor={editor} />

      <div className="mt-4 flex gap-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSave}
        >
          Mentés
        </button>

        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => router.push("/admin/kezelesek-lista")}
        >
          Vissza
        </button>
      </div>
    </div>
  );
}
