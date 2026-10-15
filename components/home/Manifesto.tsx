"use client";

import { useRef } from "react";
import { gsap, SplitText, useIsoLayoutEffect } from "@/lib/gsap";

/** Le texte s'allume mot à mot au rythme du scroll. */
export default function Manifesto() {
  const root = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const text = section.querySelector<HTMLElement>(".manifesto__text");
      if (!text) return;
      const split = SplitText.create(text, { type: "words", wordsClass: "manifesto__word" });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: { trigger: text, start: "top 78%", end: "bottom 52%", scrub: 0.6 },
        },
      );
      return () => split.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="manifesto" id="club" aria-labelledby="manifesto-title">
      <div className="manifesto__inner">
        <span className="kicker manifesto__label" data-reveal>
          WAYS / Le club
        </span>
        <h2 id="manifesto-title" className="manifesto__text">
          Un lieu pensé pour s’entraîner sérieusement, sans choisir entre performance et{" "}
          <span className="accent">qualité de vie.</span> Training, studios, récupération, coworking et coffee shop,
          à la même adresse.
        </h2>
        <div className="manifesto__stats">
          <div className="stat" data-reveal>
            <span className="stat__value" data-count="6">6</span>
            <span className="stat__label">formats de cours en studio, du Pilates au Cardio Boxing</span>
          </div>
          <div className="stat" data-reveal data-delay="0.1">
            <span className="stat__value" data-count="5">5</span>
            <span className="stat__label">univers sous un même toit : training, studios, recover, work, coffee</span>
          </div>
          <div className="stat" data-reveal data-delay="0.2">
            <span className="stat__value" data-count="1">1</span>
            <span className="stat__label">adresse à Levallois-Perret, pensée pour s’intégrer à ta journée</span>
          </div>
        </div>
      </div>
    </section>
  );
}
