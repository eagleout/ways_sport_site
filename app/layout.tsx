import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap"
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ways-sport.fr"),
  title: {
    default: "WAYS Levallois | Training Club",
    template: "%s | WAYS Levallois"
  },
  description:
    "WAYS, training club à Levallois-Perret : musculation, cardio, cours collectifs, Pilates, Lagree, RPM et espaces pensés pour votre rythme.",
  keywords: [
    "salle de sport Levallois",
    "salle de sport Levallois-Perret",
    "club de sport Levallois",
    "Pilates Levallois",
    "Lagree Levallois",
    "RPM Levallois",
    "cours collectifs Levallois"
  ],
  openGraph: {
    title: "WAYS Levallois — À ta façon. À fond.",
    description:
      "Un training club à Levallois où intensité, chaleur et mouvement se rencontrent.",
    type: "website",
    locale: "fr_FR",
    siteName: "WAYS"
  },
  alternates: {
    canonical: "https://ways-sport.fr"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
