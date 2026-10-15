"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";
import { zones } from "@/lib/content";
import { ArrowIcon } from "../Icons";

/**
 * La visite : on traverse le club zone par zone, comme dans un couloir.
 * Desktop : défilement horizontal épinglé avec signalétique et barre de progression.
 * Mobile / mouvement réduit : parcours vertical.
 */
export default function ClubTour() {
  const root = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      section.classList.add("is-horizontal");
      const pin = section.querySelector<HTMLElement>(".tour__pin");
      const track = section.querySelector<HTMLElement>(".tour__track");
      const fill = section.querySelector<HTMLElement>(".tour__hud-fill");
      const zoneNumber = section.querySelector<HTMLElement>("[data-hud-number]");
      const zoneName = section.querySelector<HTMLElement>("[data-hud-name]");
      const panels = gsap.utils.toArray<HTMLElement>(".zone", section);
      if (!pin || !track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      let current = -1;

      // Signalétique calée sur la position réelle du couloir (y compris pendant le lissage du scrub)
      const updateHud = () => {
        const total = distance();
        const x = Number(gsap.getProperty(track, "x")) || 0;
        if (fill) gsap.set(fill, { scaleX: total ? Math.min(1, -x / total) : 0 });
        // Zone active : celle dont le texte occupe le plus de largeur à l'écran
        let active = 0;
        let best = -1;
        panels.forEach((panel, index) => {
          const rect = (panel.querySelector(".zone__copy") ?? panel).getBoundingClientRect();
          const visible = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
          if (visible > best) {
            best = visible;
            active = index;
          }
        });
        if (active !== current) {
          current = active;
          const zone = zones[active];
          if (zoneNumber) zoneNumber.textContent = zone.number;
          if (zoneName) zoneName.textContent = zone.sign;
        }
      };

      const move = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        onUpdate: updateHud,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: updateHud,
        },
      });

      // Parallaxe interne et entrée des contenus, synchronisées sur le défilement horizontal
      panels.forEach((panel) => {
        const inner = panel.querySelector<HTMLElement>(".parallax-inner");
        if (inner) {
          gsap.fromTo(
            inner,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: move,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }
        const media = panel.querySelector<HTMLElement>(".zone__media");
        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(12% 0% 12% 18%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: move, start: "left 95%", end: "left 35%", scrub: true },
            },
          );
        }
      });

      ScrollTrigger.refresh();

      return () => {
        section.classList.remove("is-horizontal");
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="tour" id="visite" aria-labelledby="tour-title">
      <div className="tour__pin">
        <div className="tour__hud" aria-hidden="true">
          <div className="tour__hud-zone">
            <span>
              Zone <b data-hud-number>01</b> / 05
            </span>
            <span data-hud-name>{zones[0].sign}</span>
          </div>
          <div className="tour__hud-bar">
            <span className="tour__hud-fill" />
          </div>
          <span>Sortie →</span>
        </div>

        <div className="tour__track">
          <div className="tour__intro">
            <span className="kicker copper" data-reveal>
              La visite
            </span>
            <h2 id="tour-title" className="display" data-split>
              Entre. On te fait le tour.
            </h2>
            <p data-reveal>Cinq espaces, une seule adresse. Suis la signalétique, on commence par le café.</p>
            <span className="kicker tour__hint" aria-hidden="true">
              Continue de défiler <i />
            </span>
          </div>

          {zones.map((zone) => (
            <article key={zone.id} className="zone" id={`zone-${zone.id}`} aria-labelledby={`zone-${zone.id}-title`}>
              <div className="zone__media frame frame--grade">
                <div className="parallax-inner">
                  <Image
                    src={zone.image.src}
                    alt={zone.image.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectPosition: zone.image.focus }}
                  />
                </div>
              </div>
              <div className="zone__copy">
                <span className="zone__number" aria-hidden="true">
                  {zone.number}
                </span>
                <span className="zone__sign" data-reveal>
                  <ArrowIcon />
                  Zone {zone.number} · {zone.sign}
                </span>
                <h3 id={`zone-${zone.id}-title`} className="display zone__title" data-reveal data-delay="0.06">
                  {zone.title}
                </h3>
                <span className="kicker zone__meta" data-reveal data-delay="0.12">
                  {zone.meta}
                </span>
                <p className="zone__text" data-reveal data-delay="0.18">
                  {zone.text}
                </p>
                {zone.link ? (
                  <Link href={zone.link.href} className="link-line zone__link" data-reveal data-delay="0.24">
                    {zone.link.label}
                    <ArrowIcon className="btn__arrow" />
                  </Link>
                ) : null}
              </div>
            </article>
          ))}

          <div className="tour__outro">
            <span className="kicker copper" data-reveal>
              Fin de la visite
            </span>
            <h3 className="display" data-split>
              Tu as fait le tour. À toi de jouer.
            </h3>
            <div data-reveal>
              <Link href="/abonnements" className="btn btn--light" data-magnetic>
                Choisir mon abonnement
                <ArrowIcon className="btn__arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
