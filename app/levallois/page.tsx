import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import PageHero from "@/components/PageHero";
import { clubSchema, faqSchema, levalloisFaq } from "@/lib/content";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Salle de sport à Levallois-Perret",
  description:
    "WAYS est un training club à Levallois-Perret avec musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop.",
  alternates: { canonical: "/levallois" },
};

export default function LevalloisPage() {
  return (
    <main id="contenu">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([clubSchema, faqSchema(levalloisFaq)]) }}
      />
      <PageHero
        crumbs={[{ href: "/", label: "WAYS" }, { label: "Levallois-Perret" }]}
        title={
          <>
            Un club <span className="accent copper">dans ta journée.</span>
          </>
        }
        intro="WAYS est pensé comme une salle de sport premium à Levallois-Perret où training, studios, coworking et coffee shop cohabitent dans une même expérience."
        image={media.levallois}
      />

      <section className="section section--chalk" aria-labelledby="levallois-club">
        <div className="container">
          <div className="prose-grid">
            <div>
              <span className="kicker" data-reveal>
                Salle de sport · Levallois-Perret
              </span>
              <h2 id="levallois-club" className="display" data-split>
                Une salle de sport qui ne s’arrête pas <span className="accent">au training.</span>
              </h2>
            </div>
            <div className="prose" data-reveal>
              <p className="lead">
                Le projet WAYS réunit un espace musculation et cardio, du functional training, des cours collectifs et des
                espaces de vie.
              </p>
              <p>
                L’idée est simple : permettre aux actifs de Levallois et des environs d’intégrer plus facilement le sport
                à leur quotidien.
              </p>
              <p>
                Les studios prévoient notamment Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body
                Sculpt. À cela s’ajoutent un espace coworking et un coffee shop pour travailler, attendre un rendez-vous
                ou simplement rester quelques minutes après la séance.
              </p>
            </div>
          </div>

          <div className="facts" data-reveal style={{ marginTop: "clamp(70px, 8vw, 120px)" }}>
            <div className="fact">
              <span className="kicker">Ville</span>
              <strong>Levallois-Perret</strong>
            </div>
            <div className="fact">
              <span className="kicker">Training</span>
              <strong>Musculation & cardio</strong>
            </div>
            <div className="fact">
              <span className="kicker">Studios</span>
              <strong>Pilates, Lagree, RPM…</strong>
            </div>
            <div className="fact">
              <span className="kicker">Et aussi</span>
              <strong>Coworking + coffee</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="levallois-faq">
        <div className="container split-media" style={{ alignItems: "start" }}>
          <div className="split-media__img frame frame--grade" data-parallax="6" data-reveal="fade">
            <div className="parallax-inner">
              <Image src={media.coffee.src} alt={media.coffee.alt} fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          </div>
          <div>
            <span className="kicker copper" data-reveal>
              FAQ · WAYS Levallois
            </span>
            <h2 id="levallois-faq" className="display" data-split style={{ marginTop: 20, fontSize: "clamp(46px, 5vw, 92px)" }}>
              Ce qu’il faut <span className="accent copper">savoir.</span>
            </h2>
            <Faq items={levalloisFaq} />
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Levallois.
            <br />À ta façon.
          </>
        }
        text="Découvre les cours, les formules et l’expérience WAYS."
        href="/abonnements"
        label="Rejoindre WAYS"
      />
    </main>
  );
}
