import fs from "fs";
import path from "path";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface ContactInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    monday_friday: string;
    saturday: string;
    sunday: string;
  };
  mapEmbed?: string;
}

export default function ContactPage() {
  const filePath = path.join(process.cwd(), "public/data/contact.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const contact: ContactInfo = JSON.parse(fileContent);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 mt-5">
      <Link
        href="/"
        className="inline-block mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        ← Vissza a kezdőlapra
      </Link>
      <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-12">
        Kapcsolat
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Bal oldali kontakt kártyák */}
        <div className="space-y-8">
          <div className="bg-white/70 backdrop-blur-sm border border-pink-100 shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">{contact.name}</h2>

            <div className="space-y-3 text-gray-700 text-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-pink-500" />
                <span>{contact.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-pink-500" />
                <a href={`tel:${contact.phone}`} className="hover:text-pink-600 transition">
                  {contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-pink-500" />
                <a href={`mailto:${contact.email}`} className="hover:text-pink-600 transition">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Jobb oldali térkép */}
        {contact.mapEmbed && (
          <div className="rounded-2xl overflow-hidden shadow-md border border-pink-100">
            <iframe
              src={contact.mapEmbed}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
