"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Treatment {
  id: number;
  title: string;
  shortDescription: string;
  img: string;
  link: string;
}

export default function Treatments() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kezelesek`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Nem sikerült betölteni az adatokat");

        const data = await res.json();

        const mapped: Treatment[] = data.map((item: any) => ({
          id: item.id,
          title: item.cim ?? item.title,
          shortDescription: item.shortDescription ?? item.rovid_leiras ?? "",
          img: item.img ?? "",
          link: `/kezelesek/${item.slug}`,
        }));

        // ABC sorrendbe rendezés a title alapján
       mapped.sort((a, b) => a.title.localeCompare(b.title));

        setTreatments(mapped);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTreatments();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-600 mt-20">
        {error} 😢
      </div>
    );
  }

  return (
    <section id="treatments" className="py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
          Kezelések
        </h2>

        {treatments.map((treatment, index) => (
          <div
            key={treatment.id}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Szöveg */}
            <div className="md:w-1/2 w-full text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {treatment.title}
              </h3>
              <p className="text-gray-600 mb-6 text-xl md:text-2xl">
                {treatment.shortDescription}
              </p>
              <Link
                href={treatment.link}
                className="bg-[#A0937D] hover:bg-[#8a836e] text-white px-5 py-2 rounded-xl transition text-xl md:text-xl"
              >
                Tovább a kezelésre
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
