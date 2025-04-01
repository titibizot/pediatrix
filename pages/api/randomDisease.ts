// pages/api/randomDisease.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Récupérer le paramètre de requête "specialty" (optionnel)
    const { specialty } = req.query;
    const specialtyStr = Array.isArray(specialty) ? specialty[0] : specialty;

    // Construire le filtre si une spécialité est fournie
    const filter = specialtyStr
      ? { specialties: { some: { name: { equals: specialtyStr, mode: 'insensitive' } } } }
      : {};

    // Récupérer toutes les maladies correspondant au filtre
    const diseases = await prisma.disease.findMany({
      where: filter,
      // Aucun select n'est précisé, ainsi tous les champs (y compris startingKeyword) sont retournés
    });

    if (!diseases.length) {
      return res.status(404).json({ error: "Aucune maladie trouvée" });
    }

    // Sélectionner une maladie aléatoirement
    const randomIndex = Math.floor(Math.random() * diseases.length);
    const randomDisease = diseases[randomIndex];

    res.status(200).json(randomDisease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de la maladie aléatoire" });
  }
}
