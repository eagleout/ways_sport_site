import { media, type Media } from "./media";

export const SITE_URL = "https://ways-sport-site.vercel.app";
export const CONTACT_EMAIL = "contact@ways-sport.fr";
export const SIGNATURE = "À ta façon. À fond.";

export type Course = {
  slug: string;
  name: string;
  tag: string;
  short: string;
  headline: string;
  intro: string;
  intensity: string;
  /** Niveau d'intensité de 1 à 5, dérivé du libellé. */
  level: number;
  focus: string;
  forWho: string;
  faqQuestion: string;
  faq: string;
  image: Media;
};

export const courses: Course[] = [
  {
    slug: "pilates",
    name: "Pilates",
    tag: "Control",
    short: "Renforcement profond, posture et maîtrise du mouvement. Précis, calme, exigeant.",
    headline: "Contrôle. Posture. Force.",
    intro:
      "Le Pilates chez WAYS à Levallois-Perret travaille le centre du corps, la posture, la respiration et la qualité du mouvement.",
    intensity: "Modérée",
    level: 2,
    focus: "Gainage, posture, mobilité",
    forWho: "Débutants à réguliers",
    faqQuestion: "Le Pilates chez WAYS est-il accessible aux débutants ?",
    faq: "Oui. Le Pilates WAYS est conçu pour permettre une progression selon le niveau et l’expérience de chacun.",
    image: media.pilates,
  },
  {
    slug: "lagree",
    name: "Lagree",
    tag: "Slow burn",
    short: "Une intensité qui ne se mesure pas au bruit. Contrôle, tension et engagement du début à la fin.",
    headline: "Lent. Précis. Intense.",
    intro:
      "Le Lagree chez WAYS à Levallois-Perret associe tension musculaire continue, contrôle et endurance dans un format à forte intensité.",
    intensity: "Élevée",
    level: 4,
    focus: "Force-endurance, contrôle",
    forWho: "Progression encadrée",
    faqQuestion: "Quelle différence entre Pilates et Lagree ?",
    faq: "Le Pilates privilégie notamment contrôle et posture ; le Lagree ajoute une tension musculaire continue et une intensité plus forte.",
    image: media.lagree,
  },
  {
    slug: "rpm",
    name: "RPM",
    tag: "Ride",
    short: "Du rythme, de l’énergie et un vrai travail cardio. Tu suis le tempo, le groupe fait le reste.",
    headline: "Le cardio qui t’emmène.",
    intro:
      "Le RPM chez WAYS à Levallois-Perret est un cours de vélo indoor rythmé, construit autour d’efforts progressifs et de séquences cardio.",
    intensity: "Modérée à élevée",
    level: 3,
    focus: "Cardio, endurance",
    forWho: "Tous niveaux adaptés",
    faqQuestion: "Faut-il être sportif pour suivre le RPM ?",
    faq: "Non. Les résistances et l’intensité peuvent être ajustées pour suivre le cours à son niveau.",
    image: media.rpm,
  },
  {
    slug: "cardio-boxing",
    name: "Cardio Boxing",
    tag: "Impact",
    short: "Cardio, coordination et puissance dans un format direct, rythmé et sans monotonie.",
    headline: "Rythme. Impact. Cardio.",
    intro:
      "Le Cardio Boxing chez WAYS combine déplacements, enchaînements inspirés de la boxe et travail cardiovasculaire.",
    intensity: "Élevée",
    level: 4,
    focus: "Cardio, coordination",
    forWho: "Débutants et réguliers",
    faqQuestion: "Le Cardio Boxing est-il un cours de combat ?",
    faq: "Non. Le cours est pensé comme un format fitness : l’objectif est l’entraînement cardiovasculaire et la coordination, pas le combat.",
    image: media.boxing,
  },
  {
    slug: "cardio-abdos-fessiers",
    name: "Cardio A.F.",
    tag: "Burn",
    short: "Un format dynamique pour faire monter le cardio et renforcer là où ça compte.",
    headline: "Bouge. Renforce. Recommence.",
    intro:
      "Un cours WAYS mêlant séquences cardio et renforcement ciblé du centre du corps, des jambes et des fessiers.",
    intensity: "Modérée à élevée",
    level: 3,
    focus: "Cardio, bas du corps, core",
    forWho: "Tous niveaux adaptés",
    faqQuestion: "Le Cardio Abdos-Fessiers s’adapte-t-il à mon niveau ?",
    faq: "Oui. Les mouvements peuvent être adaptés en amplitude, rythme ou charge selon le niveau.",
    image: media.cardioAF,
  },
  {
    slug: "body-sculpt",
    name: "Body Sculpt",
    tag: "Build",
    short: "Renforcement global, répétitions maîtrisées et sensation de travail immédiate.",
    headline: "Renforcer. Sans compliquer.",
    intro:
      "Le Body Sculpt WAYS propose un travail de renforcement global avec des mouvements accessibles et une progression par répétitions et charge.",
    intensity: "Modérée",
    level: 2,
    focus: "Renforcement global",
    forWho: "Débutants à réguliers",
    faqQuestion: "Quel matériel utilise-t-on en Body Sculpt ?",
    faq: "Le format peut utiliser le poids du corps et du petit matériel selon la séance.",
    image: media.bodySculpt,
  },
];

export const courseBySlug = (slug: string) => courses.find((course) => course.slug === slug);

