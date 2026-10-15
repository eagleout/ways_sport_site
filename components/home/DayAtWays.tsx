"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { dayMoments } from "@/lib/content";

const TONES: Record<string, { bg: string; fg: string }> = {
  night: { bg: "#1c1917", fg: "#f3efe7" },
  clay: { bg: "#d7b4a4", fg: "#191a18" },
  chalk: { bg: "#f7f3ec", fg: "#191a18" },
  espresso: { bg: "#30221e", fg: "#f3efe7" },
};

/** Une journée qui passe : l'heure tourne, la lumière change, les espaces se succèdent. */
export default function DayAtWays() {
  const root = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      section.classList.add("is-pinned");
      const stage = section.querySelector<HTMLElement>(".day__stage");
      const bg = section.querySelector<HTMLElement>(".day__bg");
      const moments = gsap.utils.toArray<HTMLElement>(".moment", section);
      const dots = gsap.utils.toArray<HTMLElement>(".day__dots span", section);
      if (!stage || !bg) return;

      const first = TONES[dayMoments[0].tone];
      gsap.set(bg, { backgroundColor: first.bg });
      gsap.set(stage, { color: first.fg });
      moments.forEach((moment, index) => {
        const info = moment.querySelector(".moment__info");
        const media = moment.querySelector(".moment__media");
        gsap.set(info, { autoAlpha: index === 0 ? 1 : 0, yPercent: index === 0 ? 0 : 18 });
        gsap.set(media, { clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" });
      });

      const setDot = (active: number) => dots.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
      setDot(0);

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: `+=${(moments.length - 1) * 95}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: { snapTo: "labels", duration: { min: 0.3, max: 0.9 }, ease: "power2.inOut", delay: 0.12 },
          onUpdate: (self) => setDot(Math.round(self.progress * (moments.length - 1))),
        },
      });

      tl.addLabel("m0");
      moments.forEach((moment, index) => {
        if (index === 0) return;
        const previous = moments[index - 1];
        const tone = TONES[dayMoments[index].tone];
        const at = `m${index - 1}+=0.2`;
        tl.to(previous.querySelector(".moment__info"), { autoAlpha: 0, yPercent: -18, duration: 0.5 }, at)
          .to(previous.querySelector(".moment__media img"), { scale: 1.12, duration: 1 }, at)
          .to(moment.querySelector(".moment__media"), { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 }, at)
          .fromTo(moment.querySelector(".moment__media img"), { scale: 1.25 }, { scale: 1, duration: 1 }, at)
          .to(moment.querySelector(".moment__info"), { autoAlpha: 1, yPercent: 0, duration: 0.6 }, `m${index - 1}+=0.55`)
          .to(bg, { backgroundColor: tone.bg, duration: 0.8 }, at)
          .to(stage, { color: tone.fg, duration: 0.8 }, at)
          .addLabel(`m${index}`, `m${index - 1}+=1.3`);
      });
      tl.to({}, { duration: 0.2 });

      return () => {
        section.classList.remove("is-pinned");
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="day" aria-labelledby="day-title">
      <div className="day__head">
        <span className="kicker copper" data-reveal>
          Une journée chez WAYS
        </span>
        <h2 id="day-title" className="display" data-split>
          Un seul lieu. <span className="accent">Plusieurs moments.</span>
        </h2>
      </div>

      <div className="day__stage">
        <div className="day__bg" aria-hidden="true" />
        {dayMoments.map((moment) => (
          <article key={moment.time} className="moment" data-tone={moment.tone}>
            <div className="moment__info">
              <span className="moment__time">{moment.time}</span>
              <h3 className="display moment__title">{moment.title}</h3>
              <p className="moment__text">{moment.text}</p>
            </div>
            <div className="moment__media frame frame--grade">
              <Image
                src={moment.image.src}
                alt={moment.image.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectPosition: moment.image.focus }}
              />
            </div>
          </article>
        ))}
        <div className="day__dots" aria-hidden="true">
          {dayMoments.map((moment) => (
            <span key={moment.time} />
          ))}
        </div>
      </div>
    </section>
  );
}
