import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";
import { ArrowIcon } from "./Icons";

export default function Founders({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <section className="founders" aria-labelledby="founders-title">
      <div className="founders__inner">
        <div className="founders__visual" data-reveal="scale">
          <div className="founders__card" data-tilt>
            <span className="kicker founders__badge">Édition ouverture</span>
            <Image src={media.towels.src} alt={media.towels.alt} fill sizes="(max-width: 900px) 90vw, 480px" />
          </div>
        </div>
        <div className="founders__copy">
          <span className="kicker" data-reveal>
            Founding members
          </span>
          <Heading id="founders-title" className="display" data-split>
            Les premiers membres reçoivent leur première pièce WAYS.
          </Heading>
          <p className="founders__lead" data-reveal>
            Une serviette WAYS brodée, offerte aux premiers adhérents.
          </p>
          <p data-reveal data-delay="0.08">
            Sobre, utile et créée pour l’ouverture du club. Réservée aux premiers membres, dans la limite des quantités
            prévues.
          </p>
          <div data-reveal data-delay="0.14">
            <Link href="/abonnements#pre-inscription" className="btn btn--dark" data-magnetic>
              Faire partie des premiers
              <ArrowIcon className="btn__arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
