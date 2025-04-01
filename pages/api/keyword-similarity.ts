import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { newStemmer } from 'snowball-stemmers';

// Initialisation du stemmer pour le français
const frenchStemmer = newStemmer("french");

/**
 * Normalise un mot en supprimant espaces, ponctuation et accents, puis applique le stemming sur le suffixe.
 */
function normalizeWord(word: string): string {
  const cleaned = word.replace(/[-’',;:.!? ]/g, "");
  const normalized = cleaned.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const prefixLength = 3;
  if (normalized.length <= prefixLength) {
    return normalized.toLowerCase();
  }
  const prefix = normalized.slice(0, prefixLength).toLowerCase();
  const suffix = normalized.slice(prefixLength);
  const stemmedSuffix = frenchStemmer.stem(suffix.toLowerCase());
  return prefix + stemmedSuffix;
}

/**
 * Calcule la similarité cosinus entre deux vecteurs.
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (normA * normB);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { word, targetKeywords, targetSynonyms } = req.body;
  if (!word || !targetKeywords || !Array.isArray(targetKeywords) || targetKeywords.length === 0) {
    return res.status(400).json({ message: "Paramètres manquants : 'word' et 'targetKeywords' sont requis." });
  }

  const normalizedStudentWord = normalizeWord(word);
  let bestSimilarity = -Infinity;
  let bestKeyword: string | null = null;
  let foundExact = false;

  // --- 1. Vérification des mots-clés originaux ---
  if (normalizedStudentWord.length <= 3) {
    for (const keyword of targetKeywords) {
      const normalizedKeyword = normalizeWord(keyword);
      if (normalizedKeyword === normalizedStudentWord) {
        bestSimilarity = 1.0;
        bestKeyword = keyword;
        foundExact = true;
        break;
      }
    }
  } else {
    for (const keyword of targetKeywords) {
      const normalizedKeyword = normalizeWord(keyword);
      if (
        normalizedKeyword === normalizedStudentWord ||
        normalizedKeyword.includes(normalizedStudentWord) ||
        normalizedStudentWord.includes(normalizedKeyword)
      ) {
        bestSimilarity = 1.0;
        bestKeyword = keyword;
        foundExact = true;
        break;
      }
    }
  }

  if (foundExact) {
    return res.status(200).json({
      similarity: bestSimilarity,
      bestKeyword,
      color: "lightgreen",
      message: `Correspondance exacte${normalizedStudentWord.length <= 3 ? "" : " ou par inclusion"} avec le mot clé "${bestKeyword}".`
    });
  }

  // --- 2. Vérification des synonymes ---
  // Extraction des synonymes (peut être un objet ou un tableau)
  let synonymsArray: string[] = [];
  if (targetSynonyms && typeof targetSynonyms === 'object') {
    if (Array.isArray(targetSynonyms)) {
      synonymsArray = targetSynonyms;
    } else {
      synonymsArray = Object.values(targetSynonyms)
        .filter(arr => Array.isArray(arr))
        .flat() as string[];
    }
  }

  for (const syn of synonymsArray) {
    const normalizedSyn = normalizeWord(syn);
    if (normalizedStudentWord === normalizedSyn) {
      return res.status(200).json({
        similarity: 1.0,
        bestKeyword: syn,
        color: "orange",
        message: `Correspondance exacte avec le synonyme "${syn}".`
      });
    }
  }

  // --- 3. Calcul par embeddings ---
  try {
    const studentResponse = await axios.post(
      "https://api.openai.com/v1/embeddings",
      { input: word, model: "text-embedding-ada-002" },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    const studentEmbedding: number[] = studentResponse.data.data[0].embedding;

    const keywordsResponse = await axios.post(
      "https://api.openai.com/v1/embeddings",
      { input: targetKeywords, model: "text-embedding-ada-002" },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    const keywordsEmbeddings: number[][] = keywordsResponse.data.data.map((item: any) => item.embedding);

    for (let i = 0; i < keywordsEmbeddings.length; i++) {
      const sim = cosineSimilarity(studentEmbedding, keywordsEmbeddings[i]);
      if (sim > bestSimilarity) {
        bestSimilarity = sim;
        bestKeyword = targetKeywords[i];
      }
    }

    const threshold = 0.86;
    let color = bestSimilarity >= threshold ? "orange" : "red";

    return res.status(200).json({
      similarity: bestSimilarity,
      bestKeyword,
      color,
      message: `La similarité est de ${bestSimilarity.toFixed(2)} avec le mot clé "${bestKeyword}".`
    });
  } catch (error: any) {
    console.error("Erreur dans /api/keyword-similarity:", error.response?.data || error.message);
    return res.status(500).json({ message: "Erreur lors du traitement de l'embedding." });
  }
}
