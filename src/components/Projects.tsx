"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { featuredProjects, ui, webProjects, webProjectsIntro, type FeaturedProject, type WebProject } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { SectionHeader, SubHeader } from "@/components/ui/section-header";
import { SitePreview } from "@/components/SitePreview";
import { cn } from "@/lib/utils";

interface CoverData {
  title: string;
  kicker: string;
  accent: string;
  image?: string;
  /** Alinha a imagem ao topo (prints de página inteira) */
  top?: boolean;
}

/** Capa do projeto: usa a imagem se existir, senão gera um mock de janela de navegador. */
function ProjectCover({ cover, large }: { cover: CoverData; large?: boolean }) {
  if (cover.image) {
    return (
      <Image
        src={cover.image}
        alt={cover.title}
        fill
        sizes={large ? "(min-width: 768px) 432px, 100vw" : "(min-width: 768px) 256px, 100vw"}
        quality={90}
        className={cn(
          "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]",
          cover.top && "object-top",
        )}
      />
    );
  }
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "#121212" }}
    >
      <div
        className={cn(
          "w-[78%] overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] shadow-2xl shadow-black/60 transition-transform duration-500 ease-out group-hover:scale-[1.05]",
          large ? "max-w-[340px]" : "max-w-[220px]",
        )}
      >
        <div className="flex items-center gap-1 border-b border-white/5 px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="ml-2 h-1.5 flex-1 rounded-full bg-white/5" />
        </div>
        <div className={cn("flex flex-col items-center px-4 text-center", large ? "gap-2 py-6" : "gap-1.5 py-4")}>
          <span className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: cover.accent }}>
            {cover.kicker}
          </span>
          <span className={cn("font-serif leading-none text-fg", large ? "text-2xl" : "text-base")}>{cover.title}</span>
          <span className="h-1 w-3/4 rounded-full bg-white/5" />
          <span className="h-1 w-1/2 rounded-full bg-white/5" />
          <span className="mt-1 h-3 w-16 rounded-full" style={{ background: cover.accent }} />
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ project }: { project: FeaturedProject }) {
  const { t } = useLang();
  return (
    <article data-tl="card" className="group flex flex-col bg-bg transition-colors duration-300 hover:bg-card">
      <div data-tl-media className="relative aspect-[16/10] overflow-hidden border-b border-line bg-card">
        <ProjectCover cover={{ title: project.title, kicker: t(project.subtitle), accent: project.accent, image: project.image }} large />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <h3 className="font-serif text-[26px] leading-tight tracking-[0.02em] text-fg">{project.title}</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{t(project.subtitle)}</p>
        </div>

        {project.description.map((d) => (
          <p key={d.en} className="text-[13px] leading-relaxed text-fg2">
            <RichText text={t(d)} />
          </p>
        ))}

        <div>
          <p className="mono-label">{t(project.featuresLead)}</p>
          <dl className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {project.features.map((group) => (
              <div
                key={group.title.en}
                className="flex flex-col gap-2.5 bg-bg p-3.5 transition-colors duration-300 group-hover:bg-card sm:[&:last-child:nth-child(odd)]:col-span-2"
              >
                <dt className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  {t(group.title)}
                  <span className="text-muted2">{String(group.items.length).padStart(2, "0")}</span>
                </dt>
                <dd>
                  <ul className="flex flex-col gap-1.5">
                    {group.items.map((f) => (
                      <li key={f.en} className="flex items-start gap-2 text-[12px] leading-snug text-fg2">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                        {t(f)}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="text-[13px] leading-relaxed text-fg2">{t(project.closing)}</p>

        <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {t(ui.status)}: <span className="text-fg">{t(project.status)}</span>
        </p>
      </div>

      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg sm:px-5"
        >
          {t(project.cta)}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </a>
      ) : (
        <p className="flex items-center justify-between border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:px-5">
          {t(ui.caseSoon)}
          <Clock className="h-3 w-3" />
        </p>
      )}
    </article>
  );
}

function WebCard({ project }: { project: WebProject }) {
  const { t } = useLang();
  return (
    <SitePreview project={project}>
    <button type="button" data-tl="card" className="group flex flex-col bg-bg text-left transition-colors duration-300 hover:bg-card">
      <div data-tl-media className="relative aspect-[16/10] overflow-hidden border-b border-line bg-card">
        <ProjectCover cover={{ title: t(project.title), kicker: t(project.label), accent: project.accent, image: project.image, top: true }} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-4 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{t(project.label)}</span>
        <h4 className="text-[14px] font-medium text-fg">{t(project.title)}</h4>
        <p className="text-[12px] leading-relaxed text-fg2">{t(project.description)}</p>
      </div>
      <span className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-fg">
        {t(project.cta)}
        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </button>
    </SitePreview>
  );
}

export function Projects() {
  const { t } = useLang();
  return (
    <Reveal id="projetos">
      <SectionHeader title={t(ui.featured)} />

      {/* Destaques: vazam para fora do container como na referência */}
      <div className="line-bottom grid gap-px bg-line md:-mx-12 md:grid-cols-2 md:border-x md:border-line">
        {featuredProjects.map((p) => (
          <FeaturedCard key={p.slug} project={p} />
        ))}
      </div>

      {/* Web Projects */}
      <SubHeader label={t(webProjectsIntro.label)} />
      <div className="line-bottom px-4 py-6 sm:px-6">
        <h3 data-tl="fade" className="font-serif text-[22px] leading-tight text-fg">{t(webProjectsIntro.title)}</h3>
        <p data-tl="fade" className="mt-2 text-[14px] leading-relaxed text-fg2">{t(webProjectsIntro.description)}</p>
      </div>
      <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
        {webProjects.map((p) => (
          <WebCard key={p.label.en} project={p} />
        ))}
      </div>
    </Reveal>
  );
}
