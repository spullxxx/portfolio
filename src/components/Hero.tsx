"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { heroSocials, profile, ui, whatsappUrl } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { SocialIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { TypedRichText, richLength } from "@/components/ui/rich-text";
import { buildSectionTimeline, prefersReducedMotion } from "@/lib/gsap";
import { BrailleArt } from "@/components/ui/braille-art";
import { heroArt } from "@/data/heroArt";
import { StripeBand } from "@/components/ui/section-header";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/* ───────────── Malha de partículas (Canvas 2D nativo) ───────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999, active: false };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;

    const LINK = 110;
    const MOUSE_R = 160;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((width * height) / 9000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Atração suave em direção ao cursor
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_R && d > 0.1) {
            const f = (1 - d / MOUSE_R) * 0.012;
            p.vx += dx * f * 0.05;
            p.vy += dy * f * 0.05;
          }
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        // velocidade mínima para manter o movimento vivo
        if (Math.abs(p.vx) < 0.04) p.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(p.vy) < 0.04) p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(240,236,232,${(1 - d / LINK) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < MOUSE_R) {
            ctx.strokeStyle = `rgba(240,236,232,${(1 - d / MOUSE_R) * 0.22})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(240,236,232,0.45)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) draw();
      else raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onVisibility = () => !document.hidden && visible && start();

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start();
    });

    resize();
    start();
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-screen -translate-x-1/2 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
    />
  );
}

/* ───────────── Digitação sequencial ───────────── */

/** Digita vários blocos em sequência; retorna quantos caracteres de cada bloco já apareceram. */
function useTypeSequence(texts: string[], speeds: number[], startDelay = 350) {
  const key = texts.join("|");
  const [counts, setCounts] = useState<number[]>(() => texts.map(() => 0));
  const [active, setActive] = useState(0);

  useEffect(() => {
    const lengths = texts.map(richLength);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(lengths);
      setActive(lengths.length - 1);
      return;
    }
    setCounts(lengths.map(() => 0));
    setActive(0);

    let block = 0;
    let chars = 0;
    let timer = 0;
    const tick = () => {
      if (block >= lengths.length) return;
      chars += 1;
      const b = block;
      const c = chars;
      setCounts((prev) => prev.map((v, i) => (i === b ? c : v)));
      if (chars >= lengths[block]!) {
        block += 1;
        chars = 0;
        if (block < lengths.length) setActive(block);
        timer = window.setTimeout(tick, 380); // pausa entre blocos
        return;
      }
      const ch = texts[b]!.replace(/\*\*|\[|\]\([^)]*\)/g, "").charAt(c - 1);
      const pause = /[.,—]/.test(ch) ? 6 : 1;
      timer = window.setTimeout(tick, speeds[b]! * pause);
    };
    timer = window.setTimeout(tick, startDelay);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { counts, active };
}

/* ───────────── Hero ───────────── */

