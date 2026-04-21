# Implementação Meta CAPI em Next.js

Guia completo de código. Serve tanto App Router (Next.js 13+) quanto Pages Router.

## Pré-requisitos

Antes de escrever qualquer código, o usuário precisa ter:

1. **Pixel ID** (ex: `1234567890123456`) — pegar no Gerenciador de Eventos
2. **Access Token** — gerar via System User no Business Manager (ver seção abaixo)
3. **Test Event Code** (ex: `TEST12345`) — gerar na aba "Testar Eventos" do Events Manager
4. **Domínio verificado** no Business Manager (para AEM)

### Como gerar Access Token via System User (correto)

Ensinar esse caminho — é o único que não expira:

1. Business Manager → Configurações do Negócio → Usuários → Usuários do sistema
2. Adicionar → nome "CAPI_Token_User" → função: Admin
3. Gerar novo token → selecionar o App → selecionar permissões: `ads_management`, `business_management`
4. **Copiar o token AGORA** — não aparece de novo
5. Ir em Events Manager → Pixel → Configurações → Conversions API → "Set up manually" → colar o token

## Estrutura de arquivos recomendada

```
projeto/
├── .env.local                    # Variáveis de ambiente (NÃO commitar)
├── app/
│   ├── layout.tsx                # Pixel instalado aqui (App Router)
│   ├── api/
│   │   └── meta/
│   │       └── conversion/
│   │           └── route.ts      # API Route CAPI
│   └── components/
│       ├── MetaPixel.tsx         # Componente do Pixel
│       └── LeadForm.tsx          # Formulário que dispara Lead
├── lib/
│   └── meta-capi.ts              # Utilitários (hash, event_id, fbp/fbc)
└── types/
    └── meta.ts                   # Tipos TypeScript
```

## 1. Variáveis de ambiente

Arquivo `.env.local`:

```bash
# Pixel ID é público (vai pro cliente) — prefixo NEXT_PUBLIC_
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456

# Access Token é SECRETO (só servidor) — sem prefixo NEXT_PUBLIC_
META_CAPI_ACCESS_TOKEN=EAABxxx...longo...

# Test Event Code — remover quando for pra produção de verdade
META_CAPI_TEST_EVENT_CODE=TEST12345

# Versão da API Graph — usar a mais recente estável
META_CAPI_API_VERSION=v21.0
```

Na Vercel: Project Settings → Environment Variables → adicionar todas. Marcar `META_CAPI_ACCESS_TOKEN` como "Sensitive".

## 2. Utilitário de hash e event_id (`lib/meta-capi.ts`)

```typescript
import crypto from 'crypto';

/**
 * Hasheia dados do usuário com SHA-256, lowercase e trim.
 * Retorna undefined se o input for vazio (Meta aceita campos faltando).
 */
export function hashUserData(data: string | undefined | null): string | undefined {
  if (!data || typeof data !== 'string') return undefined;
  const normalized = data.toLowerCase().trim();
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normaliza telefone antes de hashear.
 * Meta espera: só dígitos, com código do país. Ex: "5541963475328"
 */
export function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, '');
  // Se não tiver código do país, assume Brasil (55)
  if (digits.length === 11 || digits.length === 10) return `55${digits}`;
  return digits;
}

/**
 * Gera event_id único e determinístico.
 * O MESMO event_id precisa ser usado no Pixel (cliente) e na CAPI (servidor)
 * para a Meta fazer deduplicação.
 */
export function generateEventId(eventName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `${eventName}_${timestamp}_${random}`;
}

/**
 * Captura o fbc a partir do fbclid na URL (quando usuário vem do Meta Ads).
 * Formato esperado: fb.1.{timestamp}.{fbclid}
 */
export function buildFbc(fbclid: string | null): string | undefined {
  if (!fbclid) return undefined;
  return `fb.1.${Date.now()}.${fbclid}`;
}

/**
 * Lê cookie fbp (setado automaticamente pelo Pixel).
 */
export function getFbp(cookieString: string | null): string | undefined {
  if (!cookieString) return undefined;
  const match = cookieString.match(/_fbp=([^;]+)/);
  return match ? match[1] : undefined;
}

/**
 * Lê cookie fbc (setado quando usuário chegou de anúncio).
 */
export function getFbc(cookieString: string | null): string | undefined {
  if (!cookieString) return undefined;
  const match = cookieString.match(/_fbc=([^;]+)/);
  return match ? match[1] : undefined;
}
```

## 3. Tipos TypeScript (`types/meta.ts`)

