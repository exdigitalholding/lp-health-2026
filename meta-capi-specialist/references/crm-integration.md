# Integração CRM + Eventos Downstream

O Lead no formulário é só o começo. Os eventos que realmente importam para a Meta otimizar acontecem **depois** — quando o lead qualifica, ativa conta, vira pagante. Esta referência cobre como alimentar a Meta com esses sinais de fundo de funil.

## Por que isso muda tudo

Sem eventos downstream, a Meta otimiza para "gente que preenche formulário" — e isso traz muitos curiosos, caçadores de ebook, leads descartáveis.

Com eventos downstream (`QualifiedLead`, `ActivatedUser`, `Subscribe`), a Meta aprende que:
- O perfil X (cargo, idade, interesse) **sempre converte em pagante**
- O perfil Y **preenche formulário mas nunca volta**

E começa a buscar perfis tipo X — **qualidade sobe, CPL pode até subir, mas CAC despenca**.

## Arquitetura recomendada

```
LP Next.js
    │
    ├─ Formulário submit → Lead (CAPI)
    │
    ├─ Dados vão pro CRM (HubSpot / RD Station / Pipedrive / Notion)
    │
CRM / Banco de dados
    │
    ├─ Lead vira qualificado       → evento QualifiedLead (CAPI)
    ├─ Ativou conta / gravou reunião → evento StartTrial (CAPI)
    ├─ Virou pagante                → evento Subscribe / Purchase (CAPI)
    ├─ Cancelou                    → evento custom CanceledSubscription (opcional)
```

## Opções de implementação

### Opção 1 — Direto (mais controle, mais código)

Sua aplicação tem endpoints que disparam eventos CAPI quando algo muda no banco:

```typescript
// Quando usuário grava primeira reunião:
// src/app/api/recordings/route.ts (ou equivalente)

async function onFirstRecording(user: User) {
  await fetch('/api/meta/conversion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName: 'StartTrial',
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      eventId: `StartTrial_${user.id}_${Date.now()}`,
      value: 0,
      currency: 'BRL',
      predictedLtv: 776,
      contentName: 'first_recording',
    }),
  });
}
```

**Prós**: controle total, sem custo adicional.
**Contras**: precisa adicionar código em cada ponto de qualificação.

### Opção 2 — Zapier / Make (no-code)

Mais rápido para começar.

**Setup Zapier típico:**

1. **Trigger**: "New Record in Airtable" / "New Deal in HubSpot" / "Subscription Created in Stripe"
2. **Action**: "Conversions API by Meta" (integração nativa)
3. Mapear campos:
   - Event name: `StartTrial` / `Subscribe` / `Lead`
   - User data: email, phone (Zapier hasheia automaticamente)
   - Event time: agora
   - Event ID: ID único do registro

**Prós**: sem código, configurável rápido.
**Contras**: custo mensal, dependência externa, menos controle de timing.

### Opção 3 — Meta Conversions API Gateway

Self-hosted na AWS/GCP, gerenciado pela Meta.

**Quando usar**: alto volume (>10mil eventos/dia) ou requisitos de compliance rígidos.
**Para Executivo's Voice agora**: overkill, pular.

## Eventos downstream recomendados para SaaS B2B

### Para um funil básico de SaaS com trial grátis:

| Estágio | Evento Meta | Quando disparar | Value |
|---|---|---|---|
| Cadastrou | `Lead` | Form submit | R$ 62 |
| Confirmou email | `CompleteRegistration` | Clicou link confirm | R$ 93 |
| Ativou conta | `StartTrial` | Gravou 1ª reunião | R$ 272 |
| Engajou no trial | `CustomEvent: TrialEngaged` | Gravou 3+ reuniões | R$ 400 |
| Virou pagante | `Subscribe` | Primeiro pagamento aprovado | R$ 776 × N meses |
| Comprou plano anual | `Purchase` | Upgrade para anual | R$ 970 |

### Exemplo prático de disparo de `Subscribe`

Quando seu gateway de pagamento (Stripe, Pagar.me, etc.) confirmar assinatura:

```typescript
// Webhook do Stripe
async function handleSubscriptionCreated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customer = await stripe.customers.retrieve(subscription.customer as string);

  if ('deleted' in customer) return;

  const monthlyValue = subscription.items.data[0].price.unit_amount! / 100;
  const predictedLtv = monthlyValue * 12; // LTV conservador de 12 meses

  await sendCapiEvent({
    eventName: 'Subscribe',
    email: customer.email!,
    firstName: customer.name?.split(' ')[0],
    lastName: customer.name?.split(' ').slice(1).join(' '),
    phone: customer.phone!,
    eventId: `Subscribe_${subscription.id}`,  // ID do Stripe garante unicidade
    value: monthlyValue,
    currency: 'BRL',
    predictedLtv,
    actionSource: 'website',  // ou 'system_generated' se sem interação
    contentName: 'plano_pro_mensal',
  });
}
```

