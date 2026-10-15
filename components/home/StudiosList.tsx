"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, isFinePointer, useIsoLayoutEffect } from "@/lib/gsap";
import { courses } from "@/lib/content";
import { ArrowIcon, Meter } from "../Icons";

/** Les six formats en grandes lignes ; au survol, l'image du cours suit le pointeur. */
export default function StudiosList() {
  const root = useRef<HTMLElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const section = root.current;
    const preview = previewRef.current;
    if (!section || !preview) return;
    const mm = gsap.matchMedia();

    // Le bandeau réagit à la vitesse de scroll
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const skew = section.querySelector<HTMLElement>(".marquee__skew");
      if (!skew) return;
      const skewTo = gsap.quickTo(skew, "skewX", { duration: 0.5, ease: "power3.out" });
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          skewTo(gsap.utils.clamp(-8, 8, self.getVelocity() / -260));
        },
        onLeave: () => skewTo(0),
        onLeaveBack: () => skewTo(0),
      });
      return () => trigger.kill();
    });

    // Aperçu flottant (desktop, pointeur fin)
    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      if (!isFinePointer()) return;
      const list = section.querySelector<HTMLElement>(".studios__list");
      const rows = gsap.utils.toArray<HTMLElement>(".studio-row", section);
      const images = gsap.utils.toArray<HTMLElement>(".studio-preview__img", preview);
      if (!list) return;

      gsap.set(preview, { autoAlpha: 0, scale: 0.6, rotate: -6 });
      const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3.out" });
      const rTo = gsap.quickTo(preview, "rotate", { duration: 0.9, ease: "power3.out" });
      let lastX = 0;

      const onMove = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
        rTo(gsap.utils.clamp(-12, 12, (event.clientX - lastX) * 0.6));
        lastX = event.clientX;
      };
      const show = () => gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "expo.out" });
      const hide = () => gsap.to(preview, { autoAlpha: 0, scale: 0.6, duration: 0.5, ease: "power3.out" });

      const enters = rows.map((row, index) => {
        const enter = () => images.forEach((img, i) => img.classList.toggle("is-active", i === index));
        row.addEventListener("pointerenter", enter);
        return () => row.removeEventListener("pointerenter", enter);
      });

      const onEnterList = (event: PointerEvent) => {
        lastX = event.clientX;
        gsap.set(preview, { x: event.clientX, y: event.clientY });
        show();
      };
      list.addEventListener("pointermove", onMove);
      list.addEventListener("pointerenter", onEnterList);
      list.addEventListener("pointerleave", hide);

      return () => {
        enters.forEach((dispose) => dispose());
        list.removeEventListener("pointermove", onMove);
        list.removeEventListener("pointerenter", onEnterList);
        list.removeEventListener("pointerleave", hide);
      };
    });

    return () => mm.revert();
  }, []);

  const marqueeItems = courses.map((course) => course.name);

  return (
    <section ref={root} className="studios" id="studios" aria-labelledby="studios-title">
      <div className="marquee" aria-hidden="true">
        <div className="marquee__skew">
          {[0, 1].map((copy) => (
            <div className="marquee__track" key={copy}>
              {marqueeItems.map((name) => (
                <span key={`${copy}-${name}`} style={{ display: "contents" }}>
                  <span>{name}</span>
                  <span className="accent">à fond</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="studios__head">
        <div>
          <span className="kicker" data-reveal>
            Les studios
          </span>
          <h2 id="studios-title" className="display" data-split>
            Le rythme change. <span className="accent">L’exigence reste.</span>
          </h2>
        </div>
        <p className="muted-light" data-reveal style={{ maxWidth: 380, margin: 0 }}>
          Pas cinquante concepts. Les bons. Des formats complémentaires pour travailler le contrôle, la force, le cardio
          et la coordination.
        </p>
      </div>

      <ul className="studios__list">
        {courses.map((course, index) => (
          <li key={course.slug} data-reveal data-delay={String(index * 0.05)}>
            <Link href={`/cours/${course.slug}`} className="studio-row" data-cursor="Entrer">
              <span className="kicker studio-row__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="studio-row__thumb frame">
                <Image src={course.image.src} alt="" fill sizes="80px" />
              </span>
              <span className="studio-row__name">{course.name}</span>
              <span className="studio-row__tag">{course.tag}</span>
              <Meter level={course.level} />
              <span className="studio-row__arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="studios__foot" data-reveal>
        <Link href="/cours" className="link-line">
          Tous les cours et le détail des formats
          <ArrowIcon className="btn__arrow" />
        </Link>
      </div>

      <div ref={previewRef} className="studio-preview" aria-hidden="true">
        {courses.map((course, index) => (
          <div key={course.slug} className={index === 0 ? "studio-preview__img frame is-active" : "studio-preview__img frame"}>
            <Image src={course.image.src} alt="" fill sizes="340px" style={{ objectPosition: course.image.focus }} />
          </div>
        ))}
      </div>
    </section>
  );
}
