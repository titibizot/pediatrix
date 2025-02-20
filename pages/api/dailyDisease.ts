// pages/api/dailyDisease.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Récupérer le paramètre de requête "specialty" (optionnel)
    const { specialty } = req.query;
    // Si un paramètre est fourni, filtrer sur la relation specialties
    const filter = specialty
      ? { specialties: { some: { name: specialty.toString().toLowerCase() } } }
      : {};

    const diseases = await prisma.disease.findMany({
      where: filter,
      orderBy: { name: 'asc' }  // Ordre constant
    });

    if (!diseases.length) {
      return res.status(404).json({ error: "Aucune maladie trouvée" });
    }

    // Utiliser la date UTC au format "YYYY-MM-DD"
    const today = new Date().toISOString().slice(0, 10);
    const hash = hashString(today);
    const index = hash % diseases.length;

    // Ajout de logs pour déboguer
    console.log("Liste des maladies :", diseases.map(d => d.name));
    console.log("Date UTC:", today);
    console.log("Hash:", hash);
    console.log("Index calculé:", index);

    const dailyDisease = diseases[index];
    return res.status(200).json(dailyDisease);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la récupération de la maladie du jour" });
  }
}
