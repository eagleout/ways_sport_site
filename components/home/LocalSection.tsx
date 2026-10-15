import Image from "next/image";
import Link from "next/link";
import Faq from "../Faq";
import { homeFaq } from "@/lib/content";
import { media } from "@/lib/media";
import { ArrowIcon } from "../Icons";

export default function LocalSection() {
  return (
    <section className="local" id="levallois" aria-labelledby="local-title">
      <div className="local__inner">
        <div className="local__media frame frame--grade" data-parallax="7" data-reveal="fade">
          <div className="parallax-inner">
            <Image src={media.levallois.src} alt={media.levallois.alt} fill sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </div>
        <div className="local__copy">
          <span className="kicker copper" data-reveal>
            WAYS · Levallois-Perret
          </span>
          <h2 id="local-title" className="display" data-split>
            Un club de sport. <span className="accent">Une adresse pour le reste.</span>
          </h2>
          <p data-reveal>
            WAYS réunit à Levallois-Perret musculation, cardio, Pilates, Lagree, RPM, cours collectifs, espace coworking
            et coffee shop dans une seule expérience de club.
          </p>
          <Faq items={homeFaq} />
          <div style={{ marginTop: 36 }} data-reveal>
            <Link href="/levallois" className="link-line">
              Découvrir WAYS Levallois
              <ArrowIcon className="btn__arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
