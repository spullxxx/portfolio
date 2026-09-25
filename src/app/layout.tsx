import type { Metadata, Viewport } from "next";
import { DM_Mono, Outfit, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/i18n";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomCursor } from "@/components/CustomCursor";
import { MagneticEffect } from "@/components/MagneticEffect";
import { SmoothScroll } from "@/components/SmoothScroll";
import { profile } from "@/data/portfolioData";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm-mono", display: "swap" });

const description =
  "Desenvolvedor autônomo de Goiânia. Sites, sistemas, automações e soluções com Inteligência Artificial. Mais de 30 projetos entregues.";

export const metadata: Metadata = {
  // endereço público do site (defina NEXT_PUBLIC_SITE_URL ao publicar) — usado nas prévias de link
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3007"),
  title: `${profile.shortName} | Desenvolvedor autônomo · IA & Automação`,
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.shortName} | Desenvolvedor autônomo`,
    description,
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.shortName} | Desenvolvedor autônomo`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${playfair.variable} ${dmMono.variable}`}>
      <body>
        <LanguageProvider>
          <TooltipProvider delayDuration={150}>
            {children}
            <CustomCursor />
            <MagneticEffect />
            <SmoothScroll />
            <Toaster
              theme="dark"
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "#121212",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#f0ece8",
                  fontFamily: "var(--font-outfit)",
                },
              }}
            />
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
