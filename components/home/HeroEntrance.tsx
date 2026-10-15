"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, canPlayAmbientVideo, isFinePointer, useIsoLayoutEffect } from "@/lib/gsap";
import { media, videos } from "@/lib/media";
import { onIntroDone } from "@/lib/scroll";
import { ArrowDownIcon, ArrowIcon } from "../Icons";

/**
 * L'entrée : deux portes vitrées aux poignées cuivre, le logo WAYS partagé entre les battants,
 * un filet de lumière dans l'entrebâillement. Au scroll, les portes s'ouvrent vers l'intérieur,
 * la caméra avance dans le club et la signature apparaît.
 */
export default function HeroEntrance() {
  const root = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useIsoLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 901px)",
        mobile: "(max-width: 900px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };

        if (reduce) {
          section.classList.add("is-static");
          return () => section.classList.remove("is-static");
        }

        const q = gsap.utils.selector(section);
        const title = q(".hero__title")[0] as HTMLElement;
        const split = SplitText.create(q(".hero__title-line"), { type: "words,chars", charsClass: "hero__char" });
        gsap.set(title, { visibility: "visible" });
        gsap.set(split.chars, { yPercent: 118 });
        gsap.set(q("[data-hero-in]"), { opacity: 0, y: 24 });

        // Arrivée devant les portes, une fois l'intro terminée
        const introIn = gsap.timeline({ paused: true });
        introIn
          .from(q(".hero__door-tilt"), { scale: 1.07, duration: 2.4, ease: "expo.out" }, 0)
          .from(q(".hero__sign span"), { opacity: 0, y: -8, duration: 1, stagger: 0.05, ease: "power2.out" }, 0.25)
          .from(q(".hero__cue > *"), { opacity: 0, y: 16, duration: 1, stagger: 0.1 }, 0.7);
        const disposeIntro = onIntroDone(() => introIn.play());

        // L'entrée, pilotée par le scroll
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: desktop ? "+=230%" : "+=150%",
            scrub: desktop ? 1.1 : 0.7,
            pin: q(".hero__stage")[0] as HTMLElement,
            anticipatePin: 1,
          },
        });

        tl.to(q(".hero__sign"), { opacity: 0, y: -24, duration: 0.1 }, 0)
          .to(q(".hero__cue"), { opacity: 0, y: 20, duration: 0.08 }, 0)
          .to(q(".hero__gap"), { scaleX: 16, opacity: 1, duration: 0.14, ease: "power2.in" }, 0.02)
          .to(q(".hero__gap"), { opacity: 0, duration: 0.12 }, 0.16)
          .to(q(".hero__spill"), { opacity: 0, duration: 0.2 }, 0.18)
          .to(q(".door--left"), { rotateY: 84, duration: 0.5, ease: "power2.in" }, 0.08)
          .to(q(".door--right"), { rotateY: -84, duration: 0.5, ease: "power2.in" }, 0.08)
          .to(q(".hero__doors"), { scale: desktop ? 1.75 : 1.45, duration: 0.56, ease: "power1.in" }, 0.08)
          .to(q(".hero__doors"), { opacity: 0, duration: 0.12 }, 0.5)
          .fromTo(q(".hero__interior"), { scale: 1 }, { scale: 1.16, duration: 0.62, ease: "power1.out" }, 0.08)
          .to(q(".hero__darkness"), { opacity: 0.1, duration: 0.42 }, 0.12)
          .to(split.chars, { yPercent: 0, duration: 0.2, stagger: 0.008, ease: "power3.out" }, 0.52)
          .to(q("[data-hero-in]"), { opacity: 1, y: 0, duration: 0.14, stagger: 0.03, ease: "power2.out" }, 0.64)
          .to({}, { duration: 0.18 });

        // Profondeur au pointeur
        let removePointer: () => void = () => undefined;
        if (desktop && isFinePointer()) {
          const ix = gsap.quickTo(q(".hero__interior-inner"), "x", { duration: 1.4, ease: "power3.out" });
          const iy = gsap.quickTo(q(".hero__interior-inner"), "y", { duration: 1.4, ease: "power3.out" });
          const dx = gsap.quickTo(q(".hero__door-tilt"), "x", { duration: 1.2, ease: "power3.out" });
          const dy = gsap.quickTo(q(".hero__door-tilt"), "y", { duration: 1.2, ease: "power3.out" });
          const onMove = (event: PointerEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;
            ix(nx * -26);
            iy(ny * -18);
            dx(nx * 10);
            dy(ny * 6);
          };
          section.addEventListener("pointermove", onMove);
          removePointer = () => section.removeEventListener("pointermove", onMove);
        }

        return () => {
          removePointer();
          disposeIntro();
          introIn.kill();
          split.revert();
        };
      },
    );

    // Vidéo d'ambiance : desktop uniquement, après l'intro, quand la section est visible
    const video = videoRef.current;
    let videoObserver: IntersectionObserver | null = null;
    let disposeVideo: () => void = () => undefined;
    if (video && canPlayAmbientVideo()) {
      disposeVideo = onIntroDone(() => {
        video.muted = true;
        video.addEventListener("playing", () => video.classList.add("is-playing"), { once: true });
        video.src = videos.hero;
        videoObserver = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) video.play().catch(() => undefined);
          else video.pause();
        });
        videoObserver.observe(section);
      });
    }

    return () => {
      mm.revert();
      disposeVideo();
      videoObserver?.disconnect();
    };
  }, []);

  return (
    <section ref={root} className="hero" id="entree" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__interior" aria-hidden="true">
          <div className="hero__interior-inner">
            <Image
              src={media.heroPoster.src}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={80}
              style={{ objectPosition: media.heroPoster.focus }}
            />
            <video ref={videoRef} className="hero__video" muted loop playsInline preload="none" tabIndex={-1} />
          </div>
        </div>
        <div className="hero__darkness" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />

        <div className="hero__door-tilt" aria-hidden="true">
          <div className="hero__doors">
            <div className="door door--left">
              <div className="door__panel" />
              <div className="door__glass" />
              <img className="door__logo" src="/ways-logo.svg" alt="" width={980} height={200} />
              <span className="door__handle" />
              <span className="door__label">Training Club</span>
            </div>
            <div className="door door--right">
              <div className="door__panel" />
              <div className="door__glass" />
              <img className="door__logo" src="/ways-logo.svg" alt="" width={980} height={200} />
              <span className="door__handle" />
              <span className="door__label">Levallois-Perret</span>
            </div>
          </div>
        </div>
        <div className="hero__gap" aria-hidden="true">
          <span className="hero__gap-core" />
        </div>
        <div className="hero__spill" aria-hidden="true">
          <span className="hero__spill-core" />
        </div>

        <p className="hero__sign" aria-hidden="true">
          {["WAYS", "·", "Training", "Club", "·", "Levallois"].map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </p>

        <div className="hero__cue" aria-hidden="true">
          <span>Fais défiler pour entrer</span>
          <span className="hero__cue-line" />
        </div>

        <div className="hero__copy">
          <div>
            <span className="kicker hero__kicker" data-hero-in>
              WAYS · Training Club · Levallois-Perret
            </span>
            <h1 id="hero-title" className="display hero__title">
              <span className="hero__title-line">À ta façon.</span>{" "}
              <span className="hero__title-line hero__title-line--accent">À fond.</span>
            </h1>
          </div>
          <div className="hero__aside">
            <p className="hero__meta" data-hero-in>
              Training · Studios · Recover · Coffee · Work
            </p>
            <p data-hero-in>Un training club à Levallois-Perret. On vient pour sa séance. On reste pour la suite.</p>
            <div className="hero__actions" data-hero-in>
              <Link href="/abonnements" className="btn btn--light" data-magnetic>
                Devenir membre
                <ArrowIcon className="btn__arrow" />
              </Link>
              <a href="#visite" className="btn btn--ghost">
                La visite
                <ArrowDownIcon className="btn__arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
