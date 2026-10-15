import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

declare global {
  interface Window {
    __waysReady?: boolean;
    __waysIntroDone?: boolean;
  }
}

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

/** Défilement fluide partagé par toutes les pages (désactivé si mouvement réduit). */
export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;
  if (prefersReducedMotion()) return null;

  lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
  lenis.on("scroll", ScrollTrigger.update);
  tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  if (document.documentElement.classList.contains("is-locked")) lenis.stop();
  return lenis;
}

export function lockScroll() {
  document.documentElement.classList.add("is-locked");
  getLenis()?.stop();
}

export function unlockScroll() {
  document.documentElement.classList.remove("is-locked");
  getLenis()?.start();
}

export function scrollToTarget(target: string | HTMLElement | number, immediate = false) {
  const instance = getLenis();
  if (instance) {
    instance.scrollTo(target, { offset: typeof target === "number" ? 0 : -24, duration: 1.6, immediate });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
    return;
  }
  const element = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  element?.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
}

/** Exécute `callback` quand l'intro (préchargement) est terminée, ou tout de suite. */
export function onIntroDone(callback: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  if (window.__waysIntroDone) {
    callback();
    return () => undefined;
  }
  const handler = () => callback();
  window.addEventListener("ways:intro-done", handler, { once: true });
  return () => window.removeEventListener("ways:intro-done", handler);
}

export function markIntroDone() {
  window.__waysIntroDone = true;
  document.documentElement.classList.add("intro-done");
  window.dispatchEvent(new Event("ways:intro-done"));
}
