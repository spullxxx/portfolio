"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { buildSectionTimeline, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealProps {
  id?: string;
  className?: string;
  /** Desliga a timeline automática (quando a seção tem uma cena própria) */
  plain?: boolean;
  children: ReactNode;
}

/**
 * Bloco de seção com linhas de grade. Ao entrar na tela, roda uma timeline GSAP
 * com os elementos marcados com `data-tl` (ver src/lib/gsap.ts).
 */
export function Reveal({ id, className, plain = false, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || plain || prefersReducedMotion()) return;
    return buildSectionTimeline(el);
  }, [plain]);

  return (
    <section ref={ref} id={id} className={cn("line-top line-bottom scroll-mt-14 border-x border-line", className)}>
      {children}
    </section>
  );
}
