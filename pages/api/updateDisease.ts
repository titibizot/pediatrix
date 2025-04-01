import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { id, keywords, synonyms, startingKeyword } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Identifiant manquant" });
  }

  try {
    const updated = await prisma.disease.update({
      where: { id },
      data: {
        keywords,
        synonyms,
        startingKeyword,
      },
    });
    return res.status(200).json({ message: "Maladie mise à jour", disease: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour de la maladie" });
  }
}
