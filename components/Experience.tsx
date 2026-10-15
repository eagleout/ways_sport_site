"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/scroll";

/**
 * Couche d'expérience globale, montée une fois dans le layout :
 * défilement fluide, apparitions au scroll, parallaxe, compteurs,
 * boutons magnétiques, cartes inclinables et curseur.
 */
export default function Experience() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const firstRoute = useRef(true);

  // Défilement fluide + liens d'ancre
  useEffect(() => {
    window.__waysReady = true;
    document.documentElement.classList.remove("reveal-failsafe");
    getLenis();

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector<HTMLElement>(decodeURIComponent(url.hash));
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", url.hash);
    };
    // Phase de capture : passe avant les liens Next pour un défilement fluide sur la même page
    document.addEventListener("click", onClick, true);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("load", refresh);
    };
  }, []);

  // Effets attachés au contenu de la page (relancés à chaque navigation)
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const lenis = getLenis();
    if (!firstRoute.current && !window.location.hash) {
      lenis?.scrollTo(0, { immediate: true, force: true });
    }
    firstRoute.current = false;

    const cleanups: Array<() => void> = [];
    let ctx: gsap.Context | null = null;

    const frame = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const revealEls = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const splitEls = gsap.utils.toArray<HTMLElement>("[data-split]");
        const countEls = gsap.utils.toArray<HTMLElement>("[data-count]");

        if (reduce) {
          gsap.set(revealEls, { opacity: 1, clearProps: "transform" });
          gsap.set(splitEls, { visibility: "visible" });
          return;
        }

        // Apparitions : IntersectionObserver (insensible aux sections épinglées)
        const revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              revealObserver.unobserve(el);
              const delay = Number(el.dataset.delay ?? 0);
              gsap.to(el, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.3, ease: "expo.out", delay });
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
        );
        revealEls.forEach((el) => revealObserver.observe(el));
        cleanups.push(() => revealObserver.disconnect());

        // Titres ligne à ligne
        splitEls.forEach((el) => {
          let played = false;
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              if (played) return;
              gsap.set(self.lines, { yPercent: 110 });
            },
          });
          const observer = new IntersectionObserver(
            (entries) => {
              if (!entries.some((entry) => entry.isIntersecting)) return;
              observer.disconnect();
              played = true;
              gsap.to(split.lines, {
                yPercent: 0,
                duration: 1.35,
                ease: "expo.out",
                stagger: 0.09,
                delay: Number(el.dataset.delay ?? 0),
              });
            },
            { rootMargin: "0px 0px -8% 0px" },
          );
          observer.observe(el);
          cleanups.push(() => {
            observer.disconnect();
            split.revert();
          });
        });

        // Compteurs
        countEls.forEach((el) => {
          const target = Number(el.dataset.count ?? 0);
          const state = { value: 0 };
          el.textContent = "0";
          const observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer.disconnect();
            gsap.to(state, {
              value: target,
              duration: 1.8,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = String(Math.round(state.value));
              },
            });
          });
          observer.observe(el);
          cleanups.push(() => observer.disconnect());
        });

        // Parallaxe des images
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const inner = el.querySelector<HTMLElement>(".parallax-inner");
          if (!inner) return;
          const amount = Number(el.dataset.parallax || 9);
          gsap.fromTo(
            inner,
            { yPercent: -amount, scale: 1.16 },
            {
              yPercent: amount,
              scale: 1.16,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, refreshPriority: -1 },
            },
          );
        });

        // Entrée des hero des pages intérieures
        gsap.utils.toArray<HTMLElement>("[data-hero-media]").forEach((el) => {
          gsap.fromTo(el, { scale: 1.18 }, { scale: 1, duration: 2.4, ease: "expo.out" });
        });

        if (!isFinePointer()) return;

        // Boutons magnétiques
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            xTo((event.clientX - rect.left - rect.width / 2) * 0.28);
            yTo((event.clientY - rect.top - rect.height / 2) * 0.38);
          };
          const leave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.4)" });
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });

        // Cartes inclinables
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
          const rxTo = gsap.quickTo(el, "rotateX", { duration: 0.8, ease: "power3.out" });
          const ryTo = gsap.quickTo(el, "rotateY", { duration: 0.8, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;
            rxTo((0.5 - py) * 10);
            ryTo((px - 0.5) * 12);
            el.style.setProperty("--gx", `${px * 100}%`);
            el.style.setProperty("--gy", `${py * 100}%`);
          };
          const leave = () => {
            rxTo(0);
            ryTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });

        // Halo qui suit le pointeur (cartes d'abonnement)
        gsap.utils.toArray<HTMLElement>("[data-spotlight]").forEach((el) => {
          const move = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
            el.style.setProperty("--my", `${event.clientY - rect.top}px`);
          };
          el.addEventListener("pointermove", move);
          cleanups.push(() => el.removeEventListener("pointermove", move));
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      cleanups.forEach((fn) => fn());
      ctx?.revert();
    };
  }, [pathname]);

  // Curseur
  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label || !isFinePointer() || prefersReducedMotion()) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(cursor, { x: -100, y: -100 });
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      const target = event.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, summary, input, select, textarea, [role='button']");
      if (labelled) {
        label.textContent = labelled.dataset.cursor ?? "";
        cursor.classList.add("is-label");
        cursor.classList.remove("is-link");
      } else {
        cursor.classList.remove("is-label");
        cursor.classList.toggle("is-link", Boolean(interactive));
      }
    };
    const onLeave = () => cursor.classList.add("is-hidden");
    const onEnter = () => cursor.classList.remove("is-hidden");

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div ref={cursorRef} className="cursor" aria-hidden="true">
        <span ref={labelRef} className="cursor__label" />
      </div>
    </>
  );
}
