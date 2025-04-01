// pages/api/gameSessions.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { trainingYear } = req.query;
    const filter = trainingYear
      ? { trainingYear: trainingYear.toString() }
      : {};

    const gameSessions = await prisma.gameSession.findMany({
      where: filter,
      select: {
        id: true,
        diseaseId: true,
        trainingYear: true,
        createdAt: true,
        disease: { select: { name: true } }, // Inclut le nom de la maladie
      },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(gameSessions);
  } catch (error) {
    console.error("Erreur lors de la récupération des sessions de jeu :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des sessions de jeu" });
  }
}
