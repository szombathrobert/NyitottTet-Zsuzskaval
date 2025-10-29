import Image from "next/image";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { ReactNode } from "react";

interface FullDescription {
    fourth_section_ending: any;
    fourth_section_third_bullet: any;
    fourth_section_second_bullet: any;
    fourth_section_first_bullet: any;
    fourth_section_desc: any;
    fourth_section_type: any;
    fourth_section_heading: any;
    third_section_fifth_type_third_bullet: any;
    third_section_fifth_type_second_bullet: any;
    third_section_fifth_type_first_bullet: any;
    third_section_fifth_type: any;
    third_section_fourth_type_third_bullet: any;
    third_section_fourth_type_second_bullet: any;
    third_section_fourth_type_first_bullet: any;
    third_section_fourth_type: any;
    third_section_third_type_fourth_bullet: ReactNode;
    third_section_third_type_third_bullet: any;
    third_section_third_type_second_bullet: any;
    third_section_third_type_first_bullet: any;
    third_section_third_type: any;
    fourth_section_second_type_third_bullet: any;
    fourth_section_second_type_second_bullet: any;
    fourth_section_second_type_first_bullet: any;
    fourth_section_second_type: any;
    third_section_second_type_fourth_bullet: any;
    third_section_second_type_third_bullet: any;
    third_section_second_type_second_bullet: any;
    third_section_second_type_first_bullet: any;
    third_section_second_type: any;
    third_section_first_type_third_bullet: any;
    third_section_first_type_second_bullet: any;
    third_section_first_type: ReactNode;
third_section_first_type_first_bullet: any;
  third_section_heading: any;
  second_section_desc2: any;
  second_section_desc1: any;
  second_section_seventh_bullet: any;
  second_section_sixth_bullet: any;
  second_section_fifth_bullet: any;
  second_section_fourth_bullet: any;
  second_section_third_bullet: any;
  second_section_second_bullet: any;
  second_section_first_bullet: any;
  second_section_heading: any;
  heading?: string;
  first_section_heading?: string;
  first_bullet?: string;
  second_bullet?: string;
  third_bullet?: string;
  fourth_bullet?: string;
  fifth_bullet?: string;
  sixth_bullet?: string;
  seventh_bullet?: string;
  first_section_desc?: string;
}

interface Treatment {
  id: number;
  title: string;
  shortDescription: string;
  img: string;
  fullDescription: FullDescription[];
}

