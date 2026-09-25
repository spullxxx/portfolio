import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        card: "#121212",
        card2: "#181818",
        fg: "#f0ece8",
        fg2: "#bcb8b4",
        /** cinza intermediário: labels e textos auxiliares legíveis */
        fg3: "#9d9893",
        muted: "#7a7a7a",
        muted2: "#5c5c5c",
        line: "rgba(255,255,255,0.07)",
        "line-hover": "rgba(255,255,255,0.14)",
        pill: "rgba(255,255,255,0.04)",
        live: "#22c55e",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "768px" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        ping2: { "75%,100%": { transform: "scale(2.2)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        ping2: "ping2 1.6s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
