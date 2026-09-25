"use client";

import { process, ui } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function Process() {
  const { t } = useLang();
  return (
    <Reveal id="processo">
      <SectionHeader title={t(ui.howIWork)} />
      <ol className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 md:grid-cols-3">
        {process.map((step, i) => (
          <li key={step.title.en} data-tl="card" className="group relative flex flex-col gap-2 bg-bg px-4 py-5 transition-colors duration-300 hover:bg-card sm:px-5">
            <span data-tl-bar aria-hidden className="absolute inset-x-0 top-0 h-px bg-fg/40" />
            <span className="font-mono text-[11px] text-muted transition-colors group-hover:text-fg">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-[22px] leading-tight text-fg">{t(step.title)}</h3>
            <p className="text-[13px] leading-relaxed text-fg2">{t(step.description)}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
