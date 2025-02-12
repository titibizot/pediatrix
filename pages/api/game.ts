// pages/api/game.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, diseaseId, mode, success, timeSpent } = req.body;
    try {
      const session = await prisma.gameSession.create({
        data: { userId, diseaseId, mode, success, timeSpent }
      });
      return res.status(200).json({ session });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur lors de l'enregistrement de la session." });
    }
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}
