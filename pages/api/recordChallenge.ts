// pages/api/recordChallenge.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, TrainingYear } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { mode, success, diseaseId, trainingYear } = req.body;
  if (!mode || typeof success === "undefined" || !diseaseId || !trainingYear) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Ici, on n'utilise pas l'utilisateur, la session sera anonyme.
  try {
    const gameSession = await prisma.gameSession.create({
      data: {
        mode,
        success,
        diseaseId,
        trainingYear, // Valeur de type TrainingYear (l'enum)
      },
    });
    return res.status(200).json({ message: "Session enregistrée", gameSession });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la session :", error);
    return res.status(500).json({ error: "Erreur lors de l'enregistrement de la session" });
  }
}
