// pages/api/randomDisease.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // On récupère le paramètre de requête "specialty" (optionnel)
    const { specialty } = req.query;

    // Construire la condition de filtre : si specialty est fourni, on filtre sur la relation specialties
    const filter = specialty
      ? { specialties: { some: { name: specialty.toString().toLowerCase() } } }
      : {};

    // Récupérer toutes les maladies correspondant au filtre
    const diseases = await prisma.disease.findMany({
      where: filter,
    });

    if (!diseases.length) {
      res.status(404).json({ error: "Aucune maladie trouvée" });
      return;
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
