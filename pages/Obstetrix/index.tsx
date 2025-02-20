// pages/Obstetrix/index.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [challengeCount, setChallengeCount] = useState(0);

  // Récupérer le nombre de réponses correctes en mode Challenge via l'API
  useEffect(() => {
    axios
      .get("/api/challengeStats")
      .then((res) => {
        setChallengeCount(res.data.count);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/fondobstetrix.jpg')",
        backgroundSize: "90%", // Dézoomé pour voir toute l'image
      }}
    >
      {/* Contenu principal placé au-dessus du fond */}
      <div className="relative z-30">
        {/* Barre de navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/" legacyBehavior>
                <a className="flex items-center cursor-pointer">
                  <Image
                    src="/logo.jpg"
                    alt="Logo Obstetrix"
                    width={160}
                    height={160}
                    className="object-cover rounded-full"
                  />
                  <span className="ml-2 text-3xl font-bold text-blue-700">
                    Obstetrix
                  </span>
                </a>
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link href="/Obstetrix/game?mode=challenge" legacyBehavior>
                <a className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-blue-700">
                  Mode Challenge
                </a>
              </Link>
              <Link href="/Obstetrix/game?mode=libre" legacyBehavior>
                <a className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-green-500 hover:text-green-700">
                  Mode Libre
                </a>
              </Link>
            </div>
            <div className="flex items-center sm:hidden ml-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <Link href="/Obstetrix/game?mode=challenge" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-700">
                    Mode Challenge
                  </a>
                </Link>
                <Link href="/Obstetrix/game?mode=libre" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-green-500 hover:text-green-700">
                    Mode Libre
                  </a>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Header principal */}
        <header className="relative h-64 flex justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 text-center z-40">
            Bienvenue sur Obstetrix
          </h1>
        </header>

        {/* Conteneur central avec fond de logo */}
        <div className="relative flex justify-center mt-8">
          <div className="relative max-w-2xl w-full bg-white shadow-md rounded-lg p-6 text-center">
            <p className="mb-4 text-gray-700">
              Ce jeu, inspiré de{" "}
              <Link href="https://cemantix.certitudes.org/" legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  Cemantix
                </a>
              </Link>
              , met à l’épreuve vos connaissances en pédiatrie tout en vous offrant une expérience ludique et stimulante.
              Il est inspiré du{" "}
              <Link href="https://www.pedia-univ.fr/deuxieme-cycle/referentiel/prefaces" legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  référentiel de pédiatrie
                </a>
              </Link>
              .
            </p>
            <ul className="mb-4 list-disc list-inside mx-auto text-left">
              <li>
                <strong>Challenge</strong> : Chaque jour, relevez le défi en identifiant une unique maladie. Soyez le premier parmi vos amis à trouver la réponse !
              </li>
              <li>
                <strong>Libre</strong> : Lancez autant de parties que vous le souhaitez. Un chronomètre est présent pour limiter le temps de jeu.
              </li>
            </ul>
            <p className="mb-4 text-gray-700">
              Dans les deux modes, votre objectif est de deviner une maladie pédiatrique référencée dans notre base de données.
              Pour vous guider, saisissez des mots-clés (ex. : toux, éruption, nephrologie…) qui s’illuminent en fonction de leur proximité avec la réponse.
              À vous de jouer !
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <Link href="/Obstetrix/game?mode=challenge" legacyBehavior>
                <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform transform hover:scale-105">
                  Mode Challenge
                </a>
              </Link>
              <Link href="/Obstetrix/game?mode=libre" legacyBehavior>
                <a className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform hover:scale-105">
                  Mode Libre
                </a>
              </Link>
            </div>
            <div className="mt-8">
              <p className="text-gray-700">
                <strong>Statistiques générales en Challenge :</strong> <br />
                <strong>{challengeCount}</strong> personnes ont trouvé le mot du jour aujourd'hui.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white py-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Link href="/contact" legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-700 hover:underline"
                >
                  Formulaire de Contact
                </a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-700 hover:underline"
                >
                  Qui sommes-nous ?
                </a>
              </Link>
            </div>
            <p className="mt-4 text-gray-400 text-xs">
              © {new Date().getFullYear()} Diagnostix. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
