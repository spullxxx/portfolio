import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isPayload(body: unknown): body is ContactPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return typeof b.name === "string" && typeof b.email === "string" && typeof b.message === "string";
}

/** Escapa texto do usuário antes de inserir no HTML do e-mail */
const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** E-mail no estilo do portfólio (tabelas + estilos inline, compatível com Gmail/Outlook) */
function emailHtml(name: string, email: string, message: string) {
  const n = esc(name);
  const e = esc(email);
  const m = esc(message).replace(/\r?\n/g, "<br />");
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Re: seu contato pelo portfólio")}`;
  const label = "font-family:ui-monospace,Menlo,Consolas,monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8c8782;";
  return `<!doctype html>
<html lang="pt-BR">
<body style="margin:0;padding:0;background:#0a0a0a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border:1px solid #242424;border-radius:12px;background:#121212;">
        <tr><td style="padding:24px 28px;border-bottom:1px solid #242424;">
          <div style="${label}">Portfólio · novo contato</div>
          <div style="margin-top:8px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:#f0ece8;">${n}</div>
        </td></tr>
        <tr><td style="padding:20px 28px 0;">
          <div style="${label}">E-mail</div>
          <div style="margin-top:6px;font-family:Helvetica,Arial,sans-serif;font-size:15px;"><a href="mailto:${e}" style="color:#f0ece8;">${e}</a></div>
        </td></tr>
        <tr><td style="padding:20px 28px 0;">
          <div style="${label}">Mensagem</div>
          <div style="margin-top:8px;padding:16px 18px;border:1px solid #242424;border-radius:8px;background:#0e0e0e;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#bcb8b4;">${m}</div>
        </td></tr>
        <tr><td style="padding:24px 28px 28px;">
          <a href="${replyHref}" style="display:inline-block;padding:11px 20px;border-radius:999px;background:#f0ece8;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;">Responder ${n}</a>
        </td></tr>
      </table>
      <div style="margin-top:14px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:10px;letter-spacing:1px;color:#5c5c5c;">Enviado pelo formulário do seu portfólio</div>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!isPayload(body)) return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });

  const name = body.name.trim().slice(0, 120);
  const email = body.email.trim().slice(0, 200);
  const message = body.message.trim().slice(0, 5000);

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  /*
   * Envio via Resend (https://resend.com): RESEND_API_KEY e CONTACT_TO_EMAIL no .env.local
   * (e nas variáveis de ambiente da hospedagem, ao publicar).
   */
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Portfólio <onboarding@resend.dev>",
        to,
        reply_to: email,
        subject: `Novo contato: ${name}`,
        html: emailHtml(name, email, message),
        text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      }),
    });
    if (!res.ok) return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
  } else {
    console.info("[contact] nova mensagem (configure RESEND_API_KEY para envio real):", { name, email, message });
  }

  return NextResponse.json({ ok: true });
}
