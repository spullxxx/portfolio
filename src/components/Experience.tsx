"use client";

import { BookOpen, Clapperboard, Compass } from "lucide-react";
import { beyondCode, experience, profile, studying, ui, whatsNext } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { GrowingTimeline } from "@/components/ui/growing-timeline";
import { SectionHeader, SubHeader } from "@/components/ui/section-header";

/** Chip discreto, compartilhado pelas colunas da seção */
const chip =
  "cursor-default rounded-lg border border-white/[0.08] bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-fg2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.2] hover:bg-white/[0.05] hover:text-fg";

export function Experience() {
  const { t } = useLang();

  return (
    <>
      {/* Experiência */}
      <Reveal id="experiencia">
        <SectionHeader title={t(ui.experience)} />
        <div className="grid md:grid-cols-[1fr_350px]">
          <div className="px-4 py-9 sm:px-6">
            {/* Cargo + local */}
            <div data-tl="fade" className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fg font-mono text-[9px] font-medium text-bg">
                {profile.initials}
              </span>
              <span className="text-[15px] font-medium text-fg">{t(experience.role)}</span>
              <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg3">
                {profile.location}
                <span className="h-1.5 w-1.5 rounded-full bg-fg" />
              </span>
            </div>

            {/* Linha do tempo: começa na 1ª bolinha e cresce junto com o conteúdo */}
            <GrowingTimeline
              items={experience.paragraphs.map((p) => ({
                key: p.en,
                content: (
                  <p className="max-w-[52ch] text-[14.5px] leading-[1.7] text-fg2">
                    <RichText text={t(p)} />
                  </p>
                ),
              }))}
            />
          </div>

          {/* Competências */}
          <div className="border-t border-line px-4 py-9 sm:px-6 md:border-l md:border-t-0">
            <p data-tl="fade" className="text-balance text-[14px] leading-relaxed text-fg3">
              {t(experience.skillsLead)}
            </p>
            {/* Página de caderno: pauta, margem e furos */}
            <div
              data-tl="fade"
              className="relative mt-5 overflow-hidden rounded-md border border-white/[0.08] bg-[#0e0e0e] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              {/* furos da lateral */}
              <div aria-hidden className="absolute inset-y-0 left-3 flex flex-col justify-evenly">
                {[0, 1, 2].map((h) => (
                  <span key={h} className="h-2.5 w-2.5 rounded-full border border-white/[0.07] bg-bg shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
                ))}
              </div>
              {/* linha de margem */}
              <span aria-hidden className="absolute inset-y-0 left-[46px] w-px bg-red-400/25" />

              <ol
                className="pb-1"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(255,255,255,0.065) 31px, rgba(255,255,255,0.065) 32px)",
                }}
              >
                {experience.skills.map((item, i) => (
                  <li key={item.en} className="group flex h-8 cursor-default items-end pb-[7px]">
                    <span className="w-[46px] shrink-0 pl-7 font-mono text-[9px] text-muted transition-colors duration-300 group-hover:text-fg3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      data-tl="write"
                      className="pl-3 font-serif text-[15px] italic leading-none text-fg2 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-fg"
                    >
                      {t(item)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Além do código / Estudando agora */}
      <Reveal>
        <div className="grid md:grid-cols-2">
          <div className="md:border-r md:border-line">
            <SubHeader icon={<Clapperboard className="h-3.5 w-3.5" />} label={t(ui.beyondCode)} />
            <div className="px-4 py-8 sm:px-6">
              <div className="flex flex-col gap-3">
                {beyondCode.paragraphs.map((p) => (
                  <p key={p.en} data-tl="fade" className="text-[14.5px] leading-[1.7] text-fg2">
                    <RichText text={t(p)} />
                  </p>
                ))}
              </div>
              <blockquote data-tl="fade" className="mt-8 border-l-2 border-line-hover pl-4">
                {beyondCode.quote.map((q, i) => (
                  <p
                    key={q.en}
                    className={
                      i === 0
                        ? "font-serif text-[19px] leading-snug text-fg"
                        : "mt-1 font-serif text-[16px] italic leading-snug text-fg2"
                    }
                  >
                    {t(q)}
                  </p>
                ))}
              </blockquote>
            </div>
          </div>

          <div className="border-t border-line md:border-t-0">
            <SubHeader icon={<BookOpen className="h-3.5 w-3.5" />} label={t(ui.studyingNow)} />
            <div className="px-4 py-8 sm:px-6">
              {studying.intro.map((line, i) => (
                <p
                  key={line.en}
                  data-tl="fade"
                  className={i === 0 ? "font-serif text-[21px] leading-snug text-fg" : "mt-1 font-serif text-[16px] italic text-fg2"}
                >
                  {t(line)}
                </p>
              ))}
              <p data-tl="fade" className="mt-6 text-[14px] leading-relaxed text-fg3">
                {t(studying.lead)}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {studying.topics.map((topic) => (
                  <li key={topic.en} data-tl="pop" className={chip}>
                    {t(topic)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* O que vem depois */}
      <Reveal>
        <SubHeader icon={<Compass className="h-3.5 w-3.5" />} label={t(ui.whatsNext)} />
        <div className="flex flex-col gap-3 px-4 py-8 sm:px-6">
          {whatsNext.map((p, i) => (
            <p
              key={p.en}
              data-tl="fade"
              className={i === whatsNext.length - 1 ? "font-serif text-[20px] leading-snug text-fg" : "max-w-[60ch] text-[15px] leading-[1.75] text-fg2"}
            >
              <RichText text={t(p)} />
            </p>
          ))}
        </div>
      </Reveal>
    </>
  );
}
