// pages/index.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    // Conteneur racine avec le fond d'écran "dézoomé"
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/fonddiagnostix.jpg')",
        backgroundSize: "100%", // Dézoomé pour voir toute l'image
      }}
    >
      
      {/* Contenu principal placé au-dessus du fond */}
      <div className="relative z-30">
        {/* Barre de navigation*/}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/" legacyBehavior>
                <a className="flex items-center cursor-pointer">
                  <Image 
                    src="/logodiagnostix.jpg" 
                    alt="Logo Diagnostix" 
                    width={100} 
                    height={100} 
                    className="object-cover rounded-full"
                  />
                  <span className="ml-2 text-3xl font-bold text-blue-700">Diagnostix</span>
                </a>
              </Link>
            </div>
            <div className="hidden sm:flex space-x-8">
              <Link href="/Pediatrix" legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:text-blue-300">
                  Pédiatrix
                </a>
              </Link>
              <Link href="/Obstetrix" legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:text-blue-300">
                  Obstetrix
                </a>
              </Link>
              <Link href="/Microbiologix" legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:text-blue-300">
                  Microbiologix
                </a>
              </Link>
              <Link href="/ASuivre" legacyBehavior>
                <a className="text-sm font-medium text-blue-500 hover:text-blue-300">
                  À suivre
                </a>
              </Link>
            </div>
            <div className="flex items-center sm:hidden ml-4">
              <button className="p-2 text-blue-500 hover:text-blue-300">Menu</button>
            </div>
          </div>
        </nav>

        {/* Header principal */}
        <header className="relative h-64 flex justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 text-center z-40">
            Bienvenue sur Diagnostix
          </h1>
        </header>

        {/* Conteneur central pour l'introduction et boutons, avec fond pastel bleu */}
        <div className="container mx-auto py-12 px-4">
          <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-md text-center">
            <p className="mb-4 text-gray-800">
              Diagnostix est un jeu interactif qui vous permet de tester vos connaissances médicales de façon ludique et stimulante. Inspiré de Cemantix, chaque session vous met au défi d’identifier une maladie à partir d’indices sous forme de mots-clés.
            </p>
            <p className="mb-4 text-gray-800">
              Vous pouvez choisir de jouer dans une spécialité précise – comme Pédiatrix, Obstetrix, Microbiologix, etc. – ou opter pour la version <strong>Générale</strong> qui combine l’ensemble des bases de données pour une expérience globale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <Link href="/game?mode=challenge" legacyBehavior>
                <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform transform hover:scale-105">
                  Mode Challenge Général
                </a>
              </Link>
              <Link href="/game?mode=libre" legacyBehavior>
                <a className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform hover:scale-105">
                  Mode Libre Général
                </a>
              </Link>
            </div>
            <div className="mt-8">
              <p className="text-gray-800">
                Découvrez dès maintenant le défi et mettez vos connaissances à l'épreuve !
              </p>
            </div>
          </div>
        </div>

        {/* Section Spécialités avec conteneur au fond pastel bleu */}
        <div className="container mx-auto py-8 px-4">
          <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">
            Spécialités
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Link href="/Pediatrix" legacyBehavior>
              <a className="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow">
                <Image src="/logo.jpg" alt="Pédiatrix" width={80} height={80} className="object-cover rounded-full mx-auto" />
                <h3 className="mt-4 text-xl font-bold text-center">Pédiatrix</h3>
              </a>
            </Link>
            <Link href="/Obstetrix" legacyBehavior>
              <a className="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow">
                <Image src="/logoobstetrix.jpg" alt="Obstetrix" width={80} height={80} className="object-cover rounded-full mx-auto" />
                <h3 className="mt-4 text-xl font-bold text-center">Obstetrix</h3>
              </a>
            </Link>
            <Link href="/Microbiologix" legacyBehavior>
              <a className="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow">
                <Image src="/logomicrobiologix.jpeg" alt="Microbiologix" width={80} height={80} className="object-cover rounded-full mx-auto" />
                <h3 className="mt-4 text-xl font-bold text-center">Microbiologix</h3>
              </a>
            </Link>
            <Link href="/ASuivre" legacyBehavior>
              <a className="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow">
                <Image src="/logoasuivre.jpeg" alt="À suivre" width={80} height={80} className="object-cover rounded-full mx-auto" />
                <h3 className="mt-4 text-xl font-bold text-center">À suivre</h3>
              </a>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white py-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Link href="/contact" legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-700 hover:underline">
                  Formulaire de Contact
                </a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-700 hover:underline">
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
