import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Cormorant_Garamond, Manrope } from "next/font/google";
import Experience from "@/components/Experience";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SIGNATURE, SITE_URL } from "@/lib/content";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WAYS Levallois | Training Club, Pilates, Lagree, Coworking & Coffee",
    template: "%s | WAYS Levallois",
  },
  description:
    "WAYS est un training club à Levallois-Perret : musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking et coffee shop. À ta façon. À fond.",
  keywords: [
    "salle de sport Levallois",
    "salle de sport Levallois-Perret",
    "training club Levallois",
    "Pilates Levallois",
    "Lagree Levallois",
    "RPM Levallois",
    "cours collectifs Levallois",
    "coworking salle de sport Levallois",
    "coffee shop Levallois",
  ],
  authors: [{ name: "WAYS" }],
  creator: "WAYS",
  publisher: "WAYS",
  category: "fitness",
  alternates: { canonical: "/" },
  openGraph: {
    title: `WAYS Levallois — ${SIGNATURE}`,
    description: "Training, studios, recover, coworking et coffee shop réunis dans un même club à Levallois-Perret.",
    url: "/",
    siteName: "WAYS",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `WAYS Levallois — ${SIGNATURE}`,
    description: "Training, studios, recover, coworking et coffee shop réunis dans un même club à Levallois-Perret.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#100f0e",
  colorScheme: "dark",
};

/** Exécuté avant le premier rendu : active les états d'animation, saute l'intro déjà vue, filet de sécurité. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('ways-intro')==='1'){d.classList.add('intro-seen')}}catch(e){}setTimeout(function(){if(!window.__waysReady){d.classList.add('reveal-failsafe')}},4500)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      </head>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Experience />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
