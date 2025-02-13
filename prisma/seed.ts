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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
      },
	  {
        name: "Syndrome néphrotique",
        keywords: [
          "Néphrologie", "Protéinurie", "Oedèmes", "infection", "Hypoalbuminémie",
          "Corticoïdes", "Rémission", "Rechute", "Urines", "Filtration",
          "Albumine", "Diurèse", "Biopsie", "Hypoprotéinémie", "Reins",
          "Néphropathie", "Hématurie", "Dialyse", "Hypertension", 
          "Protéines"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/nephrologie-chirurgie-urologique/proteinurie-syndrome-nephrotique-hematurie",
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
      },
	  {
        name: "Allergie",
        keywords: [
          "Enfant", "Immunologie", "Prurit", "Anaphylaxie", "Oedème",
          "Asthme", "Régime", "Diarrhée", "Protéine", "Vomissements",
          "Antihistaminique", "Eruption", "Hypersensibilité", "Bronchospasme", "Squelettique", 
          "Intolérance", "Aliments", "IgE", "Histamine", "Éosinophilie",
		  "Urticaire", "Eviction", "Exclusion", "Choc", "Urticaire", "Conjonctivite"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/hypersensibilites-allergies",
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
      },
	  {
        name: "Ictère",
        keywords: [
          "Nourrisson", "Hépatolonie", "Néonatalogie", "Bilirubine", "Néonatal",
          "Hémolyse", "Foie", "Photothérapie", "Hépatique", "Anémie",
          "Prévention", "Transfusion", "Hyperbilirubinémie", "Erythrocytes", "Glycuroconjugaison", 
          "Incompatibilité", "Hémoglobine", "Biliaires", "atrésie",
		  "Cholestase", "echographie"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/neonatologie/ictere-neonatal",
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
      },
	   {
        name: "Cardiopathie",
        keywords: [
          "Nourrisson", "Cardiologie", "Cyanose", "Insuffisance", "Valve",
          "Septum", "Congénital", "Tachycardie", "Circulation", "Echographie",
          "Malformation", "Souffle", "Oxygène", "Hypoxie", "Artère", 
          "Aorte", "Foramen", "Cyanogène", "Vasculaire",
		  "Myocarde", "Coarctation", "Cardiomyopathie", "Hémodynamique", "ECG",
		  "Sténose", "Hypertophique", "dilatée"
        ],
        link: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/pneumologie-cardiologie/souffle-cardiaque",
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
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
        specialty: "pediatrie"
      },
      // Vous pouvez ajouter d'autres maladies ici...
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
