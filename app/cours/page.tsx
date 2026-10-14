import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title:"Cours collectifs premium à Levallois : Pilates, Lagree, RPM & Boxing",
  description:"Découvre les cours WAYS à Levallois-Perret : Pilates, Lagree, RPM, Cardio Boxing, Cardio Abdos-Fessiers et Body Sculpt, dans un training club premium.",
  alternates:{canonical:"/cours"}
};

const courses=[
  {slug:"pilates",name:"PILATES",tag:"CONTROL",text:"Renforcement profond, posture et maîtrise du mouvement. Précis, calme, exigeant."},
  {slug:"lagree",name:"LAGREE",tag:"SLOW BURN",text:"Une intensité qui ne se mesure pas au bruit. Contrôle, tension et engagement du début à la fin."},
  {slug:"rpm",name:"RPM",tag:"RIDE",text:"Du rythme, de l’énergie et un vrai travail cardio. Tu suis le tempo, le groupe fait le reste."},
  {slug:"cardio-boxing",name:"CARDIO BOXING",tag:"IMPACT",text:"Cardio, coordination et puissance dans un format direct, rythmé et sans monotonie."},
  {slug:"cardio-abdos-fessiers",name:"CARDIO A.F.",tag:"BURN",text:"Un format dynamique pour faire monter le cardio et renforcer là où ça compte."},
  {slug:"body-sculpt",name:"BODY SCULPT",tag:"BUILD",text:"Renforcement global, répétitions maîtrisées et sensation de travail immédiate."}
];

export default function CoursesPage(){
 const schema={"@context":"https://schema.org","@type":"CollectionPage",name:"Cours collectifs WAYS Levallois",url:"https://ways-sport-site.vercel.app/cours",about:courses.map(c=>({"@type":"ExercisePlan",name:c.name,url:`https://ways-sport-site.vercel.app/cours/${c.slug}`}))};
 return <main className="subPage"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><SiteHeader/>
  <section className="subHero"><span className="miniLabel">WAYS / STUDIOS</span><h1>LE RYTHME CHANGE.<br/>L’EXIGENCE RESTE.</h1><p>Pas cinquante concepts. Les bons. WAYS réunit des formats complémentaires pour travailler le contrôle, la force, le cardio, la coordination et la mobilité — avec une vraie ambiance de studio.</p></section>
  <section className="subSection"><div className="courseGrid">{courses.map(c=><article className="courseCard" key={c.slug}><span>{c.tag}</span><h2>{c.name}</h2><p>{c.text}</p><Link href={`/cours/${c.slug}`}>ENTRER DANS LE COURS ↗</Link></article>)}</div></section>
  <section className="offerBanner"><h2>LE COURS FINIT.<br/>WAYS CONTINUE.</h2><div><p>Training libre, studios, coworking et coffee shop : ta séance est un moment de la journée, pas une adresse de plus.</p><Link className="darkButton" href="/abonnements">DÉCOUVRIR LES ABONNEMENTS</Link></div></section>
 </main>;
}
