import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import "./layout-spacing.css";

const display = Barlow_Condensed({ subsets:["latin"], weight:["700","800","900"], variable:"--font-display", display:"swap" });
const body = Manrope({ subsets:["latin"], weight:["400","500","600","700"], variable:"--font-body", display:"swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ways-sport-site.vercel.app"),
  title: { default:"WAYS Levallois | Training Club, Pilates, Lagree, Coworking & Coffee", template:"%s | WAYS Levallois" },
  description:"WAYS est un training club à Levallois-Perret avec musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop.",
  keywords:["salle de sport Levallois","salle de sport Levallois-Perret","training club Levallois","Pilates Levallois","Lagree Levallois","RPM Levallois","cours collectifs Levallois","coworking salle de sport Levallois","coffee shop Levallois"],
  authors:[{name:"WAYS"}], creator:"WAYS", publisher:"WAYS",
  category:"fitness",
  alternates:{canonical:"/"},
  openGraph:{title:"WAYS Levallois — À ta façon. À fond.",description:"Training, studios, coworking et coffee shop : découvre WAYS à Levallois-Perret.",url:"/",siteName:"WAYS",locale:"fr_FR",type:"website"},
  twitter:{card:"summary_large_image",title:"WAYS Levallois — À ta façon. À fond.",description:"Training club à Levallois-Perret : sport, studios, coworking et coffee shop."},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}}
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="fr"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>;
}
