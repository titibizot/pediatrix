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
    const specialtyStr = Array.isArray(specialty) ? specialty[0] : specialty;

    // Construire le filtre de manière identique à randomDisease
    const filter = specialtyStr
      ? { specialties: { some: { name: { equals: specialtyStr, mode: 'insensitive' } } } }
      : {};

    // Récupérer toutes les maladies correspondant au filtre, avec un ordre constant
    const diseases = await prisma.disease.findMany({
      where: filter,
      orderBy: { name: 'asc' }
    });

    if (!diseases.length) {
      return res.status(404).json({ error: "Aucune maladie trouvée" });
    }

    // Utiliser la date UTC au format "YYYY-MM-DD"
    const today = new Date().toISOString().slice(0, 10);
    const hash = hashString(today);
    const index = hash % diseases.length;

    // Logs de débogage
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
