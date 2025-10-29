import Image from "next/image";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { ReactNode } from "react";

interface FullDescription {
    fourth_section_third_content: any;
    fourth_section_second_content: any;
    fourt_section_fifth_bullet: any;
    fourt_section_fourth_bullet: any;
    fourt_section_third_bullet: any;
    fourt_section_second_bullet: any;
    fourt_section_first_bullet: any;
    fourth_section_content: ReactNode;
    fourth_section_heading: any;
    third_section_seventh_bullet: any;
    third_section_sixth_bullet: any;
    third_section_fifth_bullet: any;
    third_section_fourth_bullet: any;
    third_section_third_bullet: any;
    third_section_second_bullet: any;
    third_section_first_bullet: any;
    third_section_fourth_content: any;
    third_section_third_content: any;
    third_section_second_content: any;
    third_section_first_content: any;
    third_section_heading: any;
    second_section_content: any;
    second_heading: any;
    first_content_ending: any;
    first_content: any;
    heading: any;
   
 
}

interface Treatment {
  id: number;
  title: string;
  shortDescription: string;
  img: string;
  fullDescription: FullDescription[];
}

export default function BodyPage() {
  const filePath = path.join(process.cwd(), "public/data/treatments/testkezelesek.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const treatment: Treatment = JSON.parse(fileContent);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/kezelesek"
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

      {treatment.fullDescription.map((section, idx) => {
        // Ellenőrizzük, van-e legalább 1 bullet
        const hasBullets = section.third_section_first_bullet || section.third_section_second_bullet || section.third_section_third_bullet || section.fourt_section_first_bullet || section.fourt_section_second_bullet || section.fourt_section_third_bullet;

        return (
          <div key={idx} className="mb-10">

            {/* content starting here */}

            {section.heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-5">
                {section.heading}
              </h2>
            )}
            
            {section.first_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.first_content}
              </p>
            )}

            {section.first_content_ending && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.first_content_ending}
              </p>
            )}

            {/* content ending here */}

            {/* second section starting here */}

            {section.second_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-5">
                {section.second_heading}
              </h2>
            )}

            {section.second_section_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.second_section_content}
              </p>
            )}

            {/* second section ending here */}

            {/* third section starting here */}

            {section.third_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-5">
                {section.third_section_heading}
              </h2>
            )}

            {section.third_section_first_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.third_section_first_content}
              </p>
            )}

            
            {section.third_section_second_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.third_section_second_content}
              </p>
            )}

            {section.third_section_third_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.third_section_third_content}
              </p>
            )}

            {section.third_section_fourth_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.third_section_fourth_content}
              </p>
            )}

            {hasBullets && (
              <ul className="list-disc list-inside text-gray-700 text-xl md:text-2xl mb-10 space-y-2 marker:text-pink-500">
                {section.third_section_first_bullet && <li>{section.third_section_first_bullet}</li>}
                {section.third_section_second_bullet && <li>{section.third_section_second_bullet}</li>}
                {section.third_section_third_bullet && <li>{section.third_section_third_bullet}</li>}
                {section.third_section_fourth_bullet && <li>{section.third_section_fourth_bullet}</li>}
                {section.third_section_fifth_bullet && <li>{section.third_section_fifth_bullet}</li>}
                {section.third_section_sixth_bullet && <li>{section.third_section_sixth_bullet}</li>}
                {section.third_section_seventh_bullet && <li>{section.third_section_seventh_bullet}</li>}
              </ul>
            )}

            {/* third section ending here */}

            {/* fourth section starting here */}

            {section.fourth_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-5">
                {section.fourth_section_heading}
              </h2>
            )}

            {section.fourth_section_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.fourth_section_content}
              </p>
            )}

                        {hasBullets && (
              <ul className="list-disc list-inside text-gray-700 text-xl md:text-2xl mb-10 space-y-2 marker:text-pink-500">
                {section.fourt_section_first_bullet && <li>{section.fourt_section_first_bullet}</li>}
                {section.fourt_section_second_bullet && <li>{section.fourt_section_second_bullet}</li>}
                {section.fourt_section_third_bullet && <li>{section.fourt_section_third_bullet}</li>}
                {section.fourt_section_fourth_bullet && <li>{section.fourt_section_fourth_bullet}</li>}
                {section.fourt_section_fifth_bullet && <li>{section.fourt_section_fifth_bullet}</li>}
              </ul>
            )}

            {section.fourth_section_second_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.fourth_section_second_content}
              </p>
            )}

            {section.fourth_section_third_content && (
              <p className="text-gray-700 text-3xl md:text-4xl whitespace-pre-line mb-10">
                {section.fourth_section_third_content}
              </p>
            )}

            {/* fourth section ending here */}
          
          </div>
        );
      })}
    </div>
  );
}
