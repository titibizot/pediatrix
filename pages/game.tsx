// pages/Pediatrix/game.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Background from "../components/Background"; // Vérifie le chemin
import Footer from "../components/Footer";

export default function Game() {
  const router = useRouter();
  const { mode } = router.query;
  const isLibre = mode === "libre";
  const isChallenge = mode === "challenge";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frozen, setFrozen] = useState(false);

  // États de récupération de la maladie
  const [dailyDisease, setDailyDisease] = useState(null);
  const [currentDisease, setCurrentDisease] = useState(null);
  const [loading, setLoading] = useState(false);

  // États de la logique du jeu
  const [keywordInput, setKeywordInput] = useState("");
  const [keywordsHistory, setKeywordsHistory] = useState([]);
  const [answerInput, setAnswerInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hints, setHints] = useState([]);
  const [correct, setCorrect] = useState(false);

  // États pour le timer (mode libre)
  const [duration, setDuration] = useState(0); // minutes
  const [timeLeft, setTimeLeft] = useState(0);   // secondes
  const [timerActive, setTimerActive] = useState(false);

  // Réinitialisation lors du changement de mode
  useEffect(() => {
    setKeywordsHistory([]);
    setAnswerInput("");
    setFeedback("");
    setHints([]);
    setCorrect(false);
    setDuration(0);
    setTimeLeft(0);
    setTimerActive(false);
    if (isChallenge) {
      const today = new Date().toISOString().split("T")[0];
      const saved = localStorage.getItem("challengeCompleted_pediatrie");
      if (saved === today) {
        setFrozen(true);
        setFeedback("Vous avez déjà trouvé la réponse aujourd'hui. Attendez le renouvellement à minuit.");
      } else {
        setFrozen(false);
      }
    } else {
      setFrozen(false);
    }
  }, [mode, isChallenge]);

  // Récupération de la maladie pour le mode Challenge
  useEffect(() => {
    if (isChallenge) {
      setLoading(true);
      axios
        .get("/api/dailyDisease?specialty=pediatrie")
        .then((res) => {
          console.log("Daily disease:", res.data);
          setDailyDisease(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isChallenge]);

  // Récupération de la maladie pour le mode Libre
  useEffect(() => {
    if (isLibre) {
      setLoading(true);
      axios
        .get("/api/randomDisease?specialty=pediatrie")
        .then((res) => {
          console.log("Random disease:", res.data);
          setCurrentDisease(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isLibre]);

  // Objet maladie par défaut
  const defaultDisease = {
    name: "Bronchiolite",
    link: "https://referentiel-pediatrie.com/chapitres/bronchiolite",
    keywords: ["détresse", "sifflements"],
  };

  // Sélection de la maladie
  const diseaseData = isChallenge ? dailyDisease : currentDisease;
  const { name: targetDisease, link: targetLink, keywords: targetKeywords } =
    diseaseData || defaultDisease;

  // Calcul du nombre de mots du nom de la maladie
  const diseaseWordCount = targetDisease.trim().split(/\s+/).length;

  // Timer (mode libre)
  useEffect(() => {
    if (isLibre && duration > 0) {
      setTimeLeft(duration * 60);
      setTimerActive(true);
    }
  }, [duration, isLibre]);

  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) {
      setTimerActive(false);
      setFeedback("Temps écoulé !");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, timerActive]);

  // Tri de l'historique des mots-clés : ici on souhaite que les mots avec de meilleures correspondances apparaissent en haut.
  // Par exemple, on peut définir "green" et "darkgreen" avec une valeur basse pour être triés en tête.
  const sortedKeywordsHistory = [...keywordsHistory].sort((a, b) => {
    const order = { green: 1, darkgreen: 1, orange: 2, red: 3 };
    return (order[a.color] || 4) - (order[b.color] || 4);
  });

  // Formatage du temps en mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Fonction de mélange (Fisher-Yates)
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  // Gestionnaire du formulaire de mot-clé (empêche l'ajout d'espaces)
  const handleKeywordSubmit = async (e) => {
    e.preventDefault();
    if (!keywordInput.trim()) return;
    try {
      const response = await axios.post("/api/keyword-similarity", {
        word: keywordInput,
        targetKeywords,
      });
      const { color } = response.data;
      setKeywordsHistory((prev) => [...prev, { word: keywordInput, color }]);
    } catch (error) {
      console.error(error);
    }
    setKeywordInput("");
  };

  // Gestionnaire du formulaire de réponse
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!answerInput.trim()) return;
    if (answerInput.trim().toLowerCase() === targetDisease.toLowerCase()) {
      const keywordCount = keywordsHistory.length;
      let grade = "";
      if (keywordCount < 5) grade = "Exceptionnel 😄";
      else if (keywordCount < 10) grade = "Excellent 😀";
      else if (keywordCount < 15) grade = "Bon score 🙂";
      else if (keywordCount < 20) grade = "Pas mal 😐";
      else grade = "Tu feras mieux la prochaine fois 😞";
      setFeedback(
        `Bravo ! Vous avez trouvé la maladie : ${targetDisease} grâce à ${keywordCount} mot(s)-clés. ${grade}`
      );
      setCorrect(true);
      if (isChallenge) {
        axios.post("/api/recordChallenge", {
          mode: "challenge",
          success: true,
          // On utilise le nom comme identifiant (on suppose son unicité)
          diseaseId: diseaseData ? diseaseData.name : "inconnu"
        })
        .then((res) => {
          console.log("Session enregistrée :", res.data);
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement de la session :", error);
        });
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("challengeCompleted_pediatrie", today);
        setFrozen(true);
      }
    } else {
      setFeedback("Ce n'est pas la bonne réponse. Réessayez !");
    }
    setAnswerInput("");
  };

  // Bouton Indice (mode Libre)
  const handleHint = () => {
    if (!targetKeywords || targetKeywords.length === 0) return;
    const shuffled = shuffleArray([...targetKeywords]);
    const selectedHints = shuffled.slice(0, 2);
    setHints(selectedHints);
    setFeedback(`Indices : ${selectedHints.join(", ")}`);
  };

  // Bouton Réponse (mode Libre)
  const handleShowAnswer = () => {
    setFeedback(`La réponse est : ${targetDisease}`);
    setCorrect(true);
  };

  // Bouton Nouvelle Partie (mode Libre)
  const handleNewGame = () => {
    axios
      .get("/api/randomDisease?specialty=pediatrie")
      .then((res) => {
        console.log("Nouvelle maladie:", res.data);
        setCurrentDisease(res.data);
        setKeywordsHistory([]);
        setAnswerInput("");
        setFeedback("");
        setHints([]);
        setCorrect(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Background backgroundImage="/fonddiagnostix.jpeg">
      <div className="relative z-30 min-h-screen flex flex-col">
        {/* Barre de navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/logodiagnostix.jpg"
                alt="Logo Diagnostix"
                width={60}
                height={60}
                className="object-cover rounded-full"
              />
              <span className="text-2xl font-bold text-blue-900">Diagnostix</span>
            </div>
            {/* Liens de navigation pour desktop */}
            <div className="hidden sm:flex space-x-8">
              <Link href="/" legacyBehavior>
                <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                  Page d'accueil
                </a>
              </Link>
              {isChallenge && (
                <Link href="/game?mode=libre" legacyBehavior>
                  <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                    Jeu libre
                  </a>
                </Link>
              )}
              {isLibre && (
                <Link href="/game?mode=challenge" legacyBehavior>
                  <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                    Challenge
                  </a>
                </Link>
              )}
            </div>
            {/* Bouton menu mobile */}
            <div className="sm:hidden ml-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-900 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring"
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
                  <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-900 hover:bg-gray-50 hover:border-gray-500 hover:text-blue-800">
                    Page d'accueil
                  </a>
                </Link>
                {isChallenge && (
                  <Link href="/game?mode=libre" legacyBehavior>
                    <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-900 hover:bg-gray-50 hover:border-green-500 hover:text-green-800">
                      Jeu libre
                    </a>
                  </Link>
                )}
                {isLibre && (
                  <Link href="/game?mode=challenge" legacyBehavior>
                    <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-900 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-800">
                      Challenge
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Zone centrale */}
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-6 p-6">
            {/* Bannière de jeu (optionnelle) */}
            <div
              className="w-full h-64 relative bg-cover bg-center"
              style={{ backgroundImage: "url('/your-image-path.jpeg')", backgroundPosition: "50% 30%" }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <h1 className="relative text-4xl md:text-5xl font-bold text-white text-center pt-20">
                {isChallenge ? "Challenge" : isLibre ? "Jeu libre" : "Bienvenue"}
              </h1>
            </div>

            {/* Formulaires et contenu du jeu */}
            <main>
              {/* Formulaire de mot-clé en premier */}
              <form onSubmit={handleKeywordSubmit} className="mb-6">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Entrez un mot-clé..."
                  className="w-full p-3 border border-gray-400 rounded-lg mb-3 focus:outline-none focus:ring focus:border-blue-800"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring"
                >
                  Valider le mot-clé
                </button>
              </form>

              {/* Affichage du nombre de mots dans le nom de la maladie */}
              <div className="mb-4">
                <p className="text-sm text-gray-800">
                  La maladie contient : <strong>{diseaseWordCount} mot(s)</strong>
                </p>
              </div>

              {/* Formulaire de réponse en second */}
              {!frozen && (
                <form onSubmit={handleAnswerSubmit} className="mb-6">
                  <input
                    type="text"
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="Entre le nom de la maladie..."
                    className="w-full p-3 border border-gray-400 rounded-lg mb-3 focus:outline-none focus:ring focus:border-blue-800"
                    required
                  />
                  <button
                    type="submit"
                    className={`w-full py-3 rounded-lg transition-transform transform hover:scale-105 text-white ${
                      isChallenge ? "bg-purple-700 hover:bg-purple-800" : "bg-indigo-700 hover:bg-indigo-800"
                    } focus:outline-none focus:ring`}
                  >
                    Valider ma réponse
                  </button>
                </form>
              )}

              <div className="mb-4 text-sm text-gray-800">
                <span className="font-medium">Légende : </span>
                <span className="text-red-600">Rouge</span> : Mot peu similaire,{" "}
                <span className="text-orange-600">Orange</span> : Mot très proche,{" "}
                <span className="text-green-700">Vert</span> : Mot exact.
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Historique des mots-clés :</h3>
                <ul className="list-disc pl-5">
                  {sortedKeywordsHistory.map((entry, index) => (
                    <li key={index} style={{ color: entry.color }} className="mb-1">
                      {entry.word}
                    </li>
                  ))}
                </ul>
              </div>

              {frozen ? (
                <div className="mb-6">
                  <p className="text-lg font-medium text-gray-800">{feedback}</p>
                  {correct && (
                    <div className="mt-4">
                      <Link
                        href={targetLink}
                        className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 inline-block transition-transform transform hover:scale-105 focus:outline-none focus:ring"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Accéder au chapitre du référentiel
                      </Link>
                    </div>
                  )}
                </div>
              ) : null}

              {feedback && !frozen && (
                <div className="mt-6 p-4 bg-yellow-100 rounded-lg text-center">
                  <p className="text-lg font-medium text-gray-800">{feedback}</p>
                  {correct && (
                    <div className="mt-4">
                      <Link
                        href={targetLink}
                        className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 inline-block transition-transform transform hover:scale-105 focus:outline-none focus:ring"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Accéder au chapitre du référentiel
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {isLibre && !frozen && (
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                  <button
                    onClick={handleHint}
                    className="w-full py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring"
                  >
                    Indice
                  </button>
                  <button
                    onClick={handleShowAnswer}
                    className="w-full py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring"
                  >
                    Réponse
                  </button>
                  <button
                    onClick={handleNewGame}
                    className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105 focus:outline-none focus:ring"
                  >
                    Nouvelle partie
                  </button>
                </div>
              )}
            </main>
          </div>
        </main>
      </div>
      {/* Footer commun */}
      <Footer />
    </Background>
  );
}
