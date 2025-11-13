import Link from "next/link";

interface Kezeles {
  id: number;
  cim: string;
  slug: string;
  img?: string;
  shortDescription?: string;
}

export default async function KezelesekPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kezelesek`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-center text-red-600 mt-20">
        Nem sikerült betölteni a kezeléseket 😢
      </div>
    );
  }

  const kezelések: Kezeles[] = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 mt-10 animate-fadeIn">
      <Link
        href="/"
        className="inline-block mb-6 text-gray-700 hover:text-indigo-600 transition-colors text-lg font-medium"
      >
        ← Vissza a kezdőlapra
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
        Kezelések
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {kezelések.map((k, i) => (
          <Link
            href={`/kezelesek/${k.slug}`}
            key={k.slug}
            className="relative rounded-3xl overflow-hidden shadow-xl bg-white/60 backdrop-blur-md border border-white/20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out opacity-0 animate-fadeCard"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {k.img && (
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={k.img}
                  alt={k.cim}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            )}

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {k.cim}
              </h2>
              {k.shortDescription && (
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {k.shortDescription}
                </p>
              )}
              <span className="inline-flex items-center text-indigo-600 font-medium">
                Részletek →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
