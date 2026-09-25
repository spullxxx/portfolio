"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/lenis";

/** Altura da navbar fixa + respiro */
const NAV_OFFSET = 56;

/** Posição absoluta do elemento no documento, ignorando transforms (ex.: animação de entrada). */
function documentTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

/**
 * Smooth scroll com Lenis: rolagem com inércia suave no mouse/trackpad
 * e navegação macia pelos links âncora (#projetos, #contato…).
 * Em toque mantém a rolagem nativa; desliga com prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09, // quanto menor, mais macio
      wheelMultiplier: 1,
      // elementos com data-lenis-prevent (ex.: modais) rolam de forma nativa
      prevent: (node) => node.hasAttribute("data-lenis-prevent"),
    });
    setLenis(lenis);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const y = id === "top" ? 0 : Math.max(0, documentTop(target) - NAV_OFFSET);
      lenis.scrollTo(y, { duration: 1.4 });
      history.replaceState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
