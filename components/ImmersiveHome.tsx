"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    id: "training",
    kicker: "01 · TRAINING",
    title: "LE SÉRIEUX DU TRAINING. SANS LE BRUIT AUTOUR.",
    text: "Musculation, cardio et functional training dans un club pensé pour s’entraîner vraiment : du bon matériel, de l’espace et une ambiance qui donne envie de revenir.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=84",
    tags: ["STRENGTH", "CARDIO", "FUNCTIONAL"]
  },
  {
    id: "studios",
    kicker: "02 · STUDIOS",
    title: "LE RYTHME CHANGE. L’EXIGENCE RESTE.",
    text: "Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt. Des cours choisis pour leur complémentarité, pas pour remplir un planning.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2200&q=84",
    tags: ["PILATES", "LAGREE", "RPM", "BOXING"]
  },
  {
    id: "recover",
    kicker: "03 · RECOVER",
    title: "RÉCUPÉRER FAIT PARTIE DU TRAINING.",
    text: "Vestiaires, confort et récupération prolongent la séance. Tu repars prêt pour la suite, pas pressé de quitter le club.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2200&q=84",
    tags: ["RECOVER", "RESET", "READY"]
  },
  {
    id: "cowork",
    kicker: "04 · COWORKING",
    title: "UNE SÉANCE. PUIS TA JOURNÉE.",
    text: "Un espace coworking intégré au club pour répondre à un mail, préparer un rendez-vous ou avancer sans changer d’adresse.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=84",
    tags: ["WORK", "FOCUS", "CONNECT"]
  },
  {
    id: "coffee",
    kicker: "05 · COFFEE SHOP",
    title: "PRENDS TON TEMPS. PAS UN DÉTOUR.",
    text: "Café, boissons signature et moments de pause. Le coffee shop fait de WAYS un lieu où l’on peut rester, se retrouver et repartir quand on veut.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=2200&q=84",
    tags: ["COFFEE", "SOCIAL", "RESET"]
  }
];