export default function AccessBarsKidsPage() {
  const filePath = path.join(process.cwd(), "public/data/treatments/access-bars-gyerekeknek.json");
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
        const hasBullets = section.first_bullet || section.second_bullet || section.third_bullet || section.second_section_first_bullet || section.second_section_second_bullet || section.second_section_third_bullet || section.fourth_section_first_bullet || section.fourth_section_second_bullet || section.fourth_section_third_bullet;

        return (
          <div key={idx} className="mb-10">
            {section.heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-5">
                {section.heading}
              </h2>
            )}

            {section.first_section_heading && (
              <h3 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-10">
                {section.first_section_heading}
              </h3>
            )}

            {hasBullets && (
              <ul className="list-disc list-inside  text-gray-700 text-xl md:text-2xl mb-15 space-y-2 marker:text-pink-500">
                {section.first_bullet && <li>{section.first_bullet}</li>}
                {section.second_bullet && <li>{section.second_bullet}</li>}
                {section.third_bullet && <li>{section.third_bullet}</li>}
                {section.fourth_bullet && <li>{section.fourth_bullet}</li>}
                {section.fifth_bullet && <li>{section.fifth_bullet}</li>}
                {section.sixth_bullet && <li>{section.sixth_bullet}</li>}
                {section.seventh_bullet && <li>{section.seventh_bullet}</li>}
              </ul>
            )}

            {section.first_section_desc && (
              <p className="text-gray-700 text-2xl md:text-4xl whitespace-pre-line mb-20">
                {section.first_section_desc}
              </p>
            )}

            {section.second_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-15">
                {section.second_section_heading}
              </h2>
            )}

            {hasBullets && (
              <ul className="list-disc list-inside text-gray-700 text-xl md:text-2xl mb-15 space-y-2 marker:text-pink-500">
                {section.second_section_first_bullet && <li>{section.second_section_first_bullet}</li>}
                {section.second_section_second_bullet && <li>{section.second_section_second_bullet}</li>}
                {section.second_section_third_bullet && <li>{section.second_section_third_bullet}</li>}
                {section.second_section_fourth_bullet && <li>{section.second_section_fourth_bullet}</li>}
                {section.second_section_fifth_bullet && <li>{section.second_section_fifth_bullet}</li>}
                {section.second_section_sixth_bullet && <li>{section.second_section_sixth_bullet}</li>}
                {section.second_section_seventh_bullet && <li>{section.second_section_seventh_bullet}</li>}
              </ul>
            )}

            {section.second_section_desc1 && (
              <p className="text-gray-700 text-2xl md:text-4xl whitespace-pre-line mb-10">
                {section.second_section_desc1}
              </p>
            )}

            {section.second_section_desc2 && (
              <p className="text-gray-700 text-2xl md:text-4xl whitespace-pre-line mb-20">
                {section.second_section_desc2}
              </p>
            )}

            {section.third_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-5">
                {section.third_section_heading}
              </h2>
            )}

              {section.third_section_first_type && (
                <ol className="list-decimal ml-6 space-y-4 text-xl md:text-2xl">
                    <li>
                    <h3 className="font-semibold text-gray-800 mb-2">{section.third_section_first_type}</h3>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                        {section.third_section_first_type_first_bullet && (
                        <li>{section.third_section_first_type_first_bullet}</li>
                        )}
                        {section.third_section_first_type_second_bullet && (
                        <li>{section.third_section_first_type_second_bullet}</li>
                        )}
                        {section.third_section_first_type_third_bullet && (
                        <li>{section.third_section_first_type_third_bullet}</li>
                        )}
                    </ul>
                    </li>
                </ol>
                )}

            {section.fourth_section_second_type && (
                <ol className="list-decimal ml-6 space-y-4 text-xl md:text-2xl" start={2}>
                    <li>
                    <h3 className="font-semibold text-gray-800 mb-2">{section.fourth_section_second_type}</h3>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                        {section.fourth_section_second_type_first_bullet && (
                        <li>{section.fourth_section_second_type_first_bullet}</li>
                        )}
                        {section.fourth_section_second_type_second_bullet && (
                        <li>{section.fourth_section_second_type_second_bullet}</li>
                        )}
                        {section.fourth_section_second_type_third_bullet && (
                        <li>{section.fourth_section_second_type_third_bullet}</li>
                        )}

                    </ul>
                    </li>
                </ol>
                )}

                 {section.third_section_third_type && (
                <ol className="list-decimal ml-6 space-y-4 text-xl md:text-2xl" start={3}>
                    <li>
                    <h3 className="font-semibold text-gray-800 mb-2">{section.third_section_third_type}</h3>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                        {section.third_section_third_type_first_bullet && (
                        <li>{section.third_section_third_type_first_bullet}</li>
                        )}
                        {section.third_section_third_type_second_bullet && (
                        <li>{section.third_section_third_type_second_bullet}</li>
                        )}
                        {section.third_section_third_type_third_bullet && (
                        <li>{section.third_section_third_type_third_bullet}</li>
                        )}
                        {section.third_section_third_type_third_bullet && (
                        <li>{section.third_section_third_type_fourth_bullet}</li>
                        )}
                    </ul>
                    </li>
                </ol>
                )}
                {section.third_section_fourth_type && (
                <ol className="list-decimal ml-6 space-y-4 text-xl md:text-2xl" start={4}>
                    <li>
                    <h3 className="font-semibold text-gray-800 mb-2">{section.third_section_fourth_type}</h3>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                        {section.third_section_fourth_type_first_bullet && (
                        <li>{section.third_section_fourth_type_first_bullet}</li>
                        )}
                        {section.third_section_fourth_type_second_bullet && (
                        <li>{section.third_section_fourth_type_second_bullet}</li>
                        )}
                        {section.third_section_fourth_type_third_bullet && (
                        <li>{section.third_section_fourth_type_third_bullet}</li>
                        )}
                    </ul>
                    </li>
                </ol>
                )}
                 {section.third_section_fifth_type && (
                <ol className="list-decimal ml-6 space-y-4 text-xl md:text-2xl" start={5}>
                    <li>
                    <h3 className="font-semibold text-gray-800 mb-2">{section.third_section_fifth_type}</h3>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                        {section.third_section_fifth_type_first_bullet && (
                        <li>{section.third_section_fifth_type_first_bullet}</li>
                        )}
                        {section.third_section_fifth_type_second_bullet && (
                        <li>{section.third_section_fifth_type_second_bullet}</li>
                        )}
                        {section.third_section_fifth_type_third_bullet && (
                        <li>{section.third_section_fifth_type_third_bullet}</li>
                        )}
                    </ul>
                    </li>
                </ol>
                )}

            {section.fourth_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-10">
                {section.fourth_section_heading}
              </h2>
            )}

              {section.fourth_section_desc && (
              <p className="text-gray-700 text-2xl md:text-4xl whitespace-pre-line mb-10">
                {section.fourth_section_desc}
              </p>
            )}

            {section.fourth_section_type && (
              <p className="text-gray-700 text-2xl md:text-4xl whitespace-pre-line mb-10">
                {section.fourth_section_type}
              </p>
            )}

            {hasBullets && (
              <ul className="list-disc list-inside text-gray-700 text-xl md:text-2xl mb-15 space-y-2 marker:text-pink-500">
                {section.fourth_section_first_bullet && <li>{section.fourth_section_first_bullet}</li>}
                {section.fourth_section_second_bullet && <li>{section.fourth_section_second_bullet}</li>}
                {section.fourth_section_third_bullet && <li>{section.fourth_section_third_bullet}</li>}
              </ul>
            )}

            {section.fourth_section_ending && (
              <p className="text-gray-700 text-2xl md:text-4xl whitespace-pre-line">
                {section.fourth_section_ending}
              </p>
            )}

          </div>
        );
      })}
    </div>
  );
}
