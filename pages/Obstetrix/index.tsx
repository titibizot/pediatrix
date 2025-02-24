// pages/Obstetrix/index.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Background from "../../components/Background";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";

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
    <Background backgroundImage="/fondobstetrix.jpg" style={{ backgroundSize: "110%" }}>
      {/* Conteneur global en flex pour répartir verticalement */}
      <div className="relative z-30 min-h-screen flex flex-col">
        {/* Barre de navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/Obstetrix" legacyBehavior>
                <a className="flex items-center cursor-pointer">
                  <Image
                    src="/logoobstetrix.jpg"
                    alt="Logo Obstetrix"
                    width={60}
                    height={60}
                    className="object-cover rounded-full"
                  />
                  <span className="ml-2 text-3xl font-bold text-blue-500">
                    Obstetrix
                  </span>
                </a>
              </Link>
            </div>
            {/* Liens de navigation pour desktop */}
            <div className="hidden sm:flex space-x-8">
              <Link href="/" legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:text-blue-300">
                  Page d'accueil
                </a>
              </Link>
              <Link href="/Obstetrix/game?mode=challenge" legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:text-blue-300">
                  Mode Challenge
                </a>
              </Link>
              <Link href="/Obstetrix/game?mode=libre" legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:text-blue-300">
                  Mode Libre
                </a>
              </Link>
            </div>
            {/* Bouton menu mobile */}
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
          {mobileMenuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <Link href="/Obstetrix" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-500 hover:text-gray-800">
                    Page d'accueil
                  </a>
                </Link>
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

          {/* Ajout du composant Banner */}
          <Banner title="Bienvenue sur Obstetrix" />
       

        {/* Zone centrale : flex-grow pour occuper l'espace restant et centrer le contenu */}
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6 text-center">
            <p className="mb-4 text-gray-700">
              Ce jeu, inspiré de{" "}
              <Link href="https://cemantix.certitudes.org/" legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
                  Cemantix
                </a>
              </Link>
              , met à l’épreuve vos connaissances en pédiatrie de façon ludique et stimulante.
              Il s'inspire du{" "}
              <Link href="https://www.pedia-univ.fr/deuxieme-cycle/referentiel/prefaces" legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
                  référentiel de pédiatrie
                </a>
              </Link>
              .
            </p>
            <ul className="mb-4 list-disc list-inside text-gray-700 text-left mx-auto">
              <li>
                <strong>Challenge</strong> : Relevez le défi quotidien en identifiant une maladie unique.
              </li>
              <li>
                <strong>Libre</strong> : Lancez autant de parties que vous le souhaitez avec un chronomètre pour limiter le temps.
              </li>
            </ul>
            <p className="mb-4 text-gray-700">
              Dans les deux modes, votre objectif est de deviner une maladie pédiatrique référencée dans notre base.
              Saisissez des mots-clés pour voir leur proximité avec la réponse. À vous de jouer !
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
        </main>
      </div>

      {/* Footer commun */}
      <Footer />
    </Background>
  );
}
