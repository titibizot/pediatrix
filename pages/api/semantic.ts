// pages/api/semantic.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type ResponseData = {
  message: string;
  isCorrect?: boolean;
  disease?: {
    name: string;
    referenceLink: string;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { keywords } = req.body;
  if (!keywords) {
    return res.status(400).json({ message: "Mots clés manquants" });
  }

  // Simulation de la logique de vérification :
  // Si les mots clés contiennent "bronchiolite", on considère que c'est la bonne réponse.
  if (keywords.toLowerCase().includes("bronchiolite")) {
    return res.status(200).json({
      message: "Bonne réponse !",
      isCorrect: true,
      disease: {
        name: "Bronchiolite",
        referenceLink: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/bronchiolite-aigue-du-nourrisson'"
      }
    });
  } else {
    // Vous pouvez ici intégrer un appel réel à l'API OpenAI pour obtenir et comparer les embeddings.
    // Exemple d'appel (commenté) :
    /*
    try {
      const response = await axios.post("https://api.openai.com/v1/embeddings", {
        input: keywords,
        model: "text-embedding-ada-002"
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      });
      // Logique de comparaison des embeddings à implémenter ici.
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de l'appel à l'API OpenAI" });
    }
    */
    return res.status(200).json({
      message: "Mots clés enregistrés, continuez à essayer.",
      isCorrect: false
    });
  }
}
