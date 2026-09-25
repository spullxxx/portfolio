"use client";

import { useEffect } from "react";

const SELECTOR = "[data-magnetic]";
/** Fração da distância ponteiro→centro que o botão percorre */
const STRENGTH = 0.3;
/** Deslocamento máximo em px */
const MAX_OFFSET = 10;
/** Alcance do "ímã" além da borda do botão, em px */
const REACH = 40;

interface State {
  x: number;
  y: number;
  tx: number;
  ty: number;
}

/**
 * Botões magnéticos: todo elemento com `data-magnetic` se aproxima levemente do ponteiro.
 * Usa a propriedade CSS `translate`, que se soma aos `transform` de hover existentes.
 * Só ativa com mouse (pointer: fine) e sem preferência por movimento reduzido.
 */
export function MagneticEffect() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const states = new Map<HTMLElement, State>();
    let raf = 0;
    let running = false;

    const loop = () => {
      let moving = false;
      states.forEach((s, el) => {
        s.x += (s.tx - s.x) * 0.18;
        s.y += (s.ty - s.y) * 0.18;
        if (Math.abs(s.tx - s.x) < 0.05 && Math.abs(s.ty - s.y) < 0.05) {
          s.x = s.tx;
          s.y = s.ty;
        } else {
          moving = true;
        }
        el.style.translate = s.x === 0 && s.y === 0 ? "" : `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`;
        if (!moving && s.tx === 0 && s.ty === 0 && s.x === 0) states.delete(el);
      });
      if (moving) raf = requestAnimationFrame(loop);
      else running = false;
    };

    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0) return;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const inside =
          e.clientX > r.left - REACH && e.clientX < r.right + REACH && e.clientY > r.top - REACH && e.clientY < r.bottom + REACH;

        let s = states.get(el);
        if (!inside) {
          if (s) {
            s.tx = 0;
            s.ty = 0;
          }
          return;
        }
        if (!s) {
          s = { x: 0, y: 0, tx: 0, ty: 0 };
          states.set(el, s);
        }
        const clamp = (v: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, v));
        s.tx = clamp(dx * STRENGTH);
        s.ty = clamp(dy * STRENGTH);
      });
      kick();
    };

    const release = () => {
      states.forEach((s) => {
        s.tx = 0;
        s.ty = 0;
      });
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", release, { passive: true });
    document.addEventListener("pointerleave", release);
    window.addEventListener("blur", release);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", release);
      document.removeEventListener("pointerleave", release);
      window.removeEventListener("blur", release);
      states.forEach((_, el) => (el.style.translate = ""));
    };
  }, []);

  return null;
}
