// pages/api/updateSynonyms.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { id, synonyms } = req.body;
  if (!id || synonyms === undefined) {
    return res.status(400).json({ error: "Paramètres manquants" });
  }

  try {
    const updated = await prisma.disease.update({
      where: { id },
      data: { synonyms },
    });
    return res.status(200).json({ message: "Synonymes mis à jour", disease: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour des synonymes" });
  }
}