```typescript
export type MetaEventName =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'Contact'
  | 'CompleteRegistration'
  | 'Subscribe'
  | 'StartTrial'
  | 'Schedule'
  | 'Purchase';

export interface MetaUserData {
  em?: string;              // email hasheado
  ph?: string;              // telefone hasheado
  fn?: string;              // primeiro nome hasheado
  ln?: string;              // sobrenome hasheado
  ct?: string;              // cidade hasheada
  st?: string;              // estado hasheado
  zp?: string;              // CEP hasheado
  country?: string;         // país hasheado (código ISO)
  external_id?: string;     // ID do usuário no seu sistema (pode hashear)
  fbp?: string;             // NÃO hashear
  fbc?: string;             // NÃO hashear
  client_ip_address?: string;   // NÃO hashear
  client_user_agent?: string;   // NÃO hashear
}

export interface MetaCustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  [key: string]: unknown;
}

export interface MetaConversionEvent {
  event_name: MetaEventName;
  event_time: number;       // Unix timestamp em SEGUNDOS (não ms!)
  event_id: string;         // STRING, não número
  event_source_url?: string;
  action_source: 'website' | 'app' | 'phone_call' | 'chat' | 'email' | 'physical_store' | 'system_generated' | 'other';
  user_data: MetaUserData;
  custom_data?: MetaCustomData;
}

export interface ClientLeadData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  eventName: MetaEventName;
  eventId: string;          // gerado no cliente, enviado junto
  value?: number;
  currency?: string;
  contentName?: string;
}
```

## 4. API Route (App Router) — `app/api/meta/conversion/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import {
  hashUserData,
  normalizePhone,
  getFbp,
  getFbc,
} from '@/lib/meta-capi';
import type { MetaConversionEvent, ClientLeadData } from '@/types/meta';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN!;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;
const API_VERSION = process.env.META_CAPI_API_VERSION || 'v21.0';

const CAPI_ENDPOINT = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

