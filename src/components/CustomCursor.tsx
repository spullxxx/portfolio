"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = 'a, button, [role="button"], [role="img"][tabindex], label, summary, [data-cursor="hover"]';
const TEXT_FIELD = 'input, textarea, select, [contenteditable="true"]';

/**
 * Cursor personalizado: ponto que segue o mouse instantaneamente + anel com inércia.
 * - Cresce sobre elementos interativos, encolhe ao clicar.
 * - Some sobre campos de texto (volta o cursor de texto nativo).
 * - Só ativa em dispositivos com mouse (pointer: fine).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const setVisible = (v: boolean) => {
      if (v === visible) return;
      visible = v;
      dot.style.opacity = v ? "1" : "0";
      ring.style.opacity = v ? "1" : "0";
    };

    const loop = () => {
      const ease = reduced ? 1 : 0.18;
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      const el = e.target instanceof Element ? e.target : null;
      const onText = Boolean(el?.closest(TEXT_FIELD));
      const onHover = !onText && Boolean(el?.closest(INTERACTIVE));
      setVisible(!onText);
      ring.dataset.state = onHover ? "hover" : "idle";
      dot.dataset.state = onHover ? "hover" : "idle";
    };

    const onDown = () => ring.classList.add("is-pressed");
    const onUp = () => ring.classList.remove("is-pressed");
    const onLeave = () => setVisible(false);

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden className="cursor-ring" data-state="idle" />
      <div ref={dotRef} aria-hidden className="cursor-dot" data-state="idle" />
    </>
  );
}
