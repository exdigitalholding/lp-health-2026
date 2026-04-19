# Health Voice — Landing Page

Landing page oficial do Health Voice. Next.js 15 (App Router) + TypeScript + Tailwind CSS + framer-motion.

## Stack

- **Next.js 15** + **React 19** (App Router)
- **TypeScript** strict
- **Tailwind CSS 3** com tokens da marca (primary `#0D78EC`, gradiente azul, Poppins)
- **framer-motion** para animações de entrada
- **lucide-react** para ícones
- **react-hook-form + zod** para o formulário de lead
- **@radix-ui/react-accordion** para o FAQ

## Estrutura

```
src/
├── app/              # App Router (layout, page, globals)
├── components/
│   ├── sections/     # 15 seções da landing page
│   └── ui/           # primitives (button, accordion, field, form)
├── lib/              # helpers (cn)
└── utils/            # masks, submitLead
```

## Scripts

```bash
npm install          # instala dependências
npm run dev          # dev server em http://localhost:3000
npm run build        # build de produção
npm run typecheck    # checagem de tipos
npm run lint         # ESLint
npm run format       # Prettier
```

## Identidade visual

- **Primary**: `#0D78EC` (azul de marca)
- **Gradiente**: `#0D78EC → #3B82F6 → #60A5FA`
- **Fonte**: Poppins (via `next/font/google`)
- **Logos oficiais** em `public/logos/`

## Formulário de lead

O `submitLead` em `src/utils/lead.ts` é um stub documentado. Ao submeter, salva o lead em `sessionStorage` e exibe um toast. A rota/endpoint real deve ser plugada no `TODO` marcado no arquivo.

## Assets pendentes

O hero e a seção de mockups usam placeholders com gradiente. Para produção, substituir:

- vídeo/imagem real no hero (hoje é gradiente animado)
- screenshots reais em `app-screens.tsx`
- vídeo de demo em `demo.tsx`
- foto do output real em `what-you-get.tsx`
# lp-health-2026
