"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const spaces = [
  {
    id: "training",
    no: "01",
    title: "Training",
    meta: "Force · cardio · functional",
    text: "Un plateau pensé pour s’entraîner sérieusement, avec du bon matériel, de l’espace et une ambiance qui donne envie de revenir.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=88"
  },
  {
    id: "studios",
    no: "02",
    title: "Studios",
    meta: "Pilates · Lagree · RPM · Boxing",
    text: "Des cours choisis pour leur complémentarité. Moins de catalogue, plus de rythme, de progression et d’énergie collective.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=88"
  },
  {
    id: "recover",
    no: "03",
    title: "Recover",
    meta: "Pause · confort · reset",
    text: "Parce qu’une bonne séance ne se termine pas au dernier exercice. On ralentit, on récupère, puis on repart.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1800&q=88"
  }
];

const plans = [
  { name: "Move", price: "59€", text: "Le club et le training libre." },
  { name: "Studio", price: "79€", text: "Training + cours collectifs." },
  { name: "All Ways", price: "109€", text: "L’expérience WAYS complète." }
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
    url: "https://ways-sport-site.vercel.app",
    description: "Training club à Levallois-Perret avec musculation, cardio, Pilates, Lagree, RPM, espace coworking et coffee shop.",
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
  };

  return (
    <main className="waysV4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="siteHeader v4Header">
        <Link href="/" className="brandLogo" aria-label="WAYS accueil"><img src="/ways-logo.svg" alt="WAYS" /></Link>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigation principale">
          <a href="#club">Le club</a>
          <Link href="/cours">Les cours</Link>
          <a href="#stay">Coworking & coffee</a>
          <Link href="/abonnements">Abonnements</Link>
        </nav>
        <Link className="joinHeader" href="/abonnements">Devenir membre</Link>
        <button className="menuButton" aria-expanded={menuOpen} aria-label="Ouvrir le menu" onClick={() => setMenuOpen(v => !v)}><span/><span/></button>
      </header>

      <section id="top" ref={heroRef} className="doorSequence v4DoorSequence">
        <div className="stickyStage">
          <div className="clubInterior v4ClubInterior" style={{ transform: `scale(${1 + enter * 0.11})`, filter: `brightness(${0.58 + enter * 0.42})` }}>
            <div className="interiorGlow" />
          </div>

          <div className="v4HeroCopy" style={{ opacity: Math.max(0, (enter - .15) * 1.7) }}>
            <span>WAYS · Levallois-Perret</span>
            <h1>Un club pour bouger.<br/><em>Et rester un peu.</em></h1>
            <p>Training · Studios · Coffee · Work</p>
          </div>

          <div className="door doorLeft v4Door" style={{ transform: `translateX(${-door * 103}%)` }}><div className="doorTexture"/></div>
          <div className="door doorRight v4Door" style={{ transform: `translateX(${door * 103}%)` }}><div className="doorTexture"/></div>
          <div className="doorBrand v4DoorBrand" style={{ opacity: 1 - Math.min(1, door * 1.75) }}>
            <img src="/ways-logo.svg" alt="WAYS"/>
            <small>Training club · Levallois</small>
          </div>
          <div className="scrollCue v4ScrollCue" style={{ opacity: 1 - door * 1.6 }}><span>Entrer</span><i/></div>
        </div>
      </section>

      <section id="club" className="v4Intro">
        <div className="v4Kicker"><span>Le club</span><span>Levallois-Perret</span></div>
        <div className="v4IntroGrid">
          <h2>Une adresse.<br/><em>Plusieurs moments.</em></h2>
          <div className="v4IntroText">
            <p className="v4Lead">WAYS est pensé autour de ta journée, pas uniquement autour de ta séance.</p>
            <p>Tu peux venir t’entraîner, prendre un cours, travailler un moment, boire un café ou simplement rester un peu plus longtemps. Le sport reste au centre. Tout le reste rend l’expérience plus simple et plus agréable.</p>
            <Link href="/abonnements" className="v4Link">Découvrir les abonnements <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="v4EditorialGallery" aria-label="Univers WAYS">
        <figure className="v4Shot v4ShotTall">
          <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1400&q=88" alt="Entraînement dans un club de sport" loading="lazy" />
          <figcaption>Move</figcaption>
        </figure>
        <div className="v4GalleryWords">
          <p>Sport sérieux.<br/>Ambiance légère.</p>
          <span>WAYS / 2026</span>
        </div>
        <figure className="v4Shot v4ShotWide">
          <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=88" alt="Cours collectif premium" loading="lazy" />
          <figcaption>Flow</figcaption>
        </figure>
      </section>

      <section className="v4Spaces" id="spaces">
        <div className="v4SectionHead">
          <span>Les espaces</span>
          <h2>Trois façons<br/>de bouger.</h2>
          <p>Training libre, studios et récupération. Des espaces différents, pensés comme un seul parcours.</p>
        </div>
        <div className="v4SpaceList">
          {spaces.map((space, index) => (
            <article className={`v4Space ${index % 2 ? "v4SpaceReverse" : ""}`} key={space.id} id={space.id}>
              <div className="v4SpaceCopy">
                <span className="v4SpaceNo">{space.no}</span>
                <div>
                  <h3>{space.title}</h3>
                  <p className="v4SpaceMeta">{space.meta}</p>
                  <p>{space.text}</p>
                  {space.id === "studios" && <Link href="/cours" className="v4Link">Voir les cours <span>↗</span></Link>}
                </div>
              </div>
              <div className="v4SpaceImage"><img src={space.image} alt={`${space.title} chez WAYS`} loading="lazy" /></div>
            </article>
          ))}
        </div>
      </section>

      <section id="stay" className="v4Stay">
        <div className="v4StayHead">
          <span>Après la séance</span>
          <h2>Tu peux partir.<br/><em>Ou rester.</em></h2>
        </div>
        <div className="v4StayGrid">
          <article className="v4LifestyleCard">
            <div className="v4LifestyleImage"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=88" alt="Espace coworking chaleureux" loading="lazy" /></div>
            <div className="v4LifestyleCopy"><span>01 — Coworking</span><h3>Le bureau, sans changer d’adresse.</h3><p>Un espace calme pour avancer, répondre à un mail ou préparer un rendez-vous avant ou après ta séance.</p></div>
          </article>
          <article className="v4LifestyleCard">
            <div className="v4LifestyleImage"><img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=88" alt="Coffee shop chaleureux" loading="lazy" /></div>
            <div className="v4LifestyleCopy"><span>02 — Coffee shop</span><h3>Un café. Une pause. Pas un détour.</h3><p>Café et boissons signature dans un espace pensé pour souffler, discuter et prolonger le moment.</p></div>
          </article>
        </div>
      </section>

      <section className="v4Founders">
        <div className="v4FoundersVisual" aria-hidden="true"><span>W</span></div>
        <div className="v4FoundersCopy">
          <span>Founding members</span>
          <h2>Pour les premiers,<br/><em>un détail en plus.</em></h2>
          <p><strong>Une serviette WAYS brodée sera offerte aux premiers adhérents</strong>, dans la limite des stocks disponibles.</p>
          <p>Un objet simple, utile et pensé pour faire partie du club dès le premier jour.</p>
          <Link href="/abonnements" className="v4ButtonDark">Faire partie des premiers</Link>
        </div>
      </section>

      <section className="v4Day">
        <div className="v4Kicker"><span>Une journée chez WAYS</span><span>À ton rythme</span></div>
        <div className="v4DayGrid">
          <div><span>07:30</span><strong>Training</strong></div>
          <div><span>08:45</span><strong>Coffee</strong></div>
          <div><span>09:00</span><strong>Work</strong></div>
          <div><span>18:30</span><strong>Pilates</strong></div>
        </div>
      </section>

      <section className="v4Membership" id="membership">
        <div className="v4SectionHead v4MembershipHead">
          <span>Abonnements</span>
          <h2>Choisis ce qui<br/><em>te ressemble.</em></h2>
          <p>Des formules simples selon la façon dont tu veux vivre le club.</p>
        </div>
        <div className="v4PlanList">
          {plans.map((plan, index) => (
            <Link href="/abonnements" className="v4PlanRow" key={plan.name}>
              <span className="v4PlanIndex">0{index + 1}</span>
              <div><strong>{plan.name}</strong><p>{plan.text}</p></div>
              <span className="v4PlanPrice">{plan.price}<small>/mois</small></span>
              <span className="v4PlanArrow">↗</span>
            </Link>
          ))}
        </div>
        <p className="v4Legal">Tarifs indicatifs à confirmer avant ouverture commerciale définitive.</p>
      </section>

      <section className="v4Local" id="levallois">
        <div>
          <span>WAYS · Levallois-Perret</span>
          <h2>Le sport.<br/><em>Et la vie autour.</em></h2>
        </div>
        <div className="v4LocalCopy">
          <p>WAYS est un training club à Levallois-Perret réunissant musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop.</p>
          <div className="v4Faq">
            <details><summary>Y a-t-il un espace coworking ?</summary><p>Oui. Un espace de travail est prévu pour les membres autour de leur séance.</p></details>
            <details><summary>Y a-t-il un coffee shop ?</summary><p>Oui. Le coffee shop fait partie intégrante du concept WAYS.</p></details>
            <details><summary>Quels cours seront proposés ?</summary><p>Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt font partie du programme prévu.</p></details>
          </div>
          <Link href="/levallois" className="v4Link v4LinkLight">Découvrir WAYS Levallois <span>↗</span></Link>
        </div>
      </section>

      <section className="v4Final">
        <span>WAYS / Levallois</span>
        <h2>Viens pour bouger.<br/><em>Reste pour le reste.</em></h2>
        <div><Link href="/abonnements" className="v4ButtonDark">Devenir membre</Link><a href="mailto:contact@ways-sport.fr?subject=Visite%20WAYS" className="v4ButtonGhost">Visiter le club</a></div>
      </section>

      <footer className="v4Footer">
        <div><img src="/ways-logo.svg" alt="WAYS" /></div>
        <div><span>Training club</span><span>Levallois-Perret</span></div>
        <div><Link href="/cours">Cours</Link><Link href="/abonnements">Abonnements</Link><Link href="/levallois">Levallois</Link></div>
        <small>© 2026 WAYS</small>
      </footer>
    </main>
  );
}
