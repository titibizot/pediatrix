// pages/api/keywordSubmissions.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Récupération des paramètres de la requête
    const { diseaseId, gameSessionId, trainingYear } = req.query;
    try {
      let whereClause = {};

      if (diseaseId) {
        whereClause = {
          gameSession: {
            diseaseId: diseaseId.toString(),
            ...(trainingYear ? { trainingYear: trainingYear.toString() } : {}),
          },
        };
      } else if (gameSessionId) {
        whereClause = {
          gameSessionId: gameSessionId.toString(),
          ...(trainingYear ? { gameSession: { trainingYear: trainingYear.toString() } } : {}),
        };
      } else if (trainingYear) {
        // Si seul l'année est fournie, retourner toutes les soumissions pour les sessions avec cette année.
        whereClause = {
          gameSession: {
            trainingYear: trainingYear.toString(),
          },
        };
      } else {
        return res.status(400).json({ error: "Veuillez fournir un paramètre de filtrage (diseaseId, gameSessionId ou trainingYear)." });
      }

      const submissions = await prisma.keywordSubmission.findMany({
        where: whereClause,
        orderBy: { createdAt: 'asc' },
      });
      return res.status(200).json(submissions);
    } catch (error) {
      console.error("Erreur GET keywordSubmissions :", error);
      return res.status(500).json({ error: "Erreur lors de la récupération des soumissions" });
    }
  } else if (req.method === 'POST') {
    // Création d'une soumission de mot clé
    const { gameSessionId, keyword } = req.body;
    if (!gameSessionId || !keyword) {
      return res.status(400).json({ error: "Missing required fields: gameSessionId and keyword" });
    }
    try {
      const submission = await prisma.keywordSubmission.create({
        data: {
          gameSession: { connect: { id: gameSessionId } },
          keyword,
        },
      });
      return res.status(200).json({ message: "Keyword submission recorded", submission });
    } catch (error) {
      console.error("Erreur POST keywordSubmissions :", error);
      return res.status(500).json({ error: "Erreur lors de l'enregistrement de la soumission" });
    }
  } else {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
}
