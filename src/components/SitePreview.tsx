"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, MousePointer2, X } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { startScroll, stopScroll } from "@/lib/lenis";
import { ui, type WebProject } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Velocidade da rolagem automática (px por segundo) */
const SCROLL_SPEED = 420;

/** Colchetes nos 4 cantos da moldura */
function Brackets() {
  const base = "pointer-events-none absolute h-6 w-6 border-fg";
  return (
    <>
      <span data-bracket="tl" className={cn(base, "-left-3 -top-3 border-l-2 border-t-2")} />
      <span data-bracket="tr" className={cn(base, "-right-3 -top-3 border-r-2 border-t-2")} />
      <span data-bracket="bl" className={cn(base, "-bottom-3 -left-3 border-b-2 border-l-2")} />
      <span data-bracket="br" className={cn(base, "-bottom-3 -right-3 border-b-2 border-r-2")} />
    </>
  );
}

/** Página longa gerada, usada enquanto não houver print do site */
function MockPage({ accent, title }: { accent: string; title: string }) {
  const block = "rounded-lg bg-white/[0.04]";
  return (
    <div className="flex flex-col gap-10 bg-[#0d0d0d] px-[8%] py-10" style={{ height: 2600 }}>
      <div className="flex items-center justify-between">
        <span className="h-4 w-24 rounded-full" style={{ background: accent }} />
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-2 w-12 rounded-full bg-white/10" />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: accent }}>
          preview
        </span>
        <span className="font-serif text-5xl text-fg">{title}</span>
        <span className="h-2 w-2/3 rounded-full bg-white/10" />
        <span className="h-2 w-1/2 rounded-full bg-white/10" />
        <span className="mt-4 h-10 w-40 rounded-full" style={{ background: accent }} />
      </div>
      <div className={cn(block, "h-72")} />
      <div className="grid grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cn(block, "h-52")} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className={cn(block, "h-80")} />
        <div className="flex flex-col justify-center gap-3">
          <span className="h-3 w-3/4 rounded-full bg-white/15" />
          <span className="h-2 w-full rounded-full bg-white/10" />
          <span className="h-2 w-5/6 rounded-full bg-white/10" />
          <span className="mt-3 h-8 w-32 rounded-full" style={{ background: accent }} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={cn(block, "h-32")} />
        ))}
      </div>
      <div className={cn(block, "h-64")} />
      <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-8">
        <span className="h-3 w-20 rounded-full" style={{ background: accent }} />
        <span className="h-2 w-40 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

interface SitePreviewProps {
  project: WebProject;
  children: ReactNode;
}

/**
 * Card que, ao ser clicado, abre o site em uma janela ampliada com moldura de colchetes.
 * Com o mouse sobre a imagem, a página rola sozinha até o fim; ao sair, volta ao topo.
 */
export function SitePreview({ project, children }: SitePreviewProps) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(true);
  /** Largura real do print: a janela nunca amplia a imagem além dela (evita borrar) */
  const [naturalWidth, setNaturalWidth] = useState<number | null>(null);

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // pausa o smooth scroll da página enquanto a janela está aberta
  useEffect(() => {
    if (!open) return;
    stopScroll();
    return () => startScroll();
  }, [open]);

  const onOpenAutoFocus = useCallback(() => {
    if (prefersReducedMotion()) return;
    const frame = frameRef.current;
    if (!frame) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(frame, { opacity: 0, scale: 0.94, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.55 })
      .fromTo(frame.querySelectorAll("[data-bracket='tl']"), { x: 24, y: 24, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .fromTo(frame.querySelectorAll("[data-bracket='tr']"), { x: -24, y: 24, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5 }, "<")
      .fromTo(frame.querySelectorAll("[data-bracket='bl']"), { x: 24, y: -24, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5 }, "<")
      .fromTo(frame.querySelectorAll("[data-bracket='br']"), { x: -24, y: -24, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5 }, "<");
  }, []);

  // rolagem automática ao passar o mouse
  const scrollTo = (toBottom: boolean) => {
    const viewport = viewportRef.current;
    const page = pageRef.current;
    if (!viewport || !page) return;
    const distance = Math.max(0, page.offsetHeight - viewport.clientHeight);
    const duration = toBottom ? Math.max(1.5, distance / SCROLL_SPEED) : 0.9;
    page.style.transition = `transform ${duration}s ${toBottom ? "cubic-bezier(0.45, 0, 0.55, 1)" : "cubic-bezier(0.16, 1, 0.3, 1)"}`;
    page.style.transform = `translateY(${toBottom ? -distance : 0}px)`;
  };


  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md data-[state=open]:animate-[fade-in_0.3s_ease-out]" />
        <Dialog.Content
          data-lenis-prevent
          onOpenAutoFocus={onOpenAutoFocus}
          style={{
            width: project.preview
              ? `min(${Math.min(Math.max(naturalWidth ?? 1100, 420), 1100)}px, calc(100vw - 48px))`
              : "min(1100px, calc(100vw - 48px))",
          }}
          className="fixed left-1/2 top-1/2 z-[61] -translate-x-1/2 -translate-y-1/2 outline-none"
        >
          <div ref={frameRef}>
            {/* Janela do navegador, contornada pelos colchetes */}
            <div className="relative">
            <Brackets />
            <Dialog.Close
              aria-label={t(ui.close)}
              className="absolute -right-3 -top-12 flex h-8 w-8 items-center justify-center rounded-full border border-line-hover bg-card text-fg2 transition-colors hover:text-fg"
            >
              <X className="h-3.5 w-3.5" />
            </Dialog.Close>
            <div className="overflow-hidden rounded-xl border border-line-hover bg-card shadow-2xl shadow-black">
              {/* Área da página: rola sozinha com o mouse em cima */}
              <div
                ref={viewportRef}
                onMouseEnter={() => fine && scrollTo(true)}
                onMouseLeave={() => fine && scrollTo(false)}
                className={cn("relative h-[min(68vh,640px)] bg-[#0d0d0d]", fine ? "overflow-hidden" : "overflow-y-auto")}
              >
                <div ref={pageRef} className="will-change-transform">
                  {project.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.preview}
                      alt={t(project.title)}
                      className="mx-auto block w-full select-none"
                      style={{ maxWidth: naturalWidth ?? undefined }}
                      draggable={false}
                      onLoad={(e) => {
                        setNaturalWidth(e.currentTarget.naturalWidth);
                        if (pageRef.current) pageRef.current.style.transform = "translateY(0px)";
                      }}
                    />
                  ) : (
                    <MockPage accent={project.accent} title={t(project.title)} />
                  )}
                </div>

                {fine && (
                  <span className="pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg2 backdrop-blur transition-opacity duration-300 [div:hover>&]:opacity-0">
                    <MousePointer2 className="h-3 w-3" />
                    {t(ui.hoverToScroll)}
                  </span>
                )}
              </div>
            </div>
            </div>

            {/* Rodapé da janela */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <div>
                <Dialog.Title className="font-serif text-[22px] leading-tight text-fg">{t(project.title)}</Dialog.Title>
                <Dialog.Description className="mt-1 max-w-xl text-[13px] text-fg2">{t(project.description)}</Dialog.Description>
              </div>
              {project.href && (
                <a
                  data-magnetic=""
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-fg px-4 text-[13px] font-medium text-bg transition-colors hover:bg-[#e0dcd8]"
                >
                  {t(ui.openSite)}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
