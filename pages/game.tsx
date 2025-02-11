// pages/game.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Game() {
  const router = useRouter();
  const { mode } = router.query;
  const isLibre = mode === "libre";
  const isChallenge = mode === "challenge";

  // Pour le mode Challenge, récupérer la maladie du jour via l'API.
  const [dailyDisease, setDailyDisease] = useState(null);
  // Pour le mode Libre, récupérer la maladie aléatoire via l'API.
  const [currentDisease, setCurrentDisease] = useState(null);

  // Récupération pour le mode Challenge
  useEffect(() => {
    if (isChallenge) {
      axios.get("/api/dailyDisease")
        .then(res => setDailyDisease(res.data))
        .catch(err => console.error(err));
    }
  }, [isChallenge]);

  // Récupération pour le mode Libre
  useEffect(() => {
    if (isLibre) {
      axios.get("/api/randomDisease")
        .then(res => setCurrentDisease(res.data))
        .catch(err => console.error(err));
    }
  }, [isLibre]);

  let targetDisease, targetLink, targetKeywords;
  if (isChallenge) {
    if (dailyDisease) {
      targetDisease = dailyDisease.name;
      targetLink = dailyDisease.link; // Utilise le champ "link" de votre seed
      targetKeywords = dailyDisease.keywords;
    } else {
      // Valeurs par défaut en attendant la réponse de l'API
      targetDisease = "Bronchiolite";
      targetLink = "https://referentiel-pediatrie.com/chapitres/bronchiolite";
      targetKeywords = ["toux", "fièvre", "détresse", "sifflements"];
    }
  } else {
    if (currentDisease) {
      targetDisease = currentDisease.name;
      targetLink = currentDisease.link;
      targetKeywords = currentDisease.keywords;
    } else {
      targetDisease = "Bronchiolite";
      targetLink = "https://referentiel-pediatrie.com/chapitres/bronchiolite";
      targetKeywords = ["toux", "fièvre", "détresse", "sifflements"];
    }
  }

  // Calcul du nombre de mots composant le nom de la maladie
  const diseaseWordCount = targetDisease.trim().split(/\s+/).length;

  // États pour la saisie des mots-clés
  const [keywordInput, setKeywordInput] = useState("");
  const [keywordsHistory, setKeywordsHistory] = useState([]);
  const [correct, setCorrect] = useState(false);

  // États pour la réponse de l'utilisateur
  const [answerInput, setAnswerInput] = useState("");
  const [feedback, setFeedback] = useState("");

  // États pour les indices (mode Libre)
  const [hints, setHints] = useState([]);

  // Timer pour le mode Libre
  const [duration, setDuration] = useState(0); // en minutes
  const [timeLeft, setTimeLeft] = useState(0);   // en secondes
  const [timerActive, setTimerActive] = useState(false);

  // Statistiques personnelles simulées
  const [personalStats, setPersonalStats] = useState({
    gamesPlayed: 0,
    gamesToday: 0,
    totalTime: 0 // en secondes
  });

  // Statistiques globales simulées pour Challenge
  const [globalStats, setGlobalStats] = useState({
    foundToday: 0
  });

  // Démarrage du timer pour le mode Libre
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
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, timerActive]);

  // Soumission d'un mot-clé
  const handleKeywordSubmit = async (e) => {
    e.preventDefault();
    if (!keywordInput.trim()) return;

    try {
      const response = await axios.post("/api/keyword-similarity", { word: keywordInput, targetKeywords });
      const { color, similarity } = response.data;
      setKeywordsHistory(prev => [...prev, { word: keywordInput, color, similarity }]);
    } catch (error) {
      console.error(error);
    }
    setKeywordInput("");
  };

  // Soumission de la réponse
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!answerInput.trim()) return;
    if (answerInput.trim().toLowerCase() === targetDisease.toLowerCase()) {
      setFeedback("Bonne réponse ! 🎉😃");
      setCorrect(true);
    } else {
      setFeedback("Ce n'est pas la bonne réponse. Réessayez !");
    }
    setAnswerInput("");
  };

  // Bouton Indice (mode Libre)
  const handleHint = () => {
    const shuffled = [...targetKeywords].sort(() => 0.5 - Math.random());
    setHints(shuffled.slice(0, 2));
  };

  // Bouton Réponse (mode Libre)
  const handleShowAnswer = () => {
    setFeedback(`La réponse est : ${targetDisease}`);
    setCorrect(true);
  };

  // Bouton Nouvelle Partie (mode Libre)
  const handleNewGame = () => {
    axios.get("/api/randomDisease")
      .then(res => {
        setCurrentDisease(res.data);
        // Réinitialiser les états
        setKeywordsHistory([]);
        setAnswerInput("");
        setFeedback("");
        setHints([]);
        setCorrect(false);
      })
      .catch(err => console.error(err));
  };

  // Formatage du temps restant
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const dailyMessage = isChallenge ? "Le mot du jour changera à minuit !" : "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h2 className="text-2xl font-bold mb-4">Mode {isChallenge ? "Challenge" : "Libre"}</h2>
      {isChallenge && (
        <p className="mb-4 text-sm text-gray-600">{dailyMessage}</p>
      )}
      <div className="mb-4">
        <Link
          href="/"
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Retour à l'accueil
        </Link>
      </div>
      {isLibre && (
        <div className="mb-4">
          <label className="mr-2">Durée de jeu :</label>
          <select
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="border p-1 rounded"
          >
            <option value={0}>Choisir...</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={20}>20 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
          {timerActive && (
            <div className="mt-2">
              Temps restant : <strong>{formatTime(timeLeft)}</strong>
            </div>
          )}
        </div>
      )}
      {/* Affichage du nombre de mots composant le nom de la maladie */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          La maladie contient : <strong>{diseaseWordCount} mot(s)</strong>
        </p>
      </div>
      <form onSubmit={handleKeywordSubmit} className="w-full max-w-md mb-4">
        <input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="Entrez un mot-clé..."
          className="w-full p-2 border border-gray-300 rounded mb-2"
          disabled={timerActive && timeLeft <= 0}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={timerActive && timeLeft <= 0}
        >
          Valider le mot-clé
        </button>
      </form>
      <div className="mb-4 w-full max-w-md">
        <h3 className="font-semibold">Historique des mots-clés :</h3>
        <ul className="list-disc pl-5">
          {keywordsHistory.map((entry, index) => (
            <li key={index} style={{ color: entry.color }}>
              {entry.word} 
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleAnswerSubmit} className="w-full max-w-md mb-4">
        <input
          type="text"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          placeholder="Proposez votre réponse..."
          className="w-full p-2 border border-gray-300 rounded mb-2"
          disabled={timerActive && timeLeft <= 0}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          disabled={timerActive && timeLeft <= 0}
        >
          Vérifier la réponse
        </button>
      </form>
      {isLibre && (
        <div className="flex space-x-4 mb-4">
          <button
            onClick={handleHint}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Indice
          </button>
          <button
            onClick={handleShowAnswer}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Réponse
          </button>
          <button
            onClick={handleNewGame}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Nouvelle partie
          </button>
        </div>
      )}
      {hints.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold">Indices :</p>
          <ul className="list-disc pl-5">
            {hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      )}
      {feedback && (
        <div className="mt-4 p-4 bg-yellow-100 rounded text-center">
          {feedback}
          {correct && (
            <div className="mt-4">
              <Link
                href={targetLink}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Accéder au chapitre du référentiel
              </Link>
            </div>
          )}
        </div>
      )}
      <div className="mt-8 w-full max-w-md p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Vos statistiques</h3>
        <p>Parties jouées : {personalStats.gamesPlayed}</p>
        <p>Parties aujourd'hui : {personalStats.gamesToday}</p>
        <p>Temps total joué : {Math.floor(personalStats.totalTime / 60)} minutes</p>
      </div>
    </div>
  );
}
