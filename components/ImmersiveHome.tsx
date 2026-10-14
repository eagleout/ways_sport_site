"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    kicker: "01 · TRAIN",
    title: "UN ENTRAÎNEMENT QUI COMPTE.",
    text: "Musculation, cardio et functional training dans un club pensé pour progresser sans perdre le plaisir de venir.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=82",
    tags: ["STRENGTH", "CARDIO", "FUNCTIONAL"]
  },
  {
    kicker: "02 · STUDIOS",
    title: "BOUGE. AUTREMENT.",
    text: "Pilates, Lagree, RPM, Cardio Boxing et Body Sculpt. Des formats complémentaires, une même exigence.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2200&q=82",
    tags: ["PILATES", "LAGREE", "RPM", "BOXING"]
  },
  {
    kicker: "03 · RECOVER",
    title: "FINIR FORT. REPARTIR BIEN.",
    text: "Vestiaires, récupération et détails de confort : l’expérience continue après le dernier set.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2200&q=82",
    tags: ["RECOVER", "RESET", "READY"]
  },
  {
    kicker: "04 · LIVE",
    title: "PLUS QU’UNE HEURE DE SPORT.",
    text: "Un club qui trouve sa place dans votre journée : entraînement, café, travail, échanges et rendez-vous.",
    image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&w=2200&q=82",
    tags: ["COFFEE", "COMMUNITY", "WORK"]
  }
];

const memberships = [
  { name: "MOVE", price: "59€", note: "L’essentiel WAYS", features: ["Accès training", "Cardio & musculation", "Application membre"] },
  { name: "STUDIO", price: "79€", note: "Le club + les studios", features: ["Tout MOVE", "Cours collectifs", "Réservation prioritaire"], featured: true },
  { name: "ALL WAYS", price: "109€", note: "L’expérience complète", features: ["Tout STUDIO", "Expériences premium", "Avantages club"] }
];

