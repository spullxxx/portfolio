# Portfólio · Carlos Daniel

Site pessoal de [Carlos Daniel](https://github.com/spullxxx), dev autônomo de IA & Automação.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS**
- **GSAP** (ScrollTrigger) para as animações de entrada
- **Lenis** para o scroll suave
- **Radix UI** (Dialog, Tooltip)
- **Resend** para o formulário de contato

## Destaques

- Versão em português e inglês
- Animações por seção que acompanham o scroll
- Prévia dos sites em modal com rolagem automática
- Player do Spotify controlado pelo botão da navbar
- Imagem de compartilhamento (Open Graph) e ícones gerados no build

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev
```

| Variável | Uso |
| --- | --- |
| `RESEND_API_KEY` | Envio do formulário de contato |
| `CONTACT_TO_EMAIL` | E-mail que recebe as mensagens |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (metadados e Open Graph) |

O conteúdo do site fica em `src/data/portfolioData.ts`.
