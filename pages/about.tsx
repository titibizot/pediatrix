// pages/about.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Background from "../components/Background";
import Footer from "../components/Footer";

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Background backgroundImage="/fonddiagnostix.jpeg">
      <div className="relative z-30 min-h-screen">
        {/* Barre de navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" legacyBehavior>
                <a className="flex items-center cursor-pointer">
                  <Image
                    src="/logodiagnostix.jpg"
                    alt="Logo Diagnostix"
                    width={60}
                    height={60}
                    className="object-cover rounded-full"
                  />
                  <span className="ml-2 text-3xl font-bold text-blue-500">
                    Diagnostix
                  </span>
                </a>
              </Link>
            </div>
            {/* Liens de navigation pour desktop */}
            <div className="hidden sm:flex space-x-8">
              <Link href="/" legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:text-blue-300">
                  Accueil
                </a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:text-blue-300">
                  Contact
                </a>
              </Link>
            </div>
            {/* Bouton menu mobile */}
            <div className="flex items-center sm:hidden ml-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-500 hover:text-blue-300 hover:bg-gray-100"
              >
                <span className="sr-only">Ouvrir le menu</span>
                {mobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <Link href="/" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 text-base font-medium text-blue-500 hover:bg-gray-50">
                    Accueil
                  </a>
                </Link>
                <Link href="/contact" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 text-base font-medium text-blue-500 hover:bg-gray-50">
                    Contact
                  </a>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Contenu principal */}
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 my-12">
            <h1 className="text-4xl font-bold mb-6 text-center">Qui sommes-nous ?</h1>
            <p className="text-gray-700 mb-4">
              Diagnostix est un projet collaboratif conçu pour mettre à l'épreuve vos connaissances médicales de manière ludique et interactive.
            </p>
            <p className="text-gray-700 mb-4">
              Ce jeu a été créé par :
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li><strong>Etienne Bizot</strong> – Pédiatre</li>
              <li><strong>Vincent Portet-Sulla</strong> – Virologue</li>
              <li><strong>Stanley Soussan</strong> – Interne en obstétrique</li>
            </ul>
            <p className="text-gray-700">
              Notre objectif est de rendre l'apprentissage des connaissances médicales accessible, amusant et stimulant. Merci de jouer et de nous accompagner dans cette aventure !
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/contact" legacyBehavior>
                <a className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Nous Contacter
                </a>
              </Link>
            </div>
            <div className="mt-6 text-center">
              <Link href="/" legacyBehavior>
                <a className="text-blue-500 hover:underline">Retour à l'accueil</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer commun */}
      <Footer />
    </Background>
  );
}
