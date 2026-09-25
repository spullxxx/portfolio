"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { activeSocials, profile, ui, whatsappUrl } from "@/data/portfolioData";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactForm() {
  const { t } = useLang();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const validate = (v: Record<Field, string>): Errors => {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = t(ui.errName);
    if (!EMAIL_RE.test(v.email.trim())) e.email = t(ui.errEmail);
    if (v.message.trim().length < 10) e.message = t(ui.errMessage);
    return e;
  };

  const onChange = (field: Field, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success(t(ui.sent));
      setValues({ name: "", email: "", message: "" });
    } catch {
      toast.error(t(ui.sendError));
    } finally {
      setSending(false);
    }
  };

  const inputCls = (field: Field) =>
    cn(
      "w-full rounded-lg border bg-card px-3 py-2.5 text-[14px] text-fg outline-none transition-colors placeholder:text-muted focus:border-fg2/50",
      errors[field] ? "border-red-500/60" : "border-line",
    );

  const fields: { id: Field; label: string; ph: string; type?: string }[] = [
    { id: "name", label: t(ui.name), ph: t(ui.namePh) },
    { id: "email", label: t(ui.email), ph: t(ui.emailPh), type: "email" },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.id} className="flex flex-col gap-1.5">
            <span className="mono-label">{f.label}</span>
            <input
              type={f.type ?? "text"}
              name={f.id}
              value={values[f.id]}
              onChange={(e) => onChange(f.id, e.target.value)}
              placeholder={f.ph}
              autoComplete={f.id}
              aria-invalid={Boolean(errors[f.id])}
              className={inputCls(f.id)}
            />
            {errors[f.id] && <span className="text-[11px] text-red-400">{errors[f.id]}</span>}
          </label>
        ))}
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="mono-label">{t(ui.message)}</span>
        <textarea
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => onChange("message", e.target.value)}
          placeholder={t(ui.messagePh)}
          aria-invalid={Boolean(errors.message)}
          className={cn(inputCls("message"), "resize-none")}
        />
        {errors.message && <span className="text-[11px] text-red-400">{errors.message}</span>}
      </label>
      <Button type="submit" disabled={sending} className="self-start">
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {sending ? t(ui.sending) : t(ui.send)}
      </Button>
    </form>
  );
}

export function Contact() {
  const { lang, t } = useLang();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success(t(ui.copied), { description: profile.email });
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };


  return (
    <>
      <Reveal id="contato">
        <SectionHeader title={t(ui.contact)} />
        <div className="line-bottom px-4 py-6 sm:px-6">
          <h3 data-tl="fade" className="font-serif text-[30px] leading-tight text-fg sm:text-[36px]">{t(ui.haveIdea)}</h3>
          <p data-tl="fade" className="mt-2 font-serif text-[18px] italic text-fg2">{t(ui.haveIdeaSub)}</p>
        </div>
        <div data-tl="fade" className="p-5 sm:p-6">
          <ContactForm />
        </div>
      </Reveal>

      {/* E-mail em destaque + redes */}
      <Reveal>
        <div className="line-bottom flex items-end justify-between gap-4 px-4 py-8 sm:px-6">
          <div data-tl="fade" className="min-w-0">
            <button
              type="button"
              onClick={copyEmail}
              className="group flex min-w-0 items-center gap-3 text-left"
              aria-label={`${t(ui.copy)} ${profile.email}`}
            >
              <span className="break-all font-serif text-[18px] text-fg underline decoration-line-hover decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-fg sm:text-[26px]">
                {profile.email}
              </span>
              <Copy className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-fg" />
            </button>
          </div>
          <a
            data-magnetic=""
            href={`mailto:${profile.email}`}
            aria-label="E-mail"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-hover text-fg2 transition-colors hover:text-fg sm:flex"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <ul className="grid grid-cols-1 gap-px bg-line sm:auto-cols-fr sm:grid-flow-col">
          {activeSocials.map((s) => (
            <li key={s.id} data-tl="pop" className="bg-bg">
              {s.id === "email" ? (
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={`${t(ui.copy)} ${s.handle}`}
                  className="group flex w-full items-center justify-between gap-2 px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:bg-card hover:text-fg sm:px-5"
                >
                  <span className="flex items-center gap-2">
                    <SocialIcon id={s.id} className="h-3.5 w-3.5" />
                    {s.label}
                  </span>
                  <Copy className="h-3 w-3" />
                </button>
              ) : (
                <a
                  href={s.id === "whatsapp" ? whatsappUrl(lang) : s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-2 px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:bg-card hover:text-fg sm:px-5"
                >
                  <span className="flex items-center gap-2">
                    <SocialIcon id={s.id} className="h-3.5 w-3.5" />
                    {s.label}
                  </span>
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}
