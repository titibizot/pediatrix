// pages/api/statistics/personal.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "Paramètre userId manquant ou invalide." });
  }
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const sessions = await prisma.gameSession.findMany({
      where: {
        userId,
        createdAt: { gte: startOfDay }
      }
    });
    const gamesPlayed = sessions.length;
    const totalTime = sessions.reduce((acc, session) => acc + (session.timeSpent || 0), 0);
    res.status(200).json({ gamesPlayed, totalTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques personnelles." });
  }
}
