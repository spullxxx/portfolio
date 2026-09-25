"use client";

/**
 * Controlador único do player do Spotify (Spotify iFrame API).
 * O player fica no fim da página (<SpotifyEmbed />); o botão da navbar usa este
 * mesmo controlador para tocar/pausar, e os dois ficam sincronizados.
 */

interface SpotifyController {
  play: () => void;
  togglePlay: () => void;
  addListener: (event: "ready" | "playback_update", cb: (e: { data: { isPaused: boolean } }) => void) => void;
}

interface SpotifyIFrameAPI {
  createController: (
    el: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    cb: (controller: SpotifyController) => void,
  ) => void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

type State = { playing: boolean; ready: boolean };

let state: State = { playing: false, ready: false };
const listeners = new Set<(s: State) => void>();
let controller: SpotifyController | null = null;
let host: HTMLElement | null = null;
let uri = "";
let mounting = false;
let playWhenReady = false;

const emit = (next: Partial<State>) => {
  state = { ...state, ...next };
  listeners.forEach((l) => l(state));
};

export const subscribeSpotify = (cb: (s: State) => void) => {
  listeners.add(cb);
  cb(state);
  return () => {
    listeners.delete(cb);
  };
};

/** Converte o link de compartilhamento em URI do Spotify (spotify:album:ID). */
export function toSpotifyUri(url: string): string {
  const m = /open\.spotify\.com\/(?:intl-[a-z-]+\/)?(album|playlist|track|artist|episode|show)\/([A-Za-z0-9]+)/.exec(url);
  return m ? `spotify:${m[1]}:${m[2]}` : "";
}

function mount() {
  if (mounting || controller || !host || !uri) return;
  mounting = true;

  const create = (api: SpotifyIFrameAPI) => {
    // a API substitui o elemento pelo iframe — usamos um filho descartável
    const target = document.createElement("div");
    host!.appendChild(target);
    api.createController(target, { uri, width: "100%", height: 152 }, (c) => {
      controller = c;
      c.addListener("ready", () => {
        emit({ ready: true });
        if (playWhenReady) {
          playWhenReady = false;
          c.play();
        }
      });
      c.addListener("playback_update", (e) => emit({ playing: !e.data.isPaused }));
    });
  };

  const existing = (window as unknown as { __spotifyApi?: SpotifyIFrameAPI }).__spotifyApi;
  if (existing) return create(existing);
  window.onSpotifyIframeApiReady = (api) => {
    (window as unknown as { __spotifyApi?: SpotifyIFrameAPI }).__spotifyApi = api;
    create(api);
  };
  const script = document.createElement("script");
  script.src = "https://open.spotify.com/embed/iframe-api/v1";
  script.async = true;
  document.body.appendChild(script);
}

/** Registrado pelo <SpotifyEmbed />: onde o player é montado. */
export function registerSpotifyHost(el: HTMLElement, spotifyUri: string) {
  host = el;
  uri = spotifyUri;
}

/** Monta o player (chamado quando o rodapé se aproxima da tela). */
export const ensureSpotifyMounted = () => mount();

/** Botão da navbar: toca/pausa; se o player ainda não existe, monta e toca ao ficar pronto. */
export function toggleSpotify() {
  if (controller && state.ready) {
    controller.togglePlay();
    return;
  }
  playWhenReady = true;
  mount();
}
