import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title:"Cours collectifs à Levallois : Pilates, Lagree, RPM & Boxing",
  description:"Découvre les cours WAYS à Levallois-Perret : Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt.",
  alternates:{canonical:"/cours"}
};

const courses=[
  {slug:"pilates",name:"PILATES",tag:"CONTROL",text:"Renforcement profond, posture, respiration et maîtrise du mouvement."},
  {slug:"lagree",name:"LAGREE",tag:"SLOW BURN",text:"Une méthode à haute intensité musculaire, contrôlée et précise."},
  {slug:"rpm",name:"RPM",tag:"RIDE",text:"Un travail cardio rythmé sur vélo indoor, progressif et engageant."},
  {slug:"cardio-boxing",name:"CARDIO BOXING",tag:"IMPACT",text:"Cardio, coordination et puissance dans un format sans monotonie."},
  {slug:"cardio-abdos-fessiers",name:"CARDIO A.F.",tag:"BURN",text:"Un format dynamique mêlant cardio et renforcement ciblé."},
  {slug:"body-sculpt",name:"BODY SCULPT",tag:"BUILD",text:"Renforcement global, charges légères à modérées et répétitions maîtrisées."}
];

export default function CoursesPage(){
 const schema={"@context":"https://schema.org","@type":"CollectionPage",name:"Cours collectifs WAYS Levallois",url:"https://ways-sport-site.vercel.app/cours",about:courses.map(c=>({"@type":"ExercisePlan",name:c.name,url:`https://ways-sport-site.vercel.app/cours/${c.slug}`}))};
 return <main className="subPage"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><SiteHeader/>
  <section className="subHero"><span className="miniLabel">WAYS / STUDIOS</span><h1>DES COURS<br/>QUI ONT UN BUT.</h1><p>Pas une liste interminable. WAYS construit un programme resserré autour de formats complémentaires : contrôle, force, cardio, coordination et mobilité.</p></section>
  <section className="subSection"><div className="courseGrid">{courses.map(c=><article className="courseCard" key={c.slug}><span>{c.tag}</span><h2>{c.name}</h2><p>{c.text}</p><Link href={`/cours/${c.slug}`}>DÉCOUVRIR LE COURS ↗</Link></article>)}</div></section>
  <section className="offerBanner"><h2>UNE SÉANCE.<br/>PUIS TON RYTHME.</h2><div><p>Les cours WAYS sont pensés pour s’intégrer à une pratique complète : training libre, studios, récupération, coworking et coffee shop.</p><Link className="darkButton" href="/abonnements">VOIR LES ABONNEMENTS</Link></div></section>
 </main>;
}