const memberships = [
  { name: "MOVE", price: "59€", note: "Le training WAYS", features: ["Accès training", "Cardio & musculation", "Application membre"] },
  { name: "STUDIO", price: "79€", note: "Training + studios", features: ["Tout MOVE", "Cours collectifs", "Réservation prioritaire"], featured: true },
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
    description: "Training club premium à Levallois-Perret avec musculation, cardio, cours collectifs, espace coworking et coffee shop.",
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
          </div>
          <div className="interiorCopy" style={{ opacity: Math.max(0, (enter - .18) * 1.8) }}>
            <span>WAYS · LEVALLOIS-PERRET</span>
            <h1>ENTRAÎNE-TOI.<br/>RESTE POUR LE RESTE.</h1>
            <p>TRAINING · STUDIOS · COFFEE · WORK</p>
          </div>
          <div className="door doorLeft" style={{ transform: `translateX(${-door * 103}%)` }}><div className="doorTexture"/></div>
          <div className="door doorRight" style={{ transform: `translateX(${door * 103}%)` }}><div className="doorTexture"/></div>
          <div className="doorBrand" style={{ opacity: 1 - Math.min(1, door * 1.8) }}><img src="/ways-logo.svg" alt="WAYS"/><small>TRAINING CLUB · LEVALLOIS</small></div>
          <div className="scrollCue" style={{ opacity: 1 - door * 1.6 }}><span>ENTREZ</span><i/></div>
        </div>
      </section>

      <section id="club" className="manifesto">
        <div className="eyebrow">WAYS / TRAINING CLUB</div>
        <div className="manifestoGrid">
          <h2>UN CLUB QUI NE S’ARRÊTE PAS À LA SÉANCE.</h2>
          <div>
            <p className="lead">Tu viens pour t’entraîner. Tu restes parce que tout est pensé pour la suite.</p>
            <p>WAYS réunit training, studios, coworking et coffee shop dans une même adresse à Levallois. Un lieu exigeant dans le sport, simple dans l’usage, agréable à vivre.</p>
            <a className="textLink" href="#journey">DÉCOUVRIR WAYS <span>↘</span></a>
          </div>
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
              {chapter.id === "studios" && <Link className="chapterLink" href="/cours">VOIR LES COURS ↗</Link>}
            </div>
            <div className="chapterNumber">0{index + 1}</div>
          </article>
        ))}
      </section>

      <section className="launchDrop">
        <div className="launchImage" />
        <div className="launchCopy">
          <span className="eyebrow">FIRST MEMBERS</span>
          <h2>PREMIERS MEMBRES.<br/>PREMIER SIGNE.</h2>
          <p className="launchLead">Une <strong>serviette WAYS brodée</strong> sera offerte aux premiers adhérents.</p>
          <p>Un objet utile, premium et pensé pour durer. La première pièce WAYS pour celles et ceux qui entrent dans le club dès le début. Dans la limite des stocks disponibles.</p>
          <Link className="primaryDark" href="/abonnements">FAIRE PARTIE DES PREMIERS</Link>
        </div>
      </section>

      <section className="dayStory">
        <div className="eyebrow">ONE CLUB. MORE THAN ONE MOMENT.</div>
        <div className="timeline"><div><strong>07:30</strong><span>TRAIN</span></div><div><strong>08:45</strong><span>COFFEE</span></div><div><strong>09:00</strong><span>WORK</span></div><div><strong>18:30</strong><span>PILATES</span></div></div>
        <h2>UN CLUB. PLUSIEURS MOMENTS DE TA JOURNÉE.</h2>
      </section>

      <section id="membership" className="membership">
        <div className="membershipIntro"><span className="eyebrow">MEMBERSHIPS</span><h2>TON RYTHME. TON ACCÈS.</h2><p>Choisis la façon dont tu veux vivre WAYS : training, studios ou expérience complète du club.</p></div>
        <div className="plans">{memberships.map(plan => <article key={plan.name} className={plan.featured ? "plan featured" : "plan"}>{plan.featured && <span className="popular">LE PLUS CHOISI</span>}<div><span className="planName">{plan.name}</span><p>{plan.note}</p></div><strong className="price">{plan.price}<small>/mois</small></strong><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><Link href="/abonnements">DÉCOUVRIR <span>↗</span></Link></article>)}</div>
        <p className="priceNote">Tarifs et conditions à confirmer avant ouverture commerciale définitive.</p>
      </section>

      <section id="levallois" className="localSeo">
        <div><span className="eyebrow">WAYS · LEVALLOIS-PERRET</span><h2>LE SPORT.<br/>ET TOUT CE QU’IL Y A AUTOUR.</h2></div>
        <div className="localCopy"><p>WAYS est un training club premium à Levallois-Perret réunissant musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop.</p><div className="faq"><details><summary>Y a-t-il un espace coworking chez WAYS ?</summary><p>Oui. Un espace de travail est prévu pour permettre aux membres de travailler autour de leur séance.</p></details><details><summary>WAYS dispose-t-il d’un coffee shop ?</summary><p>Oui. Le coffee shop fait partie intégrante du concept et prolonge l’expérience du club.</p></details><details><summary>Quels cours sont proposés ?</summary><p>Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie du programme prévu.</p></details><details><summary>Que reçoivent les premiers adhérents ?</summary><p>Une serviette WAYS brodée est prévue comme cadeau de lancement pour les premiers adhérents, dans la limite des stocks disponibles.</p></details></div><Link className="chapterLink" href="/levallois">WAYS LEVALLOIS ↗</Link></div>
      </section>

      <section id="visit" className="finalCta"><span className="eyebrow">YOUR WAY STARTS HERE.</span><h2>ENTRE.<br/>TROUVE TON RYTHME.</h2><div className="ctaRow"><Link className="primaryCta" href="/abonnements">REJOINDRE WAYS</Link><a className="secondaryCta" href="mailto:contact@ways-sport.fr?subject=Visite%20WAYS">VISITER LE CLUB</a></div></section>

      <footer><div className="footerBrand"><img src="/ways-logo.svg" alt="WAYS"/></div><div><span>TRAINING CLUB</span><span>LEVALLOIS-PERRET</span></div><div><Link href="/abonnements">ABONNEMENTS</Link><Link href="/cours">COURS</Link><Link href="/levallois">LEVALLOIS</Link></div><small>© 2026 WAYS · À TA FAÇON. À FOND.</small></footer>
    </main>
  );
}
