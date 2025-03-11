// pages/Pediatrix/game.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Background from "../../components/Background";
import Footer from "../../components/Footer";

export default function Game() {
  const router = useRouter();
  const { mode } = router.query;
  const isLibre = mode === "libre";
  const isChallenge = mode === "challenge";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frozen, setFrozen] = useState(false);

  // États pour récupérer la maladie selon le mode
  const [dailyDisease, setDailyDisease] = useState(null);
  const [currentDisease, setCurrentDisease] = useState(null);
  const [loading, setLoading] = useState(false);

  // États pour la saisie et la logique du jeu
  const [keywordInput, setKeywordInput] = useState("");
  const [keywordsHistory, setKeywordsHistory] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hints, setHints] = useState([]);

  // Timer pour le mode Libre
  const [duration, setDuration] = useState(0); // minutes
  const [timeLeft, setTimeLeft] = useState(0); // secondes
  const [timerActive, setTimerActive] = useState(false);

  // Réinitialiser l'état du jeu quand le mode change
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
          setCurrentDisease(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isLibre]);

  // Objet par défaut pour la maladie
  const defaultDisease = {
    name: "Bronchiolite",
    link: "https://referentiel-pediatrie.com/chapitres/bronchiolite",
    keywords: ["détresse", "sifflements"],
  };

  // Sélection de la maladie selon le mode
  const diseaseData = isChallenge ? dailyDisease : currentDisease;
  const { name: targetDisease, link: targetLink, keywords: targetKeywords } =
    diseaseData || defaultDisease;

  // Calcul du nombre de mots composant le nom de la maladie
  const diseaseWordCount = targetDisease.trim().split(/\s+/).length;

  // Timer (mode Libre)
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

  // Fonction de mélange Fisher-Yates
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  // Soumission d'un mot-clé
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

  // Soumission de la réponse avec message gradué
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!answerInput.trim()) return;
    if (answerInput.trim().toLowerCase() === targetDisease.toLowerCase()) {
      const keywordCount = keywordsHistory.length;
      let grade = "";
      if (keywordCount < 5) {
        grade = "Exceptionnel 😄";
      } else if (keywordCount < 10) {
        grade = "Excellent 😀";
      } else if (keywordCount < 15) {
        grade = "Bon score 🙂";
      } else if (keywordCount < 20) {
        grade = "Pas mal 😐";
      } else {
        grade = "Tu feras mieux la prochaine fois 😞";
      }
      setFeedback(
        `Bravo ! Vous avez trouvé la maladie : ${targetDisease} grâce à ${keywordCount} mot(s)-clés. ${grade}`
      );
      setCorrect(true);

      // Enregistrer la session si mode Challenge
      if (isChallenge) {
        axios
          .post("/api/recordChallenge", {
            mode: "challenge",
            success: true,
            diseaseId: diseaseData ? diseaseData.name : "inconnu",
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
        setCurrentDisease(res.data);
        setKeywordsHistory([]);
        setAnswerInput("");
        setFeedback("");
        setHints([]);
        setCorrect(false);
      })
      .catch((err) => console.error(err));
  };

  // Formatage du temps restant (mm:ss)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Tri des mots-clés par ordre de couleur (verts en haut)
  const sortedKeywordsHistory = [...keywordsHistory].sort((a, b) => {
    // Valeurs plus élevées pour vert/darkgreen afin de les trier en haut
    const order = { red: 1, orange: 2, green: 3, darkgreen: 3 };
    return (order[b.color] || 0) - (order[a.color] || 0);
  });

  return (
    <Background backgroundImage="/fondpediatrix.jpeg">
      <div className="relative z-30 min-h-screen flex flex-col">
        {/* Barre de navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              {/* alt="" si l'image est purement décorative et "Pédiatrix" est déjà visible */}
              <Image
                src="/logopediatrix.jpg"
                alt=""
                width={60}
                height={60}
                className="object-cover rounded-full"
              />
              <span className="text-2xl font-bold text-blue-900">Pédiatrix</span>
            </div>
            {/* Liens de navigation pour desktop */}
            <div className="hidden sm:flex space-x-8">
              <Link href="/Pediatrix" legacyBehavior>
                <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                  Page d'accueil
                </a>
              </Link>
              {isChallenge && (
                <Link href="/Pediatrix/game?mode=libre" legacyBehavior>
                  <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                    Jeu libre
                  </a>
                </Link>
              )}
              {isLibre && (
                <Link href="/Pediatrix/game?mode=challenge" legacyBehavior>
                  <a className="text-sm font-medium text-blue-900 hover:text-blue-800 focus:outline-none focus:ring">
                    Challenge
                  </a>
                </Link>
              )}
            </div>
            {/* Bouton menu mobile */}
            <div className="flex items-center sm:hidden ml-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-900 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring"
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
                  <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-900 hover:bg-gray-50 focus:outline-none focus:ring">
                    Page d'accueil
                  </a>
                </Link>
                {isChallenge && (
                  <Link href="/Pediatrix/game?mode=libre" legacyBehavior>
                    <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-900 hover:bg-gray-50 focus:outline-none focus:ring">
                      Jeu libre
                    </a>
                  </Link>
                )}
                {isLibre && (
                  <Link href="/Pediatrix/game?mode=challenge" legacyBehavior>
                    <a className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-900 hover:bg-gray-50 focus:outline-none focus:ring">
                      Challenge
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Contenu principal */}
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-6 p-6">
            {/* Options de durée si mode libre */}
            {isLibre && (
              <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
                <div>
                  <label className="mr-2 font-medium text-gray-800">Durée de jeu :</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="border p-1 rounded focus:outline-none focus:ring"
                  >
                    <option value={0}>Choisir...</option>
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={20}>20 minutes</option>
                    <option value={30}>30 minutes</option>
                  </select>
                </div>
                {timerActive && (
                  <div className="mt-4 sm:mt-0">
                    <span className="font-medium text-gray-800">Temps restant :</span>{" "}
                    <strong className="text-indigo-700">{formatTime(timeLeft)}</strong>
                  </div>
                )}
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm text-gray-800">
                La maladie contient : <strong>{diseaseWordCount} mot(s)</strong>
              </p>
            </div>

            {/* Contenu si la partie n'est pas figée */}
            {!frozen ? (
              <>
                {/* Formulaire de mot-clé */}
                <form onSubmit={handleKeywordSubmit} className="mb-6">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
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

                <div className="mb-4 text-sm text-gray-800">
                  <span className="font-medium">Légende : </span>
                  <span className="text-red-700">Rouge</span> : Mot peu similaire,{" "}
                  <span className="text-orange-700">Orange</span> : Mot très proche,{" "}
                  <span className="text-green-700">Vert</span> : Mot exact.
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Historique des mots-clés :</h3>
                  <ul className="list-disc pl-5">
                    {sortedKeywordsHistory.map((entry, index) => (
                      <li key={index} style={{ color: entry.color }} className="mb-1">
                        {entry.word}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Formulaire de réponse */}
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
                    className={`w-full py-3 rounded-lg transition-transform transform hover:scale-105 text-white focus:outline-none focus:ring ${
                      isChallenge
                        ? "bg-purple-700 hover:bg-purple-800"
                        : "bg-indigo-700 hover:bg-indigo-800"
                    }`}
                  >
                    Valider ma réponse
                  </button>
                </form>

                {/* Boutons supplémentaires si mode libre */}
                {isLibre && (
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
              </>
            ) : (
              // Contenu si la partie est figée (mode challenge résolu)
              <div className="mb-6">
                <p className="text-lg font-medium text-gray-900">{feedback}</p>
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

            {/* Affichage du feedback si la partie n'est pas figée */}
            {feedback && !frozen && (
              <div className="mt-6 p-4 bg-yellow-100 rounded-lg text-center">
                <p className="text-lg font-medium text-gray-900">{feedback}</p>
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
          </div>
        </main>
      </div>

      {/* Footer commun */}
      <Footer />
    </Background>
  );
}
