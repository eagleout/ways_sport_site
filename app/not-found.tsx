import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <main id="contenu" className="not-found">
      <div>
        <span className="kicker copper">Erreur 404</span>
        <h1 className="display">Mauvaise porte.</h1>
        <Link href="/" className="btn btn--light" data-magnetic>
          Revenir à l’entrée
          <ArrowIcon className="btn__arrow" />
        </Link>
      </div>
    </main>
  );
}
