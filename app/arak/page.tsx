import fs from "fs";
import path from "path";

interface PriceItem {
  id: number;
  category: string;
  title: string;
  price: string;
}

export default function PricesPage() {
  const filePath = path.join(process.cwd(), "public/data/prices.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const prices: PriceItem[] = JSON.parse(fileContent);

  // Kategóriák egyedileg
  const categories = [...new Set(prices.map((item) => item.category))];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 mt-20">
      <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-12">
        Árak
      </h1>

      {categories.map((category) => (
        <div key={`category-${category}`} className="mb-16">
          <h2 className="text-3xl font-semibold text-pink-600 mb-8 border-b-2 border-pink-200 pb-2">
            {category}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {prices
              .filter((item) => item.category === category)
              .map((item) => (
                <div
                  key={`price-${item.id}-${item.title}`}
                  className="bg-white/60 backdrop-blur-sm border border-pink-100 shadow-md rounded-2xl p-6 transition hover:shadow-lg hover:bg-white/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <span className="text-lg font-bold text-pink-600">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
