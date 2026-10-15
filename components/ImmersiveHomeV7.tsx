"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const plans = [
  { name: "MOVE", price: "59 €", note: "Training" },
  { name: "STUDIO", price: "79 €", note: "Training + Studios" },
  { name: "ALL WAYS", price: "109 €", note: "The full club experience" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "WAYS Levallois",
  url: "https://ways-sport-site.vercel.app",
  description:
    "WAYS est un training club à Levallois-Perret réunissant training, studios, recovery, coworking et coffee shop.",
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

export default function ImmersiveHomeV7() {
  const root = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [solidHeader, setSolidHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const enterTimer = window.setTimeout(() => setEntered(true), 260);

    const onScroll = () => {
      setSolidHeader(window.scrollY > Math.max(220, window.innerHeight * 0.72));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    root.current?.querySelectorAll<HTMLElement>(".v7-reveal").forEach((el) => observer.observe(el));

    return () => {
      window.clearTimeout(enterTimer);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={root} className={entered ? "v7-root is-entered" : "v7-root"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className={solidHeader ? "v7-header is-solid" : "v7-header"}>
        <Link href="/" className="v7-logo" aria-label="WAYS accueil">
          <img src="/ways-logo.svg" alt="WAYS" />
        </Link>
        <nav className={menuOpen ? "v7-nav is-open" : "v7-nav"} aria-label="Navigation principale">
          <a href="#club" onClick={() => setMenuOpen(false)}>Le club</a>
          <a href="#training" onClick={() => setMenuOpen(false)}>Training</a>
          <a href="#studios" onClick={() => setMenuOpen(false)}>Studios</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#coffee" onClick={() => setMenuOpen(false)}>Coffee</a>
        </nav>
        <Link href="/abonnements" className="v7-header-cta">Devenir membre →</Link>
        <button className="v7-menu" aria-label="Ouvrir le menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          <span /><span />
        </button>
      </header>

      <main>
        <section className="v7-hero" aria-label="WAYS Levallois-Perret">
          <div className="v7-hero-image" aria-hidden="true" />
          <div className="v7-hero-shade" aria-hidden="true" />
          <div className="v7-door v7-door-left" aria-hidden="true" />
          <div className="v7-door v7-door-right" aria-hidden="true" />
          <div className="v7-door-brand" aria-hidden="true">
            <img src="/ways-logo.svg" alt="" />
            <span>Levallois-Perret</span>
          </div>

          <div className="v7-hero-copy">
            <span>WAYS / LEVALLOIS-PERRET</span>
            <h1>WAYS</h1>
            <p>Training · Studios · Coffee · Work</p>
            <a href="#club">Découvrir le club ↓</a>
          </div>
        </section>

        <section id="club" className="v7-intro v7-paper">
          <div className="v7-shell v7-intro-grid">
            <span className="v7-kicker v7-reveal">WAYS / LEVALLOIS-PERRET</span>
            <div className="v7-intro-title v7-reveal">
              <h2>Le training club,<br />pensé au-delà de l’entraînement.</h2>
            </div>
            <div className="v7-intro-copy v7-reveal">
              <p>WAYS réunit espaces d’entraînement, studios, recovery, coffee shop et coworking dans une même adresse à Levallois-Perret.</p>
              <p>Un lieu pensé pour accompagner différents moments de la journée, sans compromis sur la qualité de l’entraînement.</p>
              <Link href="/levallois" className="v7-link">Découvrir WAYS →</Link>
            </div>
          </div>
        </section>

        <section className="v7-manifesto v7-paper">
          <figure className="v7-shell v7-manifesto-frame v7-reveal">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=90" alt="Intérieur d’un training club premium" loading="lazy" />
            <figcaption>WAYS / LEVALLOIS-PERRET / TRAINING CLUB</figcaption>
          </figure>
        </section>

        <section id="training" className="v7-feature v7-paper">
          <div className="v7-shell v7-feature-grid">
            <figure className="v7-feature-media v7-reveal">
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=90" alt="Training chez WAYS" loading="lazy" />
            </figure>
            <div className="v7-feature-copy v7-reveal">
              <span className="v7-kicker">01 / TRAINING</span>
              <h2>Training.</h2>
              <p className="v7-meta">Strength · Cardio · Functional</p>
              <p>Des espaces conçus pour un entraînement exigeant, avec du matériel sélectionné, de la liberté de mouvement et suffisamment d’espace pour travailler à son rythme.</p>
              <a href="#studios" className="v7-link">Découvrir les espaces →</a>
            </div>
          </div>
        </section>

        <section className="v7-editorial-break v7-paper">
          <div className="v7-shell v7-editorial-grid">
            <div className="v7-editorial-copy v7-reveal"><em>Train with intent.</em></div>
            <figure className="v7-editorial-photo v7-reveal">
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=88" alt="Détail d’un entraînement" loading="lazy" />
            </figure>
          </div>
        </section>

        <section id="studios" className="v7-feature v7-feature-reverse v7-paper">
          <div className="v7-shell v7-feature-grid">
            <div className="v7-feature-copy v7-reveal">
              <span className="v7-kicker">02 / STUDIOS</span>
              <h2>Studios.</h2>
              <p className="v7-meta">Pilates · Lagree · RPM · Boxing</p>
              <p>Des disciplines complémentaires, réunies dans des studios dédiés et une programmation pensée pour varier les façons de s’entraîner.</p>
              <Link href="/cours" className="v7-link">Découvrir les cours →</Link>
            </div>
            <figure className="v7-feature-media v7-reveal">
              <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1700&q=90" alt="Studio WAYS" loading="lazy" />
            </figure>
          </div>
        </section>

        <section className="v7-studio-photo">
          <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2200&q=90" alt="Mouvement en studio" loading="lazy" />
          <span>STUDIOS / WAYS</span>
        </section>

        <section className="v7-recover">
          <div className="v7-shell v7-recover-grid">
            <div className="v7-recover-copy v7-reveal">
              <span className="v7-kicker">03 / RECOVER</span>
              <h2>Recover.</h2>
              <p><em>Designed for what comes after.</em></p>
            </div>
            <figure className="v7-recover-media v7-reveal">
              <img src="/v7-recover-reference.webp" alt="Serviette WAYS dans un espace recovery" loading="lazy" />
            </figure>
          </div>
        </section>

        <section className="v7-beyond v7-paper">
          <div className="v7-shell"><h2 className="v7-reveal"><em>Beyond the workout.</em></h2></div>
        </section>

        <section id="work" className="v7-work v7-paper">
          <div className="v7-shell v7-work-grid">
            <div className="v7-work-copy v7-reveal">
              <span className="v7-kicker">04 / WORK</span>
              <h2>Work.</h2>
              <p className="v7-sub"><em>For the hours in between.</em></p>
              <p>Un espace calme pour travailler, prendre un appel ou prolonger sa journée sans quitter le club.</p>
              <p>Wi-Fi, café et espaces adaptés aux usages du quotidien.</p>
              <a href="#coffee" className="v7-link">Découvrir l’espace →</a>
            </div>
            <figure className="v7-work-media v7-reveal">
              <img src="/v7-work-reference.webp" alt="Laptop, café, bouteille et sac dans l’espace WAYS" loading="lazy" />
              <figcaption>09:07 / WAYS</figcaption>
            </figure>
          </div>
        </section>

        <section id="coffee" className="v7-coffee v7-paper">
          <div className="v7-shell v7-coffee-grid">
            <figure className="v7-coffee-media v7-reveal">
              <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=90" alt="Coffee shop WAYS" loading="lazy" />
            </figure>
            <div className="v7-coffee-copy v7-reveal">
              <span className="v7-kicker">05 / COFFEE</span>
              <h2>Coffee.</h2>
              <p className="v7-sub"><em>Part of the club.</em></p>
              <p>Un coffee shop intégré à WAYS, pensé comme un véritable espace du club.</p>
              <p>Un café avant une séance, après un cours ou simplement entre deux rendez-vous.</p>
            </div>
          </div>
        </section>

        <section className="v7-coffee-wide">
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2200&q=90" alt="Café servi chez WAYS" loading="lazy" />
          <span>COFFEE / WAYS</span>
        </section>

        <section className="v7-day v7-paper">
          <div className="v7-shell">
            <span className="v7-kicker v7-reveal">A DAY AT WAYS</span>
            <h2 className="v7-reveal">One place.<br />Different moments.</h2>
            <div className="v7-timeline v7-reveal">
              <div><span>07:30</span><strong>Training</strong></div>
              <div><span>08:45</span><strong>Coffee</strong></div>
              <div><span>09:00</span><strong>Work</strong></div>
              <div><span>18:30</span><strong>Pilates</strong></div>
            </div>
            <p className="v7-day-note v7-reveal">WAYS fits into the day.</p>
          </div>
        </section>

        <section className="v7-founders v7-paper">
          <div className="v7-shell v7-founders-grid">
            <figure className="v7-founders-media v7-reveal">
              <img src="/ways-founders-towels.svg" alt="Serviettes WAYS brodées" loading="lazy" />
            </figure>
            <div className="v7-founders-copy v7-reveal">
              <span className="v7-kicker">FOUNDING MEMBERS</span>
              <h2>The first edition.</h2>
              <p>Une serviette WAYS brodée sera offerte aux premiers membres du club lors de l’ouverture.</p>
              <p>Édition réservée aux Founding Members, dans la limite des quantités disponibles.</p>
              <Link href="/abonnements" className="v7-button">Become a Founding Member →</Link>
            </div>
          </div>
        </section>

        <section className="v7-memberships">
          <div className="v7-shell">
            <div className="v7-memberships-head v7-reveal">
              <span className="v7-kicker">MEMBERSHIPS</span>
              <h2>Choose your WAYS.</h2>
            </div>
            <div className="v7-plan-list">
              {plans.map((plan) => (
                <Link key={plan.name} href="/abonnements" className="v7-plan v7-reveal">
                  <div><strong>{plan.name}</strong><span>{plan.note}</span></div>
                  <b>{plan.price}<small>/ mois</small></b>
                  <span>View membership →</span>
                </Link>
              ))}
            </div>
            <p className="v7-legal">Tarifs indicatifs à confirmer avant l’ouverture commerciale définitive.</p>
          </div>
        </section>

        <section className="v7-levallois v7-paper">
          <div className="v7-shell v7-levallois-grid">
            <div className="v7-levallois-copy v7-reveal">
              <span className="v7-kicker">WAYS / LEVALLOIS-PERRET</span>
              <h2>An address<br />in Levallois.</h2>
              <p>WAYS s’installe à Levallois-Perret avec un concept réunissant training, studios, recovery, coworking et coffee shop.</p>
              <p>Une adresse pensée pour celles et ceux qui veulent s’entraîner sérieusement dans un environnement plus attentif au design, au confort et aux usages du quotidien.</p>
              <Link href="/levallois" className="v7-link">Découvrir WAYS Levallois →</Link>
            </div>
            <figure className="v7-levallois-media v7-reveal">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1700&q=90" alt="Architecture urbaine et chaleureuse" loading="lazy" />
            </figure>
          </div>
        </section>

        <section className="v7-final">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=90" alt="WAYS Levallois" loading="lazy" />
          <div className="v7-final-overlay" />
          <div className="v7-final-copy v7-reveal">
            <img src="/ways-logo.svg" alt="WAYS" />
            <span>Levallois-Perret</span>
            <h2>Join the club.</h2>
            <div><Link href="/abonnements" className="v7-button v7-button-light">Devenir membre →</Link><Link href="/cours" className="v7-final-link">Découvrir les cours</Link></div>
          </div>
        </section>
      </main>

      <footer className="v7-footer">
        <div className="v7-shell v7-footer-grid">
          <div className="v7-footer-brand"><img src="/ways-logo.svg" alt="WAYS" /><span>Levallois-Perret</span></div>
          <div><strong>Club</strong><a href="#training">Training</a><a href="#studios">Studios</a><a href="#club">Recover</a><Link href="/abonnements">Memberships</Link></div>
          <div><strong>Lifestyle</strong><a href="#coffee">Coffee</a><a href="#work">Work</a><span>Community</span></div>
          <div><strong>Information</strong><a href="mailto:contact@ways-sport.fr">Contact</a><span>Instagram</span><span>Mentions légales</span><span>Confidentialité</span></div>
        </div>
      </footer>
    </div>
  );
}
