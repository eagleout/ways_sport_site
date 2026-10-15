import Image from "next/image";
import Link from "next/link";
import type { Media } from "@/lib/media";

type Crumb = { href?: string; label: string };

type PageHeroProps = {
  crumbs: Crumb[];
  title: React.ReactNode;
  intro: string;
  image: Media;
  short?: boolean;
  children?: React.ReactNode;
};

export default function PageHero({ crumbs, title, intro, image, short = false, children }: PageHeroProps) {
  return (
    <section className={short ? "page-hero page-hero--short" : "page-hero"}>
      <div className="page-hero__media frame" aria-hidden="true">
        <div className="parallax-inner" data-hero-media>
          <Image src={image.src} alt="" fill priority sizes="100vw" style={{ objectPosition: image.focus }} />
        </div>
      </div>
      <div className="page-hero__inner">
        <div>
          <nav className="crumbs kicker" aria-label="Fil d’Ariane" data-reveal>
            {crumbs.map((crumb, index) => (
              <span key={crumb.label}>
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
                {index < crumbs.length - 1 ? <span aria-hidden="true"> / </span> : null}
              </span>
            ))}
          </nav>
          <h1 className="display" data-split>
            {title}
          </h1>
        </div>
        <div className="page-hero__aside" data-reveal data-delay="0.25">
          <p className="page-hero__intro">{intro}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
