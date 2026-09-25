"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { ArrowDown, Menu, X } from "lucide-react";
import { navLinks, ui } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { MusicButton } from "@/components/MusicButton";

export function Navbar() {
  const { lang, toggle, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Abertura: a navbar desce do topo
  useEffect(() => {
    if (!headerRef.current || prefersReducedMotion()) return;
    const tween = gsap.from(headerRef.current, { yPercent: -100, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity" });
    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-40 overflow-x-clip transition-colors duration-300",
        scrolled || open ? "bg-[rgba(14,14,14,0.94)] backdrop-blur-lg" : "bg-bg/40 backdrop-blur-lg",
      )}
    >
      <nav className="line-bottom relative mx-auto grid h-12 max-w-page grid-cols-[1fr_auto_1fr] items-center border-x border-line px-3 sm:px-4">
        {/* Esquerda: links */}
        <ul className="hidden items-center gap-4 text-[13px] text-fg2 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className="transition-colors hover:text-fg">
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>
        <button
          data-magnetic=""
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={t(ui.menu)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg2 hover:text-fg sm:h-8 sm:w-8 md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        <span aria-hidden />

        {/* Direita: status, idioma, contato */}
        <div className="flex items-center justify-end gap-2">
          <MusicButton />
          <button
            data-magnetic=""
            type="button"
            onClick={toggle}
            aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
            className="inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-full border border-line px-2 sm:h-8 sm:min-w-8 font-mono text-[11px] font-medium text-fg transition-colors hover:border-line-hover"
          >
            {lang === "pt" ? "PT" : "EN"}
          </button>

          <a
            data-magnetic=""
            href="#contato"
            title={t(ui.available)}
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-fg pl-3 pr-1.5 sm:h-8 sm:pr-1 text-[13px] font-medium text-bg transition-colors hover:bg-[#e0dcd8]"
          >
            <span className="relative flex h-1.5 w-1.5" title={t(ui.available)}>
              <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-live" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
            </span>
            {t(ui.contactBtn)}
            <span className="sr-only">({t(ui.available)})</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg text-fg transition-transform group-hover:translate-y-0.5">
              <ArrowDown className="h-3 w-3" />
            </span>
          </a>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        className={cn(
          "mx-auto max-w-page overflow-hidden border-x border-line transition-[max-height] duration-300 md:hidden",
          open ? "max-h-80" : "max-h-0",
        )}
      >
        <ul className="line-bottom flex flex-col py-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-fg2 hover:bg-pill hover:text-fg"
              >
                {t(link.label)}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg2">
            <span className="h-1.5 w-1.5 rounded-full bg-live" />
            {t(ui.available)}
          </li>
        </ul>
      </div>
    </header>
  );
}
