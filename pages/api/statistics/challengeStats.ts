import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const now = new Date();
    // Début de la journée en UTC
    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    
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
