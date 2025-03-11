// components/Footer.js
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <Link href="/contact" legacyBehavior>
            <a className="text-sm font-medium text-blue-900 hover:underline">
              Formulaire de Contact
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-sm font-medium text-blue-900 hover:underline">
              Qui sommes-nous ?
            </a>
          </Link>
        </div>
        <p className="mt-4 text-gray-600 text-xs">
          © {new Date().getFullYear()} Diagnostix. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