export async function POST(request: NextRequest) {
  try {
    const body: ClientLeadData = await request.json();

    // Captura dados do request que a Meta quer ter
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      undefined;

    const userAgent = request.headers.get('user-agent') || undefined;
    const cookies = request.headers.get('cookie');
    const fbp = getFbp(cookies);
    const fbc = getFbc(cookies);
    const referer = request.headers.get('referer') || undefined;

    // Monta o payload do evento
    const event: MetaConversionEvent = {
      event_name: body.eventName,
      event_time: Math.floor(Date.now() / 1000), // SEGUNDOS, não ms
      event_id: body.eventId,
      event_source_url: referer,
      action_source: 'website',
      user_data: {
        em: hashUserData(body.email),
        ph: hashUserData(normalizePhone(body.phone)),
        fn: hashUserData(body.firstName),
        ln: hashUserData(body.lastName),
        ct: hashUserData(body.city),
        st: hashUserData(body.state),
        country: hashUserData('br'), // Brasil
        fbp,                          // NÃO hashear
        fbc,                          // NÃO hashear
        client_ip_address: clientIp,  // NÃO hashear
        client_user_agent: userAgent, // NÃO hashear
      },
      custom_data: {
        value: body.value,
        currency: body.currency || 'BRL',
        content_name: body.contentName,
      },
    };

    // Remove undefineds do user_data (Meta rejeita null/undefined explícito)
    event.user_data = Object.fromEntries(
      Object.entries(event.user_data).filter(([, v]) => v !== undefined)
    ) as MetaConversionEvent['user_data'];

    const payload: {
      data: MetaConversionEvent[];
      access_token: string;
      test_event_code?: string;
    } = {
      data: [event],
      access_token: ACCESS_TOKEN,
    };

    // Inclui test_event_code só em desenvolvimento
    if (TEST_EVENT_CODE && process.env.NODE_ENV !== 'production') {
      payload.test_event_code = TEST_EVENT_CODE;
    }

    const metaResponse = await fetch(CAPI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const metaData = await metaResponse.json();

    if (!metaResponse.ok) {
      console.error('[Meta CAPI] Erro:', metaData);
      return NextResponse.json(
        { success: false, error: metaData },
        { status: metaResponse.status }
      );
    }

    console.log('[Meta CAPI] Evento enviado:', body.eventName, body.eventId);
    return NextResponse.json({ success: true, meta: metaData });
  } catch (error) {
    console.error('[Meta CAPI] Falha inesperada:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## 5. API Route (Pages Router) — `pages/api/meta/conversion.ts`

Mesma lógica, assinatura diferente:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
// ... imports iguais ao App Router

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body: ClientLeadData = req.body;

    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      undefined;

    const userAgent = req.headers['user-agent'] || undefined;
    const cookies = req.headers.cookie || null;
    const fbp = getFbp(cookies);
    const fbc = getFbc(cookies);
    const referer = req.headers.referer;

    // ... resto idêntico à versão do App Router, só muda o retorno:
    // return res.status(200).json({ success: true, meta: metaData });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
}
```

## 6. Componente Pixel no cliente — `components/MetaPixel.tsx`

```tsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function MetaPixel() {
  useEffect(() => {
    // Captura fbclid e seta cookie _fbc
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get('fbclid');
    if (fbclid) {
      const fbc = `fb.1.${Date.now()}.${fbclid}`;
      // Seta cookie com 90 dias
      document.cookie = `_fbc=${fbc}; path=/; max-age=${90 * 24 * 60 * 60}; SameSite=Lax`;
    }
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
```

Importar no `app/layout.tsx`:

```tsx
import MetaPixel from '@/components/MetaPixel';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
```

## 7. Helper de disparo com deduplicação

Crie `lib/track-event.ts`:

```typescript
import { generateEventId } from './meta-capi';
import type { MetaEventName, ClientLeadData } from '@/types/meta';

interface TrackEventInput extends Omit<ClientLeadData, 'eventId'> {
  pixelCustomData?: Record<string, unknown>;
}

/**
 * Dispara evento no Pixel E na CAPI com o MESMO event_id.
 * Meta deduplica automaticamente.
 */
export async function trackEvent(input: TrackEventInput): Promise<void> {
  const eventId = generateEventId(input.eventName);

  // 1) Dispara no Pixel (cliente) — imediato
  if (typeof window !== 'undefined' && window.fbq) {
    const pixelParams = {
      value: input.value,
      currency: input.currency || 'BRL',
      content_name: input.contentName,
      ...input.pixelCustomData,
    };
    window.fbq('track', input.eventName, pixelParams, { eventID: eventId });
  }

  // 2) Dispara na CAPI (servidor) — pode ser assíncrono
  try {
    await fetch('/api/meta/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, eventId }),
    });
  } catch (error) {
    console.error('[trackEvent] CAPI falhou:', error);
    // Não quebra o fluxo do usuário se a CAPI falhar
  }
}
```

## 8. Uso no formulário de Lead

```tsx
'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/track-event';

export default function LeadForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    // Valida no backend primeiro (não mostrado aqui)
    // ... criar conta, salvar no CRM etc.

    // Só dispara Lead DEPOIS de confirmar sucesso
    const [firstName, ...rest] = name.split(' ');
    const lastName = rest.join(' ');

    await trackEvent({
      eventName: 'Lead',
      email,
      phone,
      firstName,
      lastName,
      value: 50, // valor estimado do lead em BRL — ver value-based-optimization.md
      currency: 'BRL',
      contentName: 'executivos_voice_cadastro',
    });

    setSubmitting(false);
    // redirecionar ou mostrar confirmação
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nome completo" required />
      <input name="email" type="email" placeholder="E-mail" required />
      <input name="phone" type="tel" placeholder="Telefone (WhatsApp)" required />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Criando conta...' : 'Criar conta gratuita'}
      </button>
    </form>
  );
}
```

## 9. Uso nos botões de WhatsApp

Para cada botão, intercepte o clique:

```tsx
'use client';

import { trackEvent } from '@/lib/track-event';

interface WhatsAppButtonProps {
  message: string;
  phone: string;
  children: React.ReactNode;
  className?: string;
  buttonContext: string; // ex: "hero_cta", "demo_cta"
}

export default function WhatsAppButton({
  message,
  phone,
  children,
  className,
  buttonContext,
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Dispara evento de Contact ANTES de navegar
    await trackEvent({
      eventName: 'Contact',
      contentName: `whatsapp_${buttonContext}`,
      value: 30, // valor menor que Lead formulário
      currency: 'BRL',
    });
    // Navegação acontece naturalmente depois
  }

  return (
    <a
      href={whatsappUrl}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
```

## 10. Evento ViewContent em scroll profundo

`components/ScrollTracker.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/track-event';

export default function ScrollTracker() {
  useEffect(() => {
    let fired = false;

    function handleScroll() {
      if (fired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const percent = (scrolled / total) * 100;

      if (percent >= 60) {
        fired = true;
        trackEvent({
          eventName: 'ViewContent',
          contentName: 'lp_scroll_60',
        });
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
```

## 11. Validação com Test Events

Depois de implementar, ANTES de ir pra produção:

1. Rodar local: `npm run dev`
2. Abrir `localhost:3000`
3. Ir em **Events Manager → Pixel → Testar Eventos**
4. Colar a URL `localhost:3000` (ou usar ngrok)
5. Fazer as ações: scrollar, clicar WhatsApp, submeter formulário
6. Ver na aba de testes:
   - Eventos aparecendo com fonte "Server" (CAPI) e "Browser" (Pixel)
   - Mensagem "1 evento de 2 fontes" = deduplicação OK
   - Sem erros de parâmetros

Só quando estiver verde, remover o `test_event_code` e deploy.

## 12. Checklist final de produção

- [ ] `.env.local` configurado localmente
- [ ] Variáveis de ambiente configuradas na Vercel (Production e Preview)
- [ ] `META_CAPI_TEST_EVENT_CODE` **removido** ou protegido por NODE_ENV
- [ ] Access Token é de System User (não pessoal)
- [ ] `.env.local` está no `.gitignore`
- [ ] Pixel visível no DOM via Meta Pixel Helper (extensão do Chrome)
- [ ] Test Events mostrando deduplicação em todos os 4 eventos
- [ ] Domínio verificado no Business Manager
- [ ] AEM configurado com os 4 eventos priorizados
- [ ] EMQ medido após 24-48h de tráfego real
