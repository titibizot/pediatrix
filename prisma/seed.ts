import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Supprimez toutes les entrées existantes dans la table Disease
  await prisma.disease.deleteMany({});
  
  // Exemple de données de seed
  const diseases = [
    {
      name: "Bronchiolite",
        keywords: [
          "toux", "fièvre", "dyspnée", "sifflements", "Nourrisson",
          "mucus", "Virus", "crépitants", "pneumologie",
          "apnée", "irritabilité", "Sibilants", "hypoxémie", "tachypnée",
          "Détresse", "broncho", "inflammation", "sevrage", "Infection",
          "ventilation", "sibilants", "régurgitations", "dyspnée",
          "rétraction", "Oxygène", "infection", "bactéries", "viraux", "antibiotiques",
          "épidémie", "réanimation", "Respiratoire", "Hiver", "Contagion", 
		  "VRS", "alvéole", "bronches", "rhinite", "Bronchodilatateur", "désaturation",
		  "cyanose", "rhinovirus"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/bronchiolite-aigue-du-nourrisson",
		specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "pneumologie" },
          create: { name: "pneumologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
        }
      ]
	}
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
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "ORL" },
          create: { name: "ORL" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
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
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Gastroentérologie" },
          create: { name: "Gastroentérologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	   {
        name: "Appendicite",
        keywords: [
          "Enfant", "Chirurgie", "Infectiologie", "Abdomen", "Douleur",
          "Fièvre", "Vomissements", "Psoitis", "Défense", "Perforation",
          "Urgence", "Inflammation", "Péritonéale", "Appendice", "antibiotique",
          "otorrhée", "ORL", "localisation", "Infection", 
          "inconfort", "sensibilité", "McBurney", "Nausées", "Septicémie",
          "Échographie", "Abcès", "Anorexie", "Péritoine",
          "Bactérie", "Péritonite", "gastroentérologie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/gastroenterologie-nutrition-chirurgie-abdomino-pelvienne/douleurs-abdominopelviennes",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Chirurgie viscérale" },
          create: { name: "Chirurgie viscérale" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	   {
        name: "Pneumonie",
        keywords: [
          "Enfant", "Infection", "Infectiologie", "Pneumologie", "Poumon",
          "Fièvre", "Toux", "Expectorations", "Crépitants",
          "Détresse", "Dyspnée", "Bactérie", "Hémoptysie", "Cyanose",
          "Pneumocoque", "Crépitants", "Hypoxémie", "Tachypnée", 
          "Épanchement", "Auscultation", "Echographie", "Radiographie", "Antibiotiques",
          "Température", "Hyperthermie", "Fièvre", "Crachat",
          "Pleurésie", "Lobaire", "Alvéole", "Dyspnée"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/pneumonies-aigues-communautaires",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "pneumologie" },
          create: { name: "pneumologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Diabète",
        keywords: [
          "Enfant", "Endocrinologie", "Hyperglycémie", "Polyurie", "Glycémie",
          "Auto-immun", "Fatigue", "Acidocétose", "Insuline", "Polydipsie",
          "Hyperglycémie", "Amaigrissement", "Glycosurie", "Insulinodépendant", "Sucre",
          "Pancréas", "Coma", "Piqure", "Hypoglycémie", 
          "Cétose", "Insulinémie", "Neuropathie", "Anticorps", "Glucagon",
          "Glucose", "Autocontrôle", "Cétonurie"
        ],
        link: "https://www.pedia-univ.fr/node/247",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "endocrinologie" },
          create: { name: "endocrinologie" },
       }
      ]
	}
},
	  {
        name: "Méningite",
        keywords: [
          "Enfant", "Neurologie", "Infectiologie", "infection", "Fièvre",
          "Céphalée", "Raideur", "Méningé", "Photophobie", "Phonophobie",
          "Convulsion", "Purpura", "Inflammation", "Bactérie", "LCR",
          "Vomissements", "Antibiotique", "Pneumocoque", "Méningocoque", 
          "Encéphalite", "Septicémie", "Sepsis", "Virus", "Ponction",
          "Nourrisson", "Antibioprophylaxie", "Brudzinski", "Kernig", "Fulminans"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/meningites-meningo-encephalites",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "neurologie" },
          create: { name: "neurologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Kawasaki",
        keywords: [
          "Enfant", "Cardiologie", "Infectiologie", "infection", "Fièvre",
          "Éruption", "Conjonctivite", "Adénopathie", "Chéilite", "Anévrisme",
          "Desquamation", "Immunoglobulines", "vasculaire", "Coronaires", "Vascularite",
          "Adénopathie", "Érythème", "Cutané", "Rash", 
          "Conjonctive", "Échographie", "Immunoglobulines", "Hyperthermie", "Aspirine",
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/eruptions-febriles",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Syndrome néphrotique",
        keywords: [
          "Néphrologie", "Protéinurie", "Oedèmes", "Hypoalbuminémie",
          "Corticoïdes", "Rémission", "Rechute", "Urines", "Filtration",
          "Albumine", "Diurèse", "Biopsie", "Hypoprotéinémie", "Reins",
          "Néphropathie", "Hématurie", "Dialyse", "Hypertension", 
          "Protéines"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/nephrologie-chirurgie-urologique/proteinurie-syndrome-nephrotique-hematurie",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "nephrologie" },
          create: { name: "nephrologie" },
       }
      ]
	}
},
	  {
        name: "Coqueluche",
        keywords: [
          "Nourrisson", "Infectiologie", "Toux", "Apnée", "Vomissements",
          "Bordetella", "Pertussis", "Contagion", "Vaccin", "Quintes",
          "Hypoxie", "Antibiotique", "Infection", "Respiratoire", "Bactérie",
          "Cyanose", "Fièvre", "Lymphocytose", "Macrolides", 
          "Vaccination"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/coqueluche",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "pneumologie" },
          create: { name: "pneumologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Asthme",
        keywords: [
          "Nourrisson", "Enfant", "Pneumologie", "Dyspnée", "Sibilants",
          "Toux", "Obstruction", "Atopie", "Bronchospasme", "Crise",
          "Hypoxie", "Inflammation", "Infection", "Respiratoire", "Respiration",
          "Cyanose", "Salbutamol", "Exacerbation", "Hyperréactivité", 
          "Bronches", "Expectorations", "Dyspnée", "Tachypnée", "Désaturation",
		  "Bronchodilatateur", "Spirométrie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/asthme",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "pneumologie" },
          create: { name: "pneumologie" },
       }
      ]
	}
},
	   {
        name: "Rubéole",
        keywords: [
          "Nourrisson", "Enfant", "Infectiologie", "Fièvre", "Éruption",
          "Contagion", "Virus", "Vaccin", "Congénital", "Grossesse",
          "Immunisation", "ROR", "Arthralgie", "Virale", "Tératogène",
          "Fièvre", "Foetopathie", "Arthropathie", "Érythème", 
          "Surdité", "Malformation"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/eruptions-febriles",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Dermatologie" },
          create: { name: "Dermatologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Varicelle",
        keywords: [
          "Nourrisson", "Enfant", "Infectiologie", "Fièvre", "Éruption",
          "Contagion", "Virus", "Vaccin", "Prurit", "Vésicules",
          "Croûtes", "Immunisation", "Cutané", "Zona", "Antihistaminique",
          "Érythème", "Virémie", "Cicatrices", "Épidémie", 
          "Hyperthermie", "Cérébellite", "Surinfection", "Impetigo"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/eruptions-febriles",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Dermatologie" },
          create: { name: "Dermatologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Scarlatine",
        keywords: [
          "Nourrisson", "Enfant", "Infectiologie", "Fièvre", "Éruption",
          "Contagion", "ORL", "Bactérie", "Dermatologie", "Gorge",
          "Streptocoque", "Desquamation", "Cutané", "Langue", "Angine",
          "Érythème", "Antibiotique", "Amoxicilline", "Rougeur", 
          "Ganglions", "Douleur", "Toxine", "température", "Streptatest", "rash"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/eruptions-febriles",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Dermatologie" },
          create: { name: "Dermatologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	   {
        name: "Rougeole",
        keywords: [
          "Nourrisson", "Enfant", "Infectiologie", "Fièvre", "Éruption",
          "Contagion", "Virus", "Vaccin", "Koplik", "COnjonctivite",
          "Immunisation", "ROR", "Respiratoire", "Virale", "Morbilliforme",
          "Fièvre", "Macules", "Papules", "Érythème", "Dermatologie",
          "Immunoglobulines", "Exanthème", "Température", "lymphadénopathie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/eruptions-febriles",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "ORL" },
          create: { name: "ORL" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Mégalérythème épidémique",
        keywords: [
          "Nourrisson", "Enfant", "Infectiologie", "Fièvre", "Éruption",
          "Contagion", "Virus", "Parvovirus", "B19", "Joues",
          "Articulaire", "Arthralgie", "Cutané", "Grossesse", "Teratogene",
          "Fièvre", "Macules", "Papules", "Érythème", 
          "Polyarthrite", "Exanthème", "Température", "Anémie", "Erythroblastopénie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/eruptions-febriles",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Dermatologie" },
          create: { name: "Dermatologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	    {
        name: "Roséole",
        keywords: [
          "Nourrisson", "Enfant", "Infectiologie", "Fièvre", "Éruption",
          "Contagion", "Virus", "Convulsion", "Transmission", "Infection",
          "Cutané", "Fièvre", "Macules", "Papules", "Érythème", 
          "Rhinite", "Exanthème", "Température"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/eruptions-febriles",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Dermatologie" },
          create: { name: "Dermatologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	   {
        name: "Anémie",
        keywords: [
          "Nourrisson", "Enfant", "Hématologie", "Fatigue", "Asthénie",
          "Pâleur", "Ferritine", "Carence", "Malnutrition", "Érythrocytes",
          "Fer", "Hémoglobine", "Globules", "Transfusion", "B12", 
          "Folates", "Malabsorption", "Normocytaire", "Microcytaire", "Macrocytaire",
		  "Hémolyse", "Ferriprive", "Myélodysplasie", "thalassémie", "drépanocytose"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/hematologie-cancerologie/anemie-pathologies-du-fer",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Hématologie" },
          create: { name: "Hématologie" },
       }
      ]
	}
},
	  {
        name: "Allergie aux protéines de lait de vache",
        keywords: [
          "Nourrisson", "Gastroentérologie", "Diarrhée", "Douleur", "Ballonnement",
          "Digestion", "Régime", "Intestin", "RGO", "Vomissements",
          "Allergie", "Eruption", "Hypersensibilité", "Malabsorption", "Squelettique", 
          "Intolérance", "Allaitement", "IgE", "Eczéma", "Croissance",
		  "Urticaire", "Réintroduction", "Exclusion"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/hypersensibilites-allergies",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
		{
          where: { name: "Gastroentérologie" },
          create: { name: "Gastroentérologie" },
       }
      ]
	}
},
	  {
        name: "Turner",
        keywords: [
          "Nourrisson", "Génétique", "Hypogonadisme", "Dysmorphie", "Cardiopathie",
          "Infertilité", "Ovaire", "Stature", "Chromosome", "Puberté",
          "Hormonal", "Malformations", "Retard", "Monosomie", "Gonadotrophine", 
          "Pli", "Syndrome", "X", "Mutation", "Fertilité",
		  "Oedèmes", "Caryotype", "Congénital"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/croissance-developpement/chapitre-1-items-53-243-croissance-normale-pathologique",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Génétique" },
          create: { name: "Génétique" },
       }
      ]
	}
},
	  {
        name: "Maladie coeliaque",
        keywords: [
          "Nourrisson", "Gastroentérologie", "Diarrhée", "Douleur", "Ballonnement",
          "Digestion", "Régime", "Intestin", "Gluten", "Biopsie",
          "Allergie", "Auto-immun", "IgA", "Rémission", "Fatigue", 
          "Intolérance", "Asthénie", "Carence", "Villosités", "Croissance",
		  "Anémie", "Inflammation", "Histologie", "Endoscopie", "selles", "absorption"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/gastroenterologie-nutrition-chirurgie-abdomino-pelvienne/diarrhee-chronique",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Gastroentérologie" },
          create: { name: "Gastroentérologie" },
       }
      ]
	}
},
	  {
        name: "Épilepsie",
        keywords: [
          "Enfant", "Neurologie", "Convulsion", "Absence", "Crise",
          "EEG", "Electroencéphalogramme", "Aura", "Antiépileptique", "Postcritique",
          "Spasme", "Chronique", "Foyer", "Décharge", "Myoclonie", 
          "Anticonvulsivant", "Tonico-clonique", "Clonies", "Déficit", "Développement",
		  "Fièvre"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/neurologie/convulsions-crises-depilepsie-epilepsie",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "neurologie" },
          create: { name: "neurologie" },
       }
      ]
	}
},
	  {
        name: "Hirschsprung",
        keywords: [
          "Nourrisson", "Gastroentérologie", "Constipation", "Néonatal", "Mégacolon",
          "Retard", "Neuropathie", "Chirurgie", "Obstruction", "Rectum",
          "Ralentissement", "Fécalome", "Biopsie", "Transit", "Perforation", 
          "Selles", "Nerf", "Ganglionnaire", "Dilatation"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/gastroenterologie-nutrition-chirurgie-abdomino-pelvienne/constipation",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Chirurgie viscérale" },
          create: { name: "Chirurgie viscérale" },
       }
      ]
	}
},
	  {
        name: "Purpura rhumatoide",
        keywords: [
          "Enfant", "Rhumatologie", "Purpura", "DOuleur", "Fièvre",
          "Articulations", "Vascularite", "Protéinurie", "Auto-immun", "Reins",
          "Oedèmes", "Arthralgie", "Biopsie", "Cutané", "IgA", 
          "Hématome", "Invagination", "Hyperalgie", "Eruption"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/hematologie-cancerologie/purpura",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "nephrologie" },
          create: { name: "nephrologie" },
       }
      ]
	}
},
	   {
        name: "Drépanocytose",
        keywords: [
          "Nourrisson", "Enfant", "Hématologie", "Fatigue", "Asthénie",
          "Pâleur", "Splénomégalie", "Crise", "Douleur", "Génétique",
          "Vaso-occlusif", "Hémoglobine", "Globules", "Transfusion", "CVO", 
          "Ictère", "Osseux", "Erythrocytes", "Morphine", "Hyperalgie",
		  "Hémolyse", "Splénectomie", "Mutation", "Articulation", "AVC",
		  "STA", "Ischémie", "Vasculaire"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/hematologie-cancerologie/anemie-pathologies-du-fer",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Hématologie" },
          create: { name: "Hématologie" },
       }
      ]
	}
},
	   {
        name: "Mucovisidose",
        keywords: [
          "Pneumologie", "Enfant", "Gène", "Pulmonaire", "muqueuse",
          "Pancréas", "Infection", "Selles", "Antibiotiques", "Malabsorption",
          "Pancréatite", "Insuffisance", "Digestif", "Héréditaire", "Génétique", 
          "Sécrétion", "Mutation", "Stéatorrhée", "Bronchiectasie", "CFTR",
		  "Colonisation", "Hypochlorémie", "Dépistage"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/specificites-maladies-genetiques-propos-dune-maladie-genique-mucoviscidose",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "pneumologie" },
          create: { name: "pneumologie" },
        },
		{
          where: { name: "Génétique" },
          create: { name: "Génétique" },
       }
      ]
	}
},
	  {
        name: "Hypothyroidie congénitale",
        keywords: [
          "Nourrisson", "Endocrinologie", "Néonatal", "Retard", "Croissance",
          "Hypotonie", "Ictère", "Fatigue", "TSH", "COngénital",
          "Thyroide", "Hormone", "Glande", "T3", "Bradycardie", 
          "Poids", "Constipation", "Hypométabolisme", "Athyréose", "Endocrinien"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/neonatologie/prise-charge-du-nouveau-ne",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Endocrinologie" },
          create: { name: "Endocrinologie" },
       }
      ]
	}
},
	  {
        name: "Luxation congénitale de hanches",
        keywords: [
          "Nourrisson", "Orthopédie", "Dysplasie", "Hanche", "Boiterie",
          "Réduction", "Platre", "Congénital", "Instabilité", "Echographie",
          "Articulation", "Acétabulum", "Douleur", "Asymétrie", "Subluxation", 
          "Malformation", "Rotation", "Néonatal"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/croissance-developpement/depistages-lenfant",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Orthopedie" },
          create: { name: "Orthopedie" },
        }
      ]
	}
},
	  {
        name: "Pyélonéphrite",
        keywords: [
          "Nourrisson", "Enfant", "Néphrologie", "Infectiologie", "Infection",
          "ECBU", "BU", "Rein", "Fièvre", "Douleur", "Pollakiurie",
          "Urines", "Antibiotiques", "Reflux", "Bactérie", "Echographie", 
          "Pyurie", "Dysurie", "Cystite", "Septicémie", "Uropathie", "Hématurie",
		  "Abcès", "Antibiothérapie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/infections-urinaires",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "nephrologie" },
          create: { name: "nephrologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Arthrite",
        keywords: [
          "Nourrisson", "Enfant", "Orthopédie", "Infectiologie", "Infection",
          "Articulation", "Douleur", "Boiterie", "Fièvre", "Douleur", "Inflammation",
          "Ponction", "Antibiotiques", "Staphylocoque", "Streptocoque", "Echographie", 
          "Kingella", "SYnovite", "Epanchement", "CRP", "Septique", "Arthralgie",
		  "IRM", "Antibiothérapie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/urgences-reanimation-chirurgie-orthopedique/boiteries-infections-osteoarticulaires",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Orthopédie" },
          create: { name: "Orthopédie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Ostéomyélite",
        keywords: [
          "Nourrisson", "Enfant", "Orthopédie", "Infectiologie", "Infection",
          "Os", "Douleur", "Boiterie", "Fièvre", "Douleur", "Inflammation",
          "Scintigraphie", "Antibiotiques", "Staphylocoque", "Streptocoque", "Echographie", 
          "Kingella", "Ostéite", "Epanchement", "CRP", "Septique", "Abcès",
		  "IRM", "Antibiothérapie", "Sepsis"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/urgences-reanimation-chirurgie-orthopedique/boiteries-infections-osteoarticulaires",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Orthopédie" },
          create: { name: "Orthopédie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Glomérulonéphrite aigue",
        keywords: [
          "Enfant", "Néphrologie", "Protéinurie", "Oedèmes", "infection", "Hématurie",
          "Streptocoque", "Inflammation", "Rein", "HTA", "Filtration",
          "Oligurie", "Diurèse", "Biopsie", "Auto-immun", "IgA",
          "Néphropathie", "Hématurie", "Dialyse", "Hypertension", 
          "Protéines", "Anticorps"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/nephrologie-chirurgie-urologique/proteinurie-syndrome-nephrotique-hematurie",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "nephrologie" },
          create: { name: "nephrologie" },
       }
      ]
	}
},
	  {
        name: "Laryngite",
        keywords: [
          "Enfant", "Nourrisson", "Infection", "Infectiologie", "ORL", "Toux",
          "Fièvre", "Toux", "Stridor", "Corticoides", "Virus",
          "Détresse", "Dyspnée", "Respiration", "Obstruction", "Gonflement",
          "Adrénaline", "Larynx", "Muqueuse", "Inspiratoire"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/detresse-respiratoire-aigue",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "ORL" },
          create: { name: "ORL" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Encéphalite",
        keywords: [
          "Enfant", "Neurologie", "Infectiologie", "infection", "Cerveau",
          "Céphalée", "Convulsion", "Somnolence", "Antiviral", "Fièvre",
          "LCR", "Herpès", "Hallucinations", "EEG", "LCR",
          "Vomissements", "IRM", "Electroencéphalogramme", "Méninges"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/meningites-meningo-encephalites",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "neurologie" },
          create: { name: "neurologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	   {
        name: "Insuffisance rénale",
        keywords: [
          "Enfant", "Néphrologie", "Protéinurie", "Oedèmes", "Urines", "Hématurie",
          "Anémie", "Rein", "HTA", "Filtration",
          "Oligurie", "Diurèse", "Biopsie", "Electrolytes", "Acidose",
          "Néphropathie", "Hématurie", "Dialyse", "Hypertension", 
          "Protéines", "Transplantation", "Calcémie", "Hypocalcémie", "Déshydratation", 
		  "Fonctionnelle", "Glomérule"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/nephrologie-chirurgie-urologique/insuffisance-renale-aigue-maladie-renale-chronique",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "nephrologie" },
          create: { name: "nephrologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Hypertension artérielle",
        keywords: [
          "Enfant", "Néphrologie", "Protéinurie", "Oedèmes", "Urines", "Hématurie",
          "Cardiologie", "Céphalée", "Rein", "Palpitation", "Vasodilatation",
          "Surcharge", "Diurèse", "Biopsie", "Pression", "Vasculaire",
          "Diurétique", "Cardiaque", "Angiotensine", "Hyperaldostéronisme", 
          "Surrénales"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/nephrologie-chirurgie-urologique/hypertension-arterielle",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Cardiologie" },
          create: { name: "Cardiologie" },
       }
      ]
	}
},
	  {
        name: "Trisomie 21",
        keywords: [
          "Nourrisson", "Génétique", "Enfant", "Dysmorphie", "Cardiopathie",
          "Down", "Retard", "Chromosome", "Langage",
          "Développement", "Malformations", "Retard", "Apprentissage", "Handicap", 
          "MDPH", "Lunaire", "Surdité", "Mutation", "Déficit",
		  "Comportemental", "Caryotype", "Congénital"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/enfant-vulnerable-genetique/trisomie-21",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Génétique" },
          create: { name: "Génétique" },
       }
      ]
	}
},
	  {
        name: "X fragile",
        keywords: [
          "Nourrisson", "Génétique", "Enfant", "Dysmorphie", "Cardiopathie",
          "Prédisposition", "Neurodéveloppement", "Retard", "Chromosome", "Langage",
          "Développement", "Malformations", "Retard", "Apprentissage", "Handicap", 
          "MDPH", "Lunaire", "Surdité", "Mutation", "Déficit",
		  "Comportemental", "Caryotype", "Congénital", "Stéréotypies", "Microdélétion",
		  "Déficience"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/enfant-vulnerable-genetique/syndrome-lx-fragile",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Génétique" },
          create: { name: "Génétique" },
       }
      ]
	}
},
	  {
        name: "Anorexie mentale",
        keywords: [
          "Adolescents", "Psychiatrie", "Amaigrissement", "Peur", "Restriction",
          "Alimentation", "Hypotenstion", "Malnutrition", "Vomissements", "Electrolytes",
          "Dépression", "Obsession", "Carence", "Poids", "Compulsion", 
          "Cachexie", "Dénutrition", "Hyperactivité", "Anxiété", "Dysmorphophobie",
		  "Bradycardie", "Ostéoporose", "Hypoglycémie", "Boulimie", "Pyschose",
		  "Déficience"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/medecine-ladolescent-0/troubles-conduites-alimentaires-ladolescent",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Psychiatrie" },
          create: { name: "Psychiatrie" },
       }
      ]
	}
},
	   {
        name: "Tentative de suicide",
        keywords: [
          "Adolescents", "Psychiatrie", "Dépression", "Tentative", "Crise",
          "Comportement", "Isolement", "Stress", "Traumatisme", "Psychothérapie",
          "Urgence", "Emotions", "Carence", "Prévention", "Antidépresseurs", 
          "Psychose", "Impulsivité", "Trouble", "Anxiété", "Peur",
		  "Angoisse", "Désespoir", "Toxicité", "Médicaments", "Paracétamol",
		  "Traumatisme", "Récurrence"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/medecine-ladolescent-0/risque-conduite-suicidaires-lenfant-ladolescent",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Psychiatrie" },
          create: { name: "Psychiatrie" },
       }
      ]
	}
},
	   {
        name: "Tuberculose",
        keywords: [
          "Enfant", "Infection", "Infectiologie", "Pneumologie", "Poumon",
          "Fièvre", "Toux", "Expectorations", "Mycobactérie",
          "Ganglions", "LCR", "Bactérie", "Hémoptysie", "BCG",
          "Antituberculeux", "Pleurésie", "Radiographie", "IDR", 
          "Épanchement", "Auscultation", "Echographie", "Spondylodiscite", "Caséum",
          "Nécrose", "Bacille", "Koch", "Crachat",
          "Miliaire", "Pneumonie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/tuberculose",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "pneumologie" },
          create: { name: "pneumologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Angine",
        keywords: [
          "Enfant", "Nourrisson", "Infection", "Infectiologie", "ORL", "Toux",
          "Fièvre", "Toux", "Douleur", "Streptocoque", "Virus",
          "Strepto A", "Déglutition", "Contagion", "Rougeur", "Amygdales",
          "Gonflement", "Odynophagie", "Muqueuse", "Streptatest"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/angines",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "ORL" },
          create: { name: "ORL" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Sinusite",
        keywords: [
          "Enfant", "Nourrisson", "Infection", "Infectiologie", "ORL", "Toux",
          "Fièvre", "Inflammation", "Douleur", "Sinus", "Bactérie",
          "Rhinorrhée", "Frontal", "Contagion", "Maxillaire", "Purulent",
          "Streptocoque", "Ethmoidite", "Température", "Hyperthermie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/sinusites",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "ORL" },
          create: { name: "ORL" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Paludisme",
        keywords: [
          "Enfant", "Nourrisson", "Infection", "Infectiologie", "Parasite",
          "Fièvre", "Inflammation", "Plasmodium", "Voyage", "Splénomégalie",
          "Anémie", "Hémolyse", "Thrombopénie", "Moustique", "Céphalée",
          "Chimioprophylaxie", "Endémie", "Transfusion", "Arthralgie",
		  "Parasitémie", "Coma", "Ictère", "Convulsion", "Diarrhée",
		  "Antipaludique", "Hématologie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/pathologies-infectieuses-du-migrant-lenfant-voyageur",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
		{
          where: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Impétigo",
        keywords: [
          "Enfant", "Nourrisson", "Infection", "Infectiologie", "Dermatologie", "Cutané",
          "Fièvre", "Inflammation", "Vésicules", "Croutes", "Contagion",
          "Bactérie", "Staphylocoque", "Topique", "Prurit", "Antibiotique",
          "Eruption", "Bulles", "Pustules", "Surinfection",
		  "Peau", "Suppuration", "Démangeaisons", "Rougeurs", "Toxines"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/infectiologie/infections-cutanees-bacteriennes",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Dermatologie" },
          create: { name: "Dermatologie" },
        },
		{
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
	  {
        name: "Reflux gastro-oesophagien",
        keywords: [
          "Nourrisson", "Gastroentérologie", "Reflux", "Néonatal", "Oesophage",
          "Regurgitations", "Vomissements", "oesophagite", "douleur", "allaitement",
          "lait", "dysphagie", "érosions", "acidité", "postural", 
          "fibroscopie", "endoscopie", "nausées", "dyspepsie",
		  "Inflammation", "Muqueuse", "Crise"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/gastroenterologie-nutrition-chirurgie-abdomino-pelvienne/reflux-gastro-oesophagien-nourrisson-lenfant",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Gastroentérologie" },
          create: { name: "Gastroentérologie" },
       }
      ]
	}
},
	  {
        name: "Sténose du pylore",
        keywords: [
          "Nourrisson", "Gastroentérologie", "Reflux", "Néonatal", "Pylore",
          "Déshydratation", "Vomissements", "Masse", "Hypochlorémie", "Alcalose",
          "lait", "Chirurgie", "Epaississement", "nutrition", "obstruction", 
          "électrolytes", "ralentissement", "palpation", "hypertrophie",
		  "gastrique", "abdominale", "échographie", "Digestion"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/gastroenterologie-nutrition-chirurgie-abdomino-pelvienne/douleurs-abdominopelviennes",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Chirurgie viscérale" },
          create: { name: "Chirurgie viscérale" },
       }
      ]
	}
},
	    {
        name: "Invagination intestinale aigue",
        keywords: [
          "Nourrisson", "Gastroentérologie", "Douleur", "Sang", "Muqueuse",
          "Intestin", "Vomissements", "Masse", "Ischémie", "Crampes",
          "Malaise", "Chirurgie", "Urgence", "Viscéral", "Péristaltisme", 
          "Crise", "Hyperalgie", "palpation", "rectorragie",
		  "gastrique", "abdominale", "échographie", "Digestion"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/gastroenterologie-nutrition-chirurgie-abdomino-pelvienne/douleurs-abdominopelviennes",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Gastroentérologie" },
          create: { name: "Gastroentérologie" },
       }
      ]
	}
},
	   {
        name: "Torsion testiculaire",
        keywords: [
          "Adolescent", "Enfant", "Douleur", "Urologie", "Testicules",
          "aigue", "urgence", "oedème", "gonflement", "nécrose",
          "palpation", "Chirurgie", "scrotum", "Viscéral", "vasculaire", 
          "Crise", "Hyperalgie", "palpation", "infertilité",
		  "échographie", "Digestion"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/gastroenterologie-nutrition-chirurgie-abdomino-pelvienne/douleurs-abdominopelviennes",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Urologie" },
          create: { name: "Urologie" },
       }
      ]
	}
},
	  {
        name: "Hernie inguinale",
        keywords: [
          "Nourrisson", "Chirurgie", "Douleur", "Urologie", "Abdomen",
          "Masse", "Vomissements", "Etranglements", "strangulation", "inguinale",
          "intermittent", "Chirurgie", "intestin", "Viscéral", "bourse", 
          "crural", "Hyperalgie", "prématurité",
		  "échographie", "Digestion"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/gastroenterologie-nutrition-chirurgie-abdomino-pelvienne/pathologies-courantes-region-inguino-scrotale-du-penis",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Chirurgie viscérale" },
          create: { name: "Chirurgie viscérale" },
       }
      ]
	}
},
	  {
        name: "Ictère néonatal",
        keywords: [
          "Nourrisson", "Hépatolonie", "Néonatalogie", "Bilirubine", "Néonatal",
          "Hémolyse", "Foie", "Photothérapie", "Hépatique", "Anémie",
          "Prévention", "Transfusion", "Hyperbilirubinémie", "Erythrocytes", "Glycuroconjugaison", 
          "Incompatibilité", "Hémoglobine", "Biliaires", "atrésie",
		  "Cholestase", "echographie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/neonatologie/ictere-neonatal",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
       }
      ]
	}
},
	  {
        name: "Leucémie",
        keywords: [
          "Enfant", "Hématologie", "Oncologie", "Cancer", "Blastes",
          "Ponction", "Fatigue", "Fièvre", "Anémie", "Cytopénie",
          "Bicytopénie", "Sang", "Moelle", "Chimiothérapie", "Lymphoblastique", 
          "Splénomégalie", "Myélodysplasie", "Tumeur", "Erythropoièse",
		  "Hématopoièse", "Transfusion", "Rémission", "Adénopathie", "Hyperleucocytose",
		  "Lymphome", "Aplasie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/hematologie-cancerologie/cancers",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Hématologie" },
          create: { name: "Hématologie" },
        },
		{
          where: { name: "Oncologie" },
          create: { name: "Oncologie" },
       }
      ]
	}
},
	  {
        name: "Nephroblastome",
        keywords: [
          "Enfant", "Masse", "Oncologie", "Cancer", "Wilms",
          "Ponction", "Reins", "Métastase", "Malin", "Hématurie",
          "Biopsie", "Chirurgie", "Douleur", "Chimiothérapie", "Cancer", 
          "Echographie", "IRM", "Tumeur", "Retroperitoine",
		  "Immunothérapie", "Nephrectomie", "Hypertension", "Adénopathie", "Séquelles",
		  "Chirurgie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/hematologie-cancerologie/cancers",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Oncologie" },
          create: { name: "Oncologie" },
       }
      ]
	}
},
	   {
        name: "Cardiopathie congénitale",
        keywords: [
          "Nourrisson", "Cardiologie", "Cyanose", "Insuffisance", "Valve",
          "Septum", "Congénital", "Tachycardie", "Circulation", "Echographie",
          "Malformation", "Souffle", "Oxygène", "Hypoxie", "Artère", 
          "Aorte", "Foramen", "Cyanogène", "Vasculaire",
		  "Myocarde", "Coarctation", "Cardiomyopathie", "Hémodynamique", "ECG",
		  "Sténose", "Hypertophique", "dilatée"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/souffle-cardiaque",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Cardiologie" },
          create: { name: "Cardiologie" },
       }
      ]
	}
},
	  {
        name: "Scoliose",
        keywords: [
          "Adolescent", "Orthopédie", "Colonne", "Déformation", "Cyphose",
          "Vertèbres", "Corset", "Lombaire", "Rotation", "Squelette",
          "Postural", "Courbure", "Asymétrie", "Osseux", "Radiographie", 
          "Articulations", "EOS", "Cyphose", "Angulation","Cobb",
		  "Hyperlordose", "Neuromusculaire", "Courbure", "Douleur", "Fille",
		  "Arthrodèse", "Gibbosité"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/croissance-developpement/depistages-lenfant",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Orthopedie" },
          create: { name: "Orthopedie" },
       }
      ]
	}
},
	  {
        name: "Maltraitance",
        keywords: [
          "Nourrisson", "Enfant", "Social", "Traumatisme", "Contusions",
          "Fractures", "Négligence", "Brulures", "Hématome", "Douleur",
          "Isolement", "Comportement", "Abus", "violence", "Ecchymose", 
          "Angoisse", "Stress", "Blessure", "Lésion","Stigmate",
		  "Plainte"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/enfant-vulnerable-genetique/maltraitance",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
       }
      ]
	}
},
	  {
        name: "Puberté précoce",
        keywords: [
          "Enfant", "Endocrinologie", "Adolescent", "Gonades", "Croissance",
          "Développement", "Hypophyse", "Testostérone", "Oestrogènes", "pilosité",
          "ménarche", "sein", "acné", "testicule", "ovaire", 
          "FSH", "LH", "Androgènes", "Fertilité", "Endocrinien",
		  "Echographie", "radiographie", "IRM"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/croissance-developpement/puberte-normale-pathologique",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Endocrinologie" },
          create: { name: "Endocrinologie" },
       }
      ]
	}
},
	  {
        name: "Insuffisance surrénale",
        keywords: [
          "Enfant", "Endocrinologie", "Surrénale", "Cortisol", "Hypotension",
          "Hyponatrémie", "Hypoglycémie", "Hyperkaliémie", "hyperpigmentation", "vomissements",
          "stress", "nausées", "glucocorticoides", "dysfonction", "électrolytes", 
          "Adrénaline", "déshydratation", "Hypophyse", "Aldostérone", "Tachycardie",
		  "Hémodynamique", "COngénital", "Rénine", "Métabolisme", "Biopsie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/endocrinologie-metabolisme/insuffisance-surrenale",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
        },
        {
          where: { name: "Endocrinologie" },
          create: { name: "Endocrinologie" },
       }
      ]
	}
},
	  {
        name: "Intoxication au CO",
        keywords: [
          "Enfant", "Urgence", "Monoxyte", "Azote", "Hypoxie",
          "Asphyxie", "Toxique", "Inodore", "Indolore", "Carboxyhémoglobine",
          "Céphalée", "Coma", "Inhalation", "Intoxication", "Ventilation", 
          "Gaz", "Détresse", "Cyanose", "Hypercapnie", "Vomissements",
		  "Confusion", "Oxygène", "Saturation", "Respiration"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/urgences-reanimation-chirurgie-orthopedique/intoxications-aigues",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
       }
      ]
	}
},
	  {
      name: "grossesse extra utérine",
        keywords: [
          "Douleur", "hcg", "rhésus", "échographie", "métrorragies",
          "saignement", "masse", "méthotrexate", "salpingectomie",
          "Hémopéritoine", "endométriose", "tabac", "aménorrhée", "masse latéro-utérine",
          "stagnation", "récidive", "vacuité", "chirurgie", "médicament",
          "Rhophylac", "ectopique", "microprogestatif", "épanchement",
          "FIV", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       }
      ]
	}
},
      {
        name: "fibrome",
        keywords: [
          "Fréquent", "myomètre", "douleur", "métrorragies", "myome",
          "Tumeur", "bénin", "compression", "infertilité", "anémie",
          "Nécrobiose", "asymptomatique", "échographie", "hypoéchogène", "IRM",
          "Hystéroscopie", "hystérectomie", "myomectomie", "progestatif", 
          "Embolisation", "hormonodépendant", "dysurie", "pesanteur", "constipation",
          "DIU", "FIGO", "sous séreux", "sous muqueux",
          "Intra mural", "gynécologie", "obstétrique" 
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       }
      ]
	}
},
    {	
		name: "adénomyose",
        keywords: [
          "Fréquent", "endomètre", "ectopique", "ménorragies", "dysménorrhée",
          "Multiparité", "échographie", "IRM", "endométrectomie",
          "Hystérectomie", "DIU", "asymétrie antéro-postérieure", "kyste", "infertilité",
          "Métrorragies", "conservateur", "récidive", "gynécologie", "obstétrique" 
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       }
      ]
	}
},
{
        name: "endométriose",
        keywords: [
          "Dysménorrhée", "dyspareunie", "dysurie", "dyschésie", "infertilité",
          "Endomètre", "ectopique", "endométriose", "kyste", "ovaire",
          "Vessie", "pneumothorax", "superficielle", "profonde", "torus",
          "Antalgiques", "ALD", "absentéisme", "shaving", 
          "Contraception", "rectum", "nodule", "échographie", "IRM",
          "Coloscanner", "poussée", "cyclique", "hormono-dépendant",
          "chronique", "coelioscopie","hystérectomie", "gynécologie", "obstétrique"
        ],
        link:"",
		specialties: {
      connectOrCreate: [		
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       }
      ]
	}
},
 {
        name: "polype",
        keywords: [
          "Endomètre", "asymptomatique", "tumeur", "bénin", "pédiculé",
          "Sessile", "fréquent", "hypertrophie", "obésité", "métrorragies",
          "Infertilité", "échographie", "hyperéchogène", "arrondie",
          "Vascularisée", "hystéroscopie", "résection", "gynécologie", "obstétrique" 
        ],
        link:"", 
		specialties: {
      connectOrCreate: [		
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       }
      ]
	}
},
 {
        name: "ménopause",
        keywords: [
          "Physiologique", "aménorrhée", "climatérique", "bouffées vasomotrices", "sécheresse",
          "Humeur", "libido", "asthénie", "anxiété", "prurit",
          "Dyspareunie", "pollakiurie", "urgenturie", "ostéoporose",
          "Cardiovasculaire", "dyslipidémie", "clinique", "vitamine D", "Calcium", "Mammographie", "phytothérapie", "hormonothérapie", "substitutif",
		  "combiné", "séquentiel", "mastodynie", "acide hyaluronique", "biphosphonates", "Score", "Progestatifs", "oestrogènes", "carence", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
        },
        {
          where: { name: "endocrinologie" },
          create: { name: "endocrinologie" },
        },
		{
          where: { name: "médecine générale" },
          create: { name: "médecine générale" },
       }
      ]
	}
},
 {
        name: "contraception",
        keywords: [
          "Thrombose", "pilule", "stérilet", "implant", "préservatif",
          "Progestatif", "oestroprogestatif", "Quick Start", "Grossesse", "spotting",
          "Gratuit", "urgence", "aménorrhée", "oublie", "Indice de Pearl",
		  "Endomètre", "Ovulation", "cancer", "ligature", "vasectomie", "glaire", "gynécologie", "obstétrique" 
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "endocrinologie" },
          create: { name: "endocrinologie" },
       },
		{
          where: { name: "médecine générale" },
          create: { name: "médecine générale" },
       }
      ]
	}
},
{
        name: "Interruption volontaire de grossesse",
        keywords: [
          "Chirurgie", "aspiration", "contraception", "grossesse", "hcg",
          "Échographie", "datation", "hémorragie", "mifépristone", "mifégyne",
          "Aménorrhée", "terme limité", "16 semaines", "réglementation", "débat", "dépistage", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "endocrinologie" },
          create: { name: "endocrinologie" },
       },
		{
          where: { name: "médecine générale" },
          create: { name: "médecine générale" },
       }
      ]
	}
},
{
        name: "syndrome des ovaires polykystiques",
        keywords: [
          "Syndrome", "acné", "hirsustisme", "hyperandrogénie", "spanioménorrhée",
          "Dysovulation", "fréquent", "diabète", "obésité", "hormonal",
          "Rotterdam", "exercice", "poids", "échographie", "testostérone", "LH", "FSH",
		  "Oestradiol", "Prolactine", "follicules", "contraception", "infertilité", "cancer de l'endomètre",
		  "androgènes", "ovaire", "diabète", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "endocrinologie" },
          create: { name: "endocrinologie" },
       }
      ]
	}
},
{
        name: "Infertilité",
        keywords: [
          "Primaire", "secondaire", "masculine", "féminine", "mixte",
          "azoospermie", "oligospermie", "anovulation", "endométriose", "obstruction",
          "Idiopathique", "interrogatoire", "grossesse", "enfant", "12 mois",
		  "échographie", "hystéroscopie", "hystérosalpingographie", "CFA", "AMH", "réserve",
		  "cryptorchidie", "oreillon", "torsion", "toxiques", "spermogramme", "spermoculture", "caryotype", "gynécologie", "obstétrique"  
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "endocrinologie" },
          create: { name: "endocrinologie" },
       },
        {
          where: { name: "urologie" },
          create: { name: "urologie" },
       }
      ]
	}
},
{
        name: "Procréation médicalement assistée",
        keywords: [
          "Procréation", "infertilité", "don", "grossesse", "réglementation",
          "Bioéthique", "stimulation", "Clomid", "ovulation", "déclenchement",
          "Ovitrelle", "insémination", "FIV", "invitro", "masculine",
		  "féminine", "mixte", "grossesse multiple", "échec", "transfert", "congelé", "frais",
		  "embryon", "préservation", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       }
      ]
	}
},
{
        name: "Infection génitale haute",
        keywords: [
          "Douleur", "fièvre", "infection", "infectiologie", "iatrogène","microbiologie", "bactérie",
          "coïtale", "préservatif", "abcès", "péritonite", "PV",
          "Gonocoque", "chlamydia", "antibiothérapie", "doxycycline",
		  "ceftriaxone", "metronidazole", "toucher vaginal", "leucorrhée", "gynécologie", "obstétrique" 
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
{
        name: "Infection sexuellement transmissible",
        keywords: [
          "Gonocoque", "Chlamydia", "Syphilis", "VIH", "Hépatites","microbiologie", "bactérie",
          "Virus", "préservatif", "rapport sexuel", "infection", "infectiologie", "prophylaxie",
          "Fièvre", "douleur", "asymptomatique", "antibiotique", "antiviral", "Pénicilline",
		  "Azithromicine", "ceftriaxone", "leucorrhées", "asymptomatique", "sérologie", "PCR",
		  "prélèvement vaginal", "TROD", "ulcération", "chancre", "infertilité", "dépistage", "dépister", "recrudescence", "gynécologie", "obstétrique" 
        ],
        link:"",  
		specialties: {
      connectOrCreate: [		
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
       }
      ]
	}
},
{
        name: "cancer du col",
        keywords: [
          "HPV", "Papillomavirus", "vaccin", "frottis", "dépistage","chronique", "cotisation",
          "ASC", "LSIL", "HSIL", "cytologie", "histologie", "glandulaire","épidermoïde","dysplasie",
          "Tabac", "métrorragies", "post coïtales", "métastases", "fortuit",
		  "masse", "ORL", "hystérectomie", "lugol", "radiothérapie", "palliatif", "curatif", "chimiothérapie",
		  "curiethérapie", "insitu", "invasive", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "oncologie" },
          create: { name: "oncologie" },
       }
      ]
	}
},
{
        name: "cancer de l'endomètre",
        keywords: [
          "Histologie", "Pipelle", "p53", "biopsie", "adénocarcinome","épaississement", "endomètre",
          "Métrorragies", "post ménopausique", "IRM", "foie", "poumon", "métastases","scanner",
          "Hystérectomie", "ganglion", "pronostic",
		  "radiothérapie", "curithérapie", "hormonothérapie", "Tamoxifène", "obésité", "gynécologie", "obstétrique" 
        ],
        link:"",  
		specialties: {
      connectOrCreate: [		
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "oncologie" },
          create: { name: "oncologie" },
       }
      ]
	}
},
{
        name: "cancer de l'ovaire",
        keywords: [
          "O-RAD", "IRM", "coelioscopie", "carcinome", "biopsie","histologie", "cytoréduction",
          "Débulking", "curage", "lombo-aortique", "carboplatine", "chimiothérapie", "CA125", "ROMA",
          "Splénectomie", "prophylaxie", "réhabilitation",
		  "cicatrice", "nulliparité", "Paclitaxel", "Lynch", "Ascite", "cystadénocarcinome", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "oncologie" },
          create: { name: "oncologie" },
       }
      ]
	}
},
{
        name: "cancer du sein",
        keywords: [
          "Luminal", "HE2", "basal", "curage","histologie", "biopsie",
          "Tumorectomie", "mastectomie", "génétique", "BRCA", "radiothérapie", "ganglion","axillaire",
          "Sentinel", "radiothérapie", "oncogénétique", "Eisinger",
		  "chimiothérapie", "oestrogène", "alcool", "tabac", "tamoxifène", "immunothérapie",
		  "trastuzumab", "Herceptin", "récepteur", "lobulaire", "canalaire", "insitu", "invasif", "hyperplasie", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [		
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "oncologie" },
          create: { name: "oncologie" },
       }
      ]
	}
},
{
        name: "Retard de croissance intra utérin",
        keywords: [
          "Percentile", "vasculaire", "syndromique", "génétique", "précoce","tardif", "anténatal",
          "Doppler", "échographie", "croissance", "prématurité", "toxiques", "hypertension","HTA",
          "Extraction", "déclenchement", "cassure", "EPF", "PC", "PA", "LF", "courbe", "OMS",
		  "infectieux", "corticoïdes", "Ductus", "RCF", "Intergrowth", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "pédiatree" },
          create: { name: "pediatrie" },
       }
      ]
	}
},
{
        name: "Pré éclampsie",
        keywords: [
          "Hypertension", "protéinurie", "épigastrique", "complication", "cytolyse", "thrombopénie", "hémolyse", "placenta", "prématurité", "décès", "RCIU", "éclampsie", "sévère","convulsion",
          "magnésium", "corticoïdes", "surveillance", "bandelette urinaire",
		  "dépistage", "insuffisance rénale", "oedèmes", "phosphènes", "acouphènes", "céphalées",
		  "loden", "Trandate", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
       }
      ]
	}
},
{
        name: "Menace d'accouchement prématuré",
        keywords: [
          "Col", "raccourcissement", "hydramnios", "macrosomie",
		  "idiopathique","multiples", "col", "prématurité", "contractions",
		  "échographie", "tocolyse", "Nifédipine", "Tractocile", "corticoïdes", "hospitalisation", "gynécologie", "obstétrique" 
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       }
      ]
	}
},
{
        name: "Diabète gestationnel",
        keywords: [
          "Dépistage", "macrosomie", "hydramnios", "dystocie",
		  "HGPO", "sucre", "glycémie", "insuline", "régime", "dextro", "surveillance",
		  "surpoids", "âge","antécédent", "croissance", "équilibre", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "endocrinologie" },
          create: { name: "endocrinologie" },
       }
      ]
	}
},
{
        name: "Rupture prématurée des membranes",
        keywords: [
          "Prématurité", "rupture", "infection", "chorioamniotite",
		  "antibiotiques","prélèvement vaginal", "microbiologie", "ECBU", "déclenchement",
		  "37", "spontanée", "iatrogène", "surveillance","Streptocoque B", "E.Coli", "clinique",
		  "IGF1", "écoulement", "clair", "purulent", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
		},
        {
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
       }
      ]
	}
},
{
        name: "cholestase gravidique",
        keywords: [
          "Gravidique", "grossesse", "complication", "Amérique",
		  "foie","prurit", "extrémités", "insomniant", "acides", "biliaires", "jeun", "bile",
		  "cholurso", "coagulation", "insuffisance hépatique","MFIU", "déclenchement", "sévérité", "cytolyse", "gynécologie", "obstétrique"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       }
      ]
	}
},
{
        name: "Toxoplasmose",
        keywords: [
          "Parasite", "chat", "immunité", "sérologie",
		  "surveillance", "mensuel", "IgG", "IgM", "avidité", "foetopathie",
		  "alimentation","litière", "liquide amniotique", "amnniocentèse", "Spiramycine",
		  "Pyrémithamine", "choriorétinite", "fond d'oeil", "séroconversion", "IgM", "Avidité",
		  "microcéphalie", "séquelles", "séroconversion", "réactivation", "interruption", "IMG", "dépistage ophtalmique", "ETF", "gynécologie", "obstétrique", "parasitologie"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       },
        {
          where: { name: "infectiologie" },
          create: { name: "infectiologie" },
    },
		{
          where: { name: "pediatrie" },
          create: { name: "pediatrie" },
       }
      ]
	}
},
	  {
      name: "HSV",
        keywords: [
          "enveloppé", "ADN", "simplex", "vésicule", "cutanée",
          "muqueuse", "sexuelle", "accouchement", "éruption",
          "méningite", "encéphalite", "méningo-encéphalite", "adénopathies", "oculaire",
          "infection", "hépatite", "aciclovir", "valaciclovir", "foscarnet",
          "cutanéo-muqueux", "LCS", "sang", "PCR",
          "latence", "neurone", "sensitif", "réactivation", "néonatal", "récurrence",
          "génital", "oral", "virus", "contact", "SNC", "fièvre", "kératite", "uvéite", "rétinite", "nerveux", "virus"
        ],
        link:"",  
		specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
      {
        name: "VZV",
        keywords: [
          "enveloppé", "ADN", "respiratoire", "lésion", "transplacentaire",
          "accouchement", "vésicule", "méningite", "encéphalite", "SNC",
          "oculaire", "congénital", "fièvre", "hépatite", "aciclovir",
          "valaciclovir", "foscarnet", "vaccin", "vivant", 
          "attenué", "cutanéo-muqueux", "LCS", "PCR", "varicelle",
          "zona", "latence", "réactivation", "récurrence",
          "kératite", "myélite", "oculaire", "post-zostérienne", "douleur", "nerveux", "virus", "virus"
        ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
 {
        name: "CMV",
        keywords: [
          "enveloppé", "ADN", "salivaire", "transplantation", "urine",
          "urinaire", "transplacentaire", "accouchement", "allaitement", "sexuelle",
          "adénopathies", "fièvre", "hépatite", "SNC", "congénital",
          "respiratoire", "oculaire", "ganciclovir", "valganciclovir", 
          "foscarnet", "letermovir", "LCS", "sang", "urine",
          "salive", "liquide", "amniotique", "PCR", "latence", "réactivation",
          "sérologie", "IgG", "IgM", "avidité", "immunodéprimés", "séquelles", "surdité", "neurodéveloppement", "foetus", 
	  "malformation", "primo-infection", "cytomégalovirus", "sérum", "virus", "virus", "larmes", "salive","urines", "surdité",
		  "asymptomatique", "RCIU", "placenta", "foetopathie", "dépistage","PCR",
		  "amnniocentèse", "Valaciclovir", "IRM", "hygiène",
		  "sérologie", "IgG", "IgM", "Avidité", "microcéphalie", "séquelles", "séroconversion", "réactivation", "interruption", "IMG", "gynécologie", "obstétrique"
        ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
         },
		  {
          where: { name: "gynécologie" },
          create: { name: "gynécologie" },
       }
      ]
	}
},
 {
 name: "EBV",
        keywords: [
          "enveloppé", "ADN", "salivaire", "transplantation", "lymphocytes B",
          "oncogène", "lymphome", "carcinome", "nasopharyngé",
          "adénopathies", "fièvre", "hépatite", "respiratoire", "sang", "sérum",
          "IgG", "IgM", "VCA", "EBNA", "Epstein-Barr", 
          "latence", "réactivation", "mononucléose", "mononucléosique",
          "salive", "syndrome", "PCR",
          "sérologie", "immunodéprimés", "primo-infection", "virus", "virus"
        ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
 {
 name: "HPV",
        keywords: [
          "Nu", "ADN", "lésions", "cutanéo-muqueux", "sexuelle",
          "contact", "éruption", "cutané", "muqueux",
          "oncogène", "cancer", "col", "utérus", "anal", "anus",
          "tumeur", "aérodigestives", "oropharyngé", "vaccin", "lésion", 
          "condylome", "PCR", "génotype", "utérin",
          "acuminé", "vaccination", "sexuel", "virus", "HSH", "virus"
        ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
 {
 name: "VHA",
        keywords: [
          "Nu", "ARN", "VHA", "hépatite", "A",
          "fécal", "oral", "cutané", "féco-oral",
          "alimentaire", "manuportée", "vaccin", "sang", "sérologie", "IgM",
          "aïgue", "fulminante", "voyage", "endémie", "zone", "cas", "contact", 
	  "hépatopathie", "virus", "virus"
        ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
 {
 name: "VHB",
        keywords: [
          "Enveloppé", "ADN","hépatite", "B", "parentérale", "toxicomanie", "AES", "accident", "exposition", "sang",
          "sexuelle", "accouchement", "allaitement", "oncogène", "carcinome", "hépatocellulaire", "transfusion",
          "sang", "sérologie", "HBs", "HBc", "PCR", "charge", "virale", "chronique", "vaccin", "hépatocyte", "réactivation", "delta",
          "HDV", "immunodépression", "monothérapie", "ténofovir", "entécavir", "polymérase", "cancer", "IgG", "IgM",
	  "nucléotidique", "virus", "nucléosidique", "inhibiteur", "cccDNA", "super-enroulé", "hépatique", "traitement", "analogue", "virus"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
 {
 name: "VHC",
        keywords: [
          "Enveloppé", "ARN","hépatite", "C", "parentérale", "toxicomanie", "AES", "accident", "exposition", "sang", "carcinome", "hépatocellulaire",
          "oncogène", "sang", "sérologie","PCR", "charge", "virale", "chronique", "hépatocyte", "réinfection",
          "immunodépression", "polymérase", "association", "antiviraux", "protéase", "génotype", "transfusion",
	  "virus", "inhibiteur", "cccDNA", "AAD", "guérison", "cryoglobulinémie", "hépatique", "traitement", "cancer", "analogue", "virus"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "VHE",
        keywords: [
          "Nu", "ARN","hépatite", "E", "fécal", "oral", "féco-oral", "transplacenaire", "génotype", "alimentaire", "porc", "gibier",
          "manuportée", "parentérale", "transfusion","transplantation", "oncogène", "cancer", "chronique", "aiguë", "carcinome", "hépatocellulaire",
          "SNC", "méningite", "antivirale", "monothérapie", "virus", "nucléosidique", "inhibiteur",
	  "polymérase", "analogue", "cccDNA", "AAD", "guérison", "cryoglobulinémie", "hépatique", "traitement", "sang", "selles", "PCR",
	  "sérologie", "IgG", "IgM", "immunodéprimés", "hépatopathie", "endémie", "zone", "hydrique", "eau", "virus"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "VIH",
        keywords: [
          "Enveloppé", "ARN", "sexuelle", "parentérale", "AES", "accident", "exposition", "sang", "toxicomanie", "accouchement", "allaitement",
	  "lymphocyte", "T", "lymphocyte T", "CD4", "éruption", "fièvre", "adénopathies", "douleurs", "articulaires", "musculaire", "myalgies", "pseudo-grippal", "arthralgies",
          "association", "antiviraux", "nucléosidique","transcriptase", "inverse", "rétro-transcription", "protéase", "inhibiteur", "intégrase", "sang",
          "SNC", "méningite", "antivirale", "virus", "sérologie", "charge", "virale", "ELISA", "western blot", "p24", "indétectable", "immunodéprimés", "immunodéficience",
		  "polymérase", "analogue", "traitement", "virus"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "rotavirus",
        keywords: [
          "Nu", "ARN", "segmenté", "fécal", "oral", "féco-oral", "gastro-entérite", "gastro", "entérite", "vaccin", "selles",
	  "PCR", "test", "antigénique", "déshydratation", "fièvre", "douleurs", "enfants", "pediatrie", "enfance", "nourrisson", "nouveau-né", "soluté", "SRO", 
	  "réhydratation", "orale", "réinfection", "génotype", "virus"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "norovirus",
        keywords: [
          "Nu", "ARN", "fécal", "oral", "féco-oral", "gastro-entérite", "gastro", "entérite", "selles",
	  "PCR", "test", "antigénique", "déshydratation", "fièvre", "douleurs", "réinfection", "TIAC", "toxi-infection", "gériatrie", "adulte", "SRO", 
	  "réhydratation", "orale", "hydratation", "génotype", "virus"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "entérovirus",
        keywords: [
          "Nu", "ARN", "fécal", "oral", "féco-oral", "respiratoire", "manuportée", "éruption", "cutanée", "cutanéo-muqueuse", "infection", "SNC", "méningite", "système", "nerveux", "encéphalite",
	  "cardiopathie", "infection", "conjonctivite", "oculaire", "polio", "poliomyélite", "vaccin", "selles", "gorge", "LCS", "sang", "PCR", "paralysie", "flasque", "poliomyélite", "rhombencéphalite",
	  "coxsackievirus", "pieds", "main", "bouche", "conjonctivite", "rhinite", "rhinopharyngite", "virus"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "coronavirus",
        keywords: [
          "enveloppé", "ARN", "respiratoire", "manuportée", "fièvre", "grippe", "gastro", "entérite", "infection", "adénopathies", "douleurs", "articulaires", "musculaire", "myalgie", "pseudo-grippal", 
          "monothérapie", "anticorps", "monoclonaux", "monoclonal", "inhibiteur", "protéase", "vaccin", "SARS", "COVID", "sars-cov-2", "PCR", "respiratoire", "MERS", "sars-cov-1", "arthralgies",
	  "endémique", "mutation", "recombinaison", "rhinite", "rhinopharyngite", "défaillance", "détresse", "aiguë", "SDRA", "émergent", "zoonose", "sévère",  "antigénique", "test", "épidémie", "pandémie", "virus"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "virus influenza",
        keywords: [
          "enveloppé", "ARN", "respiratoire", "manuportée", "segmenté", "fièvre", "grippe", "infection", "douleurs", "articulaires", "musculaire", "myalgie", "grippal", "syndrome", "arthralgies",
          "neuraminidase", "monothérapie", "vaccin", "inhibiteur", "défaillance", "détresse", "aiguë", "SDRA", "émergent", "zoonose", "sévère", "mutation", "ponctuelle", "réassortiements", "cassure",
	  "dérive", "glissement", "antigénique", "PCR", "test", "segment", "épidémie", "pandémie", "A", "B", "oiseaux", "porc", "humain", "hôte", "virus"	
],	  
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "VRS",
        keywords: [
          "enveloppé", "ARN", "respiratoire", "manuportée", "fièvre", "infection", "douleurs", "articulaires", "musculaire", "myalgie", "bronchiolite", "syndrome", "arthralgies",
          "monothérapie", "vaccin", "nirsevimab", "défaillance", "détresse", "aiguë", "SDRA", "sévère", "mutation", "ponctuelle", "antigénique", "PCR", "test", "épidémie", "nourrissons",
	  "nouveau-né", "virus", "anticorps", "monoclonaux",  "surinfection", "insuffisance", "apnée", "atélectasie", "pediatrie", "virus"
	  ],	  
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "rougeole",
        keywords: [
          "enveloppé", "ARN", "respiratoire", "fièvre", "infection", "système", "nerveux", "adénopathies", "fièvre", "éruption", "cutanée", "maculopapuleux", "maculopapuleuse", "macule", "papule", "exanthème",
          "vaccin", "ROR", "vivant", "atténué", "sang", "salive", "PCR", "urine", "respiratoire", "LCS", "IgM", "IgG", "sérum", "sérologie", "catarrhe", "oculo-nasal", "contagieux", "arthralgies",
	  "Köplik", "encéphalite", "PESS", "sclérosante",  "subaiguë", "pan-encéphalite"
	  ],	  
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "rubéole",
        keywords: [
          "enveloppé", "ARN", "respiratoire", "transplacentaire", "infection", "congénital", "adénopathies", "fièvre", "éruption", "cutanée", "maculopapuleux", "maculopapuleuse", "macule", "papule", "exanthème", "douleurs", 
	  "articulaires", "musculaire", "myalgie", "arthralgies", "vaccin", "ROR", "vivant", "atténué", "sang", "salive", "PCR", "IgM", "IgG", "sérum", "sérologie", "amniotique", "liquide", "urine", "sang", "sérum", 
	  "salive",  "surdité"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "dengue",
        keywords: [
          "enveloppé", "ARN", "vectorielle", "vectoriel", "infection", "moustique", "gastro-entérite", "fièvre", "éruption", "cutanée", "adénopathies", "hémorragique", "exanthème", "douleurs", 
	  "articulaires", "musculaire", "myalgie", "arthralgies", "vaccin", "sang", "salive", "PCR", "IgM", "IgG", "sérum", "sérologie", "arthropode", "arbovirus", "aedes", "albopictus", "sérotype", "aegypti"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
},
{
 name: "Parvovirus B19",
        keywords: [
          "nu", "ADN", "respiratoire", "transplacentaire", "infection", "transfusion", "fièvre", "éruption", "cutanée", "exanthème", "douleurs", "adénopathies",
	  "articulaires", "musculaire", "myalgie", "arthralgies", "anémie", "sang", "moelle", "osseuse", "IgM", "IgG", "sérum", "sérologie", "cardiopathie", "congénital", "liquide", "amniotique", "PCR", "sérologie",
	  "IgG", "IgM", "mégalérythème", "épidémique", "macule", "papule", "paire", "claque", "maculopapuleux", "anasarque", "MFIU", "mort", "foetale", "in-utero", "drépanocytose", "hémoglobinopathie", "thalassémie"
	  ],
        link: "",
        specialties: {
      connectOrCreate: [
        {
          where: { name: "microbiologie" },
          create: { name: "microbiologie" },
       }
      ]
	}
	}
 ];
  // Insérez les données en utilisant skipDuplicates pour éviter les erreurs si des doublons existent
  await prisma.disease.createMany({
    data: diseases,
    skipDuplicates: true
  });

  console.log("Seed terminé");
}
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
