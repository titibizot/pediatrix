import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const diseases = await prisma.disease.findMany({
      select: {
        id: true,
        name: true,
        keywords: true,        // Ajouté
        synonyms: true,        // Ajouté
        startingKeyword: true, // Ajouté
      },
      orderBy: { name: "asc" },
    });
    res.status(200).json(diseases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des maladies" });
  }
}
