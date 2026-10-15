"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONTACT_EMAIL, SIGNATURE, navLinks } from "@/lib/content";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { ArrowIcon } from "./Icons";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const goingDown = y > lastY.current + 4;
      const goingUp = y < lastY.current - 4;
      if (goingDown && y > 280) setHidden(true);
      if (goingUp || y < 120) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) lockScroll();
    else if (wasOpen.current) unlockScroll();
    wasOpen.current = open;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  const className = [
    "site-header",
    scrolled ? "is-scrolled" : "",
    hidden && !open ? "is-hidden" : "",
    open ? "is-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={className}>
        <Link href="/" className="site-header__logo" aria-label="WAYS — accueil">
          <img src="/ways-logo.svg" alt="WAYS" width={980} height={200} />
        </Link>

        <nav className="site-header__nav" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href="/abonnements" className="btn btn--light btn--sm site-header__cta" data-magnetic>
            Devenir membre
            <ArrowIcon className="btn__arrow" />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="menu" className={open ? "menu is-open" : "menu"} aria-hidden={!open}>
        <ul className="menu__links">
          <li>
            <Link href="/" tabIndex={open ? 0 : -1}>
              <span>Le club</span>
            </Link>
          </li>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <p className="menu__signature">{SIGNATURE}</p>
          <div>
            <a className="link-line" href={`mailto:${CONTACT_EMAIL}`} tabIndex={open ? 0 : -1}>
              {CONTACT_EMAIL}
            </a>
          </div>
          <Link href="/abonnements" className="btn btn--light" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            Devenir membre
            <ArrowIcon className="btn__arrow" />
          </Link>
        </div>
      </div>
    </>
  );
}
