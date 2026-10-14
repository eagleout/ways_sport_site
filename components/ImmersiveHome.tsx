"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const spaces = [
  {
    id: "training",
    no: "01",
    title: "TRAINING",
    line: "Force · Cardio · Functional",
    text: "Un plateau pensé pour s’entraîner sérieusement, avec de l’espace, de la lumière et du matériel qui donne envie de revenir.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=86"
  },
  {
    id: "studios",
    no: "02",
    title: "STUDIOS",
    line: "Pilates · Lagree · RPM · Boxing",
    text: "Des formats choisis pour leur complémentarité. On vient pour bouger autrement, progresser et retrouver l’énergie du groupe.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=86"
  },
  {
    id: "recover",
    no: "03",
    title: "RECOVER",
    line: "Reset · Comfort · Ready",
    text: "La récupération fait partie de l’expérience. Un lieu où l’on peut ralentir avant de repartir dans sa journée.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1800&q=86"
  },
  {
    id: "cowork",
    no: "04",
    title: "WORK",
    line: "Coworking · Focus · Connect",
    text: "Répondre à un mail, passer un appel, préparer un rendez-vous. Ton entraînement et ta journée peuvent enfin partager la même adresse.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=86"
  },
  {
    id: "coffee",
    no: "05",
    title: "COFFEE",
    line: "Coffee · Drinks · Social",
    text: "Un vrai espace de vie pour boire un café, débriefer une séance, retrouver quelqu’un ou simplement prendre son temps.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1800&q=86"
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
    description: "Training club premium à Levallois-Perret avec musculation, cardio, Pilates, Lagree, RPM, espace coworking et coffee shop.",
    address: { "@type": "PostalAddress", addressLocality: "Levallois-Perret", addressRegion: "Île-de-France", addressCountry: "FR" },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Espace coworking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Coffee shop", value: true },
      { "@type": "LocationFeatureSpecification", name: "Cours collectifs", value: true }
    ]
  };

  return (
    <main className="waysHome">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="siteHeader editorialHeader">
        <Link href="/" className="brandLogo" aria-label="WAYS accueil"><img src="/ways-logo.svg" alt="WAYS" /></Link>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigation principale">
          <a href="#club">Le club</a>
          <Link href="/cours">Cours</Link>
          <a href="#cowork">Coworking</a>
          <a href="#coffee">Coffee</a>
          <Link href="/abonnements">Abonnements</Link>
        </nav>
        <Link className="joinHeader" href="/abonnements">DEVENIR MEMBRE</Link>
        <button className="menuButton" aria-expanded={menuOpen} aria-label="Ouvrir le menu" onClick={() => setMenuOpen(v => !v)}><span/><span/></button>
      </header>

      <section id="top" ref={heroRef} className="doorSequence">
        <div className="stickyStage">
          <div className="clubInterior" style={{ transform: `scale(${1 + enter * 0.13})`, filter: `brightness(${0.57 + enter * 0.43})` }}>
            <div className="interiorGlow" />
          </div>
          <div className="interiorCopy runeHeroCopy" style={{ opacity: Math.max(0, (enter - .18) * 1.8) }}>
            <span>WAYS · LEVALLOIS-PERRET</span>
            <h1>SPORT.<br/>WORK.<br/>COFFEE.</h1>
            <p>ONE CLUB. YOUR WAYS.</p>
          </div>
          <div className="door doorLeft" style={{ transform: `translateX(${-door * 103}%)` }}><div className="doorTexture"/></div>
          <div className="door doorRight" style={{ transform: `translateX(${door * 103}%)` }}><div className="doorTexture"/></div>
          <div className="doorBrand" style={{ opacity: 1 - Math.min(1, door * 1.8) }}><img src="/ways-logo.svg" alt="WAYS"/><small>TRAINING & SOCIAL CLUB · LEVALLOIS</small></div>
          <div className="scrollCue" style={{ opacity: 1 - door * 1.6 }}><span>ENTREZ</span><i/></div>
        </div>
      </section>

      <section id="club" className="runeIntro">
        <div className="runeIntroTop">
          <span className="runeIndex">WAYS / 001</span>
          <p className="runeIntroSide">TRAINING & SOCIAL CLUB<br/>LEVALLOIS-PERRET</p>
        </div>
        <div className="runeIntroGrid">
          <h2>LE SPORT.<br/><em>ET TOUT CE QU’IL Y A AUTOUR.</em></h2>
          <div className="runeIntroCopy">
            <p className="runeLead">WAYS est un club où l’on vient s’entraîner, mais pas seulement.</p>
            <p>Training, studios, récupération, coworking et coffee shop cohabitent dans un même lieu. Un espace pensé pour bouger, travailler, souffler et se retrouver sans multiplier les adresses.</p>
            <Link href="/abonnements" className="runeTextLink">DEVENIR MEMBRE <span>↗</span></Link>
          </div>
        </div>
      </section>

      <div className="waysTicker" aria-hidden="true">
        <div>TRAINING <span>·</span> PILATES <span>·</span> LAGREE <span>·</span> RPM <span>·</span> COWORKING <span>·</span> COFFEE <span>·</span> COMMUNITY <span>·</span> WAYS <span>·</span></div>
      </div>

      <section className="runePhotoStatement">
        <div className="statementImage statementImageA" />
        <div className="statementWords">
          <span>MOVE</span><span>STAY</span><span>CONNECT</span>
        </div>
        <div className="statementImage statementImageB" />
      </section>

      <section id="journey" className="runeSpaces">
        <div className="runeSpacesHead">
          <span className="runeIndex">WAYS / SPACES</span>
          <h2>UN CLUB.<br/>PLUSIEURS RYTHMES.</h2>
          <p>Chaque espace a sa fonction. Ensemble, ils transforment WAYS en lieu de vie autant qu’en lieu d’entraînement.</p>
        </div>

        <div className="spaceRows">
          {spaces.map((space, index) => (
            <article className={`spaceRow ${index % 2 ? "reverse" : ""}`} id={space.id} key={space.id}>
              <div className="spaceMeta">
                <span className="spaceNo">[ {space.no} ]</span>
                <h3>{space.title}</h3>
                <p className="spaceLine">{space.line}</p>
                <p className="spaceText">{space.text}</p>
                {space.id === "studios" && <Link href="/cours" className="runeTextLink">VOIR LES COURS <span>↗</span></Link>}
              </div>
              <div className="spaceImageWrap">
                <img src={space.image} alt={`${space.title} chez WAYS`} loading="lazy" />
                <span className="imageCaption">WAYS · {space.no}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="socialClubBlock">
        <div className="socialClubTitle">
          <span className="runeIndex">BEYOND TRAINING</span>
          <h2>TA JOURNÉE<br/>CONTINUE ICI.</h2>
        </div>
        <div className="socialCards">
          <article className="socialCard coworkCard">
            <div className="socialCardImage" />
            <div className="socialCardCopy"><span>[ WORK ]</span><h3>Travaille.<br/>Bouge.<br/>Recommence.</h3><p>Un espace coworking intégré au club pour enchaîner séance, douche et rendez-vous sans perdre le rythme.</p></div>
          </article>
          <article className="socialCard coffeeCard">
            <div className="socialCardImage" />
            <div className="socialCardCopy"><span>[ COFFEE ]</span><h3>L’effort.<br/>Puis le café.</h3><p>Boissons signature, café et vraie pause. Le coffee shop prolonge l’expérience WAYS au-delà du vestiaire.</p></div>
          </article>
        </div>
      </section>

      <section className="launchDrop runeLaunch">
        <div className="launchImage" />
        <div className="launchCopy">
          <span className="eyebrow">FIRST MEMBERS / LIMITED</span>
          <h2>LES PREMIERS<br/>ONT LEUR SIGNE.</h2>
          <p className="launchLead">Une <strong>serviette WAYS brodée</strong> offerte aux premiers adhérents.</p>
          <p>Une pièce pensée pour le club, sobre et utile. Le premier objet WAYS pour celles et ceux qui entrent dans l’histoire dès l’ouverture. Dans la limite des stocks disponibles.</p>
          <Link className="primaryDark" href="/abonnements">FAIRE PARTIE DES PREMIERS</Link>
        </div>
      </section>

      <section className="runeDay">
        <span className="runeIndex">A DAY AT WAYS</span>
        <div className="runeDayGrid">
          <div><span>07:30</span><strong>TRAIN</strong></div>
          <div><span>08:45</span><strong>COFFEE</strong></div>
          <div><span>09:00</span><strong>WORK</strong></div>
          <div><span>18:30</span><strong>PILATES</strong></div>
        </div>
        <p>Un seul lieu. Plusieurs moments de ta journée.</p>
      </section>

      <section id="membership" className="membership runeMembership">
        <div className="membershipIntro"><span className="eyebrow">MEMBERSHIPS</span><h2>CHOISIS TA FAÇON DE VIVRE WAYS.</h2><p>Training, studios ou expérience complète. Le bon abonnement est celui qui suit ton rythme.</p></div>
        <div className="plans">{memberships.map(plan => <article key={plan.name} className={plan.featured ? "plan featured" : "plan"}>{plan.featured && <span className="popular">LE PLUS CHOISI</span>}<div><span className="planName">{plan.name}</span><p>{plan.note}</p></div><strong className="price">{plan.price}<small>/mois</small></strong><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><Link href="/abonnements">DÉCOUVRIR <span>↗</span></Link></article>)}</div>
        <p className="priceNote">Tarifs et conditions à confirmer avant ouverture commerciale définitive.</p>
      </section>

      <section id="levallois" className="localSeo runeLocal">
        <div><span className="eyebrow">WAYS · LEVALLOIS-PERRET</span><h2>UN NOUVEAU<br/>POINT DE RALLIEMENT.</h2></div>
        <div className="localCopy"><p>WAYS est un training & social club à Levallois-Perret réunissant musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop.</p><div className="faq"><details><summary>Y a-t-il un espace coworking chez WAYS ?</summary><p>Oui. Un espace de travail est prévu pour permettre aux membres de travailler autour de leur séance.</p></details><details><summary>WAYS dispose-t-il d’un coffee shop ?</summary><p>Oui. Le coffee shop fait partie intégrante du concept et prolonge l’expérience du club.</p></details><details><summary>Quels cours sont proposés ?</summary><p>Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie du programme prévu.</p></details><details><summary>Que reçoivent les premiers adhérents ?</summary><p>Une serviette WAYS brodée est prévue comme cadeau de lancement pour les premiers adhérents, dans la limite des stocks disponibles.</p></details></div><Link className="runeTextLink lightLink" href="/levallois">DÉCOUVRIR WAYS LEVALLOIS <span>↗</span></Link></div>
      </section>

      <section id="visit" className="finalCta runeFinal"><span className="eyebrow">WAYS / LEVALLOIS</span><h2>VIENS POUR LE SPORT.<br/><em>RESTE POUR LE CLUB.</em></h2><div className="ctaRow"><Link className="primaryCta" href="/abonnements">DEVENIR MEMBRE</Link><a className="secondaryCta" href="mailto:contact@ways-sport.fr?subject=Visite%20WAYS">VISITER LE CLUB</a></div></section>

      <footer><div className="footerBrand"><img src="/ways-logo.svg" alt="WAYS"/></div><div><span>TRAINING & SOCIAL CLUB</span><span>LEVALLOIS-PERRET</span></div><div><Link href="/abonnements">ABONNEMENTS</Link><Link href="/cours">COURS</Link><Link href="/levallois">LEVALLOIS</Link></div><small>© 2026 WAYS · À TA FAÇON. À FOND.</small></footer>
    </main>
  );
}
