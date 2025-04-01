// pages/api/createGameSession.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { diseaseId, trainingYear } = req.body;
  if (!diseaseId || !trainingYear) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const gameSession = await prisma.gameSession.create({
      data: {
        mode: "libre",
        success: false,
        diseaseId,
        trainingYear, // La valeur doit correspondre à l'enum TrainingYear dans votre schéma
      },
    });
    return res.status(200).json({ message: "Session created", gameSession });
  } catch (error) {
    console.error("Erreur lors de la création de la session:", error);
    return res.status(500).json({ error: "Erreur lors de la création de la session" });
  }
}
