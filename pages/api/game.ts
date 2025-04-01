// pages/api/game.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { diseaseId, mode, success, timeSpent } = req.body;

  try {
 const session = await prisma.gameSession.create({
  data: {
    disease: { connect: { id: diseaseId } },
    mode,
    success,
    timeSpent,
    trainingYear,
  },
});
    return res.status(200).json({ session });
  } catch (error: any) {
    console.error("Erreur dans /api/game:", error);
    return res.status(500).json({ message: "Erreur lors de la création de la session" });
  }
}
