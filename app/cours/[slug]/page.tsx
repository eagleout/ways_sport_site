import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import PageHero from "@/components/PageHero";
import { ArrowIcon, Meter } from "@/components/Icons";
import { SITE_URL, courseBySlug, courses } from "@/lib/content";
import { media } from "@/lib/media";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.name} à Levallois-Perret`,
    description: `Cours de ${course.name} chez WAYS à Levallois-Perret. ${course.intro}`,
    alternates: { canonical: `/cours/${course.slug}` },
    openGraph: { title: `${course.name} — WAYS Levallois`, description: course.intro },
  };
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) notFound();

  const index = courses.findIndex((item) => item.slug === course.slug);
  const others = [1, 2, 3].map((offset) => courses[(index + offset) % courses.length]);

  const faqItems = [
    { q: course.faqQuestion, a: course.faq },
    {
      q: `Le ${course.name} est-il inclus dans mon abonnement ?`,
      a: "Les cours collectifs sont inclus à partir de la formule Studio, et dans la formule All Ways. La formule Move donne accès au training.",
    },
    {
      q: "Que faire après la séance ?",
      a: "Rester. Le coffee shop et l’espace coworking font partie du club : un café, un mail, une réunion, sans changer d’adresse.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ExercisePlan",
        name: `${course.name} WAYS Levallois`,
        description: course.intro,
        url: `${SITE_URL}/cours/${course.slug}`,
        intensity: course.intensity,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <main id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[
          { href: "/", label: "WAYS" },
          { href: "/cours", label: "Studios" },
          { label: course.name },
        ]}
        title={course.headline}
        intro={course.intro}
        image={course.image}
      >
        <Link href="/abonnements?formule=Studio#pre-inscription" className="btn btn--light" data-magnetic>
          Réserver ma place
          <ArrowIcon className="btn__arrow" />
        </Link>
      </PageHero>

      <section className="section section--chalk" aria-labelledby="cours-fiche">
        <div className="container">
          <div className="facts" data-reveal>
            <div className="fact">
              <span className="kicker">Intensité</span>
              <strong>{course.intensity}</strong>
              <Meter level={course.level} />
            </div>
            <div className="fact">
              <span className="kicker">Focus</span>
              <strong>{course.focus}</strong>
            </div>
            <div className="fact">
              <span className="kicker">Pour qui ?</span>
              <strong>{course.forWho}</strong>
            </div>
            <div className="fact">
              <span className="kicker">Où ?</span>
              <strong>Levallois-Perret</strong>
            </div>
          </div>

          <div className="prose-grid" style={{ marginTop: "clamp(80px, 9vw, 140px)" }}>
            <div>
              <span className="kicker" data-reveal>
                {course.tag}
              </span>
              <h2 id="cours-fiche" className="display" data-split>
                {course.name} chez WAYS
              </h2>
            </div>
            <div className="prose" data-reveal>
              <p className="lead">{course.short}</p>
              <p>
                {course.intro} Le cours s’inscrit dans l’approche WAYS : une pratique claire, exigeante sans être
                intimidante, et complémentaire du training libre.
              </p>
              <p>
                Après la séance, prolonge ton passage au club grâce à l’espace coworking et au coffee shop prévus dans le
                concept WAYS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="cours-faq">
        <div className="container split-media">
          <div className="split-media__img frame frame--grade" data-parallax="6" data-reveal="fade">
            <div className="parallax-inner">
              <Image src={media.community.src} alt={media.community.alt} fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          </div>
          <div>
            <span className="kicker copper" data-reveal>
              Avant ton premier cours
            </span>
            <h2 id="cours-faq" className="display" data-split style={{ marginTop: 20, fontSize: "clamp(46px, 5vw, 90px)" }}>
              À savoir.
            </h2>
            <Faq items={faqItems} />
          </div>
        </div>
      </section>

      <section className="section section--chalk" aria-labelledby="autres-cours">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker" data-reveal>
                Alterner, c’est progresser
              </span>
              <h2 id="autres-cours" className="display" data-split>
                Les autres <span className="accent">formats.</span>
              </h2>
            </div>
            <Link href="/cours" className="link-line" data-reveal>
              Tous les cours
              <ArrowIcon className="btn__arrow" />
            </Link>
          </div>
          <div className="course-grid">
            {others.map((other) => (
              <CourseCard key={other.slug} course={other} index={courses.indexOf(other)} headingLevel={3} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ta première séance commence ici."
        text="Pré-inscris-toi pour recevoir les informations d’ouverture et réserver ta place parmi les premiers membres."
        href="/abonnements#pre-inscription"
        label="Me pré-inscrire"
      />
    </main>
  );
}
