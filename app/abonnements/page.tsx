import type { Metadata } from "next";
import Image from "next/image";
import Founders from "@/components/Founders";
import PageHero from "@/components/PageHero";
import Plans from "@/components/Plans";
import SignupForm from "@/components/SignupForm";
import { ArrowDownIcon } from "@/components/Icons";
import { CONTACT_EMAIL, SITE_URL, plans } from "@/lib/content";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Abonnements et pré-inscription",
  description:
    "Les abonnements WAYS Levallois : Move, Studio et All Ways. Training, studios, coworking, coffee shop et serviette WAYS brodée offerte aux premiers adhérents.",
  alternates: { canonical: "/abonnements" },
};

export default function MembershipPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Abonnements WAYS Levallois",
    itemListElement: plans.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: plan.name,
        price: String(plan.price),
        priceCurrency: "EUR",
        description: plan.description,
        url: `${SITE_URL}/abonnements`,
      },
    })),
  };

  return (
    <main id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ href: "/", label: "WAYS" }, { label: "Memberships" }]}
        title={
          <>
            Ton rythme. <span className="accent copper">Ton accès.</span>
          </>
        }
        intro="Trois façons de vivre WAYS. Choisis simplement la place que tu veux donner au club dans ta semaine."
        image={media.barbellFloor}
        short
      >
        <a href="#abonnements" className="btn btn--ghost">
          Voir les formules
          <ArrowDownIcon className="btn__arrow" />
        </a>
      </PageHero>

      <Plans
        title={
          <>
            Trois formules. <span className="accent">Une seule exigence.</span>
          </>
        }
        intro="Move pour le training. Studio pour ajouter les cours collectifs. All Ways pour vivre tout le club, au-delà de la séance."
      />

      <Founders />

      <section className="section section--ink" aria-labelledby="plus-quune-seance">
        <div className="container split-media">
          <div>
            <span className="kicker copper" data-reveal>
              Plus qu’une séance
            </span>
            <h2 id="plus-quune-seance" className="display" data-split style={{ marginTop: 20, fontSize: "clamp(48px, 5.6vw, 104px)" }}>
              Entraîne-toi. <span className="accent copper">Reste pour le reste.</span>
            </h2>
            <p className="muted-dark" data-reveal style={{ maxWidth: 520, fontSize: 17, margin: "26px 0 40px" }}>
              Après le training : un café, un mail à envoyer, un rendez-vous à préparer ou simplement quelques minutes de
              plus. L’espace coworking et le coffee shop font partie de l’expérience WAYS.
            </p>
            <div className="facts facts--2" data-reveal>
              <div className="fact">
                <span className="kicker">Coworking</span>
                <strong>Travailler sans repartir</strong>
              </div>
              <div className="fact">
                <span className="kicker">Coffee shop</span>
                <strong>Faire une vraie pause</strong>
              </div>
            </div>
          </div>
          <div className="split-media__img frame frame--grade" data-parallax="6" data-reveal="fade">
            <div className="parallax-inner">
              <Image src={media.coffeeShop.src} alt={media.coffeeShop.alt} fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ink" id="pre-inscription" aria-labelledby="signup-title" style={{ borderTop: "1px solid var(--line-dark)" }}>
        <div className="container signup">
          <div>
            <span className="kicker copper" data-reveal>
              Pré-inscription
            </span>
            <h2 id="signup-title" className="display" data-split>
              Ton premier WAYS <span className="accent">commence ici.</span>
            </h2>
            <p className="muted-dark" data-reveal style={{ maxWidth: 460, fontSize: 17, marginTop: 26 }}>
              Reçois les informations d’ouverture, les inscriptions et les premières places disponibles. Tu peux aussi
              écrire directement à{" "}
              <a className="copper" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
