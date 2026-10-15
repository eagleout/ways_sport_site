import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const data = {
  pilates: { name: "Pilates", subtitle: "Control, posture, strength.", intro: "Le Pilates chez WAYS à Levallois-Perret travaille le centre du corps, la posture, la respiration et la qualité du mouvement.", intensity: "Modérée", focus: "Gainage · posture · mobilité", forWho: "Débutants à réguliers", faq: "Oui. Le Pilates WAYS est pensé pour permettre une progression selon le niveau et l’expérience de chacun.", visual: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2400&q=92" },
  lagree: { name: "Lagree", subtitle: "Slow movement. Deep intensity.", intro: "Le Lagree chez WAYS à Levallois-Perret associe tension musculaire continue, contrôle et endurance dans un format à forte intensité.", intensity: "Élevée", focus: "Force-endurance · contrôle", forWho: "Progression encadrée", faq: "Le Pilates privilégie notamment contrôle et posture ; Lagree ajoute une tension musculaire continue et une intensité plus forte.", visual: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2400&q=92" },
  rpm: { name: "RPM", subtitle: "Ride, rhythm, endurance.", intro: "Le RPM chez WAYS à Levallois-Perret est un cours de vélo indoor rythmé, construit autour d’efforts progressifs et de séquences cardio.", intensity: "Modérée à élevée", focus: "Cardio · endurance", forWho: "Tous niveaux adaptés", faq: "Non. Les résistances et l’intensité peuvent être ajustées pour suivre le cours à son niveau.", visual: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=92" },
  "cardio-boxing": { name: "Cardio Boxing", subtitle: "Cardio, coordination, impact.", intro: "Le Cardio Boxing chez WAYS combine déplacements, enchaînements inspirés de la boxe et travail cardiovasculaire.", intensity: "Élevée", focus: "Cardio · coordination", forWho: "Débutants et réguliers", faq: "Le cours est pensé comme un format fitness : l’objectif est le travail cardiovasculaire et la coordination, pas le combat.", visual: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=2400&q=92" },
  "cardio-abdos-fessiers": { name: "Cardio Abdos-Fessiers", subtitle: "Cardio, core, lower body.", intro: "Un cours WAYS mêlant séquences cardio et renforcement ciblé du centre du corps, des jambes et des fessiers.", intensity: "Modérée à élevée", focus: "Cardio · core · bas du corps", forWho: "Tous niveaux adaptés", faq: "Oui. Les mouvements peuvent être adaptés en amplitude, rythme ou charge selon le niveau.", visual: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2400&q=92" },
  "body-sculpt": { name: "Body Sculpt", subtitle: "Full-body strength, simply.", intro: "Le Body Sculpt WAYS propose un travail de renforcement global avec des mouvements accessibles et une progression par répétitions et charge.", intensity: "Modérée", focus: "Renforcement global", forWho: "Débutants à réguliers", faq: "Le format peut utiliser le poids du corps et du petit matériel selon la séance.", visual: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=2200&q=92" },
} as const;

type Slug = keyof typeof data;
export function generateStaticParams(){return Object.keys(data).map((slug)=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const course=data[slug as Slug];if(!course)return{};return{title:`${course.name} à Levallois-Perret`,description:`Cours de ${course.name} chez WAYS à Levallois-Perret. ${course.intro}`,alternates:{canonical:`/cours/${slug}`}};}

export default async function CoursePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const course=data[slug as Slug];if(!course)notFound();
  const schema={"@context":"https://schema.org","@graph":[{"@type":"ExercisePlan",name:`${course.name} WAYS Levallois`,description:course.intro,url:`https://ways-sport-site.vercel.app/cours/${slug}`},{"@type":"FAQPage",mainEntity:[{"@type":"Question",name:`Le ${course.name} chez WAYS est-il accessible ?`,acceptedAnswer:{"@type":"Answer",text:course.faq}}]}]};
  return <main className="i7-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <SiteHeader/>
    <section className="i7-hero i7-course-hero">
      <div className="i7-shell i7-hero-grid">
        <span className="i7-kicker">WAYS / STUDIOS / LEVALLOIS</span>
        <div className="i7-course-title"><h1>{course.name}.</h1><em>{course.subtitle}</em></div>
        <div className="i7-hero-side">{course.intro}</div>
      </div>
      <figure className="i7-shell i7-hero-media"><img src={course.visual} alt={`Visuel d’ambiance représentatif du cours ${course.name}`} fetchPriority="high"/></figure>
    </section>
    <section className="i7-section">
      <div className="i7-shell i7-course-detail">
        <div className="i7-course-detail-copy">
          <span className="i7-kicker">THE CLASS</span><h2>{course.name} chez WAYS.</h2>
          <p>{course.intro}</p><p>Le cours s’inscrit dans l’approche WAYS : une pratique claire, exigeante sans être intimidante, et complémentaire du training libre.</p><p>Après la séance, le coworking et le coffee shop permettent de prolonger son passage au club sans rompre le rythme de la journée.</p>
          <div className="i7-course-actions"><Link className="i7-dark-button" href="/abonnements">Devenir membre →</Link><Link className="i7-text-button" href="/cours">Tous les cours →</Link></div>
        </div>
        <div className="i7-facts"><div className="i7-fact"><span>INTENSITÉ</span><strong>{course.intensity}</strong></div><div className="i7-fact"><span>FOCUS</span><strong>{course.focus}</strong></div><div className="i7-fact"><span>POUR QUI</span><strong>{course.forWho}</strong></div><div className="i7-fact"><span>CLUB</span><strong>Levallois-Perret</strong></div></div>
      </div>
    </section>
    <section className="i7-section"><div className="i7-shell"><div className="i7-section-head"><span className="i7-kicker">FAQ</span><h2>À savoir avant le cours.</h2><p>Une information simple pour préparer la première séance.</p></div><div className="i7-faq"><details open><summary>Le {course.name} chez WAYS est-il accessible ?</summary><p>{course.faq}</p></details></div></div></section>
    <section className="i7-final"><div className="i7-shell i7-final-grid"><div><span className="i7-kicker">WAYS / STUDIOS</span><h2>Join the club.</h2></div><Link href="/abonnements">Voir les abonnements →</Link></div></section>
  </main>;
}
