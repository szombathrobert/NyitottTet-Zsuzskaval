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

  useEffect(() => {
    fetch("/data/treatments.json")
    .then((res) => res.json())
    .then((data) => setTreatments(data));
  }, []);

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
            {/* Kép */}
            <div className="md:w-1/2 w-full flex justify-center">
              <div className="relative w-100 h-50 md:h-70">
                <Image
                  src={treatment.img}
                  alt={treatment.title}
                  fill
                  className="object-cover rounded-3xl shadow-md"
                />
              </div>
            </div>

            {/* Szöveg */}
            <div className="md:w-1/2 w-full text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {treatment.title}
              </h3>
              <p className="text-gray-600 mb-6 text-xl md:text-2xl">{treatment.shortDescription}</p>
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
