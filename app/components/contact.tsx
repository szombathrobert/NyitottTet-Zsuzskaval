"use client";
import { FaEnvelope, FaPhone, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import Link from 'next/link';

export default function Contact() {
  return (
    <section className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-0 flex flex-col items-center gap-8">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
          Kapcsolat
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          {/* Email */}
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-gray-800 text-lg md:text-3xl" />
            <Link
              href="mailto:czenczzsuzsanna@gmail.com"
              className="text-2xl md:text-2xl text-gray-700 hover:text-gray-900"
            >
              czenczzsuzsanna@gmail.com
            </Link>
          </div>

          {/* Telefon / WhatsApp */}
          <div className="flex items-center gap-4">
            <FaPhone className="text-gray-800 text-2xl md:text-3xl" />
            <Link
              href="tel:+36709072766"
              className="text-2xl md:text-2xl text-gray-700 hover:text-gray-900"
            >
              +36 70 907 2766
            </Link>
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-4">
            <FaInstagram className="text-gray-800 text-2xl md:text-3xl" />
            <Link
              href="https://www.instagram.com/czenczzsuzsanna"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:text-2xl text-gray-700 hover:text-gray-900"
            >
              czenczzsuzsanna
            </Link>
          </div>

          {/* Helyszín */}
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-gray-800 text-2xl md:text-3xl" />
            <span className="text-2xl md:text-2xl text-gray-700">
              Székesfehérvár, Széchenyi utca 47
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
