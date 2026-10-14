"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const memberships = [
  {
    name: "Move",
    price: "59€",
    note: "Le training WAYS",
    features: ["Training", "Cardio & musculation", "Application membre"],
  },
  {
    name: "Studio",
    price: "79€",
    note: "Training + studios",
    features: ["Tout Move", "Cours collectifs", "Réservation prioritaire"],
    featured: true,
  },
  {
    name: "All Ways",
    price: "109€",
    note: "L’expérience complète",
    features: ["Tout Studio", "Avantages club", "Expériences premium"],
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "WAYS Levallois",
  url: "https://ways-sport-site.vercel.app",
  description:
    "WAYS est un training club à Levallois-Perret avec musculation, cardio, Pilates, Lagree, RPM, cours collectifs, coworking et coffee shop.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Levallois-Perret",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Espace coworking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Coffee shop", value: true },
    { "@type": "LocationFeatureSpecification", name: "Cours collectifs", value: true },
  ],
};

export default function ImmersiveHomeV5() {
  const root = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const EASE = "power3.out";

    const ctx = gsap.context(() => {
      mm.add(
        {
          desktop: "(min-width: 901px)",
          mobile: "(max-width: 900px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as Record<string, boolean>;
          const reduce = conditions.reduce;
          const mobile = conditions.mobile;
          const header = root.current?.querySelector<HTMLElement>(".v5-header");
          const hero = root.current?.querySelector<HTMLElement>(".v5-hero");

          if (!hero) return;

          if (reduce) {
            gsap.set(".v5-door-left", { xPercent: -102, rotateY: -5 });
            gsap.set(".v5-door-right", { xPercent: 102, rotateY: 5 });
            gsap.set(".v5-door-brand", { opacity: 0 });
            gsap.set(".v5-hero-copy", { opacity: 1, y: 0 });
            gsap.set(".v5-hero-transition", { scaleY: 1 });
          } else {
            const heroTimeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom bottom",
                scrub: mobile ? 0.45 : 0.8,
                invalidateOnRefresh: true,
              },
            });

            heroTimeline
              .to(".v5-door-brand", { opacity: 0, duration: 0.1 }, 0.08)
              .to(".v5-scroll-cue", { opacity: 0, duration: 0.08 }, 0.08)
              .to(
                ".v5-door-left",
                { xPercent: -102, rotateY: -5, duration: 0.3 },
                0.1,
              )
              .to(
                ".v5-door-right",
                { xPercent: 102, rotateY: 5, duration: 0.3 },
                0.1,
              )
              .to(
                ".v5-interior-scale",
                { scale: mobile ? 1.025 : 1.055, duration: 0.3 },
                0.36,
              )
              .to(
                ".v5-interior-parallax",
                { backgroundPosition: mobile ? "54% 47%" : "50% 46%", duration: 0.28 },
                0.38,
              )
              .to(".v5-interior-shade", { opacity: 0.2, duration: 0.24 }, 0.42)
              .fromTo(
                ".v5-hero-copy",
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.2 },
                0.58,
              )
              .to(".v5-hero-transition", { scaleY: 1, duration: 0.18 }, 0.82);
          }

          if (header) {
            ScrollTrigger.create({
              trigger: hero,
              start: "bottom 12%",
              onEnter: () => header.classList.add("is-solid"),
              onLeaveBack: () => header.classList.remove("is-solid"),
            });
          }

          if (!reduce) {
            gsap.utils.toArray<HTMLElement>(".v5-reveal").forEach((element) => {
              gsap.fromTo(
                element,
                { opacity: 0, y: 26 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.72,
                  ease: EASE,
                  scrollTrigger: {
                    trigger: element,
                    start: "top 84%",
                    toggleActions: "play none none reverse",
                  },
                },
              );
            });

            gsap.utils.toArray<HTMLElement>(".v5-media-motion").forEach((element) => {
              gsap.fromTo(
                element,
                { scale: 1.03 },
                {
                  scale: 1,
                  duration: 0.9,
                  ease: EASE,
                  scrollTrigger: {
                    trigger: element,
                    start: "top 86%",
                    toggleActions: "play none none reverse",
                  },
                },
              );
            });

            gsap.fromTo(
              ".v5-day-line-fill",
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1.05,
                ease: EASE,
                scrollTrigger: {
                  trigger: ".v5-day",
                  start: "top 72%",
                },
              },
            );
          }
        },
      );
    }, root);

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="v5-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="v5-header">
        <Link className="v5-logo" href="/" aria-label="WAYS accueil">
          <img src="/ways-logo.svg" alt="WAYS" />
        </Link>
        <nav className={menuOpen ? "v5-nav is-open" : "v5-nav"} aria-label="Navigation principale">
          <a href="#club" onClick={() => setMenuOpen(false)}>Le club</a>
          <Link href="/cours" onClick={() => setMenuOpen(false)}>Cours</Link>
          <a href="#work" onClick={() => setMenuOpen(false)}>Coworking</a>
          <a href="#coffee" onClick={() => setMenuOpen(false)}>Coffee</a>
          <Link href="/abonnements" onClick={() => setMenuOpen(false)}>Abonnements</Link>
        </nav>
        <Link className="v5-join" href="/abonnements">Devenir membre</Link>
        <button
          className="v5-menu"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Ouvrir le menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="v5-hero" aria-label="Entrée immersive WAYS">
          <div className="v5-hero-stage">
            <div className="v5-interior-scale">
              <div className="v5-interior-parallax" />
            </div>
            <div className="v5-interior-shade" />

            <div className="v5-door v5-door-left"><div className="v5-door-surface" /></div>
            <div className="v5-door v5-door-right"><div className="v5-door-surface" /></div>

            <div className="v5-door-brand">
              <img src="/ways-logo.svg" alt="" />
              <p>Training Club · Levallois-Perret</p>
            </div>

            <div className="v5-hero-copy">
              <p className="v5-kicker">WAYS · LEVALLOIS-PERRET</p>
              <h1>Un club pour bouger.<br /><em>Et rester un peu.</em></h1>
              <p className="v5-hero-meta">Training · Studios · Coffee · Work</p>
            </div>

            <div className="v5-scroll-cue"><span>Entrez</span><i /></div>
            <div className="v5-hero-transition" aria-hidden="true" />
          </div>
        </section>

        <section id="club" className="v5-intro v5-paper">
          <div className="v5-container v5-intro-grid">
            <div className="v5-section-label v5-reveal">WAYS / LEVALLOIS</div>
            <div className="v5-reveal">
              <h2>Le sport,<br /><em>à sa place dans votre journée.</em></h2>
            </div>
            <div className="v5-intro-copy v5-reveal">
              <p className="v5-lead">Un lieu pensé pour s’entraîner sérieusement, sans avoir à choisir entre performance et qualité de vie.</p>
              <p>Training, studios, récupération, coworking et coffee shop se retrouvent dans la même adresse. On vient pour sa séance. On peut rester pour la suite.</p>
              <Link className="v5-text-link" href="/abonnements">Découvrir les abonnements <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="v5-space v5-paper" id="training">
          <div className="v5-container v5-space-grid">
            <div className="v5-space-media v5-media-motion">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=88"
                alt="Espace d'entraînement premium"
                loading="lazy"
              />
            </div>
            <div className="v5-space-copy v5-reveal">
              <span className="v5-number">01</span>
              <h2>Training</h2>
              <p className="v5-space-sub">Force · Cardio · Functional</p>
              <p>De l’espace, du matériel et une ambiance qui laisse chacun s’entraîner à son rythme. Pas de surenchère. Juste les bonnes conditions pour progresser.</p>
            </div>
          </div>
        </section>

        <section className="v5-space v5-paper" id="studios">
          <div className="v5-container v5-space-grid v5-space-reverse">
            <div className="v5-space-copy v5-reveal">
              <span className="v5-number">02</span>
              <h2>Studios</h2>
              <p className="v5-space-sub">Pilates · Lagree · RPM · Boxing</p>
              <p>Des cours choisis pour leur complémentarité et une programmation qui garde le même niveau d’exigence, quel que soit le format.</p>
              <Link className="v5-text-link" href="/cours">Voir les cours <span>↗</span></Link>
            </div>
            <div className="v5-space-media v5-media-motion">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=88"
                alt="Cours collectif dans un studio lumineux"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="v5-recover">
          <div className="v5-container v5-recover-grid">
            <div className="v5-recover-copy v5-reveal">
              <span className="v5-number">03</span>
              <h2>Recover.</h2>
              <p>La séance s’arrête. L’attention portée au confort, non.</p>
            </div>
            <div className="v5-recover-media v5-media-motion">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1700&q=88"
                alt="Moment de récupération après une séance"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="v5-stay v5-paper">
          <div className="v5-container">
            <div className="v5-stay-heading v5-reveal">
              <span className="v5-section-label">BEYOND TRAINING</span>
              <h2>La séance est finie.<br /><em>Votre journée continue ici.</em></h2>
            </div>
            <div className="v5-stay-grid">
              <article id="work" className="v5-stay-card">
                <div className="v5-stay-media v5-media-motion">
                  <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=88"
                    alt="Espace coworking chaleureux"
                    loading="lazy"
                  />
                </div>
                <div className="v5-stay-copy v5-reveal">
                  <span>04 / WORK</span>
                  <h3>Une séance avant un rendez-vous.<br />Ou l’inverse.</h3>
                  <p>Un espace coworking intégré au club pour répondre à un mail, préparer une réunion ou avancer sans changer d’adresse.</p>
                </div>
              </article>

              <article id="coffee" className="v5-stay-card">
                <div className="v5-stay-media v5-media-motion">
                  <img
                    src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=88"
                    alt="Coffee shop chaleureux"
                    loading="lazy"
                  />
                </div>
                <div className="v5-stay-copy v5-reveal">
                  <span>05 / COFFEE</span>
                  <h3>Avant. Après.<br />Ou juste parce que vous êtes là.</h3>
                  <p>Café, boissons signature et vraie pause. Le coffee shop fait partie de WAYS, pas d’un détour après WAYS.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="v5-day">
          <div className="v5-container">
            <div className="v5-day-heading v5-reveal">
              <span className="v5-section-label">A DAY AT WAYS</span>
              <h2>Un seul lieu.<br /><em>Plusieurs moments de la journée.</em></h2>
            </div>
            <div className="v5-day-line"><div className="v5-day-line-fill" /></div>
            <div className="v5-day-grid">
              <div className="v5-reveal"><span>07:30</span><strong>Train</strong></div>
              <div className="v5-reveal"><span>08:45</span><strong>Coffee</strong></div>
              <div className="v5-reveal"><span>09:00</span><strong>Work</strong></div>
              <div className="v5-reveal"><span>18:30</span><strong>Pilates</strong></div>
            </div>
          </div>
        </section>

        <section className="v5-founders">
          <div className="v5-founders-media v5-media-motion">
            <img
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1800&q=88"
              alt="Serviette premium dans un univers bien-être"
              loading="lazy"
            />
          </div>
          <div className="v5-founders-copy v5-reveal">
            <span className="v5-section-label">FOUNDING MEMBERS</span>
            <h2>Les premiers membres recevront leur première pièce WAYS.</h2>
            <p className="v5-lead">Une serviette WAYS brodée offerte aux premiers adhérents.</p>
            <p>Sobre, utile et créée pour l’ouverture du club. Disponible pour les premiers membres, dans la limite des quantités prévues.</p>
            <Link className="v5-button-dark" href="/abonnements">Faire partie des premiers</Link>
          </div>
        </section>

        <section className="v5-memberships v5-paper" id="membership">
          <div className="v5-container">
            <div className="v5-membership-heading v5-reveal">
              <span className="v5-section-label">MEMBERSHIPS</span>
              <h2>Choisissez la façon<br /><em>dont vous voulez vivre WAYS.</em></h2>
            </div>
            <div className="v5-plans">
              {memberships.map((plan) => (
                <article key={plan.name} className={plan.featured ? "v5-plan is-featured" : "v5-plan"}>
                  <div>
                    <span className="v5-plan-name">{plan.name}</span>
                    <p>{plan.note}</p>
                  </div>
                  <strong>{plan.price}<small>/mois</small></strong>
                  <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <Link href="/abonnements">Découvrir <span>↗</span></Link>
                </article>
              ))}
            </div>
            <p className="v5-price-note">Tarifs et conditions à confirmer avant l’ouverture commerciale définitive.</p>
          </div>
        </section>

        <section className="v5-local" id="levallois">
          <div className="v5-container v5-local-grid">
            <div className="v5-reveal">
              <span className="v5-section-label">WAYS · LEVALLOIS-PERRET</span>
              <h2>Un club de sport.<br /><em>Une adresse pour le reste.</em></h2>
            </div>
            <div className="v5-local-copy v5-reveal">
              <p>WAYS réunit à Levallois-Perret musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop dans une seule expérience de club.</p>
              <div className="v5-faq">
                <details><summary>Y aura-t-il un espace coworking chez WAYS ?</summary><p>Oui. Un espace de travail est prévu pour permettre aux membres de travailler autour de leur séance.</p></details>
                <details><summary>WAYS aura-t-il un coffee shop ?</summary><p>Oui. Le coffee shop fait partie intégrante du concept et prolonge l’expérience du club.</p></details>
                <details><summary>Quels cours sont prévus ?</summary><p>Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie du programme prévu.</p></details>
                <details><summary>Que recevront les premiers adhérents ?</summary><p>Une serviette WAYS brodée est prévue pour les premiers adhérents, dans la limite des quantités disponibles.</p></details>
              </div>
              <Link className="v5-text-link v5-text-link-light" href="/levallois">Découvrir WAYS Levallois <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="v5-final">
          <div className="v5-container v5-reveal">
            <span className="v5-section-label">WAYS / LEVALLOIS</span>
            <h2>Venez pour le sport.<br /><em>Restez pour le club.</em></h2>
            <div className="v5-final-actions">
              <Link className="v5-button-dark" href="/abonnements">Devenir membre</Link>
              <Link className="v5-button-line" href="/levallois">Découvrir le club</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="v5-footer">
        <div className="v5-container v5-footer-grid">
          <img src="/ways-logo.svg" alt="WAYS" />
          <div><span>Training Club</span><span>Levallois-Perret</span></div>
          <div><Link href="/cours">Cours</Link><Link href="/abonnements">Abonnements</Link><Link href="/levallois">Levallois</Link></div>
          <small>© 2026 WAYS</small>
        </div>
      </footer>
    </div>
  );
}
