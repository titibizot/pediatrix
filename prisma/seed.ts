import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Supprimez toutes les entrées existantes dans la table Disease
  await prisma.disease.deleteMany({});
  await prisma.disease.createMany({
    data: [
      {
        name: "Bronchiolite",
        keywords: [
          "toux", "fièvre", "dyspnée", "sifflements", "Nourrisson",
          "mucus", "Virus", "crépitants", "Pneumologie",
          "apnée", "irritabilité", "Sibilants", "hypoxémie", "tachypnée",
          "Détresse", "broncho", "inflammation", "sevrage", "Infection",
          "ventilation", "sibilants", "régurgitations", "dyspnée",
          "rétraction", "Oxygène", "infection", "bactéries", "viraux", "antibiotiques",
          "épidémie", "réanimation", "Respiratoire", "Hiver", "Contagion", 
		  "VRS", "alvéole", "bronches", "rhinite", "Bronchodilatateur", "désaturation",
		  "cyanose", "rhinovirus"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/bronchiolite-aigue-du-nourrisson",
        specialty: "pediatrie"
      },
      {
        name: "Otite",
        keywords: [
          "douleur", "oreille", "fièvre", "inflammation", "otalgie",
          "infection", "écoulement", "rougeur", "pression", "tympan",
          "bactérienne", "virale", "enfant", "nourrisson", "antibiotique",
          "otorrhée", "ORL", "localisation", "Infection", 
          "inconfort", "sensibilité", "perforation", "épanchement", "hypoacousie",
          "audition", "irritabilité", "surdité", "cholestéatome",
          "récurrence", "hyperalgie", "aérateurs", "streptocoque", "pneumocoque", "eustache"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/otites",
        specialty: "pediatrie"
      },
      {
        name: "Gastro-entérite",
        keywords: [
          "diarrhée", "vomissements", "déshydratation", "douleur",
          "fièvre", "nausée", "crampes", "infection", "virus", "bactéries",
          "contamination", "inflammation", "digestif", "intestin", "abdomen",
          "alimentaire", "hygiène", "abdominal", "Gastroentérologie", "faiblesse",
          "Infection", "Rotavirus", "réhydratation", "oral", "intraveineux",
          "SRO", "électrolytes", "hospitalisation", "prévention", "vaccination",
		  "antispasmodique", "probiotiques", "hypovolémie", "Antidiarrhéique", "selles", 
		  "dysentérie", "selles"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/diarrhee-aigue",
        specialty: "pediatrie"
      }
      // Vous pouvez ajouter d'autres maladies ici...
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
