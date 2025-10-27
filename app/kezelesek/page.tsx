import Link from "next/link";
import fs from "fs";
import path from "path";

interface TreatmentListItem {
  title: string;
  shortDescription: string;
  img: string;
}

export default function TreatmentsPage() {
  const dir = path.join(process.cwd(), "public/data/treatments");
  const files = fs.readdirSync(dir);

  const treatments = files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), "utf-8");
    const json = JSON.parse(content);
    return {
      title: json.title,
      shortDescription: json.shortDescription,
      img: json.img,
      slug: file.replace(".json", "")
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Kezelések</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {treatments.map((treatment) => (
          <Link
            href={`/kezelesek/${treatment.slug}`}
            key={treatment.slug}
            className="border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img src={treatment.img} alt={treatment.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{treatment.title}</h2>
              <p className="text-gray-600">{treatment.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
