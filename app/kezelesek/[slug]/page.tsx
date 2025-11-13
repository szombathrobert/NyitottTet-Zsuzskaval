"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Kezeles {
  id: number;
  cim: string;
  slug: string;
  tartalom: string;
  ar: string;
  kep?: string; // ha majd lesz kép
}

export default function KezelesPage() {
  const { slug } = useParams();
  const [kezeles, setKezeles] = useState<Kezeles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchKezeles = async () => {
      try {
        const res = await fetch(`http://localhost:5000/admin/kezelesek/slug/${slug}`);
        const data = await res.json();

        if (data.success) {
          setKezeles(data.kezeles);
        } else {
          console.error("Nem található kezelés.");
        }
      } catch (err) {
        console.error("Hiba a lekérés során:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKezeles();
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Betöltés...</div>;
  if (!kezeles) return <div className="p-8 text-center">Nem található ez a kezelés.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/kezelesek"
        className="inline-block mt-8 px-6 py-3 text-gray-800 rounded-lg transition-colors"
      >
        ← Vissza a kezelésekhez
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        {kezeles.cim}
      </h1>

      <div
        className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: kezeles.tartalom }}
      />
      
      {/* ha később lesz kép */}
      {kezeles.kep && (
        <div className="w-full h-80 md:h-[500px] relative mb-8 rounded-3xl overflow-hidden">
          <Image
            src={kezeles.kep}
            alt={kezeles.cim}
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>
      )}
    </div>


  );
}
