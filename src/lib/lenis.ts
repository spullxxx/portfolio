import type Lenis from "lenis";

/** Instância global do smooth scroll (para pausar em modais etc.) */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const stopScroll = () => instance?.stop();
export const startScroll = () => instance?.start();
