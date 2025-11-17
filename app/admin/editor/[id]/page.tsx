"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "next/link";
import { useAdminAuth } from "../../hook/useAdminAuth";

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

  // 🧠 FONTOS: csak akkor hozunk létre editort, ha window elérhető
  const editor =
    typeof window !== "undefined"
      ? useEditor({
          extensions: [
            StarterKit,
            TextStyle,
            FontSize,
            Underline,
            BulletList,
            OrderedList,
            ListItem,
          ],
          content: "",
          editorProps: {
            attributes: {
              class:
                "border p-4 rounded min-h-[300px] prose max-w-none focus:outline-none",
            },
          },
          immediatelyRender: false, // SSR fix
        })
      : null;

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    const fetchKezeles = async () => {
      if (!token || !id || !editor) return;
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
          editor.commands.setContent(data.kezeles.tartalom || "");
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
    if (!token || !id || !editor) return;
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
          tartalom: editor.getHTML(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Sikeresen mentve!");
        router.push("/admin/kezelesek-lista");
      } else {
        alert("Hiba a mentés során!");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba a mentés során!");
    }
  };

  if (!token) return null; // ide nem jut el, mert a hook átirányít

  if (loading || !editor) return <div className="p-8">Betöltés...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto mt-15">
            <Link
        href="/admin/dashboard"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        ← Vissza a dashboardra
      </Link>
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
        placeholder="Slug"
        className="w-full mb-2 p-2 border rounded focus:ring-2 focus:ring-pink-400"
      />

      <input
        type="text"
        value={ar}
        onChange={(e) => setAr(e.target.value)}
        placeholder="Ár"
        className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-pink-400"
      />

      {/* 🎨 Word-szerű toolbar */}
      <div className="flex flex-wrap gap-2 mb-3 border-b pb-2">
          <button
            onClick={() => editor.chain().focus().setFontSize('36px').run()}
            className={`px-4 py-2 rounded-full font-medium transition-colors
              ${editor?.isActive('textStyle', { fontSize: '36px' }) 
                ? 'bg-gray-700 text-white' 
                : 'bg-gray-900 text-gray-200 hover:bg-gray-500'}`}
            data-test-id="36px"
          >
            Nagy betűméret
          </button>
          <button
            onClick={() => editor.chain().focus().setFontSize('24px').run()}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${editor?.isActive('textStyle', { fontSize: '24px' }) 
                ? 'bg-gray-700 text-white' 
                : 'bg-gray-900 text-gray-200 hover:bg-gray-500'}`}
            data-test-id="24px"
          >
            Kis betűméret
          </button>
       <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            editor?.isActive("underline")
              ? "bg-gray-700 text-white"
              : "bg-gray-900 text-gray-200 hover:bg-gray-500"
          }`}
        >
          Aláhúzás
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            editor?.isActive("bulletList")
              ? "bg-gray-700 text-white"
              : "bg-gray-900 text-gray-200 hover:bg-gray-500"
          }`}
        >
          • Lista
        </button>

        <button
          onClick={() => editor.chain().focus().insertContent('<br>').run()}
          className="px-4 py-2 rounded-full font-medium bg-gray-900 text-gray-200 hover:bg-gray-500 transition-colors"
        >
          Sortörés (2x nyomd)
        </button>
      </div>

      <EditorContent editor={editor} />

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Mentés
        </button>
        <button
          onClick={() => router.push("/admin/kezelesek-lista")}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Vissza
        </button>
      </div>
    </div>
  );
}
