"use client";

import { journey, ui } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function Journey() {
  const { t } = useLang();
  return (
    <Reveal id="trajetoria">
      <SectionHeader title={t(ui.myJourney)} />
      <dl className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 md:grid-cols-4">
        {journey.map((m) => (
          <div
            key={m.title.en}
            data-tl="card"
            className="group relative flex flex-col gap-2 bg-bg px-4 py-5 transition-colors duration-300 hover:bg-card sm:px-5"
          >
            {/* Linha de progresso da timeline */}
            <span data-tl-bar aria-hidden className="absolute inset-x-0 top-0 h-px bg-fg/50" />
            <dt className="font-serif text-[20px] leading-tight text-fg transition-transform duration-300 group-hover:-translate-y-0.5">
              {t(m.title)}
            </dt>
            <dd className="text-[13px] leading-relaxed text-fg2">{t(m.description)}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
