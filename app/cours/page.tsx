import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Cours à Levallois : Pilates, Lagree, RPM & Boxing",
  description: "Découvre les studios WAYS à Levallois-Perret : Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt.",
  alternates: { canonical: "/cours" },
};

const courses = [
  { slug: "pilates", name: "Pilates", tag: "Control", text: "Renforcement profond, posture, respiration et qualité du mouvement." },
  { slug: "lagree", name: "Lagree", tag: "Slow burn", text: "Tension musculaire continue, contrôle et intensité progressive." },
  { slug: "rpm", name: "RPM", tag: "Ride", text: "Un travail cardio rythmé, construit autour de l’endurance et du tempo." },
  { slug: "cardio-boxing", name: "Cardio Boxing", tag: "Impact", text: "Cardio, coordination et enchaînements inspirés de la boxe." },
  { slug: "cardio-abdos-fessiers", name: "Cardio A.F.", tag: "Cardio + core", text: "Séquences cardio et renforcement du centre, des jambes et des fessiers." },
  { slug: "body-sculpt", name: "Body Sculpt", tag: "Build", text: "Un renforcement global avec des mouvements accessibles et progressifs." },
];

export default function CoursesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cours collectifs WAYS Levallois",
    url: "https://ways-sport-site.vercel.app/cours",
    about: courses.map((course) => ({ "@type": "ExercisePlan", name: course.name, url: `https://ways-sport-site.vercel.app/cours/${course.slug}` })),
  };

  return (
    <main className="i7-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />

      <section className="i7-hero">
        <div className="i7-shell i7-hero-grid">
          <span className="i7-kicker">WAYS / STUDIOS</span>
          <div><h1>Studios.</h1></div>
          <div className="i7-hero-side">Des disciplines complémentaires, réunies dans des studios dédiés. Six formats pour travailler force, contrôle, cardio, coordination et mobilité.</div>
        </div>
        <figure className="i7-shell i7-hero-media">
          <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2400&q=92" alt="Visuel d’ambiance représentatif d’un studio d’entraînement" fetchPriority="high" />
        </figure>
      </section>

      <section className="i7-section">
        <div className="i7-shell">
          <div className="i7-section-head">
            <span className="i7-kicker">THE PROGRAM</span>
            <h2>Six formats.<br />Une même exigence.</h2>
            <p>Choisis un cours selon ton objectif, ton énergie et la façon dont tu veux bouger ce jour-là.</p>
          </div>
          <div className="i7-course-list">
            {courses.map((course, index) => (
              <Link href={`/cours/${course.slug}`} className="i7-course-row" key={course.slug}>
                <span className="i7-course-no">0{index + 1}</span>
                <strong className="i7-course-name">{course.name}</strong>
                <span className="i7-course-tag">{course.tag}</span>
                <p>{course.text}</p>
                <span className="i7-course-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="i7-image-band">
        <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2400&q=90" alt="Visuel d’ambiance représentatif d’un entraînement en studio" loading="lazy" />
      </section>

      <section className="i7-final">
        <div className="i7-shell i7-final-grid">
          <div><span className="i7-kicker">WAYS / MEMBERSHIPS</span><h2>Join the club.</h2></div>
          <Link href="/abonnements">Voir les abonnements →</Link>
        </div>
      </section>
    </main>
  );
}
