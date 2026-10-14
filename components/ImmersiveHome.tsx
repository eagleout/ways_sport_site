"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const spaces = [
  {
    id: "training",
    index: "01",
    kicker: "TRAINING FLOOR",
    title: "ICI, ON VIENT POUR S’ENTRAÎNER.",
    copy: "Musculation, cardio et functional training dans un environnement dense, chaleureux et lisible. Du matériel sérieux. Une ambiance qui donne envie de revenir.",
    chips: ["STRENGTH", "CARDIO", "FUNCTIONAL"]
  },
  {
    id: "studios",
    index: "02",
    kicker: "STUDIOS",
    title: "UN COURS. UNE VRAIE INTENTION.",
    copy: "Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt. Chaque format a son rythme, son intensité et sa raison d’être.",
    chips: ["PILATES", "LAGREE", "RPM", "BOXING"]
  },
  {
    id: "recover",
    index: "03",
    kicker: "RECOVER",
    title: "LE DERNIER SET N’EST PAS LA FIN.",
    copy: "Des vestiaires et espaces de récupération pensés comme la continuité de la séance : propres, soignés et suffisamment confortables pour repartir prêt.",
    chips: ["RESET", "RECOVER", "READY"]
  }
];

const plans = [
  { name: "MOVE", price: "59€", desc: "Le training WAYS au quotidien.", features: ["Accès training", "Cardio & musculation", "Application membre"] },
  { name: "STUDIO", price: "79€", desc: "Training + cours collectifs.", features: ["Tout MOVE", "Cours collectifs", "Réservation prioritaire"], featured: true },
  { name: "ALL WAYS", price: "109€", desc: "L’expérience WAYS la plus complète.", features: ["Tout STUDIO", "Avantages club", "Expériences premium"] }
];

