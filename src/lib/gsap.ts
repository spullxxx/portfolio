"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  // Recalcula as posições quando fontes/imagens terminam de carregar
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Tipos de animação aplicados via atributo `data-tl` nos elementos:
 *  - title : títulos de seção
 *  - fade  : textos e blocos
 *  - pop   : chips / etiquetas (cascata com leve "pop")
 *  - card  : cards; se tiver um filho `[data-tl-bar]`, a linha de progresso percorre o card;
 *            se tiver um filho `[data-tl-media]`, a capa é revelada junto com o card
 *  - media : imagens/capas (revelação de cima para baixo + zoom-out)
 *  - write : texto "escrito" da esquerda para a direita (caderno)
 */
type TlType = "title" | "fade" | "pop" | "card" | "media" | "write";

const FROM: Record<TlType, gsap.TweenVars> = {
  title: { opacity: 0, y: 18 },
  fade: { opacity: 0, y: 16 },
  pop: { opacity: 0, y: 10, scale: 0.9 },
  card: { opacity: 0, y: 24 },
  media: { clipPath: "inset(0% 0% 100% 0%)" },
  write: { clipPath: "inset(0% 100% 0% 0%)", opacity: 0.4 },
};

const TO: Record<TlType, gsap.TweenVars> = {
  title: { opacity: 1, y: 0, duration: 0.8 },
  fade: { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
  pop: { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: "back.out(2)" },
  card: { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 },
  media: { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.15, ease: "power4.inOut" },
  write: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.55, stagger: 0.14, ease: "power2.inOut" },
};

/** Quanto cada grupo se sobrepõe ao anterior (s) — deixa a cena fluida */
const OVERLAP = 0.45;

type Group = { type: TlType; els: HTMLElement[] };

/**
 * Agrupa elementos consecutivos com mesmo tipo e mesmo pai (viram um stagger).
 * Com `maxGap`, um elemento abaixo do início do grupo (outra linha) abre um grupo novo:
 * assim cards empilhados no celular animam cada um quando chegam na tela.
 */
function groupNodes(nodes: HTMLElement[], maxGap = Infinity): Group[] {
  const groups: Group[] = [];
  nodes.forEach((node) => {
    const type = node.dataset.tl as TlType;
    const last = groups[groups.length - 1];
    const near = last ? pageTop(node) - pageTop(last.els[0]!) < maxGap : false;
    if (last && near && last.type === type && last.els[0]!.parentElement === node.parentElement) last.els.push(node);
    else groups.push({ type, els: [node] });
  });
  return groups;
}

/**
 * Conteúdo animado de um card: seus filhos diretos (exceto linha e capa).
 * O card em si fica opaco — evita que o fundo da grade (gap-px) apareça durante a animação.
 */
function cardParts(card: HTMLElement): Element[] {
  // inclui ícones SVG (não são HTMLElement)
  return Array.from(card.children).filter((c) => !c.hasAttribute("data-tl-bar") && !c.hasAttribute("data-tl-media"));
}

function pageTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

/**
 * Monta a cena da seção: percorre os `[data-tl]` na ordem do DOM, agrupa irmãos
 * consecutivos do mesmo tipo (stagger) e encadeia os grupos com sobreposição.
 * Elementos aninhados (ex.: chips dentro de um card) animam junto do grupo pai.
 * Seções altas são divididas em sub-cenas, cada uma disparada ao entrar na tela.
 */
