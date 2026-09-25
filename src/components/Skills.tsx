"use client";

import { BrainCircuit, Code2, Database, Plug, type LucideIcon } from "lucide-react";
import { skillGroups, ui, type SkillGroup } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  plug: Plug,
  database: Database,
  brain: BrainCircuit,
};

export function Skills() {
  const { t } = useLang();

  return (
    <Reveal id="tecnologias">
      <SectionHeader title={t(ui.technologies)} />
      <p data-tl="fade" className="line-bottom px-4 py-5 text-[14px] leading-relaxed text-fg2 sm:px-6">
        {t(ui.technologiesSub)}
      </p>

      <div className="grid gap-px bg-line sm:grid-cols-2">
        {skillGroups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <div
              key={group.title.en}
              data-tl="card"
              className="group relative flex flex-col bg-bg px-4 py-7 transition-colors duration-300 hover:bg-card sm:px-6"
            >
              <span data-tl-bar aria-hidden className="absolute inset-x-0 top-0 h-px bg-fg/40" />

              <h3 className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg">
                <Icon className="h-4 w-4 text-fg3 transition-colors duration-300 group-hover:text-fg" strokeWidth={1.75} />
                {t(group.title)}
              </h3>

              <p className="mt-4 max-w-[44ch] text-[13.5px] leading-relaxed text-fg3">{t(group.description)}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.en}
                    data-tl="pop"
                    className="cursor-default rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-[11.5px] text-fg2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.2] hover:bg-white/[0.05] hover:text-fg"
                  >
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
