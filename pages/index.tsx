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
    <div className="min-h-screen bg-gray-100">
      {/* Barre de navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              {/* Logo agrandi dans la navbar */}
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Image 
                    src="/logo.jpeg" 
                    alt="Logo Pédiatrix" 
                    width={160} 
                    height={160} 
                    className="object-cover rounded-full"
                  />
                  <span className="ml-2 text-2xl font-bold text-blue-700">Pédiatrix</span>
                </div>
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link 
                href="/game?mode=challenge" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-blue-700"
              >
                Mode Challenge
              </Link>
              <Link 
                href="/game?mode=libre" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-green-500 hover:text-green-700"
              >
                Mode Libre
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
        </div>
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                href="/game?mode=challenge" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-700"
              >
                Mode Challenge
              </Link>
              <Link 
                href="/game?mode=libre" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-green-500 hover:text-green-700"
              >
                Mode Libre
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Header avec image de fond */}
      <div
        className="w-full h-64 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image-path.jpeg')", backgroundPosition: "50% 30%" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold text-white text-center pt-40">
          Bienvenue sur Pédiatrix
        </h1>
      </div>

      {/* Conteneur central avec fond de logo */}
      <div className="relative flex justify-center mt-8">
        {/* Logo en arrière-plan avec transparence */}
        <div className="absolute inset-0 flex justify-center items-center" style={{ zIndex: -1, opacity: 0.4 }}>
          <Image 
            src="/logo.jpeg" 
            alt="Logo en fond" 
            width={300} 
            height={300} 
            className="object-contain"
          />
        </div>
        <div className="relative max-w-2xl w-full bg-white shadow-md rounded-lg p-6 text-center">
          <p className="mb-4 text-gray-700">
            Ce jeu, inspiré de{" "}
            <Link href="https://cemantix.certitudes.org/" className="underline text-blue-600 hover:text-blue-800">
              Cemantix
            </Link>
            , met à l’épreuve vos connaissances en pédiatrie tout en vous offrant une expérience ludique et stimulante. Il propose deux modes de jeu distincts :
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
            Pour vous guider, saisissez des mots-clés (ex. : toux, fièvre, infectiologie…) qui s’illuminent en fonction de leur proximité avec la réponse.
            À vous de jouer !
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <Link
              href="/game?mode=challenge"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Mode Challenge
            </Link>
            <Link
              href="/game?mode=libre"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Mode Libre
            </Link>
          </div>
          <div className="mt-8">
            <p className="text-gray-700">
              Statistiques générales en Challenge : <br />
              <strong>{challengeCount}</strong> personnes ont trouvé le mot du jour aujourd'hui.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
