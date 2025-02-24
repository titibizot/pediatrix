// pages/api/recordChallenge.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mode, success, diseaseId } = req.body;
  // Si aucun diseaseId n'est fourni, on utilise une valeur par défaut.
  const finalDiseaseId = diseaseId || "inconnu";

  try {
    const record = await prisma.gameSession.create({
      data: {
        mode,
        success,
        diseaseId: finalDiseaseId,
      },
    });
    res.status(200).json(record);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la session:", error);
    res.status(500).json({ error: "Erreur lors de l'enregistrement de la session challenge." });
  }
}
