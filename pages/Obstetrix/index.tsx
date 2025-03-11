// pages/Obstetrix/index.tsx
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Background from "../../components/Background";
import Footer from "../../components/Footer";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Background backgroundImage="/fondobstetrix.jpg" style={{ backgroundSize: "110%" }}>
      <Head>
        <title>Obstetrix – Accueil</title>
      </Head>
      {/* Conteneur global */}
      <div className="relative z-30 min-h-screen flex flex-col">
        {/* Barre de navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/Obstetrix" legacyBehavior>
                <a className="flex items-center cursor-pointer focus:outline-none focus:ring">
                  <Image
                    src="/logoobstetrix.jpg"
                    alt="Logo Obstetrix"
                    width={60}
                    height={60}
                    className="object-cover rounded-full"
                  />
                  <span className="ml-2 text-3xl font-bold text-blue-900">
                    Obstetrix
                  </span>
                </a>
              </Link>
            </div>
            {/* Liens de navigation desktop */}
            <div className="hidden sm:flex space-x-8">
              <Link href="/" legacyBehavior>
                <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                  Page d'accueil
                </a>
              </Link>
              <Link href="/Obstetrix/game?mode=challenge" legacyBehavior>
                <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                  Mode Challenge
                </a>
              </Link>
              <Link href="/Obstetrix/game?mode=libre" legacyBehavior>
                <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                  Mode Libre
                </a>
              </Link>
            </div>
            {/* Bouton menu mobile */}
            <div className="flex items-center sm:hidden ml-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring"
              >
                <span className="sr-only">Ouvrir le menu</span>
                {mobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <Link href="/Obstetrix" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-500 hover:text-gray-800 focus:outline-none focus:ring">
                    Page d'accueil
                  </a>
                </Link>
                <Link href="/Obstetrix/game?mode=challenge" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring">
                    Mode Challenge
                  </a>
                </Link>
                <Link href="/Obstetrix/game?mode=libre" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-green-500 hover:text-green-700 focus:outline-none focus:ring">
                    Mode Libre
                  </a>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Zone centrale */}
        <main className="flex-grow flex items-center justify-center" role="main" aria-label="Contenu principal Obstetrix">
          <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Bienvenue sur Obstetrix
            </h1>
            <p className="mb-4 text-gray-800 text-lg leading-relaxed">
              Inspiré par{" "}
              <Link href="https://cemantix.certitudes.org/" legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-900 hover:text-blue-800 focus:outline-none focus:ring"
                >
                  Cemantix
                </a>
              </Link>
              , ce jeu vous plonge dans l’univers passionnant de la gynécologie-obstétrique. Votre mission est de diagnostiquer l’une des maladies proposées, couvrant l'ensemble du programme – de la grossesse à la contraception en passant par le cancer, et bien plus encore.
            </p>
            <ul className="mb-4 list-disc list-inside text-gray-800 text-lg leading-relaxed text-left mx-auto">
              <li>
                <strong>Challenge</strong> : Relevez le défi quotidien en identifiant une maladie unique par jour. Soyez le premier à trouver la réponse !
              </li>
              <li>
                <strong>Libre</strong> : Lancez autant de parties que vous le souhaitez, avec un chronomètre pour dynamiser l’expérience.
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <Link href="/Obstetrix/game?mode=challenge" legacyBehavior>
                <a className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring">
                  Mode Challenge
                </a>
              </Link>
              <Link href="/Obstetrix/game?mode=libre" legacyBehavior>
                <a className="px-4 py-2 bg-green-900 text-white rounded hover:bg-green-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring">
                  Mode Libre
                </a>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer commun */}
        <Footer />
      </div>
    </Background>
  );
}
