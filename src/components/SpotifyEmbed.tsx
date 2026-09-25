"use client";

import { useEffect, useRef } from "react";
import { Music2 } from "lucide-react";
import { spotify, ui } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { ensureSpotifyMounted, registerSpotifyHost, toSpotifyUri } from "@/lib/spotify";
import { Reveal } from "@/components/ui/reveal";

/**
 * Player do Spotify no fim da página. Carrega quando o rodapé se aproxima da tela
 * (ou antes, se o visitante clicar no play da navbar).
 */
export function SpotifyEmbed() {
  const { t } = useLang();
  const hostRef = useRef<HTMLDivElement>(null);
  const uri = toSpotifyUri(spotify.url);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || !uri) return;
    registerSpotifyHost(el, uri);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          ensureSpotifyMounted();
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [uri]);

  if (!uri) return null;

  return (
    <Reveal>
      <div className="px-4 py-6 sm:px-6">
        <p data-tl="fade" className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg3">
          <Music2 className="h-3.5 w-3.5" />
          {t(ui.soundtrack)}
        </p>
        <div
          data-tl="fade"
          ref={hostRef}
          className="min-h-[152px] overflow-hidden rounded-xl border border-white/[0.08] bg-card [&_iframe]:block [&_iframe]:border-0"
        />
      </div>
    </Reveal>
  );
}
