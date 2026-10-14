"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const plans = [
  { name: "MOVE", price: "59 €", note: "Training WAYS" },
  { name: "STUDIO", price: "79 €", note: "Training + Studios", featured: true },
  { name: "ALL WAYS", price: "109 €", note: "L’expérience complète" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "WAYS Levallois",
  url: "https://ways-sport-site.vercel.app",
  description:
    "WAYS est un training club premium à Levallois-Perret avec musculation, cardio, Pilates, Lagree, RPM, cours collectifs, coworking et coffee shop.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Levallois-Perret",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Coworking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Coffee shop", value: true },
    { "@type": "LocationFeatureSpecification", name: "Cours collectifs", value: true },
  ],
};

export default function ImmersiveHomeV6() {
  const root = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add(
        {
          desktop: "(min-width: 901px)",
          mobile: "(max-width: 900px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as Record<string, boolean>;
          const mobile = conditions.mobile;
          const reduce = conditions.reduce;
          const hero = root.current?.querySelector<HTMLElement>(".v6-hero");
          const header = root.current?.querySelector<HTMLElement>(".v6-header");
          if (!hero) return;

          if (reduce) {
            gsap.set(".v6-door-left", { xPercent: -102, rotateY: -4 });
            gsap.set(".v6-door-right", { xPercent: 102, rotateY: 4 });
            gsap.set(".v6-door-brand", { autoAlpha: 0 });
            gsap.set(".v6-hero-copy", { autoAlpha: 1, y: 0 });
            gsap.set(".v6-hero-wash", { scaleY: 1 });
          } else {
            const heroTl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom bottom",
                scrub: mobile ? 0.45 : 0.75,
                invalidateOnRefresh: true,
              },
            });

            heroTl
              .to(".v6-door-brand", { autoAlpha: 0, duration: 0.11 }, 0.12)
              .to(".v6-enter-cue", { autoAlpha: 0, duration: 0.08 }, 0.12)
              .to(".v6-door-left", { xPercent: -102, rotateY: -4, duration: 0.28 }, 0.12)
              .to(".v6-door-right", { xPercent: 102, rotateY: 4, duration: 0.28 }, 0.12)
              .to(".v6-hero-image", { scale: mobile ? 1.025 : 1.045, duration: 0.2 }, 0.38)
              .to(".v6-hero-shade", { opacity: 0.22, duration: 0.22 }, 0.39)
              .fromTo(
                ".v6-hero-copy",
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.18 },
                0.7,
              )
              .to(".v6-hero-wash", { scaleY: 1, duration: 0.16 }, 0.86);
          }

          if (header) {
            ScrollTrigger.create({
              trigger: hero,
              start: "bottom 15%",
              onEnter: () => header.classList.add("is-solid"),
              onLeaveBack: () => header.classList.remove("is-solid"),
            });
          }

          if (!reduce) {
            gsap.utils.toArray<HTMLElement>(".v6-reveal").forEach((el) => {
              gsap.fromTo(
                el,
                { autoAlpha: 0, y: 24 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.72,
                  ease: "power3.out",
                  scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
                },
              );
            });

            gsap.utils.toArray<HTMLElement>(".v6-media-motion").forEach((el) => {
              gsap.fromTo(
                el,
                { scale: 1.025, autoAlpha: 0.94 },
                {
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.95,
                  ease: "power3.out",
                  scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
                },
              );
            });

            if (!mobile) {
              gsap.fromTo(
                ".v6-studio-interlude img",
                { y: -12 },
                {
                  y: 18,
                  ease: "none",
                  scrollTrigger: {
                    trigger: ".v6-studio-interlude",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8,
                  },
                },
              );
            }

            gsap.fromTo(
              ".v6-day-line-fill",
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1.05,
                ease: "power3.out",
                scrollTrigger: { trigger: ".v6-day", start: "top 72%" },
              },
            );

            gsap.fromTo(
              ".v6-day-step",
              { autoAlpha: 0, y: 14 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: ".v6-day-grid", start: "top 82%" },
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
    <div ref={root} className="v6-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="v6-header">
        <Link href="/" className="v6-logo" aria-label="WAYS accueil">
          <img src="/ways-logo.svg" alt="WAYS" />
        </Link>
        <nav className={menuOpen ? "v6-nav is-open" : "v6-nav"} aria-label="Navigation principale">
          <a href="#club" onClick={() => setMenuOpen(false)}>Le club</a>
          <Link href="/cours" onClick={() => setMenuOpen(false)}>Cours</Link>
          <a href="#work" onClick={() => setMenuOpen(false)}>Coworking</a>
          <a href="#coffee" onClick={() => setMenuOpen(false)}>Coffee</a>
          <Link href="/abonnements" onClick={() => setMenuOpen(false)}>Abonnements</Link>
        </nav>
        <Link className="v6-header-cta" href="/abonnements">Devenir membre →</Link>
        <button className="v6-menu" aria-label="Ouvrir le menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          <span /><span />
        </button>
      </header>

      <main>
        <section className="v6-hero" aria-label="Entrée WAYS">
          <div className="v6-hero-stage">
            <div className="v6-hero-image" aria-hidden="true" />
            <div className="v6-hero-shade" aria-hidden="true" />

            <div className="v6-door v6-door-left"><div className="v6-door-panel" /></div>
            <div className="v6-door v6-door-right"><div className="v6-door-panel" /></div>

            <div className="v6-door-brand">
              <img src="/ways-logo.svg" alt="" />
              <span>Levallois-Perret</span>
            </div>

            <div className="v6-hero-copy">
              <span className="v6-eyebrow">WAYS · LEVALLOIS-PERRET</span>
              <h1>Un club pour bouger.<br /><em>Et rester un peu.</em></h1>
              <p>Training · Studios · Coffee · Work</p>
            </div>

            <div className="v6-enter-cue"><span>Entrer</span><i /></div>
            <div className="v6-hero-wash" aria-hidden="true" />
          </div>
        </section>

        <section id="club" className="v6-intro v6-paper">
          <div className="v6-container v6-intro-grid">
            <span className="v6-label v6-reveal">THE CLUB</span>
            <h2 className="v6-reveal">Le sport, à sa place<br />dans votre journée.</h2>
            <div className="v6-intro-copy v6-reveal">
              <p>WAYS réunit training, studios, coworking et coffee shop dans une même adresse à Levallois.</p>
              <a href="#training" className="v6-text-link">Découvrir le club →</a>
            </div>
          </div>
        </section>

        <section className="v6-manifesto-photo v6-paper">
          <figure className="v6-container v6-photo-frame v6-media-motion">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=88" alt="Intérieur d’un club de sport premium" loading="lazy" />
            <figcaption>WAYS / LEVALLOIS / TRAINING CLUB</figcaption>
          </figure>
        </section>

        <section id="training" className="v6-feature v6-paper">
          <div className="v6-container v6-feature-grid">
            <div className="v6-feature-media v6-media-motion">
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1500&q=88" alt="Training chez WAYS" loading="lazy" />
            </div>
            <div className="v6-feature-copy v6-reveal">
              <span className="v6-index">01 / TRAINING</span>
              <h2>Training</h2>
              <p className="v6-meta">Force · Cardio · Functional</p>
              <p>Un espace pensé pour s’entraîner sérieusement, avec du matériel, de l’espace et une ambiance qui laisse chacun progresser à son rythme.</p>
            </div>
          </div>
        </section>

        <section className="v6-detail v6-paper">
          <div className="v6-container v6-detail-grid">
            <div className="v6-detail-copy v6-reveal">
              <h3>L’intensité,<br />sans le bruit autour.</h3>
            </div>
            <figure className="v6-detail-media v6-media-motion">
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=88" alt="Détail d’un entraînement de force" loading="lazy" />
            </figure>
          </div>
        </section>

        <section id="studios" className="v6-feature v6-feature-reverse v6-paper">
          <div className="v6-container v6-feature-grid">
            <div className="v6-feature-copy v6-reveal">
              <span className="v6-index">02 / STUDIOS</span>
              <h2>Pilates. Lagree.<br />RPM. Boxing.</h2>
              <p>Des formats différents, avec le même niveau d’exigence.</p>
              <Link href="/cours" className="v6-text-link">Découvrir les cours →</Link>
            </div>
            <div className="v6-feature-media v6-media-motion">
              <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1700&q=88" alt="Cours en studio chez WAYS" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="v6-studio-interlude">
          <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2200&q=88" alt="Mouvement et mobilité" loading="lazy" />
          <div className="v6-interlude-copy"><span>STUDIOS / WAYS</span><strong>Move differently.</strong></div>
        </section>

        <section className="v6-recover">
          <div className="v6-container v6-recover-grid">
            <div className="v6-recover-copy v6-reveal">
              <span className="v6-index">03 / RECOVER</span>
              <h2>Recover.</h2>
              <p>La séance s’arrête.<br />Pas l’attention portée au confort.</p>
            </div>
            <div className="v6-recover-visual v6-media-motion">
              <div className="v6-towel v6-towel-dark" aria-label="Serviette WAYS"><img src="/ways-logo.svg" alt="WAYS" /></div>
            </div>
          </div>
        </section>

        <section className="v6-lifestyle-intro v6-paper">
          <div className="v6-container">
            <h2 className="v6-reveal">Votre séance est terminée.<br />Votre journée, non.</h2>
          </div>
        </section>

        <section id="work" className="v6-feature v6-work v6-paper">
          <div className="v6-container v6-feature-grid">
            <div className="v6-feature-copy v6-reveal">
              <span className="v6-index">04 / WORK</span>
              <h2>Une séance avant<br />un rendez-vous.<br />Ou l’inverse.</h2>
              <p>Un espace calme pour travailler, répondre à quelques mails ou préparer une réunion sans repartir immédiatement.</p>
              <a href="#day" className="v6-text-link">Découvrir le coworking →</a>
            </div>
            <div className="v6-feature-media v6-media-motion">
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=88" alt="Coworking WAYS" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="v6-wide-detail v6-paper">
          <div className="v6-container v6-wide-detail-frame v6-media-motion">
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2200&q=88" alt="Ordinateur, café et espace de travail" loading="lazy" />
            <span>09:07 / WAYS</span>
          </div>
        </section>

        <section id="coffee" className="v6-coffee v6-paper">
          <div className="v6-container v6-coffee-grid">
            <div className="v6-coffee-photo v6-media-motion">
              <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=88" alt="Coffee shop WAYS" loading="lazy" />
            </div>
            <div className="v6-coffee-copy v6-reveal">
              <span className="v6-index">05 / COFFEE</span>
              <h2>Avant.<br />Après.<br /><em>Ou juste pour le café.</em></h2>
              <p>Un vrai coffee shop intégré au club, pensé pour rester quelques minutes ou beaucoup plus.</p>
            </div>
          </div>
        </section>

        <section className="v6-coffee-detail">
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2200&q=88" alt="Café servi chez WAYS" loading="lazy" />
          <span>COFFEE / WAYS</span>
        </section>

        <section id="day" className="v6-day v6-paper">
          <div className="v6-container">
            <span className="v6-label v6-reveal">A DAY AT WAYS</span>
            <h2 className="v6-reveal">Un lieu.<br />Plusieurs moments.</h2>
            <div className="v6-day-line"><div className="v6-day-line-fill" /></div>
            <div className="v6-day-grid">
              <div className="v6-day-step"><span>07:30</span><strong>Training</strong></div>
              <div className="v6-day-step"><span>08:45</span><strong>Coffee</strong></div>
              <div className="v6-day-step"><span>09:00</span><strong>Work</strong></div>
              <div className="v6-day-step"><span>18:30</span><strong>Pilates</strong></div>
            </div>
            <p className="v6-day-note v6-reveal">Votre journée n’a pas besoin de s’arrêter pour votre séance.</p>
          </div>
        </section>

        <section className="v6-community v6-paper">
          <div className="v6-container v6-community-grid">
            <div className="v6-community-media v6-media-motion">
              <img src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&w=1600&q=88" alt="Membres WAYS échangeant après leur séance" loading="lazy" />
            </div>
            <div className="v6-community-copy v6-reveal">
              <span className="v6-label">WAYS COMMUNITY</span>
              <h2>On vient pour soi.<br />On finit souvent par connaître du monde.</h2>
            </div>
          </div>
        </section>

        <section className="v6-founders v6-paper">
          <div className="v6-container v6-founders-grid">
            <div className="v6-founders-media v6-media-motion">
              <div className="v6-towel" aria-label="Serviette WAYS brodée"><img src="/ways-logo.svg" alt="WAYS" /></div>
            </div>
            <div className="v6-founders-copy v6-reveal">
              <span className="v6-label">FOUNDING MEMBERS</span>
              <h2>Les premiers membres<br />auront leur signe.</h2>
              <p>Une serviette WAYS brodée offerte aux premiers adhérents à l’ouverture, dans la limite des quantités prévues.</p>
              <Link className="v6-button" href="/abonnements">Faire partie des premiers →</Link>
            </div>
          </div>
        </section>

        <section className="v6-memberships">
          <div className="v6-container">
            <div className="v6-memberships-head v6-reveal">
              <span className="v6-label">MEMBERSHIPS</span>
              <h2>Choisissez votre WAYS.</h2>
            </div>
            <div className="v6-plan-list">
              {plans.map((plan) => (
                <Link href="/abonnements" key={plan.name} className={plan.featured ? "v6-plan-row is-featured v6-reveal" : "v6-plan-row v6-reveal"}>
                  <div><strong>{plan.name}</strong><span>{plan.note}</span></div>
                  {plan.featured ? <small>Le plus choisi</small> : <span />}
                  <b>{plan.price}<i>/ mois</i></b>
                  <em>Découvrir →</em>
                </Link>
              ))}
            </div>
            <p className="v6-legal">Tarifs indicatifs à confirmer avant l’ouverture commerciale définitive.</p>
          </div>
        </section>

        <section className="v6-levallois v6-paper">
          <div className="v6-container v6-levallois-grid">
            <div className="v6-levallois-title v6-reveal">
              <span className="v6-label">THE ADDRESS</span>
              <h2>WAYS<br />Levallois-Perret.</h2>
              <p>Un club au cœur de Levallois, pensé pour s’intégrer naturellement à la journée.</p>
              <Link href="/levallois" className="v6-text-link">Découvrir WAYS Levallois →</Link>
            </div>
            <div className="v6-levallois-media v6-media-motion">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1500&q=88" alt="Architecture urbaine et chaleureuse" loading="lazy" />
            </div>
            <div className="v6-faq v6-reveal">
              <details><summary>Où se situe le club ?</summary><p>WAYS est situé à Levallois-Perret. L’adresse exacte sera affichée avec les informations pratiques définitives.</p></details>
              <details><summary>Y a-t-il un espace coworking ?</summary><p>Oui. Le coworking fait partie intégrante du concept WAYS.</p></details>
              <details><summary>Quels cours seront proposés ?</summary><p>Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie du programme prévu.</p></details>
            </div>
          </div>
        </section>

        <section className="v6-final">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=90" alt="WAYS Levallois" loading="lazy" />
          <div className="v6-final-overlay" />
          <div className="v6-final-copy v6-reveal">
            <span className="v6-label">WAYS / LEVALLOIS</span>
            <h2>Votre WAYS<br />commence ici.</h2>
            <div><Link href="/abonnements" className="v6-button v6-button-light">Devenir membre →</Link><Link href="/cours" className="v6-final-link">Découvrir les cours</Link></div>
          </div>
        </section>
      </main>

      <footer className="v6-footer">
        <div className="v6-container v6-footer-grid">
          <div><img src="/ways-logo.svg" alt="WAYS" /><span>Levallois-Perret</span></div>
          <div><strong>Club</strong><a href="#club">Le club</a><Link href="/cours">Cours</Link><Link href="/abonnements">Abonnements</Link></div>
          <div><strong>Découvrir</strong><a href="#work">Coworking</a><a href="#coffee">Coffee</a><Link href="/levallois">Levallois</Link></div>
          <div><strong>Contact</strong><a href="mailto:contact@ways-sport.fr">contact@ways-sport.fr</a></div>
        </div>
        <div className="v6-container v6-footer-bottom"><span>© 2026 WAYS</span><span>Membership · Privacy · Conditions</span></div>
      </footer>
    </div>
  );
}
