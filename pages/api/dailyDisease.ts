// pages/api/dailyDisease.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Récupérer toutes les maladies de la spécialité "pediatrie" depuis la base de données
    const diseases = await prisma.disease.findMany({
      where: { specialty: "pediatrie" }
    });
    if (!diseases.length) {
      res.status(404).json({ error: "Aucune maladie trouvée" });
      return;
    }
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();  // Conversion explicite en nombre
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const dailyDisease = diseases[dayOfYear % diseases.length];
    res.status(200).json(dailyDisease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de la maladie du jour" });
  }
}
