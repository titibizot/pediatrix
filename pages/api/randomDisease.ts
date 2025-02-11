// pages/api/randomDisease.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const diseases = await prisma.disease.findMany({
      where: { specialty: "pediatrie" }
    });
    if (!diseases.length) {
      res.status(404).json({ error: "Aucune maladie trouvée" });
      return;
    }
    const randomIndex = Math.floor(Math.random() * diseases.length);
    const randomDisease = diseases[randomIndex];
    res.status(200).json(randomDisease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de la maladie aléatoire" });
  }
}
