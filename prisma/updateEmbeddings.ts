// prisma/updateEmbeddings.ts
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function updateEmbeddingForDisease(disease: { id: string; description: string; name: string }) {
  try {
    // Appel à l'API OpenAI pour calculer l'embedding à partir de la description (ou autre champ représentatif)
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        input: disease.description,
        model: "text-embedding-ada-002"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    const embedding = response.data.data[0].embedding;
    
    // Met à jour le champ "keywordsembedding" (le nom que Prisma attend d'après l'erreur)
    await prisma.disease.update({
      where: { id: disease.id },
      data: { keywordsembedding: embedding }
    });
    console.log(`Embedding mis à jour pour ${disease.name}`);
  } catch (error: any) {
    console.error(`Erreur lors de la mise à jour pour ${disease.name}:`, error.response?.data || error.message);
  }
}

async function main() {
  try {
    const diseases = await prisma.disease.findMany({
      where: { specialty: "pediatrie" }
    });

    if (diseases.length === 0) {
      console.log("Aucune maladie trouvée pour la spécialité pediatrie.");
      return;
    }

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
