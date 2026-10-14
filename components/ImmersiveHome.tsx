"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    id: "training",
    kicker: "01 · TRAIN",
    title: "UN ENTRAÎNEMENT QUI COMPTE.",
    text: "Musculation, cardio et functional training dans un club pensé pour progresser sans perdre le plaisir de venir.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=84",
    tags: ["STRENGTH", "CARDIO", "FUNCTIONAL"]
  },
  {
    id: "studios",
    kicker: "02 · STUDIOS",
    title: "BOUGE. AUTREMENT.",
    text: "Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt. Des formats complémentaires, une même exigence.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2200&q=84",
    tags: ["PILATES", "LAGREE", "RPM", "BOXING"]
  },
  {
    id: "recover",
    kicker: "03 · RECOVER",
    title: "FINIR FORT. REPARTIR BIEN.",
    text: "Vestiaires, récupération et détails de confort : l’expérience continue après le dernier set.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2200&q=84",
    tags: ["RECOVER", "RESET", "READY"]
  },
  {
    id: "cowork",
    kicker: "04 · COWORK",
    title: "TA JOURNÉE CONTINUE ICI.",
    text: "Un véritable espace coworking intégré au club pour répondre à un mail, préparer un rendez-vous ou avancer entre deux temps forts de la journée.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=84",
    tags: ["WORK", "FOCUS", "CONNECT"]
  },
  {
    id: "coffee",
    kicker: "05 · COFFEE SHOP",
    title: "LE BON APRÈS.",
    text: "Café, boissons signature et moments de pause. Le coffee shop prolonge l’expérience WAYS et transforme l’accueil en vrai lieu de vie.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=2200&q=84",
    tags: ["COFFEE", "SOCIAL", "RESET"]
  }
];

