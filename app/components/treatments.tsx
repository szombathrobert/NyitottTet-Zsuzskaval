"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Treatment {
  id: number;
  title: string;
  desc: string;
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
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
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
              <div className="relative w-full h-72 md:h-96">
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {treatment.title}
              </h3>
              <p className="text-gray-600 mb-6">{treatment.desc}</p>
              <Link
                href={treatment.link}
                className="bg-[#A0937D] hover:bg-[#8a836e] text-white px-5 py-2 rounded-xl transition"
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