export default function ImmersiveHome() {
  const sequence = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!sequence.current) return;
      const r = sequence.current.getBoundingClientRect();
      const travel = Math.max(1, sequence.current.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -r.top / travel)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const open = Math.min(1, Math.max(0, (progress - 0.05) / 0.48));
  const enter = Math.min(1, Math.max(0, (progress - 0.34) / 0.52));
  const reveal = Math.min(1, Math.max(0, (progress - 0.58) / 0.25));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HealthClub",
        "@id": "https://ways-sport.fr/#club",
        name: "WAYS Levallois",
        url: "https://ways-sport.fr/",
        description: "Training club à Levallois-Perret avec musculation, cardio, cours collectifs, espace coworking et coffee shop.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Levallois-Perret",
          addressRegion: "Île-de-France",
          addressCountry: "FR"
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Espace coworking", value: true },
          { "@type": "LocationFeatureSpecification", name: "Coffee shop", value: true },
          { "@type": "LocationFeatureSpecification", name: "Cours collectifs", value: true }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://ways-sport.fr/#website",
        url: "https://ways-sport.fr/",
        name: "WAYS Levallois"
      }
    ]
  };

  return (
    <main className="v2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="v2Header">
        <Link href="/" className="logoLink" aria-label="WAYS Levallois - accueil">
          <img src="/ways-logo.svg" alt="WAYS" />
        </Link>
        <nav className={menuOpen ? "v2Nav isOpen" : "v2Nav"} aria-label="Navigation principale">
          <a href="#experience">Le club</a>
          <Link href="/cours">Cours</Link>
          <a href="#cowork">Coworking</a>
          <a href="#coffee">Coffee shop</a>
          <Link href="/abonnements">Abonnements</Link>
          <Link href="/levallois">Levallois</Link>
        </nav>
        <Link className="v2Join" href="/abonnements">REJOINDRE WAYS</Link>
        <button className="v2Menu" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><i/><i/></button>
      </header>

      <section ref={sequence} className="cinemaSequence" aria-label="Entrée immersive dans WAYS">
        <div className="cinemaSticky">
          <div className="cinemaRoom" style={{ transform: `scale(${1 + enter * .18}) translateY(${enter * -1.8}%)` }}>
            <div className="ceilingLines"><i/><i/><i/><i/></div>
            <div className="backWall">
              <img src="/ways-logo.svg" alt="" className="wallLogo" />
            </div>
            <div className="floorPerspective"><span/><span/><span/><span/><span/></div>
            <div className="rack rackA"><b/><b/><b/><b/></div>
            <div className="rack rackB"><b/><b/><b/></div>
            <div className="cinemaCopy" style={{ opacity: reveal }}>
              <span>WAYS · TRAINING CLUB · LEVALLOIS-PERRET</span>
              <h1>ENTRE.<br/>LE RESTE SUIT.</h1>
              <p>À TA FAÇON. À FOND.</p>
            </div>
          </div>

          <div className="doorPanel doorPanelLeft" style={{ transform: `translateX(${-open * 101}%) rotateY(${open * -4}deg)` }}><div className="doorGrain"/></div>
          <div className="doorPanel doorPanelRight" style={{ transform: `translateX(${open * 101}%) rotateY(${open * 4}deg)` }}><div className="doorGrain"/></div>
          <div className="doorSeal" style={{ opacity: 1 - open * 1.65 }}>
            <img src="/ways-logo.svg" alt="WAYS" />
            <span>TRAINING CLUB · LEVALLOIS</span>
          </div>
          <div className="enterCue" style={{ opacity: 1 - open * 1.45 }}><span>SCROLL POUR ENTRER</span><i/></div>
        </div>
      </section>

      <section id="experience" className="v2Manifesto">
        <span className="miniLabel">WAYS / L’EXPÉRIENCE</span>
        <div className="manifestoV2Grid">
          <h2>TA SALLE.<br/>MAIS EN MIEUX.</h2>
          <div>
            <p className="bigP">WAYS réunit ce qui manque souvent ailleurs : un vrai training club, des studios, du temps pour souffler, un endroit pour travailler et un bon café.</p>
            <p>Tu peux venir pour 45 minutes. Ou faire de WAYS un point de repère dans ta journée.</p>
          </div>
        </div>
      </section>

      <section className="spaceJourney">
        {spaces.map((space, i) => (
          <article key={space.id} id={space.id} className={`immersiveSpace immersiveSpace${i + 1}`}>
            <div className="spaceArchitecture" aria-hidden="true"><div className="lightRail"/><div className="equipment"><i/><i/><i/><i/><i/></div></div>
            <div className="spaceContent">
              <span>{space.index} / {space.kicker}</span>
              <h2>{space.title}</h2>
              <p>{space.copy}</p>
              <div className="spaceChips">{space.chips.map(c => <b key={c}>{c}</b>)}</div>
              {space.id === "studios" && <Link className="inlineArrow" href="/cours">VOIR TOUS LES COURS <em>↗</em></Link>}
            </div>
            <strong className="spaceIndex">{space.index}</strong>
          </article>
        ))}
      </section>

      <section className="foundersDrop">
        <div className="towelVisual" aria-hidden="true">
          <div className="towelFold towelBack"/><div className="towelFold towelMid"/>
          <div className="towelFold towelFront"><span>W</span></div>
          <div className="stitch stitch1"/><div className="stitch stitch2"/>
        </div>
        <div className="dropCopy">
          <span className="miniLabel">FIRST MEMBERS DROP</span>
          <h2>LES PREMIERS<br/>REPARTENT AVEC WAYS.</h2>
          <p className="dropLead">Une <strong>serviette WAYS brodée</strong> sera offerte aux premiers adhérents du club.</p>
          <p>Un objet simple, utile, durable — pensé comme le premier signe d’appartenance au club. Offre de lancement dans la limite des stocks disponibles.</p>
          <Link className="darkButton" href="/abonnements">DEVENIR L’UN DES PREMIERS</Link>
        </div>
      </section>

      <section className="lifeSplit">
        <article id="cowork" className="lifePanel coworkPanel">
          <div className="lifeScene coworkScene" aria-hidden="true"><div className="desk"><i className="laptop"/><i className="deskLamp"/><i className="chair"/></div></div>
          <div className="lifeText">
            <span>04 / COWORKING</span>
            <h2>TRAIN.<br/>PUIS AVANCE.</h2>
            <p>Un espace coworking intégré au club pour répondre à un mail, préparer un rendez-vous ou travailler entre deux moments de la journée.</p>
          </div>
        </article>
        <article id="coffee" className="lifePanel coffeePanel">
          <div className="lifeScene coffeeScene" aria-hidden="true"><div className="counter"><i className="cup"/><i className="steam"/><b>WAYS COFFEE</b></div></div>
          <div className="lifeText">
            <span>05 / COFFEE SHOP</span>
            <h2>LE BON<br/>APRÈS.</h2>
            <p>Café, boissons signature et options pensées autour de la séance. Le coffee shop transforme l’accueil en vrai lieu de vie.</p>
          </div>
        </article>
      </section>

      <section className="dayFlow">
        <span className="miniLabel">ONE PLACE. MANY WAYS.</span>
        <div className="dayGrid"><div><strong>07:30</strong><span>TRAIN</span></div><div><strong>08:40</strong><span>SHOWER</span></div><div><strong>09:00</strong><span>COFFEE + WORK</span></div><div><strong>18:30</strong><span>PILATES</span></div></div>
        <h2>TON CLUB ENTRE DANS TA JOURNÉE.<br/>PAS L’INVERSE.</h2>
      </section>

      <section className="membershipV2" id="memberships">
        <div className="membershipV2Head"><span className="miniLabel">MEMBERSHIPS</span><h2>CHOISIS<br/>TON WAYS.</h2><p>Des offres simples à comprendre. Et une expérience de club qui ne s’arrête pas aux machines.</p></div>
        <div className="v2Plans">
          {plans.map(plan => (
            <article className={plan.featured ? "v2Plan featured" : "v2Plan"} key={plan.name}>
              {plan.featured && <span className="planBadge">LE PLUS CHOISI</span>}
              <h3>{plan.name}</h3><p>{plan.desc}</p><strong>{plan.price}<small>/mois</small></strong>
              <ul>{plan.features.map(f => <li key={f}>{f}</li>)}</ul>
              <Link href="/abonnements">VOIR L’OFFRE <em>↗</em></Link>
            </article>
          ))}
        </div>
        <p className="pricingLegal">Tarifs et conditions à confirmer avant ouverture commerciale définitive.</p>
      </section>

      <section className="seoLocal">
        <div><span className="miniLabel">WAYS · LEVALLOIS-PERRET</span><h2>SPORT.<br/>STUDIOS.<br/>COFFEE.<br/>COWORK.</h2></div>
        <div className="seoCopy">
          <p>WAYS est un training club à Levallois-Perret réunissant un espace musculation et cardio, des cours collectifs — Pilates, Lagree, RPM, Cardio Boxing et Body Sculpt — ainsi qu’un espace coworking et un coffee shop.</p>
          <div className="faqV2">
            <details><summary>Que trouve-t-on chez WAYS Levallois ?</summary><p>Le concept WAYS réunit training, cours collectifs, coworking et coffee shop au sein d’un même club à Levallois-Perret.</p></details>
            <details><summary>Quels cours sont prévus chez WAYS ?</summary><p>Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie des formats prévus.</p></details>
            <details><summary>Y a-t-il un espace coworking ?</summary><p>Oui. WAYS prévoit un espace de travail intégré au club pour permettre aux membres de travailler ou de gérer un rendez-vous autour de leur séance.</p></details>
            <details><summary>WAYS a-t-il un coffee shop ?</summary><p>Oui. Un espace coffee shop fait partie du concept WAYS, avec café et boissons destinées à prolonger l’expérience du club.</p></details>
            <details><summary>Que reçoivent les premiers adhérents ?</summary><p>Une serviette WAYS brodée est prévue comme cadeau de lancement pour les premiers adhérents, dans la limite des stocks disponibles.</p></details>
          </div>
          <Link className="inlineArrow" href="/levallois">DÉCOUVRIR WAYS LEVALLOIS <em>↗</em></Link>
        </div>
      </section>

      <section className="v2Final">
        <img src="/ways-logo.svg" alt="WAYS" />
        <span>YOU KNOW THE PLACE.</span>
        <h2>À TOI<br/>D’ENTRER.</h2>
        <div><Link className="finalDark" href="/abonnements">REJOINDRE WAYS</Link><a className="finalOutline" href="mailto:contact@ways-sport.fr?subject=Visite%20WAYS">VISITER LE CLUB</a></div>
      </section>

      <footer className="v2Footer">
        <img src="/ways-logo.svg" alt="WAYS" />
        <div><strong>TRAINING CLUB</strong><span>LEVALLOIS-PERRET</span><span>À TA FAÇON. À FOND.</span></div>
        <div><Link href="/cours">COURS</Link><Link href="/abonnements">ABONNEMENTS</Link><Link href="/levallois">WAYS LEVALLOIS</Link></div>
        <small>© 2026 WAYS</small>
      </footer>
    </main>
  );
}