export function buildSectionTimeline(
  section: HTMLElement,
  opts: { immediate?: boolean; delay?: number } = {},
): () => void {
  const ctx = gsap.context(() => {
    const all = Array.from(section.querySelectorAll<HTMLElement>("[data-tl]"));

    if (all.length === 0) {
      gsap.from(section, {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      });
      return;
    }

    const isNested = (n: HTMLElement) => all.some((o) => o !== n && o.contains(n));
    const topLevel = all.filter((n) => !isNested(n));
    // cada linha visual vira um grupo (cards empilhados no celular não animam juntos)
    const groups = groupNodes(topLevel, opts.immediate ? Infinity : 40);

    all.forEach((n) => {
      const type = n.dataset.tl as TlType;
      if (type === "card") gsap.set(cardParts(n), FROM.card);
      else gsap.set(n, FROM[type]);
    });
    gsap.set(section.querySelectorAll("[data-tl-bar]"), { scaleX: 0, transformOrigin: "left center" });
    const medias = Array.from(section.querySelectorAll<HTMLElement>("[data-tl-media]"));
    gsap.set(medias, FROM.media);

    const cleanup = (els: Element[]) => gsap.set(els, { clearProps: "transform,opacity,clipPath" });

    let tl: gsap.core.Timeline | null = null;
    let sceneTop = 0;
    let sceneEls: Element[] = [];
    const vh = window.innerHeight;

    groups.forEach((g) => {
      const top = pageTop(g.els[0]!);
      // nova sub-cena se o grupo estiver longe do início da cena atual
      if (!tl || (!opts.immediate && top - sceneTop > vh * 0.25)) {
        const els: Element[] = [];
        sceneEls = els;
        sceneTop = top;
        tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: opts.delay ?? 0,
          // modo imediato (abertura da página) roda no carregamento, sem depender da rolagem
          scrollTrigger: opts.immediate ? undefined : { trigger: g.els[0]!, start: "top 85%", once: true },
          onComplete: () => cleanup(els),
        });
      }
      // encadeia a partir do fim real da cena, sem nunca começar antes do zero
      const pos = Math.max(0, tl.duration() - OVERLAP);
      if (g.type === "card") {
        const parts = g.els.flatMap(cardParts);
        tl.to(parts, { opacity: 1, y: 0, duration: 0.7, stagger: Math.min(0.06, 1 / parts.length) }, pos);
        sceneEls.push(...parts);
      } else {
        tl.to(g.els, { ...TO[g.type] }, pos);
      }
      sceneEls.push(...g.els);
      const t = tl;

      if (g.type === "media") {
        const imgs = g.els.flatMap((el) => Array.from(el.querySelectorAll("img, [data-tl-zoom]")));
        if (imgs.length) t.fromTo(imgs, { scale: 1.12 }, { scale: 1, duration: 1.4, stagger: 0.15, clearProps: "transform" }, "<");
      }

      if (g.type === "card") {
        // linha de progresso atravessando os cards em sequência
        const cardBars = g.els.map((el) => el.querySelector("[data-tl-bar]")).filter(Boolean) as HTMLElement[];
        if (cardBars.length) t.to(cardBars, { scaleX: 1, duration: 0.35, stagger: 0.12, ease: "none" }, "<");

        // capas dentro dos cards: revelação + zoom-out em paralelo
        const cardMedia = g.els.map((el) => el.querySelector("[data-tl-media]")).filter(Boolean) as HTMLElement[];
        if (cardMedia.length) {
          t.to(cardMedia, { ...TO.media }, "<");
          sceneEls.push(...cardMedia);
          const imgs = cardMedia.flatMap((el) => Array.from(el.querySelectorAll("img, [data-tl-zoom]")));
          if (imgs.length) t.fromTo(imgs, { scale: 1.12 }, { scale: 1, duration: 1.4, stagger: 0.15, clearProps: "transform" }, "<");
        }
      }

      // filhos animados (chips dentro de cards etc.) logo após o pai começar
      const nested = all.filter((n) => n !== g.els[0] && g.els.some((p) => p !== n && p.contains(n)));
      if (nested.length) {
        const nestedGroups = groupNodes(nested);
        const flat = nestedGroups.flatMap((ng) => ng.els);
        const type = nestedGroups[0]!.type;
        t.to(flat, { ...TO[type], stagger: Math.min(0.05, 0.6 / flat.length) }, "<0.25");
        sceneEls.push(...flat);
      }
    });
  }, section);

  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
