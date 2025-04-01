import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Background from "../../components/Background";
import Footer from "../../components/Footer";

export default function BonusGame() {
  // Étape 1 : Sélection de la maladie
  const [diseases, setDiseases] = useState([]);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState("");
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [gameMode, setGameMode] = useState(null); // "submission" ou "tf"

  // États mode Soumission
  const [keywordInput, setKeywordInput] = useState("");
  const [keywordsHistory, setKeywordsHistory] = useState([]);
  const [feedback, setFeedback] = useState("");

  // États mode Vrai/Faux
  const [tfKeywords, setTfKeywords] = useState([]);
  const [tfResponses, setTfResponses] = useState({});
  const [tfScore, setTfScore] = useState(null);

  // Option d'affichage du compte de lettres
  const [showLetterCount, setShowLetterCount] = useState(false);

  useEffect(() => {
    axios.get("/api/diseases")
      .then((res) => {
        console.log("Liste des maladies :", res.data);
        setDiseases(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const disease = diseases.find(d => d.id === selectedDiseaseId) || null;
    setSelectedDisease(disease);
    // Réinitialiser la suite quand la maladie change
    setGameMode(null);
    setKeywordsHistory([]);
    setFeedback("");
    setKeywordInput("");
    setTfResponses({});
    setTfScore(null);
    setTfKeywords([]);
  }, [selectedDiseaseId, diseases]);

  const targetDisease = selectedDisease ? selectedDisease.name : "";
  const targetKeywords = selectedDisease && Array.isArray(selectedDisease.keywords)
    ? selectedDisease.keywords
    : [];
  const targetSynonyms = selectedDisease ? selectedDisease.synonyms || {} : {};
  const startingKeyword = selectedDisease ? selectedDisease.startingKeyword : "";
  const letterCount = targetDisease.replace(/\s/g, "").length;
  const diseaseWordCount = targetDisease.trim().split(/\s+/).length;

  // Mode Soumission
  const handleKeywordSubmit = async (e) => {
    e.preventDefault();
    if (!keywordInput.trim() || !selectedDisease) return;
    if (!Array.isArray(targetKeywords) || targetKeywords.length === 0) {
      setFeedback("La maladie sélectionnée n'a pas de mots clés disponibles.");
      return;
    }
    try {
      const response = await axios.post("/api/keyword-similarity", {
        word: keywordInput,
        targetKeywords,
        targetSynonyms,
      });
      const { color } = response.data;
      setKeywordsHistory(prev => [...prev, { word: keywordInput, color }]);
    } catch (error) {
      console.error(error);
      setFeedback("Erreur lors de la soumission du mot-clé.");
    }
    setKeywordInput("");
  };

  const handleNewSubmissionGame = () => {
    setKeywordsHistory([]);
    setFeedback("");
  };

  const sortedKeywordsHistory = [...keywordsHistory].sort((a, b) => {
    const order = { green: 1, orange: 2, red: 3 };
    return (order[a.color] || 4) - (order[b.color] || 4);
  });

  // Mode Vrai/Faux
  const generateTfKeywords = (keywords) => {
    if (!Array.isArray(keywords) || keywords.length === 0) return [];
    const fakeWords = ["inflammation", "douleur", "fièvre", "infection", "crise", "test"];
    const correct = [...keywords].sort(() => 0.5 - Math.random()).slice(0, 3);
    const incorrect = [...fakeWords].sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [...correct, ...incorrect];
    return combined.sort(() => 0.5 - Math.random());
  };

  useEffect(() => {
    if (gameMode === "tf" && selectedDisease) {
      const tfList = generateTfKeywords(targetKeywords);
      setTfKeywords(tfList);
      setTfResponses({});
      setTfScore(null);
    }
  }, [gameMode, selectedDisease, targetKeywords]);

  const handleTfResponse = (word, response) => {
    setTfResponses(prev => ({ ...prev, [word]: response }));
  };

  const calculateTfScore = () => {
    let correctCount = 0;
    const synonymsUnion = Object.values(targetSynonyms).flat();
    tfKeywords.forEach(word => {
      const isCorrect = targetKeywords.includes(word) || synonymsUnion.includes(word);
      if (isCorrect === tfResponses[word]) {
        correctCount++;
      }
    });
    setTfScore(`${correctCount} / ${tfKeywords.length}`);
  };

  const handleNewTfGame = () => {
    const tfList = generateTfKeywords(targetKeywords);
    setTfKeywords(tfList);
    setTfResponses({});
    setTfScore(null);
  };

  const formatLetterCount = () =>
    `${letterCount} lettre${letterCount > 1 ? "s" : ""} (${diseaseWordCount} mot${diseaseWordCount > 1 ? "s" : ""})`;

  return (
    <Background backgroundImage="/fondbonus.jpeg">
      <Head>
        <title>Mode Bonus – Révision des Mots Clés</title>
      </Head>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Mode Bonus – Révision</h1>

        {/* Étape 1 : Sélection de la maladie */}
        {!selectedDisease && (
          <div className="mb-6">
            <label className="block text-lg mb-2">Choisissez la maladie :</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedDiseaseId}
              onChange={(e) => setSelectedDiseaseId(e.target.value)}
            >
              <option value="">-- Sélectionnez --</option>
              {diseases.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Étape 2 : Choix du mode de jeu */}
        {selectedDisease && gameMode === null && (
          <div className="mb-6 text-center">
            <p className="mb-4 text-xl">
              Vous avez choisi : <strong>{targetDisease}</strong>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setGameMode("submission")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
              >
                Soumet tes mots clés
              </button>
              <button
                onClick={() => setGameMode("tf")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
              >
                Jeu Vrai/Faux
              </button>
            </div>
          </div>
        )}

        {/* Mode Soumission */}
        {selectedDisease && gameMode === "submission" && (
          <div className="space-y-6">
            {startingKeyword && (
              <p className="text-center text-lg">
                Mot clé de départ : <strong>{startingKeyword}</strong>
              </p>
            )}
            <div className="text-center">
              <button
                onClick={() => setShowLetterCount(!showLetterCount)}
                className="px-3 py-2 bg-gray-800 text-white rounded mb-4"
              >
                {showLetterCount ? "Masquer le compte de lettres" : "Afficher le compte de lettres"}
              </button>
              {showLetterCount && (
                <p className="text-sm">
                  {targetDisease} contient {formatLetterCount()}
                </p>
              )}
            </div>
            <form onSubmit={handleKeywordSubmit} className="space-y-4">
              <input
                type="text"
                className="w-full p-3 border rounded"
                placeholder="Entrez un mot-clé..."
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
              >
                Valider le mot-clé
              </button>
            </form>
            <div>
              <h2 className="text-2xl font-bold mb-2">Historique des mots-clés</h2>
              <ul className="list-disc pl-6">
                {sortedKeywordsHistory.map((item, idx) => (
                  <li key={idx} style={{ color: item.color }}>
                    {item.word}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <button onClick={handleNewSubmissionGame} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-all">
                Nouvelle partie
              </button>
            </div>
          </div>
        )}

        {/* Mode Vrai/Faux */}
        {selectedDisease && gameMode === "tf" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Test Vrai/Faux</h2>
            <p className="text-center">
              Pour chaque mot proposé, cliquez sur <strong>Vrai</strong> s'il correspond aux mots-clés ou synonymes de <em>{targetDisease}</em>, sinon sur <strong>Faux</strong>.
            </p>
            {tfKeywords.length === 0 ? (
              <div className="text-center">
                <button
                  onClick={() => {
                    const tfList = generateTfKeywords(targetKeywords);
                    setTfKeywords(tfList);
                    setTfResponses({});
                    setTfScore(null);
                    console.log("Liste TF générée :", tfList);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                >
                  Démarrer le test Vrai/Faux
                </button>
              </div>
            ) : (
              <ul className="list-disc pl-6">
                {tfKeywords.map((word, idx) => (
                  <li key={idx} className="mb-2 flex items-center">
                    <span className="mr-4">{word}</span>
                    <button
                      onClick={() => handleTfResponse(word, true)}
                      className={`px-3 py-1 mr-2 rounded ${tfResponses[word] === true ? "bg-green-600 text-white" : "bg-gray-200"}`}
                    >
                      Vrai
                    </button>
                    <button
                      onClick={() => handleTfResponse(word, false)}
                      className={`px-3 py-1 rounded ${tfResponses[word] === false ? "bg-red-600 text-white" : "bg-gray-200"}`}
                    >
                      Faux
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {tfKeywords.length > 0 &&
              Object.keys(tfResponses).length === tfKeywords.length &&
              tfScore === null && (
                <div className="text-center">
                  <button
                    onClick={calculateTfScore}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                  >
                    Valider mes réponses
                  </button>
                </div>
              )}
            {tfScore !== null && (
              <p className="text-center text-lg font-bold">Votre score : {tfScore}</p>
            )}
            {tfKeywords.length > 0 && (
              <div className="text-center">
                <button
                  onClick={handleNewTfGame}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-all mt-4"
                >
                  Nouvelle partie (Vrai/Faux)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </Background>
  );
}
