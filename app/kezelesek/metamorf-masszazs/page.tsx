import Image from "next/image";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { ReactNode } from "react";

interface FullDescription {
    sixth_section_content_ending: any;
    fifth_section_sixth_bullet: any;
    fifth_section_fifth_bullet: any;
    third_section_fourth_bullet: any;
    third_section_third_bullet: any;
    third_section_second_bullet: any;
    third_section_first_bullet: any;
    second_section_fourth_bullet: any;
    second_section_third_bullet: any;
    second_section_second_bullet: any;
    second_section_first_bullet: any;
    fourth_content: any;
    third_content: any;
    sixth_section_content: any;
    sixth_section_heading: any;
    fifth_section_fourth_bullet: any;
    fifth_section_third_bullet: any;
    fifth_section_second_bullet: any;
    fifth_section_first_bullet: any;
    fifth_section_first_content: any;
    fifth_section_heading: any;
    fourth_section_fifth_bullet: any;
    fourth_section_fourth_bullet: any;
    fourth_section_third_bullet: any;
    fourth_section_second_bullet: any;
    fourth_section_first_bullet: any;
    fourth_section_heading: any;
    third_section_second_content: any;
    third_section_first_content: any;
    third_section_heading: any;
    second_section_third_content: any;
    second_section_second_content: any;
    second_section_first_content: any;
    second_section_heading: any;
    second_content: any;
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

export default function MetamorfPage() {
  const filePath = path.join(process.cwd(), "public/data/treatments/metamorf-masszazs.json");
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
        const hasBullets = section.second_section_first_bullet || section.second_section_second_bullet || section.second_section_third_bullet ||section.fourth_section_first_bullet || section.third_section_first_bullet || section.third_section_second_bullet || section.third_section_third_bullet || section.fourth_section_second_bullet || section.fourth_section_third_bullet || section.fifth_section_first_bullet || section.fifth_section_second_bullet || section.fifth_section_third_bullet;

        return (
          <div key={idx} className="mb-10">

            {/* section start here */}
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

            {section.second_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.second_content}
              </p>
            )}

            {section.third_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.third_content}
              </p>
            )}

            {section.fourth_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-10">
                {section.fourth_content}
              </p>
            )}

            {/* section ends here  */}


            {/* second section starts here */}

            {section.second_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-10">
                {section.second_section_heading}
              </h2>
            )}

             {hasBullets && (
              <ul className="list-disc list-inside text-gray-700 text-xl md:text-2xl mb-15 space-y-2 marker:text-pink-500">
                {section.second_section_first_bullet && <li>{section.second_section_first_bullet}</li>}
                {section.second_section_second_bullet && <li>{section.second_section_second_bullet}</li>}
                {section.second_section_third_bullet && <li>{section.second_section_third_bullet}</li>}
                {section.second_section_fourth_bullet && <li>{section.second_section_fourth_bullet}</li>}
              </ul>
            )}
           
            {/* second section end here */}

            {/* third section starts here */}

            {section.third_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-10">
                {section.third_section_heading}
              </h2>
            )}
            
            {hasBullets && (
              <ul className="list-disc list-inside text-gray-700 text-xl md:text-2xl mb-15 space-y-2 marker:text-pink-500">
                {section.third_section_first_bullet && <li>{section.third_section_first_bullet}</li>}
                {section.third_section_second_bullet && <li>{section.third_section_second_bullet}</li>}
                {section.third_section_third_bullet && <li>{section.third_section_third_bullet}</li>}
                {section.third_section_fourth_bullet && <li>{section.third_section_fourth_bullet}</li>}
              </ul>
            )}

            {/* third section ends here */}

            {/* Fourth Section Starting Here */}

            {section.fourth_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-10">
                {section.fourth_section_heading}
              </h2>
            )}

            {hasBullets && (
              <ul className="list-disc list-inside text-gray-700 text-xl md:text-2xl mb-15 space-y-2 marker:text-pink-500">
                {section.fourth_section_first_bullet && <li>{section.fourth_section_first_bullet}</li>}
                {section.fourth_section_second_bullet && <li>{section.fourth_section_second_bullet}</li>}
                {section.fourth_section_third_bullet && <li>{section.fourth_section_third_bullet}</li>}
                {section.fourth_section_fourth_bullet && <li>{section.fourth_section_fourth_bullet}</li>}
              </ul>
            )}
           
            {/* Fourth Section Ending Here */}

            {/* Fifth Section Starting Here */}


            {section.fifth_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-10">
                {section.fifth_section_heading}
              </h2>
            )}

            {hasBullets && (
              <ul className="list-disc list-inside text-gray-700 text-xl md:text-2xl mb-15 space-y-2 marker:text-pink-500">
                {section.fifth_section_first_bullet && <li>{section.fifth_section_first_bullet}</li>}
                {section.fifth_section_second_bullet && <li>{section.fifth_section_second_bullet}</li>}
                {section.fifth_section_third_bullet && <li>{section.fifth_section_third_bullet}</li>}
                {section.fifth_section_fourth_bullet && <li>{section.fifth_section_fourth_bullet}</li>}
                {section.fifth_section_fifth_bullet && <li>{section.fifth_section_fifth_bullet}</li>}
                {section.fifth_section_sixth_bullet && <li>{section.fifth_section_sixth_bullet}</li>}
              </ul>
            )}

            {/* Fifth Section Ending Here */}

            {/* Sixth Section Starting Here */}

            {section.sixth_section_heading && (
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-10">
                {section.sixth_section_heading}
              </h2>
            )}
            
            {section.sixth_section_content && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-5">
                {section.sixth_section_content}
              </p>
            )}

            {section.sixth_section_content_ending && (
              <p className="text-gray-700 text-2xl md:text-3xl whitespace-pre-line mb-5">
                {section.sixth_section_content_ending}
              </p>
            )}

            {/* Sixth Section Ending Here */}

          </div>
        );
      })}
    </div>
  );
}
