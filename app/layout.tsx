import type { Metadata } from "next";
import { DM_Sans, Manrope, Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import "./globals.css";
import "./layout-spacing.css";
import "./hero-fix.css";
import "./typography.css";
import "./rune-inspired.css";
import "./v4.css";
import "./v5-motion.css";
import "./v6.css";
import "./v6-mobile-fix.css";
import "./v6-towels.css";
import "./v7.css";
import "./membership-v7.css";

const display = DM_Sans({ subsets:["latin"], weight:["500","600","700"], variable:"--font-display", display:"swap" });
const body = Manrope({ subsets:["latin"], weight:["400","500","600","700"], variable:"--font-body", display:"swap" });
const serif = Cormorant_Garamond({ subsets:["latin"], weight:["500","600"], style:["normal","italic"], variable:"--font-serif", display:"swap" });
const v6Display = Instrument_Sans({ subsets:["latin"], weight:["400","500","600","700"], variable:"--font-v6-display", display:"swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ways-sport-site.vercel.app"),
  title: { default:"WAYS Levallois | Training Club, Pilates, Lagree, Coworking & Coffee", template:"%s | WAYS Levallois" },
  description:"WAYS est un training club à Levallois-Perret avec musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop.",
  keywords:["salle de sport Levallois","salle de sport Levallois-Perret","training club Levallois","Pilates Levallois","Lagree Levallois","RPM Levallois","cours collectifs Levallois","coworking salle de sport Levallois","coffee shop Levallois"],
  authors:[{name:"WAYS"}], creator:"WAYS", publisher:"WAYS",
  category:"fitness",
  alternates:{canonical:"/"},
  openGraph:{title:"WAYS Levallois — Training Club",description:"Training, studios, coworking et coffee shop réunis dans une même adresse à Levallois-Perret.",url:"/",siteName:"WAYS",locale:"fr_FR",type:"website"},
  twitter:{card:"summary_large_image",title:"WAYS Levallois — Training Club",description:"Sport, studios, coworking et coffee shop réunis dans un même club à Levallois-Perret."},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}}
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="fr"><body className={`${display.variable} ${body.variable} ${serif.variable} ${v6Display.variable}`}>{children}</body></html>;
}
