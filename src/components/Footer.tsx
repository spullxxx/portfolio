"use client";

import { ArrowUp } from "lucide-react";
import { navLinks, profile, ui } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-x border-line">
      <nav className="line-top flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-4 text-[12px] text-fg2 sm:px-6">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="transition-colors hover:text-fg">
            {t(link.label)}
          </a>
        ))}
        <a
          href="#top"
          className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
        >
          {t(ui.backToTop)} <ArrowUp className="h-3 w-3" />
        </a>
      </nav>
      <div className="line-top px-4 py-4 font-mono text-[10px] tracking-[0.1em] text-muted sm:px-6">
        © {year} {profile.shortName} ({profile.nickname}). {t(ui.rights)}
      </div>
    </footer>
  );
}
