import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const count = await prisma.gameSession.count({
      where: {
        mode: "challenge",
        success: true,
        createdAt: {
          gte: startOfDay
        }
      }
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques Challenge." });
  }
}