### Função utilitária `sendCapiEvent` (servidor-side)

Centralize disparos server-side num util:

```typescript
// lib/capi-server.ts
import crypto from 'crypto';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN!;
const API_VERSION = process.env.META_CAPI_API_VERSION || 'v21.0';

function hash(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

interface SendEventInput {
  eventName: string;
  eventId: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  externalId?: string;       // ID do usuário no seu banco
  value?: number;
  currency?: string;
  predictedLtv?: number;
  contentName?: string;
  actionSource?: 'website' | 'system_generated' | 'email' | 'chat' | 'other';
}

export async function sendCapiEvent(input: SendEventInput): Promise<void> {
  const payload = {
    data: [{
      event_name: input.eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: input.eventId,
      action_source: input.actionSource || 'system_generated',
      user_data: {
        em: input.email ? hash(input.email) : undefined,
        ph: input.phone ? hash(input.phone.replace(/\D/g, '')) : undefined,
        fn: input.firstName ? hash(input.firstName) : undefined,
        ln: input.lastName ? hash(input.lastName) : undefined,
        external_id: input.externalId ? hash(input.externalId) : undefined,
      },
      custom_data: {
        value: input.value,
        currency: input.currency || 'BRL',
        predicted_ltv: input.predictedLtv,
        content_name: input.contentName,
      },
    }],
    access_token: ACCESS_TOKEN,
  };

  // Remove undefineds
  payload.data[0].user_data = Object.fromEntries(
    Object.entries(payload.data[0].user_data).filter(([, v]) => v !== undefined)
  ) as typeof payload.data[0].user_data;

  const response = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error('[CAPI Server] Erro:', error);
    throw new Error(`Meta CAPI falhou: ${JSON.stringify(error)}`);
  }
}
```

## Quando NÃO tem dados do usuário

Para eventos `system_generated` (ex: cron que dispara evento quando assinatura renova automaticamente), você deve enviar com `action_source: "system_generated"` e pelo menos `external_id` + `fbp` (salvo do momento do cadastro).

```typescript
// Ao cadastrar, salve fbp no banco junto com o usuário
await db.user.create({
  data: {
    email: input.email,
    fbp: input.fbp,        // capturado no cadastro
    fbc: input.fbc,        // capturado no cadastro
    createdAt: new Date(),
  },
});

// Meses depois, na renovação automática:
await sendCapiEvent({
  eventName: 'Subscribe',
  eventId: `Subscribe_Renewal_${subscriptionId}_${Date.now()}`,
  email: user.email,
  externalId: user.id,
  actionSource: 'system_generated',
  value: 97,
  currency: 'BRL',
  // ... fbp e fbc seriam ideais de salvar no user e enviar aqui também
});
```

## WhatsApp + eventos de qualificação

O desafio específico do Executivo's Voice: leads do WhatsApp não voltam pra LP — eles entram num fluxo paralelo. Como trackear?

**Solução**: sua automação de WhatsApp (Manychat, Z-API, WhatsApp Business API) deve, ao qualificar um lead (ex: respondeu pergunta de qualificação), chamar seu endpoint que dispara evento CAPI:

```typescript
// Endpoint que a automação de WhatsApp chama:
// src/app/api/whatsapp/qualified/route.ts

export async function POST(request: NextRequest) {
  const { phone, name, qualification } = await request.json();

  await sendCapiEvent({
    eventName: 'Lead',             // ou custom 'QualifiedLead'
    eventId: `QualifiedLead_WA_${phone}_${Date.now()}`,
    phone,
    firstName: name.split(' ')[0],
    actionSource: 'chat',
    value: 150,                     // qualificado vale mais que lead frio
    currency: 'BRL',
    contentName: `whatsapp_${qualification}`,
  });

  return NextResponse.json({ ok: true });
}
```

Isso fecha o loop: Meta sabe que X% de clicks no WhatsApp viram leads qualificados — e busca mais perfis assim.

## Resumo: o que disparar, quando, de onde

| Evento | Origem | Método |
|---|---|---|
| `PageView` | Cliente (Pixel) | Auto no snippet |
| `ViewContent` | Cliente (Pixel + CAPI) | Scroll listener |
| `Contact` | Cliente (Pixel + CAPI) | onClick WhatsApp |
| `Lead` | Cliente (Pixel + CAPI) | Form submit |
| `CompleteRegistration` | Servidor (CAPI) | Email confirmado |
| `StartTrial` | Servidor (CAPI) | Primeira reunião gravada |
| `Subscribe` | Servidor (CAPI) | Webhook Stripe/gateway |
| `Purchase` | Servidor (CAPI) | Webhook de upgrade/pagamento único |

Quanto mais abaixo no funil, mais importante é o CAPI — porque o usuário pode nem estar mais no seu site quando o evento acontece.
