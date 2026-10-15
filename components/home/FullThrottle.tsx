"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, canPlayAmbientVideo, useIsoLayoutEffect } from "@/lib/gsap";
import { media, videos } from "@/lib/media";
import { ArrowIcon } from "../Icons";

/**
 * « À FOND. » : l'image n'apparaît qu'à travers les lettres,
 * puis le mot grandit jusqu'à ouvrir complètement la scène.
 */
export default function FullThrottle() {
  const root = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useIsoLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add(
      { desktop: "(min-width: 901px)", reduce: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };
        const q = gsap.utils.selector(section);

        if (reduce) {
          gsap.set(q(".throttle__mask"), { backgroundColor: "rgba(16,15,14,0.35)" });
          gsap.set(q(".throttle__fade"), { opacity: 1 });
          return;
        }

        gsap.set(q(".throttle__copy > *"), { opacity: 0, y: 30 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: desktop ? "+=170%" : "+=120%",
            scrub: 0.9,
            pin: q(".throttle__stage")[0] as HTMLElement,
            anticipatePin: 1,
          },
        });

        tl.fromTo(q(".throttle__word"), { scale: 0.86 }, { scale: 1, duration: 0.25, ease: "power2.out" }, 0)
          .to(q(".throttle__word"), { scale: desktop ? 5.5 : 4.5, duration: 0.5, ease: "power3.in" }, 0.3)
          .to(q(".throttle__mask"), { backgroundColor: "rgba(16,15,14,0)", duration: 0.34, ease: "power1.in" }, 0.38)
          .fromTo(q(".throttle__media"), { scale: 1.25 }, { scale: 1, duration: 0.85, ease: "power2.out" }, 0)
          .to(q(".throttle__fade"), { opacity: 1, duration: 0.2 }, 0.72)
          .to(q(".throttle__copy > *"), { opacity: 1, y: 0, duration: 0.18, stagger: 0.04, ease: "power2.out" }, 0.78)
          .to({}, { duration: 0.12 });
      },
    );

    const video = videoRef.current;
    let observer: IntersectionObserver | null = null;
    if (video && canPlayAmbientVideo()) {
      video.muted = true;
      video.addEventListener("playing", () => video.classList.add("is-playing"), { once: true });
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!video.src) video.src = videos.chalk;
            video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        },
        { rootMargin: "25% 0px" },
      );
      observer.observe(section);
    }

    return () => {
      mm.revert();
      observer?.disconnect();
    };
  }, []);

  return (
    <section ref={root} className="throttle" aria-labelledby="throttle-title">
      <div className="throttle__stage">
        <div className="throttle__media" aria-hidden="true">
          <Image src={media.barbell.src} alt="" fill sizes="100vw" style={{ objectPosition: media.barbell.focus }} />
          <video ref={videoRef} muted loop playsInline preload="none" tabIndex={-1} />
        </div>
        <div className="throttle__mask" aria-hidden="true">
          <span className="throttle__word">À fond.</span>
        </div>
        <div className="throttle__fade" aria-hidden="true" />
        <div className="throttle__copy">
          <div>
            <span className="kicker copper">WAYS / Intensité</span>
            <h2 id="throttle-title" className="display">
              Pas de surenchère. Juste l’effort.
            </h2>
          </div>
          <div>
            <p>
              Soulever lourd, pédaler fort ou travailler le contrôle : quel que soit le format, l’exigence reste la même.
              Tu choisis ta façon. On s’occupe des bonnes conditions.
            </p>
            <Link href="/cours" className="btn btn--light" data-magnetic>
              Découvrir les cours
              <ArrowIcon className="btn__arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
