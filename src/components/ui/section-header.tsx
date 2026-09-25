import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  action?: { label: string; href: string };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <header data-tl="title" className="line-bottom flex items-baseline justify-between gap-4 px-4 py-3 sm:px-6">
      <h2 className="font-serif text-[26px] leading-tight tracking-[-0.01em] text-fg">{title}</h2>
      {action && (
        <a
          href={action.href}
          className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
        >
          {action.label}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      )}
    </header>
  );
}

export function SubHeader({ icon, label, right }: { icon?: ReactNode; label: string; right?: ReactNode }) {
  return (
    <div data-tl="fade" className="line-bottom flex items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg3">
        {icon}
        {label}
      </span>
      {right}
    </div>
  );
}

export function StripeBand() {
  return <div aria-hidden className="stripes line-bottom h-6 border-x border-line" />;
}
