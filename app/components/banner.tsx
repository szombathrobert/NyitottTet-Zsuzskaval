"use client";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="w-full py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 mt-20">

        {/* Bal oldal - kép */}
        <div className="md:w-1/2 w-full flex justify-center">
          <div className="relative w-120 h-120 md:w-150 md:h-150 rounded-3xl">
            <Image
              src="/zsuzska.jpg" // public mappában legyen a kép
              alt="Zsuzska portré"
              fill
              className="object-contain" // object-contain biztosítja, hogy a teljes kép látszódjon
              priority
            />
          </div>
        </div>

        {/* Jobb oldal - szöveg */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center md:items-start text-center md:text-left px-4">
          <h1 className="text-3xl md:text-6xl font-bold mb-3 text-gray-800">
            NyitottTér – Zsuzskával
          </h1>
          <p className="text-xl italic text-gray-600">
            "Engedd, hogy a világod kitáruljon — minden pillanat egy választás!"
          </p>
        </div>

      </div>
    </section>
  );
}
