"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";
import { lockScroll, markIntroDone, unlockScroll } from "@/lib/scroll";

const STORAGE_KEY = "ways-intro";

/** Écran d'ouverture : le logo se dessine, le compteur monte, le rideau se lève. Une fois par session. */
export default function Preloader() {
  const root = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen || prefersReducedMotion() || !root.current) {
      setDone(true);
      markIntroDone();
      return;
    }

    lockScroll();
    const counter = root.current.querySelector<HTMLElement>(".preloader__count");
    const state = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* stockage indisponible : l'intro rejouera simplement */
          }
          unlockScroll();
          setDone(true);
        },
      });

      tl.fromTo(".preloader__logo-fill", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.7, ease: "power2.inOut" }, 0)
        .to(
          state,
          {
            value: 100,
            duration: 1.7,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(state.value)).padStart(3, "0");
            },
          },
          0,
        )
        .from(".preloader__meta > *", { opacity: 0, y: 12, duration: 0.8, stagger: 0.08 }, 0.1)
        .to(".preloader__logo", { scale: 0.92, opacity: 0, duration: 0.7, ease: "power3.in" }, 1.85)
        .to(".preloader__meta", { opacity: 0, duration: 0.4 }, 1.85)
        .add(() => markIntroDone(), 2.25)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, 2.2);
    }, root);

    return () => {
      ctx.revert();
      unlockScroll();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader__logo">
        <img className="preloader__logo-ghost" src="/ways-logo.svg" alt="" width={980} height={200} />
        <img className="preloader__logo-fill" src="/ways-logo.svg" alt="" width={980} height={200} />
      </div>
      <div className="preloader__meta">
        <span>Training Club · Levallois-Perret</span>
        <span className="preloader__count">000</span>
      </div>
    </div>
  );
}
