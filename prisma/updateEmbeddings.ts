// prisma/updateEmbeddings.ts
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

/**
 * Met à jour l'embedding pour une maladie en utilisant ses mots clés.
 * Ici, on joint les mots clés en une seule chaîne, ce qui permet d'obtenir un vecteur global.
 */
async function updateEmbeddingForDisease(disease: { id: string; name: string; keywords: string[] }) {
  if (!disease.keywords || disease.keywords.length === 0) {
    console.log(`Pas de mots clés pour ${disease.name}`);
    return;
  }
  try {
    // Concaténer les mots clés en une chaîne (séparés par un espace)
    const inputText = disease.keywords.join(" ");
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        input: inputText,
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
    // Mise à jour du champ "keywordsembedding" dans la base
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
    // Récupérer toutes les maladies de la spécialité "pediatrie"
    const diseases = await prisma.disease.findMany({
      where: { specialty: "pediatrie" }
    });

    if (diseases.length === 0) {
      console.log("Aucune maladie trouvée pour la spécialité pediatrie.");
      return;
    }

    for (const disease of diseases) {
      if (Array.isArray(disease.keywords)) {
        await updateEmbeddingForDisease({
          id: disease.id,
          name: disease.name,
          keywords: disease.keywords
        });
      } else {
        console.log(`Les mots clés pour ${disease.name} ne sont pas au format attendu.`);
      }
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
