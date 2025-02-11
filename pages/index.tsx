// pages/index.tsx
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Bienvenue sur Pédiatrix</h1>
      <p className="mb-4 text-center max-w-2xl">
        Ce jeu, inspiré de{" "}
        <Link href="https://cemantix.certitudes.org/" className="underline text-blue-600">
          Cemantix
        </Link>
        , mobilise vos connaissances en pédiatrie tout en vous divertissant. Deux modes sont proposés :
      </p>
      <ul className="mb-4 list-disc list-inside text-left max-w-2xl">
        <li>
          <strong>Challenge</strong> : Une seule maladie à trouver chaque jour. Soyez le premier parmi vos amis !
        </li>
        <li>
          <strong>Libre</strong> : Jouez autant de parties que vous le souhaitez. Un chronomètre est présent pour limiter le temps de jeu.
        </li>
      </ul>
      <p className="mb-4 text-center max-w-2xl">
        Dans chaque mode, le but est de deviner une maladie pédiatrique en rapport avec le référentiel.
        Pour vous aider, entrez des mots-clés (ex : toux, fièvre, infectiologie…) qui s'affichent du rouge au vert selon leur proximité avec la maladie à trouver.
        Les mots-clés ne sont composés que d'un seul mot, tandis que la maladie peut être formée de plusieurs mots (cela vous sera précisé sur la page de jeu).
      </p>
      <div className="flex space-x-4 mb-6">
        <Link
          href="/game?mode=challenge"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mode Challenge
        </Link>
        <Link
          href="/game?mode=libre"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Mode Libre
        </Link>
      </div>
      <div className="text-center">
        {session ? (
          <>
            <p className="mb-2">Connecté en tant que {session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Se connecter
            </button>
            <p className="mt-2 text-sm">Vous pouvez aussi jouer en invité.</p>
          </>
        )}
      </div>
      <div className="mt-8 text-center max-w-2xl">
        <p className="text-gray-700">
          Statistiques générales en Challenge : <br />
          <strong>XX</strong> personnes ont trouvé le mot du jour aujourd'hui.
        </p>
      </div>
    </div>
  );
}
