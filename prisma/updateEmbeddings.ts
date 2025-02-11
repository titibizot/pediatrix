// prisma/updateEmbeddings.ts
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

/**
 * Fonction qui met à jour l'embedding d'une maladie.
 * Elle prend la description de la maladie (ou tout autre texte représentatif) et appelle l'API OpenAI pour obtenir le vecteur d'embedding.
 * Ensuite, ce vecteur est stocké dans le champ "embedding" de la maladie dans la base de données.
 */
async function updateEmbeddingForDisease(disease: { id: string; description: string; name: string }) {
  try {
    // Appel à l'API OpenAI pour calculer l'embedding à partir de la description
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        input: disease.description, // vous pouvez aussi utiliser un champ de mots-clés ou une concaténation de plusieurs champs
        model: "text-embedding-ada-002"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    // Extraction du vecteur embedding retourné par OpenAI
    const embedding = response.data.data[0].embedding;

    // Mise à jour de la maladie dans la base de données avec le nouvel embedding
    await prisma.disease.update({
      where: { id: disease.id },
      data: { embedding }
    });
    console.log(`Embedding mis à jour pour ${disease.name}`);
  } catch (error: any) {
    console.error(`Erreur lors de la mise à jour pour ${disease.name}:`, error.response?.data || error.message);
  }
}

/**
 * Fonction principale qui récupère toutes les maladies de la spécialité "pediatrie"
 * et met à jour leur embedding en appelant updateEmbeddingForDisease pour chacune.
 */
async function main() {
  try {
    // Récupérer toutes les maladies de la spécialité "pediatrie" dans la base
    const diseases = await prisma.disease.findMany({
      where: { specialty: "pediatrie" }
    });

    if (diseases.length === 0) {
      console.log("Aucune maladie trouvée pour la spécialité pediatrie.");
      return;
    }

    // Pour chaque maladie, mettre à jour son embedding
    for (const disease of diseases) {
      await updateEmbeddingForDisease({
        id: disease.id,
        description: disease.description,
        name: disease.name
      });
    }
  } catch (error) {
    console.error("Erreur dans le script de mise à jour des embeddings:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
