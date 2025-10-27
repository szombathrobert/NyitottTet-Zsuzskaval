import Image from "next/image";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { ReactNode } from "react";

interface FullDescription {
  first_content: ReactNode;
  second_content: ReactNode;
  third_content: ReactNode;
  fourth_content: ReactNode;
  fifth_content: ReactNode;
  sixth_content: ReactNode;
  seventh_content: ReactNode;
  eight_content: ReactNode;
  nineth_content: ReactNode;
  second_heading: ReactNode;
  third_heading: ReactNode;
  fourth_heading: ReactNode;
  fifth_heading: ReactNode;
  sixth_heading: ReactNode;
  seventh_heading: ReactNode;
  eight_heading: ReactNode;
  heading: string;
  content: string;
}

interface Treatment {
  id: number;
  title: string;
  shortDescription: string;
  img: string;
  fullDescription: FullDescription[];
}

export default function AccessBarsPage() {
  const filePath = path.join(process.cwd(), "public/data/treatments/access-facelift.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const treatment: Treatment = JSON.parse(fileContent);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
        
      <Link
        href="#kezelesek"
        className="inline-block mt-8 px-6 py-3 text-gray-800 rounded-lg transition-colors"
      >
        ← Vissza a kezelésekhez
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{treatment.title}</h1>

      <div className="w-full h-80 md:h-[500px] relative mb-8 rounded-3xl overflow-hidden">
        <Image
          src={treatment.img}
          alt={treatment.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <p className="text-xl text-gray-600 mb-8">{treatment.shortDescription}</p>

      {treatment.fullDescription.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-5">{section.heading}</h2>
          <p className="text-gray-700 text-xl md:text-2xl whitespace-pre-line mb-10">{section.first_content}</p>
          <p className="text-gray-700 text-xl md:text-2xl whitespace-pre-line mb-20">{section.second_content}</p>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-5">{section.second_heading}</h2>
          <p className="text-gray-700 text-xl md:text-2xl whitespace-pre-line mb-20">{section.third_content}</p>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-5">{section.third_heading}</h2>
          <p className="text-gray-700 text-xl md:text-2xl whitespace-pre-line mb-20">{section.fourth_content}</p>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-5">{section.fourth_heading}</h2>
          <p className="text-gray-700 text-xl md:text-2xl whitespace-pre-line mb-20">{section.fifth_content}</p>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-5">{section.fifth_heading}</h2>
          <p className="text-gray-700 text-xl md:text-2xl whitespace-pre-line mb-20">{section.sixth_content}</p>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-5">{section.sixth_heading}</h2>
          <p className="text-gray-700 text-xl md:text-2xl whitespace-pre-line mb-20">{section.seventh_content}</p>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-5">{section.seventh_heading}</h2>
          <p className="text-gray-700 text-xl md:text-2xl whitespace-pre-line mb-20">{section.eight_content}</p>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-5">{section.eight_heading}</h2>
          <p className="text-gray-700 text-xl md:text-2xl whitespace-pre-line">{section.nineth_content}</p>
        </div>
      ))}

    </div>
  );
}
