"use client";

import { Boxes, BrainCircuit, Globe, Workflow, type LucideIcon } from "lucide-react";
import { capabilities, ui, type Capability } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const icons: Record<Capability["icon"], LucideIcon> = {
  brain: BrainCircuit,
  boxes: Boxes,
  globe: Globe,
  workflow: Workflow,
};

export function Capabilities() {
  const { t } = useLang();
  return (
    <Reveal>
      <SectionHeader title={t(ui.build)} />
      <div className="grid gap-px bg-line md:-mx-12 md:border-x md:border-line sm:grid-cols-2">
        {capabilities.map((c) => {
          const Icon = icons[c.icon];
          return (
            <div key={c.title.en} data-tl="card" className="group relative flex flex-col gap-3 bg-bg p-5 transition-colors duration-300 hover:bg-card sm:p-6">
              <span data-tl-bar aria-hidden className="absolute inset-x-0 top-0 h-px bg-fg/40" />
              <Icon className="h-[18px] w-[18px] text-fg3 transition-colors duration-300 group-hover:text-fg" strokeWidth={1.75} />
              <h3 className="mt-2 font-serif text-[22px] leading-tight text-fg">{t(c.title)}</h3>
              <p className="text-[13px] leading-relaxed text-fg2">{t(c.description)}</p>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
