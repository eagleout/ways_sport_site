import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";
import { ArrowIcon } from "./Icons";

export default function FinalCta() {
  return (
    <section className="final" aria-labelledby="final-title">
      <div className="final__media frame" data-parallax="8" aria-hidden="true">
        <div className="parallax-inner">
          <Image src={media.trainingFloor.src} alt="" fill sizes="100vw" style={{ objectPosition: media.trainingFloor.focus }} />
        </div>
      </div>
      <div className="final__inner">
        <span className="kicker copper" data-reveal>
          WAYS / Levallois-Perret
        </span>
        <h2 id="final-title" className="display final__title" data-split>
          Viens pour le sport. <span className="accent">Reste pour le club.</span>
        </h2>
        <div className="final__actions" data-reveal data-delay="0.2">
          <Link href="/abonnements" className="btn btn--light" data-magnetic>
            Devenir membre
            <ArrowIcon className="btn__arrow" />
          </Link>
          <Link href="/cours" className="btn btn--ghost" data-magnetic>
            Découvrir les cours
          </Link>
        </div>
      </div>
    </section>
  );
}
