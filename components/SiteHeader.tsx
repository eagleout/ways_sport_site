import Link from "next/link";

export default function SiteHeader(){
  return <header className="simpleHeader">
    <Link href="/" aria-label="WAYS accueil"><img src="/ways-logo.svg" alt="WAYS"/></Link>
    <nav aria-label="Navigation secondaire">
      <Link href="/">LE CLUB</Link>
      <Link href="/cours">COURS</Link>
      <Link href="/abonnements">ABONNEMENTS</Link>
      <Link href="/levallois">LEVALLOIS</Link>
    </nav>
    <Link href="/abonnements">REJOINDRE WAYS</Link>
  </header>;
}
