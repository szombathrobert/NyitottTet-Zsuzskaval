import React from "react";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="shadow-lg border-t border-gray-500">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Bal oldal – logó és copyright */}
        <div className="flex flex-col items-center md:items-start text-gray-600">
          <Link href="/" className="text-lg md:text-3xl font-semibold text-gray-800">
            NyitottTér
          </Link>
          <span className="text-sm text-gray-500">© {new Date().getFullYear()} Minden jog fenntartva.</span>
        </div>

        {/* Jobb oldal – közösségi ikonok */}
        <div className="flex space-x-4">
            <div>
                            <Link
              href="mailto:czenczzsuzsanna@gmail.com"
              className="text-2xl md:text-2xl text-gray-700 hover:text-gray-900"
            >
              <FaEnvelope/>
            </Link>
            </div>
          <div>
            <Link
              href="tel:+36709072766"
              className="text-2xl md:text-2xl text-gray-700 hover:text-gray-900"
            >
              <FaPhone/>
            </Link>
          </div>
          <div>
              <Link
                href="https://www.instagram.com/czenczzsuzsanna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 text-2xl"
            >
                <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
