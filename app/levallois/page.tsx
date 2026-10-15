import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Salle de sport à Levallois-Perret | WAYS Training Club",
  description: "WAYS est un training club à Levallois-Perret avec musculation, cardio, Pilates, Lagree, RPM, cours collectifs, coworking et coffee shop.",
  alternates: { canonical: "/levallois" },
};

export default function LevalloisPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ExerciseGym",
        "@id": "https://ways-sport-site.vercel.app/#club",
        name: "WAYS Levallois",
        url: "https://ways-sport-site.vercel.app/levallois",
        description: "Training club à Levallois-Perret avec musculation, cardio, cours collectifs, coworking et coffee shop.",
        address: { "@type": "PostalAddress", addressLocality: "Levallois-Perret", addressRegion: "Île-de-France", addressCountry: "FR" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Quels services propose WAYS à Levallois-Perret ?", acceptedAnswer: { "@type": "Answer", text: "WAYS prévoit un espace musculation et cardio, des studios de cours collectifs, un espace coworking et un coffee shop." } },
          { "@type": "Question", name: "Quels cours collectifs sont prévus chez WAYS Levallois ?", acceptedAnswer: { "@type": "Answer", text: "Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie du programme prévu." } },
          { "@type": "Question", name: "Y a-t-il un espace coworking et un coffee shop chez WAYS ?", acceptedAnswer: { "@type": "Answer", text: "Oui. Le coworking et le coffee shop sont intégrés au concept WAYS pour permettre de prolonger son passage au club." } },
        ],
      },
    ],
  };

  return (
    <main className="i7-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />

      <section className="i7-hero">
        <div className="i7-shell i7-hero-grid">
          <span className="i7-kicker">WAYS / LEVALLOIS-PERRET</span>
          <div><h1>WAYS<br />Levallois-Perret.</h1></div>
          <div className="i7-hero-side">Training, studios, recovery, coworking et coffee shop réunis dans une même adresse. Une approche du club pensée pour s’intégrer naturellement à la journée.</div>
        </div>
        <figure className="i7-shell i7-hero-media">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=92" alt="Visuel d’ambiance représentatif d’un training club premium" fetchPriority="high" />
        </figure>
      </section>

      <section className="i7-section">
        <div className="i7-shell i7-copy-grid">
          <div className="i7-copy">
            <span className="i7-kicker">THE CLUB</span>
            <h2>Training, studios, work, coffee.</h2>
            <p>WAYS est conçu comme un training club à Levallois-Perret où l’entraînement reste central, sans que l’expérience s’arrête à la dernière répétition.</p>
            <p>Le projet réunit un espace musculation et cardio, du functional training et des studios dédiés aux cours collectifs. Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie de la programmation prévue.</p>
            <p>Le coworking et le coffee shop complètent le club pour travailler, prendre un café ou rester entre deux moments de la journée, sans transformer WAYS en simple lieu de passage.</p>
            <Link href="/cours" className="i7-link">Découvrir les studios →</Link>
          </div>
          <div className="i7-facts">
            <div className="i7-fact"><span>VILLE</span><strong>Levallois-Perret</strong></div>
            <div className="i7-fact"><span>TRAINING</span><strong>Strength · Cardio · Functional</strong></div>
            <div className="i7-fact"><span>STUDIOS</span><strong>Pilates · Lagree · RPM · Boxing</strong></div>
            <div className="i7-fact"><span>WORK</span><strong>Coworking intégré</strong></div>
            <div className="i7-fact"><span>COFFEE</span><strong>Coffee shop WAYS</strong></div>
          </div>
        </div>
      </section>

      <section className="i7-image-band">
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=90" alt="Visuel d’ambiance représentatif d’un espace de travail chaleureux" loading="lazy" />
      </section>

      <section className="i7-section">
        <div className="i7-shell">
          <div className="i7-section-head">
            <span className="i7-kicker">FAQ / WAYS LEVALLOIS</span>
            <h2>Informations pratiques.</h2>
            <p>L’adresse exacte et les horaires seront affichés dès qu’ils seront définitivement arrêtés.</p>
          </div>
          <div className="i7-faq">
            <details><summary>WAYS est-il un training club à Levallois-Perret ?</summary><p>Oui. WAYS est un projet de training club à Levallois-Perret réunissant training, studios et espaces de vie.</p></details>
            <details><summary>WAYS proposera-t-il du Pilates et du Lagree ?</summary><p>Oui. Pilates et Lagree font partie des formats prévus, avec RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt.</p></details>
            <details><summary>Peut-on travailler depuis WAYS ?</summary><p>Le concept prévoit un espace coworking intégré au club pour travailler autour de sa séance ou entre deux rendez-vous.</p></details>
            <details><summary>Y aura-t-il un coffee shop ?</summary><p>Oui. Le coffee shop est pensé comme un véritable espace du club et non comme un simple comptoir d’appoint.</p></details>
            <details><summary>Quelle est l’offre réservée aux premiers membres ?</summary><p>Une serviette WAYS brodée est prévue pour les premiers adhérents lors de l’ouverture, dans la limite des quantités disponibles.</p></details>
          </div>
        </div>
      </section>

      <section className="i7-final">
        <div className="i7-shell i7-final-grid">
          <div><span className="i7-kicker">WAYS / LEVALLOIS-PERRET</span><h2>Join the club.</h2></div>
          <Link href="/abonnements">Devenir membre →</Link>
        </div>
      </section>
    </main>
  );
}
