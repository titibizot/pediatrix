// prisma/updateKeywordsEmbeddings.ts
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function updateKeywordsEmbeddingForDisease(disease: { id: string; name: string; keywords: string[] }) {
  if (!disease.keywords || disease.keywords.length === 0) {
    console.log(`Pas de mots clés pour ${disease.name}`);
    return;
  }
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        input: disease.keywords,
        model: "text-embedding-ada-002"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    const embeddings = response.data.data.map((item: any) => item.embedding);
    
    await prisma.disease.update({
      where: { id: disease.id },
      data: { keywordsembedding: embeddings }  // Utilisation de "keywordsembedding" au lieu de "keywordsEmbeddings"
    });
    console.log(`Keywords embeddings mis à jour pour ${disease.name}`);
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
      if (Array.isArray(disease.keywords)) {
        await updateKeywordsEmbeddingForDisease({
          id: disease.id,
          name: disease.name,
          keywords: disease.keywords
        });
      } else {
        console.log(`Les mots clés pour ${disease.name} ne sont pas au format attendu.`);
      }
    }
  } catch (error) {
    console.error("Erreur dans le script de mise à jour des keywords embeddings:", error);
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