const memberships = [
  { name: "MOVE", price: "59€", note: "L’essentiel WAYS", features: ["Accès training", "Cardio & musculation", "Application membre"] },
  { name: "STUDIO", price: "79€", note: "Le club + les studios", features: ["Tout MOVE", "Cours collectifs", "Réservation prioritaire"], featured: true },
  { name: "ALL WAYS", price: "109€", note: "L’expérience complète", features: ["Tout STUDIO", "Avantages club", "Expériences premium"] }
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
      setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(1, travel))));
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: "WAYS Levallois",
    url: "https://ways-sport.fr",
    description: "Training club à Levallois-Perret avec musculation, cardio, cours collectifs, espace coworking et coffee shop.",
    address: { "@type": "PostalAddress", addressLocality: "Levallois-Perret", addressRegion: "Île-de-France", addressCountry: "FR" },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Espace coworking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Coffee shop", value: true },
      { "@type": "LocationFeatureSpecification", name: "Cours collectifs", value: true }
    ]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="siteHeader">
        <Link href="/" className="brandLogo" aria-label="WAYS accueil"><img src="/ways-logo.svg" alt="WAYS" /></Link>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigation principale">
          <a href="#club">Le club</a>
          <Link href="/cours">Cours</Link>
          <a href="#cowork">Coworking</a>
          <a href="#coffee">Coffee shop</a>
          <Link href="/abonnements">Abonnements</Link>
        </nav>
        <Link className="joinHeader" href="/abonnements">REJOINDRE WAYS</Link>
        <button className="menuButton" aria-expanded={menuOpen} aria-label="Ouvrir le menu" onClick={() => setMenuOpen(v => !v)}><span/><span/></button>
      </header>

      <section id="top" ref={heroRef} className="doorSequence">
        <div className="stickyStage">
          <div className="clubInterior" style={{ transform: `scale(${1 + enter * 0.16})`, filter: `brightness(${0.54 + enter * 0.46})` }}>
            <div className="interiorGlow" />
            <div className="interiorCopy" style={{ opacity: Math.max(0, (enter - .18) * 1.8) }}>
              <span>WAYS · LEVALLOIS-PERRET</span>
              <h1>UNE FORCE<br/>BIEN À TOI.</h1>
              <p>À TA FAÇON. À FOND.</p>
            </div>
          </div>
          <div className="door doorLeft" style={{ transform: `translateX(${-door * 103}%)` }}><div className="doorTexture"/></div>
          <div className="door doorRight" style={{ transform: `translateX(${door * 103}%)` }}><div className="doorTexture"/></div>
          <div className="doorBrand" style={{ opacity: 1 - Math.min(1, door * 1.8) }}><img src="/ways-logo.svg" alt="WAYS"/><small>TRAINING CLUB · LEVALLOIS</small></div>
          <div className="scrollCue" style={{ opacity: 1 - door * 1.6 }}><span>ENTREZ</span><i/></div>
        </div>
      </section>

      <section id="club" className="manifesto">
        <div className="eyebrow">WAYS / LE CLUB</div>
        <div className="manifestoGrid">
          <h2>LA FORCE D’UN CLUB.<br/>LA LIBERTÉ D’AVANCER.</h2>
          <div><p className="lead">Un entraînement intense, un lieu chaleureux, une progression personnelle.</p><p>WAYS est pensé pour celles et ceux qui veulent s’entraîner sérieusement, sans transformer le sport en contrainte.</p><a className="textLink" href="#journey">DÉCOUVRIR LE CLUB <span>↘</span></a></div>
        </div>
      </section>

      <section id="journey" className="journey">
        {chapters.map((chapter, index) => (
          <article key={chapter.id} id={chapter.id} className="chapter" style={{ backgroundImage: `linear-gradient(90deg, rgba(16,14,13,.80), rgba(16,14,13,.12)), url("${chapter.image}")` }}>
            <div className="chapterContent">
              <span className="chapterKicker">{chapter.kicker}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.text}</p>
              <div className="tags">{chapter.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              {chapter.id === "studios" && <Link className="chapterLink" href="/cours">DÉCOUVRIR LES COURS ↗</Link>}
            </div>
            <div className="chapterNumber">0{index + 1}</div>
          </article>
        ))}
      </section>

      <section className="launchDrop">
        <div className="launchImage" />
        <div className="launchCopy">
          <span className="eyebrow">FIRST MEMBERS DROP</span>
          <h2>LES PREMIERS<br/>PORTERONT WAYS.</h2>
          <p className="launchLead">Une <strong>serviette WAYS brodée</strong> sera offerte aux premiers adhérents.</p>
          <p>Un cadeau de lancement utile, premium et directement lié à l’expérience du club. Dans la limite des stocks disponibles.</p>
          <Link className="primaryDark" href="/abonnements">DEVENIR L’UN DES PREMIERS</Link>
        </div>
      </section>

      <section className="dayStory">
        <div className="eyebrow">ONE PLACE. MANY WAYS.</div>
        <div className="timeline"><div><strong>07:30</strong><span>TRAIN</span></div><div><strong>08:45</strong><span>COFFEE</span></div><div><strong>09:00</strong><span>WORK</span></div><div><strong>18:30</strong><span>PILATES</span></div></div>
        <h2>LE CLUB QUI S’ADAPTE À TA JOURNÉE.<br/>PAS L’INVERSE.</h2>
      </section>

      <section id="membership" className="membership">
        <div className="membershipIntro"><span className="eyebrow">MEMBERSHIPS</span><h2>CHOISIS TON WAYS.</h2><p>Trois façons d’entrer dans le club. Une seule règle : trouver celle qui correspond vraiment à ton rythme.</p></div>
        <div className="plans">{memberships.map(plan => <article key={plan.name} className={plan.featured ? "plan featured" : "plan"}>{plan.featured && <span className="popular">LE PLUS CHOISI</span>}<div><span className="planName">{plan.name}</span><p>{plan.note}</p></div><strong className="price">{plan.price}<small>/mois</small></strong><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><Link href="/abonnements">VOIR L’OFFRE <span>↗</span></Link></article>)}</div>
        <p className="priceNote">Tarifs et conditions à confirmer avant ouverture commerciale définitive.</p>
      </section>

      <section id="levallois" className="localSeo">
        <div><span className="eyebrow">WAYS · LEVALLOIS-PERRET</span><h2>TON CLUB.<br/>TON QUARTIER.</h2></div>
        <div className="localCopy"><p>WAYS est un training club à Levallois-Perret réunissant musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop.</p><div className="faq"><details><summary>Y a-t-il un espace coworking chez WAYS ?</summary><p>Oui. Un espace de travail est prévu pour permettre aux membres de travailler autour de leur séance.</p></details><details><summary>WAYS dispose-t-il d’un coffee shop ?</summary><p>Oui. Le coffee shop fait partie intégrante du concept et prolonge l’expérience du club.</p></details><details><summary>Quels cours sont proposés ?</summary><p>Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie du programme prévu.</p></details><details><summary>Que reçoivent les premiers adhérents ?</summary><p>Une serviette WAYS brodée est prévue comme cadeau de lancement pour les premiers adhérents, dans la limite des stocks disponibles.</p></details></div><Link className="chapterLink" href="/levallois">DÉCOUVRIR WAYS LEVALLOIS ↗</Link></div>
      </section>

      <section id="visit" className="finalCta"><span className="eyebrow">YOU’VE SEEN THE PLACE.</span><h2>MAINTENANT,<br/>FAIS-EN TON CLUB.</h2><div className="ctaRow"><Link className="primaryCta" href="/abonnements">REJOINDRE WAYS</Link><a className="secondaryCta" href="mailto:contact@ways-sport.fr?subject=Visite%20WAYS">VISITER LE CLUB</a></div></section>

      <footer><div className="footerBrand"><img src="/ways-logo.svg" alt="WAYS"/></div><div><span>TRAINING CLUB</span><span>LEVALLOIS-PERRET</span></div><div><Link href="/abonnements">ABONNEMENTS</Link><Link href="/cours">COURS</Link><Link href="/levallois">LEVALLOIS</Link></div><small>© 2026 WAYS · À TA FAÇON. À FOND.</small></footer>
    </main>
  );
}
