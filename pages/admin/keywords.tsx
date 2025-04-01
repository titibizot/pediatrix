// pages/admin/keywords.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

interface Disease {
  id: string;
  name: string;
}

interface GameSession {
  id: string;
  diseaseId: string;
  trainingYear: string;
  createdAt: string;
}

interface KeywordSubmission {
  id: string;
  keyword: string;
  createdAt: string;
}

const trainingYearOptions = [
  "DCEM",
  "DFASM1",
  "DFASM2",
  "DFASM3",
  "Internes",
  "Docteur",
  "Autre",
];

export default function AdminKeywords() {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [selectedTrainingYear, setSelectedTrainingYear] = useState<string>("");
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>("");
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [submissions, setSubmissions] = useState<KeywordSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"disease" | "session">("disease");

  const router = useRouter();

  // Récupérer la liste des maladies
  useEffect(() => {
    axios
      .get("/api/diseases")
      .then((res) => {
        setDiseases(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Récupérer la liste des sessions filtrées par trainingYear si sélectionné
  useEffect(() => {
    let url = "/api/gameSessions";
    if (selectedTrainingYear) {
      url += `?trainingYear=${selectedTrainingYear}`;
    }
    axios
      .get(url)
      .then((res) => {
        setSessions(res.data);
      })
      .catch((err) => console.error(err));
  }, [selectedTrainingYear]);

  // Récupérer les soumissions pour le mode "disease"
  useEffect(() => {
    if (mode === "disease" && selectedDiseaseId) {
      setLoading(true);
      let url = `/api/keywordSubmissions?diseaseId=${selectedDiseaseId}`;
      if (selectedTrainingYear) {
        url += `&trainingYear=${selectedTrainingYear}`;
      }
      axios
        .get(url)
        .then((res) => {
          setSubmissions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [selectedDiseaseId, mode, selectedTrainingYear]);

  // Récupérer les soumissions pour le mode "session"
  useEffect(() => {
    if (mode === "session" && selectedSessionId) {
      setLoading(true);
      let url = `/api/keywordSubmissions?gameSessionId=${selectedSessionId}`;
      if (selectedTrainingYear) {
        url += `&trainingYear=${selectedTrainingYear}`;
      }
      axios
        .get(url)
        .then((res) => {
          setSubmissions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [selectedSessionId, mode, selectedTrainingYear]);

  // Agrégation des mots clés pour le mode "disease"
  const aggregatedKeywords = submissions.reduce((acc: Record<string, number>, sub) => {
    const keyword = sub.keyword.toLowerCase().trim();
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {});

  const totalSubmissions = Object.values(aggregatedKeywords).reduce((sum, count) => sum + count, 0);

  // Fonction pour exporter le tableau en CSV
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Mot clé,Occurences,Pourcentage\n";
    Object.entries(aggregatedKeywords)
      .sort(([, aCount], [, bCount]) => bCount - aCount)
      .forEach(([keyword, count]) => {
        const percentage = ((count / totalSubmissions) * 100).toFixed(0);
        csvContent += `${keyword},${count},${percentage}%\n`;
      });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "keywords.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Head>
        <title>Admin - Analyse des mots clés</title>
      </Head>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900 text-center flex-1">
          Analyse des mots clés soumis
        </h1>
        {/* Bouton retour à l'accueil */}
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retour à l'accueil
        </button>
      </div>

      {/* Sélection de l'année de formation */}
      <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow mb-6">
        <label htmlFor="trainingYear" className="block text-lg text-gray-800 mb-2">
          Filtrer par année de formation :
        </label>
        <select
          id="trainingYear"
          value={selectedTrainingYear}
          onChange={(e) => setSelectedTrainingYear(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-800"
        >
          <option value="">-- Toutes les années --</option>
          {trainingYearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Boutons de sélection de mode */}
      <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              setMode("disease");
              setSelectedSessionId("");
            }}
            className={`px-4 py-2 rounded ${mode === "disease" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Par maladie
          </button>
          <button
            onClick={() => {
              setMode("session");
              setSelectedDiseaseId("");
            }}
            className={`px-4 py-2 rounded ${mode === "session" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Par session
          </button>
        </div>

        {mode === "disease" ? (
          <>
            <label htmlFor="disease" className="block text-lg text-gray-800 mb-2">
              Sélectionnez une maladie :
            </label>
            <select
              id="disease"
              value={selectedDiseaseId}
              onChange={(e) => setSelectedDiseaseId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-800"
            >
              <option value="">-- Choisissez une maladie --</option>
              {diseases.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <label htmlFor="session" className="block text-lg text-gray-800 mb-2">
              Sélectionnez une session :
            </label>
            <select
              id="session"
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-800"
            >
              <option value="">-- Choisissez une session --</option>
              {sessions.map((s) => {
                const disease = diseases.find((d) => d.id === s.diseaseId);
                return (
                  <option key={s.id} value={s.id}>
                    {disease ? disease.name : s.diseaseId} – {new Date(s.createdAt).toLocaleString()} – {s.trainingYear}
                  </option>
                );
              })}
            </select>
          </>
        )}
      </div>

      {loading && <p className="text-center mt-4">Chargement des soumissions...</p>}

      {mode === "disease" && selectedDiseaseId && !loading && (
        <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Mots clés soumis pour la maladie sélectionnée
            </h2>
            {/* Bouton d'export CSV */}
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Exporter en CSV
            </button>
          </div>
          {totalSubmissions === 0 ? (
            <p>Aucune soumission trouvée.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Mot clé</th>
                  <th className="border p-2 text-left">Occurences</th>
                  <th className="border p-2 text-left">Pourcentage</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(aggregatedKeywords)
                  .sort(([, aCount], [, bCount]) => bCount - aCount)
                  .map(([keyword, count]) => {
                    const percentage = ((count / totalSubmissions) * 100).toFixed(0);
                    return (
                      <tr key={keyword}>
                        <td className="border p-2">{keyword}</td>
                        <td className="border p-2">{count}</td>
                        <td className="border p-2">
                          <div className="bg-gray-200 w-full">
                            <div
                              className="bg-blue-700 text-white text-xs text-center"
                              style={{ width: `${percentage}%` }}
                            >
                              {percentage}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {mode === "session" && selectedSessionId && !loading && (
        <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Mots clés soumis pour la session sélectionnée
          </h2>
          {submissions.length === 0 ? (
            <p>Aucune soumission trouvée pour cette session.</p>
          ) : (
            <ul className="list-disc pl-5">
              {submissions.map((sub) => (
                <li key={sub.id} className="mb-1">
                  {sub.keyword} - {new Date(sub.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
