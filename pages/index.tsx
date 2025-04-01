// pages/index.tsx
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Background from "../components/Background";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Gestionnaire d'accès administrateur
  const handleAdminAccess = () => {
    const code = window.prompt("Entrez le code d'accès administrateur:");
    if (code === "UPSEnseignant") {
  localStorage.setItem("adminAccess", "true");
  router.push("/admin");
} else {
  window.alert("Code incorrect !");
}
  };

  return (
    <Background backgroundImage="/fonddiagnostix.jpeg">
      <Head>
        <title>Diagnostix – Accueil</title>
      </Head>

      <div className="relative z-30">
        {/* Barre de navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" legacyBehavior>
                <a className="flex items-center cursor-pointer focus:outline-none focus:ring">
                  <Image
                    src="/logodiagnostix.jpg"
                    alt="Logo Diagnostix"
                    width={80}
                    height={80}
                    className="object-cover rounded-full"
                  />
                  <span className="ml-2 text-3xl font-bold text-blue-900">
                    Diagnostix
                  </span>
                </a>
              </Link>
            </div>
            <div className="hidden sm:flex space-x-8">
              <Link href="/Pediatrix" legacyBehavior>
                <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                  Pédiatrix
                </a>
              </Link>
              <Link href="/Obstetrix" legacyBehavior>
                <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                  Obstetrix
                </a>
              </Link>
              <Link href="/Microbiologix" legacyBehavior>
                <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                  Microbiologix
                </a>
              </Link>
              <Link href="/ASuivre" legacyBehavior>
                <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                  À suivre
                </a>
              </Link>
            </div>
            <div className="flex items-center sm:hidden ml-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-blue-900 hover:text-blue-800 focus:outline-none focus:ring"
              >
                <span className="sr-only">Ouvrir le menu</span>
                Menu
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <Link href="/Pediatrix" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 text-base font-medium text-blue-900 hover:bg-gray-100 focus:outline-none focus:ring">
                    Pédiatrix
                  </a>
                </Link>
                <Link href="/Obstetrix" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 text-base font-medium text-blue-900 hover:bg-gray-100 focus:outline-none focus:ring">
                    Obstetrix
                  </a>
                </Link>
                <Link href="/Microbiologix" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 text-base font-medium text-blue-900 hover:bg-gray-100 focus:outline-none focus:ring">
                    Microbiologix
                  </a>
                </Link>
                <Link href="/ASuivre" legacyBehavior>
                  <a className="block pl-3 pr-4 py-2 text-base font-medium text-blue-900 hover:bg-gray-100 focus:outline-none focus:ring">
                    À suivre
                  </a>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Section d'introduction */}
        <div
          className="container mx-auto py-12 px-4"
          role="main"
          aria-label="Introduction à Diagnostix"
        >
          <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-md text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
             Bienvenue sur Diagnostix
            </h1>
            <p className="mb-4 text-2xl md:text-3xl text-gray-800 text-lg leading-relaxed">
              <strong>Chère joueuse, cher joueur</strong>
            </p>
            <p className="mb-4 text-gray-800 text-lg leading-relaxed">
              Pour être passés par là avant toi, nous savons ce que tu traverses et à quel
              point lire et relire les collèges peut devenir lassant… C’est pourquoi nous te
              proposons une nouvelle méthode de révision inspirée de{" "}
              <Link href="https://cemantix.certitudes.org/" legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-900 hover:text-blue-800 focus:outline-none focus:ring"
                >
                  Cemantix
                </a>
              </Link>
              , simple et ludique : il te suffit d’un accès internet et d’un écran.
            </p>
            <p className="mb-4 text-gray-800 text-lg leading-relaxed">
              Tu auras le choix entre plusieurs spécialités – par exemple, pédiatrie, microbiologie
              et gynécologie-obstétrique (les autres arriveront progressivement) – ainsi qu’un mode «
              général » qui regroupe l’ensemble des bases de données.
            </p>
            <p className="mb-4 text-gray-800 text-lg leading-relaxed">
              Le principe du jeu est le suivant : en proposant des mots-clés en rapport avec la
              spécialité, tu devras deviner la maladie en question. Pour t’aider, chaque mot saisi s’affichera
              dans une couleur indiquant sa pertinence :
            </p>
            <ul className="mb-4 text-gray-800 text-lg leading-relaxed list-disc list-inside">
              <li>
                <strong className="text-red-600">Rouge</strong> : le mot n’a pas de lien avec la maladie.
              </li>
              <li>
                <strong className="text-orange-600">Orange</strong> : le mot se rapproche du thème.
              </li>
              <li>
                <strong className="text-green-600">Vert</strong> : le mot fait partie des mots-clés associés à la maladie dans notre base.
              </li>
            </ul>
            <p className="mb-4 text-gray-800 text-lg leading-relaxed">
              Les maladies à deviner correspondent aux programmes des Épreuves Dématérialisées
              Nationales (EDN).
            </p>
            <p className="mb-4 text-gray-800 text-lg leading-relaxed">
              Que tu joues seul ou en groupe, l’objectif est de réviser tout en t’amusant – oui, c’est
              possible ! Ce jeu t’aidera à ancrer les mots-clés essentiels pour mieux retenir les
              informations.
            </p>
            <p className="mb-8 text-gray-800 text-lg leading-relaxed">
              Bon courage, tous tes efforts paieront bientôt, et tu peux déjà être fier de tout ce
              que tu as accompli jusqu’à présent !
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <Link href="/game?mode=challenge" legacyBehavior>
                <a className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring">
                  Mode Challenge Général
                </a>
              </Link>
              <Link href="/game?mode=libre" legacyBehavior>
                <a className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring">
                  Mode Libre Général
                </a>
              </Link>
            </div>
            {/* Bouton Accès Bonus et Accès Administrateur */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              <Link href="/Bonus/game" legacyBehavior>
                <a className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring">
                  Mode entrainement BONUS
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Section Spécialités */}
        <div className="container mx-auto py-8 px-4">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
            Spécialités
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Link href="/Pediatrix" legacyBehavior>
              <a className="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring">
                <Image
                  src="/logopediatrix.jpg"
                  alt=""
                  width={80}
                  height={80}
                  className="object-cover rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold text-center text-gray-900">
                  Pédiatrix
                </h3>
              </a>
            </Link>
            <Link href="/Obstetrix" legacyBehavior>
              <a className="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring">
                <Image
                  src="/logoobstetrix.jpg"
                  alt=""
                  width={80}
                  height={80}
                  className="object-cover rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold text-center text-gray-900">
                  Obstetrix
                </h3>
              </a>
            </Link>
            <Link href="/Microbiologix" legacyBehavior>
              <a className="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring">
                <Image
                  src="/logomicrobiologix.jpeg"
                  alt=""
                  width={80}
                  height={80}
                  className="object-cover rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold text-center text-gray-900">
                  Microbiologix
                </h3>
              </a>
            </Link>
            <Link href="/ASuivre" legacyBehavior>
              <a className="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring">
                <Image
                  src="/logoasuivre.jpg"
                  alt=""
                  width={80}
                  height={80}
                  className="object-cover rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold text-center text-gray-900">
                  À suivre
                </h3>
              </a>
            </Link>
          </div>
        </div>
      </div>
	  <div className="container mx-auto py-4 px-4">
          <div className="text-center">
            <button
              onClick={handleAdminAccess}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring"
            >
              Accès administrateur
            </button>
          </div>
        </div>
      <Footer />
    </Background>
  );
}

function handleAdminAccess() {
  const code = window.prompt("Entrez le code d'accès administrateur :");
  if (code === "UPSEnseignant") {
    // Redirection vers la page admin, ici on utilise simplement location.href
    window.location.href = "/admin";
  } else {
    window.alert("Code incorrect !");
  }
}
