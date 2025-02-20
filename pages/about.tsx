// pages/about.tsx
import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Qui sommes-nous ?</h1>
        <p className="text-gray-700 mb-4">
          Medixgame est un projet collaboratif conçu pour mettre à l'épreuve vos connaissances médicales de manière ludique et interactive.
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
		<div className="flex justify-center">
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
  );
}