export default function ImmersiveHome() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const travel = heroRef.current.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, travel)));
      setProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const door = Math.min(1, Math.max(0, (progress - 0.08) / 0.58));
  const enter = Math.min(1, Math.max(0, (progress - 0.42) / 0.58));

  const brandJsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: "WAYS Levallois",
    url: "https://ways-sport.fr",
    description:
      "Training club à Levallois-Perret proposant musculation, cardio et cours collectifs.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Levallois-Perret",
      addressRegion: "Île-de-France",
      addressCountry: "FR"
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandJsonLd) }}
      />

      <header className="siteHeader">
        <a href="#top" className="wordmark" aria-label="WAYS accueil">
          WAYS
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigation principale">
          <a href="#club">Le club</a>
          <a href="#studios">Cours</a>
          <a href="#membership">Abonnements</a>
          <a href="#levallois">Levallois</a>
        </nav>
        <a className="joinHeader" href="#membership">REJOINDRE WAYS</a>
        <button
          className="menuButton"
          aria-expanded={menuOpen}
          aria-label="Ouvrir le menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span />
        </button>
      </header>

      <section id="top" ref={heroRef} className="doorSequence">
        <div className="stickyStage">
          <div
            className="clubInterior"
            style={{
              transform: `scale(${1 + enter * 0.16})`,
              filter: `brightness(${0.54 + enter * 0.46})`
            }}
          >
            <div className="interiorGlow" />
            <div className="interiorCopy" style={{ opacity: Math.max(0, (enter - .18) * 1.8) }}>
              <span>WAYS · LEVALLOIS-PERRET</span>
              <h1>UNE FORCE<br/>BIEN À TOI.</h1>
              <p>À TA FAÇON. À FOND.</p>
            </div>
          </div>

          <div
            className="door doorLeft"
            style={{ transform: `translateX(${-door * 103}%)` }}
          >
            <div className="doorTexture" />
          </div>
          <div
            className="door doorRight"
            style={{ transform: `translateX(${door * 103}%)` }}
          >
            <div className="doorTexture" />
          </div>

          <div className="doorBrand" style={{ opacity: 1 - Math.min(1, door * 1.8) }}>
            <span className="mono">W</span>
            <strong>WAYS</strong>
            <small>TRAINING CLUB · LEVALLOIS</small>
          </div>

          <div className="scrollCue" style={{ opacity: 1 - door * 1.6 }}>
            <span>ENTREZ</span>
            <i />
          </div>
        </div>
      </section>

      <section id="club" className="manifesto">
        <div className="eyebrow">WAYS / LE CLUB</div>
        <div className="manifestoGrid">
          <h2>LA FORCE D’UN CLUB.<br/>LA LIBERTÉ D’AVANCER.</h2>
          <div>
            <p className="lead">
              Un entraînement intense, un lieu chaleureux, une progression personnelle.
            </p>
            <p>
              WAYS est pensé pour celles et ceux qui veulent s’entraîner sérieusement,
              sans transformer le sport en contrainte.
            </p>
            <a className="textLink" href="#journey">DÉCOUVRIR LE CLUB <span>↘</span></a>
          </div>
        </div>
      </section>

      <section id="journey" className="journey">
        {chapters.map((chapter, index) => (
          <article
            key={chapter.kicker}
            id={index === 1 ? "studios" : undefined}
            className="chapter"
            style={{ backgroundImage: `linear-gradient(90deg, rgba(16,14,13,.78), rgba(16,14,13,.14)), url("${chapter.image}")` }}
          >
            <div className="chapterShade" />
            <div className="chapterContent">
              <span className="chapterKicker">{chapter.kicker}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.text}</p>
              <div className="tags">
                {chapter.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="chapterNumber">0{index + 1}</div>
          </article>
        ))}
      </section>

      <section className="dayStory">
        <div className="eyebrow">ONE PLACE. MANY WAYS.</div>
        <div className="timeline">
          <div><strong>07:30</strong><span>TRAIN</span></div>
          <div><strong>08:45</strong><span>COFFEE</span></div>
          <div><strong>09:00</strong><span>WORK</span></div>
          <div><strong>18:30</strong><span>PILATES</span></div>
        </div>
        <h2>LE CLUB QUI S’ADAPTE À TA JOURNÉE.<br/>PAS L’INVERSE.</h2>
      </section>

      <section id="membership" className="membership">
        <div className="membershipIntro">
          <span className="eyebrow">MEMBERSHIPS</span>
          <h2>CHOISIS TON WAYS.</h2>
          <p>Trois façons d’entrer dans le club. Une seule règle : trouver celle qui correspond vraiment à ton rythme.</p>
        </div>
        <div className="plans">
          {memberships.map(plan => (
            <article key={plan.name} className={plan.featured ? "plan featured" : "plan"}>
              {plan.featured && <span className="popular">LE PLUS CHOISI</span>}
              <div>
                <span className="planName">{plan.name}</span>
                <p>{plan.note}</p>
              </div>
              <strong className="price">{plan.price}<small>/mois</small></strong>
              <ul>
                {plan.features.map(feature => <li key={feature}>{feature}</li>)}
              </ul>
              <a href="#visit">CHOISIR CE WAYS <span>↗</span></a>
            </article>
          ))}
        </div>
        <p className="priceNote">Tarifs de démonstration à valider avant mise en production.</p>
      </section>

      <section id="levallois" className="localSeo">
        <div>
          <span className="eyebrow">WAYS · LEVALLOIS-PERRET</span>
          <h2>TON CLUB.<br/>TON QUARTIER.</h2>
        </div>
        <div className="localCopy">
          <p>
            WAYS est un training club à Levallois-Perret pensé pour les actifs de proximité :
            musculation, cardio, cours collectifs, Pilates, Lagree, RPM et espaces de vie réunis
            dans une même adresse.
          </p>
          <div className="faq">
            <details>
              <summary>WAYS propose-t-il du Pilates à Levallois ?</summary>
              <p>Oui. Le programme WAYS prévoit des séances de Pilates intégrées au planning des studios.</p>
            </details>
            <details>
              <summary>Quels cours collectifs sont proposés ?</summary>
              <p>Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie du programme prévu.</p>
            </details>
            <details>
              <summary>WAYS convient-il aux débutants ?</summary>
              <p>Le concept est pensé pour différents niveaux de pratique, de la reprise sportive à l’entraînement régulier.</p>
            </details>
          </div>
        </div>
      </section>

      <section id="visit" className="finalCta">
        <span className="eyebrow">YOU’VE SEEN THE PLACE.</span>
        <h2>MAINTENANT,<br/>FAIS-EN TON CLUB.</h2>
        <div className="ctaRow">
          <a className="primaryCta" href="mailto:contact@ways-sport.fr">REJOINDRE WAYS</a>
          <a className="secondaryCta" href="mailto:contact@ways-sport.fr?subject=Visite%20WAYS">VISITER LE CLUB</a>
        </div>
      </section>

      <footer>
        <div className="footerBrand">WAYS</div>
        <div><span>TRAINING CLUB</span><span>LEVALLOIS-PERRET</span></div>
        <div><a href="#membership">ABONNEMENTS</a><a href="#studios">COURS</a><a href="#levallois">LEVALLOIS</a></div>
        <small>© 2026 WAYS · À TA FAÇON. À FOND.</small>
      </footer>
    </main>
  );
}
