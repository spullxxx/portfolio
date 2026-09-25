"use client";

import { Check, FlaskConical } from "lucide-react";
import { aiLab, ui } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { BrailleArt } from "@/components/ui/braille-art";
import { aiLabArt } from "@/data/aiLabArt";
import { StackIcon } from "@/components/ui/stack-icon";

/* ───────────── Seção ───────────── */

export function AILab() {
  const { t } = useLang();
  const stack = aiLab.stack.map((s) => ({ ...s, text: t(s.label) }));

  return (
    <Reveal id="ai-lab">
      {/* Identificação da seção */}
      <header data-tl="title" className="line-bottom flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg3">
          <FlaskConical className="h-3.5 w-3.5" />
          {t(aiLab.label)}
        </span>
      </header>

      {/* Título + introdução + grafo */}
      <div className="line-bottom grid items-center gap-8 px-4 py-10 sm:grid-cols-[1fr_200px] sm:px-6 sm:py-12 md:grid-cols-[1fr_230px]">
        <div data-tl="fade">
          <h2 className="max-w-[20ch] font-serif text-[28px] leading-[1.15] tracking-[-0.015em] text-fg sm:text-[34px]">
            {t(aiLab.title)}
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-fg2">{t(aiLab.intro)}</p>
        </div>
        <div data-tl="fade" className="mx-auto w-full max-w-[240px] sm:max-w-none">
          <BrailleArt art={aiLabArt} className="h-auto w-full" />
        </div>
      </div>

      {/* Capacidades */}
      <div>
        <div className="px-4 py-8 sm:px-6">
          <p data-tl="fade" className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg3">
            {t(aiLab.goalsLead)}
          </p>
          <ul className="mt-5 flex flex-col md:grid md:grid-flow-col md:grid-cols-2 md:grid-rows-3 md:gap-x-10">
            {aiLab.goals.map((g) => (
              <li
                key={g.en}
                data-tl="fade"
                className="group flex cursor-default items-center gap-3.5 border-b border-white/[0.05] py-3 last:border-b-0 md:[&:nth-child(3)]:border-b-0"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/[0.12] bg-white/[0.02] text-fg2 transition-all duration-300 group-hover:border-white/[0.28] group-hover:bg-white/[0.06] group-hover:text-fg group-hover:shadow-[0_0_0_3px_rgba(240,236,232,0.04)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
                <span className="text-[14.5px] text-fg2 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-fg">
                  {t(g)}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Faixa inferior STACK */}
      <div data-tl="fade" className="line-top flex items-stretch">
        <span className="flex shrink-0 items-center border-r border-line bg-bg px-4 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fg3 sm:px-6">
          {t(ui.stack)}
        </span>
        <div className="group/stack relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <ul className="flex w-max animate-marquee-slow items-center py-4 group-hover/stack:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:gap-y-2">
            {[...stack, ...stack].map((item, i) => (
              <li
                key={`${item.logo}-${i}`}
                aria-hidden={i >= stack.length}
                className={cn(
                  "flex items-center whitespace-nowrap pl-6 text-[13px] text-fg2",
                  i >= stack.length && "motion-reduce:hidden",
                )}
              >
                <span aria-hidden className="mr-6 text-muted">
                  •
                </span>
                <StackIcon logo={item.logo} className="mr-2 h-3.5 w-3.5 shrink-0 text-fg3" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