export function Hero() {
  const { lang, t } = useLang();
  const typedTexts = [t(profile.headline), ...profile.bio.map((line) => t(line))];
  const { counts, active } = useTypeSequence(typedTexts, [32, 9, 9], 1100);
  const profileRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLElement>(null);

  // Abertura da página: perfil entra em cascata, depois a bio; a digitação começa em seguida
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const cleanups = [
      profileRef.current && buildSectionTimeline(profileRef.current, { immediate: true, delay: 0.25 }),
      bioRef.current && buildSectionTimeline(bioRef.current, { immediate: true, delay: 0.9 }),
    ];
    return () => cleanups.forEach((c) => c && c());
  }, []);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(t(ui.copied), { description: value });
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <>
      {/* Cartão de perfil */}
      <section ref={profileRef} id="top" className="line-bottom relative mt-12 border-x border-line">
        <ParticleField />
        <div className="relative grid grid-cols-[88px_1fr] sm:grid-cols-[104px_1fr_150px]">
          {/* Avatar */}
          <div className="flex items-center justify-center border-r border-line py-6 sm:py-7">
            <div data-tl="pop" className="relative">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-line-hover bg-card2 font-serif text-xl text-fg sm:h-[72px] sm:w-[72px]">
                {profile.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover grayscale transition-[filter] duration-500 hover:grayscale-0" />
                ) : (
                  profile.initials
                )}
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    role="img"
                    tabIndex={0}
                    aria-label={t(ui.available)}
                    className="absolute bottom-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-[3px] border-bg bg-bg"
                  >
                    <span className="absolute inline-flex h-2.5 w-2.5 animate-ping2 rounded-full bg-live" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>{t(ui.available)}</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Identidade */}
          <div className="min-w-0 px-4 py-6 sm:px-5 sm:py-7">
            <h1 data-tl="fade" className="font-serif text-[24px] leading-[1.1] tracking-[-0.01em] text-fg sm:text-[30px]">{profile.shortName}</h1>
            <p data-tl="fade" className="mt-2 font-mono text-[11px] text-muted">{profile.handle}</p>
            <p data-tl="fade" className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg2">{t(profile.role)}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {heroSocials.map((s) => {
                const isEmail = s.id === "email";
                const isSoon = !s.href;
                const cls =
                  "flex h-9 w-9 items-center justify-center rounded-full border border-line-hover text-fg2 transition-all duration-200 hover:-translate-y-0.5 hover:border-fg2/40 hover:text-fg";
                return (
                  <li key={s.id} data-tl="pop">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {isSoon ? (
                          <span
                            data-magnetic=""
                            role="img"
                            aria-label={`${s.label} (${t(ui.soon)})`}
                            tabIndex={0}
                            className="flex h-9 w-9 cursor-default items-center justify-center rounded-full border border-dashed border-line-hover text-muted"
                          >
                            <SocialIcon id={s.id} className="h-4 w-4" />
                          </span>
                        ) : isEmail ? (
                          <button data-magnetic="" type="button" onClick={() => copy(s.handle)} aria-label={`${t(ui.copy)} ${s.label}`} className={cls}>
                            <SocialIcon id={s.id} className="h-4 w-4" />
                          </button>
                        ) : (
                          <a
                            data-magnetic=""
                            href={s.id === "whatsapp" ? whatsappUrl(lang) : s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className={cls}
                          >
                            <SocialIcon id={s.id} className="h-4 w-4" />
                          </a>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        {isSoon ? `${s.label} · ${t(ui.soon)}` : isEmail ? `${t(ui.copy)} · ${s.handle}` : `${s.label} · ${s.handle}`}
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Arte na coluna direita, após a linha divisória */}
          <div className="hidden items-center justify-start border-l border-line py-6 pr-4 sm:flex">
            <div data-tl="fade" className="w-[86px]">
              <BrailleArt art={heroArt} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Headline + bio + stack + CTAs */}
      <section ref={bioRef} id="sobre" className="line-bottom relative scroll-mt-14 border-x border-line px-4 py-6 sm:pl-6 sm:pr-20">
        {/* Botão vertical "Ver projetos" */}
        <a
          data-tl="fade"
          href="#projetos"
          className="group absolute inset-y-0 right-0 hidden w-14 flex-col items-center justify-center gap-3 border-l border-line text-fg2 transition-colors duration-300 hover:bg-card hover:text-fg sm:flex"
        >
          <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] [text-orientation:upright] [writing-mode:vertical-rl]">{t(ui.seeProjects)}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line-hover transition-all duration-300 group-hover:translate-y-1 group-hover:border-fg/40">
            <ArrowDown className="h-3 w-3" />
          </span>
        </a>
        <p className="font-serif text-[22px] leading-snug text-fg sm:text-[26px]">
          <TypedRichText text={typedTexts[0]!} count={counts[0] ?? 0} caret={active === 0} />
        </p>
        {typedTexts.slice(1).map((line, i) => (
          <p key={i} className="mt-3 text-[15px] leading-[1.75] text-fg2">
            <TypedRichText text={line} count={counts[i + 1] ?? 0} caret={active === i + 1} />
          </p>
        ))}
        <div data-tl="fade" className="mt-6 flex flex-wrap gap-2">
          {/* No desktop o "Ver projetos" fica na faixa vertical; aqui só no celular */}
          <Button asChild size="sm" className="sm:hidden">
            <a href="#projetos">
              {t(ui.seeProjects)}
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href="#contato">
              {t(ui.getInTouch)}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </section>

      <StripeBand />
    </>
  );
}
