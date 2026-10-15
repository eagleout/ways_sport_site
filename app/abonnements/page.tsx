import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Abonnements WAYS Levallois",
  description:
    "Découvre les abonnements WAYS Levallois : training, studios et expérience club à Levallois-Perret.",
  alternates: { canonical: "/abonnements" },
};

const plans = [
  {
    name: "MOVE",
    price: "59 €",
    tag: "Training",
    features: ["Accès training", "Cardio & musculation", "Application membre"],
  },
  {
    name: "STUDIO",
    price: "79 €",
    tag: "Training + Studios",
    features: ["Tout MOVE", "Cours collectifs", "Réservation prioritaire"],
  },
  {
    name: "ALL WAYS",
    price: "109 €",
    tag: "Full club experience",
    features: ["Tout STUDIO", "Avantages club", "Expériences premium"],
  },
];

export default function MembershipPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Abonnements WAYS Levallois",
    itemListElement: plans.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        name: p.name,
        price: p.price.replace(" €", ""),
        priceCurrency: "EUR",
        url: "https://ways-sport-site.vercel.app/abonnements",
      },
    })),
  };

  return (
    <main className="m7-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />

      <section className="m7-hero">
        <div className="m7-shell m7-hero-grid">
          <span className="m7-kicker">WAYS / MEMBERSHIPS</span>
          <div className="m7-hero-copy">
            <h1>Memberships.</h1>
          </div>
          <div className="m7-hero-side">
            Trois formules pour accéder à WAYS, selon la place que tu souhaites donner au training, aux studios et au club dans ta semaine.
          </div>
        </div>
      </section>

      <section className="m7-plans">
        <div className="m7-shell">
          <div className="m7-plan-list">
            {plans.map((plan, index) => (
              <article className="m7-plan" key={plan.name}>
                <span className="m7-plan-index">0{index + 1}</span>
                <div className="m7-plan-name">
                  <strong>{plan.name}</strong>
                  <span>{plan.tag}</span>
                </div>
                <div className="m7-plan-features">
                  {plan.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
                <div className="m7-plan-price">
                  {plan.price}<small>/ mois</small>
                </div>
                <a className="m7-plan-cta" href={`mailto:contact@ways-sport.fr?subject=Adhésion%20${encodeURIComponent(plan.name)}%20WAYS`}>
                  Rejoindre WAYS →
                </a>
              </article>
            ))}
          </div>
          <p className="m7-pricing-note">Tarifs indicatifs à confirmer avant l’ouverture commerciale définitive.</p>
        </div>
      </section>

      <section className="m7-founders">
        <div className="m7-shell m7-founders-grid">
          <figure className="m7-founders-media">
            <img src="/ways-founders-towels.svg" alt="Serviettes WAYS brodées" />
          </figure>
          <div className="m7-founders-copy">
            <span className="m7-kicker">FOUNDING MEMBERS</span>
            <h2>The first edition.</h2>
            <p><strong>Une serviette WAYS brodée sera offerte aux premiers membres du club lors de l’ouverture.</strong></p>
            <p>Une pièce réservée aux Founding Members, dans la limite des quantités disponibles.</p>
            <a className="m7-dark-link" href="mailto:contact@ways-sport.fr?subject=Founding%20Member%20WAYS">
              Become a Founding Member →
            </a>
          </div>
        </div>
      </section>

      <section className="m7-access">
        <div className="m7-shell">
          <div className="m7-access-head">
            <span className="m7-kicker">THE CLUB</span>
            <h2>Beyond training.</h2>
            <p>Training, studios, coworking et coffee shop réunis dans une même adresse à Levallois-Perret.</p>
          </div>
          <div className="m7-facts">
            <div className="m7-fact"><span>TRAINING</span><strong>Force · Cardio · Functional</strong></div>
            <div className="m7-fact"><span>STUDIOS</span><strong>Pilates · Lagree · RPM · Boxing</strong></div>
            <div className="m7-fact"><span>WORK</span><strong>Coworking intégré au club</strong></div>
            <div className="m7-fact"><span>COFFEE</span><strong>Coffee shop WAYS</strong></div>
          </div>
        </div>
      </section>

      <section className="m7-final">
        <div className="m7-shell m7-final-grid">
          <div>
            <span className="m7-kicker">WAYS / LEVALLOIS-PERRET</span>
            <h2>Join the club.</h2>
          </div>
          <Link href="mailto:contact@ways-sport.fr?subject=Adhésion%20WAYS">Devenir membre →</Link>
        </div>
      </section>
    </main>
  );
}
