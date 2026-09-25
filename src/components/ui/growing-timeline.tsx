"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Linha do tempo vertical que começa na primeira bolinha e cresce junto com o conteúdo:
 * bolinha aparece → texto surge → a linha desce até a próxima bolinha → …
 * Cada trecho da linha vai do centro de uma bolinha até o centro da seguinte
 * (altura = altura do item), então acompanha quebras de linha e redimensionamentos.
 */
export function GrowingTimeline({ items }: { items: { key: string; content: ReactNode }[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-row]"));
      const dots = rows.map((r) => r.querySelector("[data-dot]")!);
      const texts = rows.map((r) => r.querySelector("[data-text]")!);
      const segs = rows.map((r) => r.querySelector("[data-seg]"));

      gsap.set(dots, { scale: 0 });
      gsap.set(texts, { opacity: 0, y: 10 });
      gsap.set(segs.filter(Boolean), { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
        onComplete: () => {
          gsap.set([...dots, ...texts], { clearProps: "transform,opacity" });
        },
      });

      rows.forEach((_, i) => {
        tl.to(dots[i]!, { scale: 1, duration: 0.35, ease: "back.out(2.5)" })
          .to(texts[i]!, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "<0.05");
        const seg = segs[i];
        if (seg) tl.to(seg, { scaleY: 1, duration: 0.6, ease: "power1.inOut" }, "<0.25");
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <ol ref={ref} className="relative mt-6">
      {items.map((item, i) => (
        <li key={item.key} data-row className="group relative pb-6 pl-8 last:pb-0">
          {/* trecho da linha até a próxima bolinha */}
          {i < items.length - 1 && (
            <span data-seg aria-hidden className="absolute left-[5px] top-[12px] h-full w-px bg-white/[0.16]" />
          )}
          <span
            data-dot
            aria-hidden
            className="absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border border-white/[0.3] bg-bg transition-colors duration-300 group-hover:border-fg group-hover:bg-fg"
          />
          <div data-text>{item.content}</div>
        </li>
      ))}
    </ol>
  );
}