export type Plan = {
  name: string;
  price: number;
  tag: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Move",
    price: 59,
    tag: "Training",
    description: "Pour faire de WAYS ta base d’entraînement.",
    features: ["Accès training", "Cardio & musculation", "Application membre"],
  },
  {
    name: "Studio",
    price: 79,
    tag: "Training + Studios",
    description: "Pour alterner training libre et cours collectifs.",
    features: ["Tout Move", "Cours collectifs", "Réservation prioritaire"],
    featured: true,
  },
  {
    name: "All Ways",
    price: 109,
    tag: "Full club",
    description: "Pour vivre le club au-delà de la séance.",
    features: ["Tout Studio", "Avantages club", "Expériences premium"],
  },
];

export const PRICE_NOTE = "Tarifs indicatifs, à confirmer avant l’ouverture commerciale définitive.";

export type Zone = {
  id: string;
  number: string;
  sign: string;
  title: string;
  meta: string;
  text: string;
  image: Media;
  link?: { href: string; label: string };
};

export const zones: Zone[] = [
  {
    id: "coffee",
    number: "01",
    sign: "Accueil & coffee",
    title: "Coffee.",
    meta: "Ça commence par un café",
    text: "Le coffee shop fait partie du club, pas d’un détour après. Avant la séance, après le cours, ou juste parce que tu es là.",
    image: media.coffee,
  },
  {
    id: "training",
    number: "02",
    sign: "Training floor",
    title: "Training.",
    meta: "Force · Cardio · Functional",
    text: "De l’espace, du matériel sélectionné et une ambiance qui laisse chacun s’entraîner à son rythme. Pas de surenchère. Juste les bonnes conditions pour progresser.",
    image: media.trainingFloor,
  },
  {
    id: "studios",
    number: "03",
    sign: "Studios",
    title: "Studios.",
    meta: "Pilates · Lagree · RPM · Boxing",
    text: "Des formats choisis pour leur complémentarité, avec le même niveau d’exigence quel que soit le cours.",
    image: media.pilates,
    link: { href: "/cours", label: "Voir les cours" },
  },
  {
    id: "recover",
    number: "04",
    sign: "Recover",
    title: "Recover.",
    meta: "Après l’effort",
    text: "La séance s’arrête. L’attention portée au confort, non. Un temps pour relâcher, s’étirer et repartir dans sa journée.",
    image: media.recover,
  },
  {
    id: "work",
    number: "05",
    sign: "Work",
    title: "Work.",
    meta: "Coworking intégré",
    text: "Une séance avant un rendez-vous. Ou l’inverse. Un espace pour répondre à un mail, préparer une réunion ou avancer sans changer d’adresse.",
    image: media.work,
  },
];

export type Moment = { time: string; title: string; text: string; image: Media; tone: "night" | "clay" | "chalk" | "espresso" };

export const dayMoments: Moment[] = [
  { time: "07:30", title: "Training", text: "Le club s’éveille. Première séance, avant la ville.", image: media.barbell, tone: "night" },
  { time: "08:45", title: "Coffee", text: "Un café au comptoir, cheveux encore mouillés.", image: media.coffeeCup, tone: "clay" },
  { time: "09:00", title: "Work", text: "Laptop ouvert. Première réunion sans changer d’adresse.", image: media.work, tone: "chalk" },
  { time: "18:30", title: "Pilates", text: "Fin de journée. Contrôle, souffle, et on relâche.", image: media.pilates, tone: "espresso" },
];

export type FaqItem = { q: string; a: string };

export const homeFaq: FaqItem[] = [
  {
    q: "WAYS est-il une salle de sport à Levallois-Perret ?",
    a: "Oui. WAYS est un training club à Levallois-Perret qui réunit musculation, cardio, cours collectifs, coworking et coffee shop dans une même expérience.",
  },
  {
    q: "Quels cours sont prévus ?",
    a: "Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie du programme prévu.",
  },
  {
    q: "Y aura-t-il un espace coworking chez WAYS ?",
    a: "Oui. Un espace de travail est prévu pour permettre aux membres de travailler autour de leur séance.",
  },
  {
    q: "WAYS aura-t-il un coffee shop ?",
    a: "Oui. Le coffee shop fait partie intégrante du concept et prolonge l’expérience du club.",
  },
  {
    q: "Que recevront les premiers adhérents ?",
    a: "Une serviette WAYS brodée est prévue pour les premiers adhérents, dans la limite des quantités disponibles.",
  },
];

export const levalloisFaq: FaqItem[] = [
  {
    q: "WAYS est-il une salle de sport à Levallois-Perret ?",
    a: "Oui. WAYS est un projet de training club à Levallois-Perret, pensé autour du training, des studios et d’espaces de vie.",
  },
  {
    q: "WAYS propose-t-il du Pilates et du Lagree ?",
    a: "Oui. Pilates et Lagree font partie des formats prévus, avec RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt.",
  },
  {
    q: "Peut-on travailler depuis WAYS ?",
    a: "Le concept prévoit un espace coworking permettant de travailler autour de sa séance.",
  },
  {
    q: "Y aura-t-il un coffee shop ?",
    a: "Oui. Le coffee shop est prévu comme un espace de vie du club, avec café et boissons.",
  },
  {
    q: "Y a-t-il une offre pour les premiers adhérents ?",
    a: "Une serviette WAYS brodée est prévue pour les premiers adhérents, dans la limite des stocks disponibles.",
  },
];

export const navLinks = [
  { href: "/#visite", label: "La visite" },
  { href: "/cours", label: "Cours" },
  { href: "/abonnements", label: "Abonnements" },
  { href: "/levallois", label: "Levallois" },
];

export const clubSchema = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  "@id": `${SITE_URL}/#club`,
  name: "WAYS Levallois",
  slogan: SIGNATURE,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description:
    "WAYS est un training club à Levallois-Perret avec musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Levallois-Perret",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  amenityFeature: ["Espace coworking", "Coffee shop", "Cours collectifs", "Espace recovery"].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
};

export const faqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});
