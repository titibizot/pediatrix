// pages/admin/index.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function AdminHome() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("adminAccess") === "true") {
      setAuthorized(true);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Administration - Accueil</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Panneau d'administration</h1>
      {authorized ? (
        <div>
          <p className="mb-4">Bienvenue dans le panneau d'administration. Choisissez une option :</p>
          <ul className="list-disc pl-6">
            <li className="mb-2">
              <Link href="/admin/keywords" legacyBehavior>
                <a className="text-blue-600 underline">Analyse des mots clés</a>
              </Link>
            </li>
            {/* On retire l'accès aux synonymes */}
            <li className="mb-2">
              <Link href="/admin/editDisease" legacyBehavior>
                <a className="text-blue-600 underline">Modifier une maladie (mots clés, synonymes et startingKeyword)</a>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <p>Accès non autorisé. Veuillez vous authentifier depuis la page d'accueil.</p>
      )}
    </div>
  );
}
