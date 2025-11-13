"use client";
import Image from "next/image";

export default function About() {
  return (
    <section className="w-full py-16" id="about">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-10">
        
        {/* BAL OLDAL - Kép (magas, arányos a szöveggel) */}
        <div className="md:w-1/2 w-full flex justify-center">
          <div className="relative w-full h-[650px] md:h-[750px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/zsuzska.jpg"
              alt="Czencz Zsuzsanna"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>

        {/* JOBB OLDAL - Szöveg (egyben, folytonosan) */}
        <div className="md:w-1/2 w-full space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Rólam
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-justify">
            Szia! Örülök, hogy itt vagy! Czencz Zsuzsanna vagyok, a NyitottTér-Zsuzskával oldal megálmodója.
            2024-ben csöppentem bele az Access világába, és azóta is megállíthatatlanul teremtem az életemet.
            Imádok kérdésben élni és használni az Access Consciousness eszközeit, amik mindig meghozzák a könnyedséget,
            és teret nyitnak az életemben. Megtanultam, hogy a választásunk teremt!
            Az első Bars tanfolyamomra úgy mentem el, hogy előtte még sosem kaptam kezelést, mégis egy teljesen új világ nyílt meg előttem.
            A tér kitágult, és nagyobb könnyedség van az életemben – fantasztikus változásokon mentem át ez idő alatt.
            2024 augusztusában végeztem el az első Bars tanfolyamot, és azóta kezelőként sok embernek hozzájárulás lehettem az életéhez.
            2025 elején több testkezelés tanfolyamon is részt vettem, és ennek tárházát folyamatosan bővítem.
            Ha te is kipróbálnál egy Access Bars vagy Access testkezelést, keress bátran az elérhetőségek bármelyikén.
          </p>
        </div>
      </div>
    </section>
  );
}
