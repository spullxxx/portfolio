import { Fragment, type ReactElement } from "react";

export interface RichToken {
  type: "text" | "bold" | "link";
  text: string;
  href?: string;
}

/** Converte **negrito** e [texto](url) em tokens. */
export function parseRich(text: string): RichToken[] {
  return text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part) => {
      const bold = /^\*\*(.+)\*\*$/.exec(part);
      if (bold) return { type: "bold", text: bold[1]! };
      const link = /^\[(.+)\]\((.+)\)$/.exec(part);
      if (link) return { type: "link", text: link[1]!, href: link[2]! };
      return { type: "text", text: part };
    });
}

export function richLength(text: string): number {
  return parseRich(text).reduce((n, t) => n + t.text.length, 0);
}

function renderToken(token: RichToken, key: string | number, text = token.text) {
  if (token.type === "bold")
    return (
      <strong key={key} className="elo">
        {text}
      </strong>
    );
  if (token.type === "link")
    return (
      <a key={key} href={token.href} target="_blank" rel="noopener noreferrer" className="elo">
        {text}
      </a>
    );
  return <Fragment key={key}>{text}</Fragment>;
}

/** Converte **negrito** e [texto](url) em elementos com sublinhado pontilhado. */
export function RichText({ text }: { text: string }) {
  return <>{parseRich(text).map((token, i) => renderToken(token, i))}</>;
}

interface TypedRichTextProps {
  text: string;
  /** Quantos caracteres já foram "digitados" */
  count: number;
  caret?: boolean;
}

/**
 * Renderiza o texto até `count` caracteres; o restante fica invisível
 * (ocupa o espaço final desde o início, sem pulos de layout).
 */
export function TypedRichText({ text, count, caret }: TypedRichTextProps) {
  const tokens = parseRich(text);
  let remaining = count;
  const typed: ReactElement[] = [];
  const hidden: ReactElement[] = [];

  tokens.forEach((token, i) => {
    const shown = Math.max(0, Math.min(token.text.length, remaining));
    remaining -= shown;
    if (shown > 0) typed.push(renderToken(token, `t${i}`, token.text.slice(0, shown)));
    if (shown < token.text.length) hidden.push(renderToken(token, `h${i}`, token.text.slice(shown)));
  });

  return (
    <>
      <span aria-hidden>{typed}</span>
      {caret && <span aria-hidden className="type-caret" />}
      <span aria-hidden className="invisible">
        {hidden}
      </span>
      <span className="sr-only">{tokens.map((t) => t.text).join("")}</span>
    </>
  );
}
