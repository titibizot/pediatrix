// pages/admin/synonyms.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function SynonymsAdmin() {
  const [diseases, setDiseases] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  // Charger toutes les maladies avec leurs champs complets
  useEffect(() => {
    axios.get('/api/diseases')
      .then((res) => {
        setDiseases(res.data);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Erreur lors du chargement des maladies");
      });
  }, []);

  // Met à jour le champ synonyms localement pour une maladie donnée
  const handleSynonymsChange = (id: string, value: string) => {
    setDiseases(prev =>
      prev.map(d => d.id === id ? { ...d, synonyms: value } : d)
    );
  };

  // Envoi de la mise à jour pour une maladie donnée
  const handleUpdate = async (disease: any) => {
    try {
      // On attend que l'utilisateur fournisse un JSON valide
      const parsedSynonyms = JSON.parse(disease.synonyms);
      const res = await axios.post('/api/updateSynonyms', {
        id: disease.id,
        synonyms: parsedSynonyms,
      });
      setMessage(`Synonymes de ${disease.name} mis à jour avec succès.`);
      // On met à jour localement avec la réponse (optionnel)
      setDiseases(prev =>
        prev.map(d => d.id === disease.id ? { ...d, synonyms: JSON.stringify(parsedSynonyms, null, 2) } : d)
      );
    } catch (error: any) {
      console.error(error);
      setMessage(`Erreur lors de la mise à jour de ${disease.name}: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Admin - Modifier les Synonymes</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Administration - Modifier les Synonymes</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      {diseases.length === 0 ? (
        <p>Chargement des maladies...</p>
      ) : (
        <div>
          {diseases.map((disease) => (
            <div key={disease.id} className="border p-4 mb-4">
              <h2 className="text-xl font-bold">{disease.name}</h2>
              <p>
                <strong>Mots-clés:</strong>{" "}
                {Array.isArray(disease.keywords) ? disease.keywords.join(", ") : ""}
              </p>
              <label className="block mt-2 mb-1 font-medium">
                Synonymes (format JSON) :
              </label>
              <textarea
                className="w-full border p-2"
                rows={4}
                value={typeof disease.synonyms === 'string'
                  ? disease.synonyms
                  : JSON.stringify(disease.synonyms, null, 2)}
                onChange={(e) => handleSynonymsChange(disease.id, e.target.value)}
              />
              <button
                onClick={() => handleUpdate(disease)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Mettre à jour
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
