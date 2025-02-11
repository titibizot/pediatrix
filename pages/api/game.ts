// pages/api/game.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Récupération des données envoyées par le client
    const { userId, diseaseId, mode, success } = req.body;
    try {
      // Création d'une nouvelle session de jeu dans la base de données
      const session = await prisma.gameSession.create({
        data: {
          userId,     // Peut être null pour un joueur en invité
          diseaseId,  
          mode,       // "challenge" ou "libre"
          success     // true si la maladie a été correctement devinée
        }
      });
      return res.status(200).json({ session });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur lors de l'enregistrement de la session" });
    }
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}
