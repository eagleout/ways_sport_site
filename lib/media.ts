/**
 * WAYS — banque de médias du site.
 *
 * Tous les visuels passent par ce fichier : pour remplacer une photo d'illustration
 * par une vraie photo du club, il suffit de changer `src` (URL ou chemin /public).
 * Les URLs Unsplash et Pexels sont redimensionnées à la volée par lib/image-loader.ts.
 * Licences : Unsplash License et Pexels License (usage commercial autorisé, sans attribution obligatoire).
 */

export type Media = {
  src: string;
  alt: string;
  /** Point focal CSS (object-position) pour les recadrages. */
  focus?: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop`;

export const media = {
  heroPoster: {
    src: unsplash("photo-1534438327276-14e5300c3a48"),
    alt: "Plateau de training avec rack d'haltères, lumière tamisée",
    focus: "50% 55%",
  },
  trainingFloor: {
    src: unsplash("photo-1623874514711-0f321325f318"),
    alt: "Plateau de musculation spacieux sous une grande hauteur sous plafond",
    focus: "50% 60%",
  },
  barbell: {
    src: unsplash("photo-1517836357463-d25dfeac3438"),
    alt: "Athlète en appui avant de soulever une barre",
    focus: "50% 45%",
  },
  barbellFloor: {
    src: unsplash("photo-1521804906057-1df8fdb718b7"),
    alt: "Barre chargée posée sur un sol de training en caoutchouc",
  },
  pilates: {
    src: unsplash("photo-1747239069226-55382c570116"),
    alt: "Séance de Pilates sur reformer dans un studio lumineux",
    focus: "50% 50%",
  },
  lagree: {
    src: unsplash("photo-1747240549807-fc3962949818"),
    alt: "Exercice de renforcement contrôlé sur machine en studio",
  },
  rpm: {
    src: unsplash("photo-1520877880798-5ee004e3f11e"),
    alt: "Cours de vélo indoor devant un mur en béton",
    focus: "50% 40%",
  },
  boxing: {
    src: unsplash("photo-1754630591156-ef00f2e0d888"),
    alt: "Sacs de frappe suspendus dans une salle de boxe",
  },
  cardioAF: {
    src: unsplash("photo-1518310383802-640c2de311b2"),
    alt: "Cours collectif de renforcement avec haltères",
  },
  bodySculpt: {
    src: unsplash("photo-1541534741688-6078c6bfb5c5"),
    alt: "Renforcement musculaire avec charge",
    focus: "50% 35%",
  },
  recover: {
    src: unsplash("photo-1571019613454-1cb2f99b2d8b"),
    alt: "Étirements au calme après la séance",
  },
  work: {
    src: unsplash("photo-1444418776041-9c7e33cc5a9c"),
    alt: "Café latte posé à côté d'un ordinateur portable",
  },
  coffee: {
    src: unsplash("photo-1495474472287-4d71bcdd2085"),
    alt: "Trois personnes se retrouvent autour d'un café",
  },
  coffeeCup: {
    src: unsplash("photo-1509042239860-f550ce710b93"),
    alt: "Café servi au comptoir",
  },
  coffeeShop: {
    src: unsplash("photo-1442512595331-e89e73853f31"),
    alt: "Ambiance chaleureuse de coffee shop",
  },
  community: {
    src: unsplash("photo-1517130038641-a774d04afb3c"),
    alt: "Membres qui s'entraînent ensemble",
  },
  levallois: {
    src: unsplash("photo-1642110792281-2460bc676a46"),
    alt: "Immeuble à balcons à Levallois-Perret",
  },
  towels: {
    src: "/media/ways-towels.webp",
    alt: "Serviettes WAYS brodées, pliées sur des socles en pierre",
  },
} satisfies Record<string, Media>;

export const videos = {
  /** Ambiance du club derrière les portes (desktop uniquement). */
  hero: "https://videos.pexels.com/video-files/31445381/13411076_1920_1080_25fps.mp4",
  /** Magnésie et souffle avant l'effort — section « À fond. » (desktop uniquement). */
  chalk: "https://videos.pexels.com/video-files/6702515/6702515-uhd_2732_1440_25fps.mp4",
  chalkPoster: "https://images.pexels.com/videos/6702515/pexels-photo-6702515.jpeg",
};
