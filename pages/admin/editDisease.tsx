import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";

export default function EditDisease() {
  const [diseases, setDiseases] = useState<any[]>([]);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  // Nous allons utiliser un objet pour stocker les synonymes par mot-clé
  const [synonymsMapping, setSynonymsMapping] = useState<{ [key: string]: string }>({});
  const [startingKeyword, setStartingKeyword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    axios.get("/api/diseases")
      .then((res) => setDiseases(res.data))
      .catch((err) => setFeedback("Erreur lors du chargement des maladies"));
  }, []);

  useEffect(() => {
    if (selectedDiseaseId) {
      const disease = diseases.find((d) => d.id === selectedDiseaseId);
      if (disease) {
        setIsNew(false);
        setKeywordsInput(Array.isArray(disease.keywords) ? disease.keywords.join(", ") : "");
        // Pour chaque mot-clé, afficher les synonymes (si existants) sous forme de chaîne
        const mapping: { [key: string]: string } = {};
        if (disease.keywords && Array.isArray(disease.keywords)) {
          disease.keywords.forEach((kw: string) => {
            mapping[kw] = disease.synonyms && disease.synonyms[kw] 
              ? disease.synonyms[kw].join(", ") 
              : "";
          });
        }
        setSynonymsMapping(mapping);
        setStartingKeyword(disease.startingKeyword || "");
        setFeedback("");
      }
    } else {
      // Mode création
      setIsNew(true);
      setKeywordsInput("");
      setSynonymsMapping({});
      setStartingKeyword("");
      setFeedback("");
    }
  }, [selectedDiseaseId, diseases]);

  // Met à jour la valeur des synonymes pour un mot-clé donné
  const handleSynonymChange = (keyword: string, value: string) => {
    setSynonymsMapping(prev => ({ ...prev, [keyword]: value }));
  };

  const handleUpdate = async () => {
    try {
      // Convertir les mots-clés en tableau
      const keywordsArray = keywordsInput.split(",").map(k => k.trim()).filter(k => k !== "");
      // Convertir la mapping en objet avec des tableaux (en séparant par virgules)
      const parsedSynonyms: { [key: string]: string[] } = {};
      for (const key in synonymsMapping) {
        parsedSynonyms[key] = synonymsMapping[key]
          .split(",")
          .map(s => s.trim())
          .filter(s => s !== "");
      }
      let res;
      if (isNew) {
        res = await axios.post("/api/createDisease", {
          name: "Nouvelle maladie", // Vous pouvez ajouter un champ pour saisir le nom
          keywords: keywordsArray,
          synonyms: parsedSynonyms,
          startingKeyword,
        });
        setFeedback(`Maladie créée : ${res.data.disease.name}`);
      } else {
        res = await axios.post("/api/updateDisease", {
          id: selectedDiseaseId,
          keywords: keywordsArray,
          synonyms: parsedSynonyms,
          startingKeyword,
        });
        setFeedback(`Maladie "${res.data.disease.name}" mise à jour avec succès.`);
      }
      // Actualiser la liste
      axios.get("/api/diseases")
        .then((res) => setDiseases(res.data))
        .catch((err) => console.error(err));
    } catch (error: any) {
      console.error(error);
      setFeedback("Erreur lors de la mise à jour/création. Vérifiez vos entrées.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Admin - Modifier ou Ajouter une Maladie</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Administration – Modifier ou Ajouter une Maladie</h1>
      
      <div className="mb-4">
        <label className="block text-lg mb-2">Sélectionnez la maladie à modifier :</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedDiseaseId}
          onChange={(e) => setSelectedDiseaseId(e.target.value)}
        >
          <option value="">-- Nouvelle maladie --</option>
          {diseases.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Optionnel : champ de nom (à ajouter si besoin) */}
      <div className="mb-4">
        <label className="block text-lg mb-1">Nom de la maladie :</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          defaultValue={isNew ? "" : diseases.find(d => d.id === selectedDiseaseId)?.name}
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-1">Mots-clés (séparés par des virgules) :</label>
        <input
          type="text"
          value={keywordsInput}
          onChange={(e) => setKeywordsInput(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-1">Synonymes :</label>
        {/* Pour chaque mot-clé, afficher un input pour les synonymes */}
        {keywordsInput.split(",").map((kw, idx) => {
          const keyword = kw.trim();
          if (!keyword) return null;
          return (
            <div key={idx} className="mb-2">
              <label className="block font-bold">{keyword} :</label>
              <input
                type="text"
                value={synonymsMapping[keyword] || ""}
                onChange={(e) => handleSynonymChange(keyword, e.target.value)}
                placeholder="Entrez des synonymes séparés par des virgules"
                className="w-full p-2 border rounded"
              />
            </div>
          );
        })}
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-1">Starting Keyword :</label>
        <input
          type="text"
          value={startingKeyword}
          onChange={(e) => setStartingKeyword(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isNew ? "Créer la maladie" : "Mettre à jour"}
      </button>

      {feedback && <p className="mt-4 text-green-600">{feedback}</p>}
    </div>
  );
}
