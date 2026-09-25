"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { ui } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { subscribeSpotify, toggleSpotify } from "@/lib/spotify";
import { cn } from "@/lib/utils";

/** Play/pause da trilha (controla o player do Spotify do rodapé). Tocando: equalizador animado. */
export function MusicButton() {
  const { t } = useLang();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      subscribeSpotify((s) => {
        setPlaying(s.playing);
        if (s.playing) setLoading(false);
      }),
    [],
  );

  const label = playing ? t(ui.pauseMusic) : t(ui.playMusic);

  return (
    <button
      data-magnetic=""
      type="button"
      onClick={() => {
        if (!playing) setLoading(true);
        toggleSpotify();
      }}
      aria-label={label}
      aria-pressed={playing}
      title={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border text-fg transition-colors duration-300 sm:h-8 sm:w-8",
        playing ? "border-white/[0.25] bg-white/[0.06]" : "border-line hover:border-line-hover",
      )}
    >
      {playing ? (
        <span aria-hidden className="flex h-3 items-end gap-[2px]">
          <span className="eq-bar h-full" />
          <span className="eq-bar h-full [animation-delay:-0.35s]" />
          <span className="eq-bar h-full [animation-delay:-0.7s]" />
        </span>
      ) : (
        <Play className={cn("ml-0.5 h-3.5 w-3.5 fill-current", loading && "animate-pulse")} />
      )}
    </button>
  );
}
