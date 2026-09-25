"use client";

import { useEffect, useId, useMemo, useState } from "react";

/**
 * Renderiza arte em braille (U+2800–U+28FF) como pontos em SVG.
 * Cada caractere vira sua grade 2×4 de pontos com espaçamento quadrado —
 * proporção fiel ao original, sem depender da fonte do sistema.
 * Bordas vazias são cortadas para a arte ocupar todo o espaço.
 */

// posição (coluna, linha) de cada bit do caractere braille
const BIT_POS: [number, number][] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [0, 3],
  [1, 3],
];

function decode(art: string) {
  const dots: [number, number][] = [];
  art.split("\n").forEach((line, row) => {
    Array.from(line).forEach((ch, col) => {
      const code = (ch.codePointAt(0) ?? 0) - 0x2800;
      if (code <= 0 || code > 0xff) return;
      BIT_POS.forEach(([dx, dy], bit) => {
        if (code & (1 << bit)) dots.push([col * 2 + dx, row * 4 + dy]);
      });
    });
  });
  if (dots.length === 0) return { d: "", w: 1, h: 1 };
  const xs = dots.map((p) => p[0]);
  const ys = dots.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const w = Math.max(...xs) - minX + 1;
  const h = Math.max(...ys) - minY + 1;
  const d = dots.map(([x, y]) => `M${x - minX + 0.5} ${y - minY + 0.5}h0`).join("");
  return { d, w, h };
}

interface BrailleArtProps {
  art: string;
  className?: string;
  /** Faixa de brilho atravessando a arte lentamente */
  shimmer?: boolean;
}

export function BrailleArt({ art, className, shimmer = true }: BrailleArtProps) {
  const { d, w, h } = useMemo(() => decode(art), [art]);
  const id = useId().replace(/:/g, "");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(shimmer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [shimmer]);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`sweep-${id}`} gradientUnits="userSpaceOnUse" x1={-w} y1={0} x2={0} y2={h * 0.35}>
          <stop offset="0" stopColor="rgba(240,236,232,0.42)" />
          <stop offset="0.42" stopColor="rgba(240,236,232,0.42)" />
          <stop offset="0.5" stopColor="rgba(240,236,232,0.95)" />
          <stop offset="0.58" stopColor="rgba(240,236,232,0.42)" />
          <stop offset="1" stopColor="rgba(240,236,232,0.42)" />
          {animate && (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="0 0"
              to={`${w * 2} 0`}
              dur="7s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
      </defs>
      <path d={d} stroke={`url(#sweep-${id})`} strokeWidth={0.95} strokeLinecap="round" />
    </svg>
  );
}
