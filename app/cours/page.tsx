import type { Metadata } from "next";
import CourseCard from "@/components/CourseCard";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { SITE_URL, courses } from "@/lib/content";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Cours collectifs à Levallois : Pilates, Lagree, RPM & Boxing",
  description:
    "Découvre les cours WAYS à Levallois-Perret : Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt, dans un training club premium.",
  alternates: { canonical: "/cours" },
};

export default function CoursesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cours collectifs WAYS Levallois",
    url: `${SITE_URL}/cours`,
    about: courses.map((course) => ({
      "@type": "ExercisePlan",
      name: course.name,
      url: `${SITE_URL}/cours/${course.slug}`,
    })),
  };

  return (
    <main id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ href: "/", label: "WAYS" }, { label: "Studios" }]}
        title={
          <>
            Le rythme change. <span className="accent copper">L’exigence reste.</span>
          </>
        }
        intro="Pas cinquante concepts. Les bons. WAYS réunit des formats complémentaires pour travailler le contrôle, la force, le cardio, la coordination et la mobilité, avec une vraie ambiance de studio."
        image={media.rpm}
      />

      <section className="section section--chalk" aria-labelledby="cours-liste">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker" data-reveal>
                Six formats
              </span>
              <h2 id="cours-liste" className="display" data-split>
                Choisis ton <span className="accent">intensité.</span>
              </h2>
            </div>
            <p data-reveal>
              Chaque cours indique son intensité, son focus et le public visé. Commence par celui qui te ressemble, puis
              alterne.
            </p>
          </div>
          <div className="course-grid">
            {courses.map((course, index) => (
              <CourseCard key={course.slug} course={course} index={index} headingLevel={3} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Le cours finit.
            <br />
            WAYS continue.
          </>
        }
        text="Training libre, studios, coworking et coffee shop : ta séance est un moment de la journée, pas une adresse de plus."
        href="/abonnements"
        label="Découvrir les abonnements"
      />
    </main>
  );
}
