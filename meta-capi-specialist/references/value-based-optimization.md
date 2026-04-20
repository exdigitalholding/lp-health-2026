# Value-Based Optimization — Atribuindo Valor a Leads

Eventos com `value` são a alavanca que faz a Meta parar de otimizar por "quantidade de leads" e começar a otimizar por "qualidade/valor dos leads". Essencial para SaaS B2B.

## Por que atribuir valor a um Lead grátis

O formulário da LP é gratuito — não há valor monetário direto. Mas **todo lead tem um valor esperado** (Expected Value), que é:

```
Expected Value = LTV × Taxa de conversão Lead → Pagante
```

Se você atribuir esse valor no evento `Lead`, a Meta usa para:

1. **Otimizar por valor em vez de volume** — campanha vai atrás de perfis semelhantes aos leads que historicamente valem mais
2. **Value-Based Lookalikes** — cria audiência "semelhante aos meus melhores leads", não só "semelhante a quem preenche formulário"
3. **ROAS tracking** — permite medir retorno real mesmo com funil longo

## Como calcular o value do seu Lead

### Fórmula base

```
Value do Lead = (Ticket Médio Mensal × Meses de Retenção) × Taxa de Conversão Lead→Pagante
```

### Exemplo para Executivo's Voice

Supondo números (ajustar com dados reais depois):

- Ticket médio: **R$ 97/mês** (plano Pro)
- Retenção média: **8 meses** (churn de ~12%/mês)
- LTV: R$ 97 × 8 = **R$ 776**
- Taxa Lead → Pagante: **8%**
- **Value do Lead = R$ 776 × 0.08 = R$ 62**

### Variações por origem do Lead

Diferentes fontes têm valores diferentes. Por exemplo:

| Fonte | Conversão esperada | Value do Lead |
|---|---|---|
| Formulário completo (LP) | 12% | R$ 93 |
| WhatsApp (Contact) | 5% | R$ 39 |
| Trial ativado (StartTrial) | 35% | R$ 272 |
| Registrado e usou 1 reunião | 45% | R$ 349 |

Atribuir valores diferentes por tipo de conversão faz a Meta entender que **não são todos iguais**.

## Implementação no código

Em `lib/track-event.ts`, ajuste:

```typescript
// Valores calibrados por tipo de conversão
const LEAD_VALUES = {
  form_submit: 62,          // formulário LP
  whatsapp_click: 39,       // clique WhatsApp
  demo_scheduled: 150,      // agendou demo (quando tiver)
  trial_started: 272,       // ativou trial
  first_recording: 349,     // gravou 1ª reunião
} as const;

// No LeadForm.tsx:
await trackEvent({
  eventName: 'Lead',
  value: LEAD_VALUES.form_submit,
  currency: 'BRL',
  contentName: 'cadastro_voice',
  // ... dados do usuário
});

// No WhatsAppButton.tsx:
await trackEvent({
  eventName: 'Contact',
  value: LEAD_VALUES.whatsapp_click,
  currency: 'BRL',
  contentName: `whatsapp_${buttonContext}`,
});
```

## Predicted LTV em eventos de Subscribe/StartTrial

Esses eventos têm parâmetro específico `predicted_ltv` além do `value`:

```typescript
await trackEvent({
  eventName: 'StartTrial',
  value: 0,             // trial é grátis
  currency: 'BRL',
  predictedLtv: 776,    // LTV previsto
  contentName: 'trial_voice',
});
```

Predicted LTV = valor estimado total que o usuário vai gastar ao longo da vida. Ajuda Meta a otimizar pra pessoas que geram mais receita longo prazo.

## Calibração ao longo do tempo

Os valores iniciais são **hipóteses**. Você precisa recalibrar a cada 30-60 dias com dados reais:

1. Exporte do seu CRM: leads que viraram clientes pagantes nos últimos 60 dias
2. Some o MRR × meses de retenção atual
3. Divida pelo total de leads
4. Atualize os valores no código

Exemplo após 60 dias:

- 100 leads formulário → 12 viraram trial → 4 viraram pagantes → R$ 776 × 4 = R$ 3.104
- Value real por lead: R$ 3.104 / 100 = **R$ 31**

Se valor inicial era R$ 62 e o real é R$ 31, ajuste — campanha estava super-otimizando.

## Value-Based Lookalike

Depois de 30+ dias rodando com value:

1. Gerenciador de Públicos → Criar Público Semelhante
2. Fonte: **Pixel → Valor do cliente**
3. Selecionar evento com value (ex: `Lead`)
4. Meta cria LAL baseado nos leads de **maior valor**, não só "qualquer lead"

Para escalar com qualidade, use esse LAL como público principal em suas melhores campanhas.

## Quando NÃO enviar value

Não atribua valor a eventos que:
- São muito precoces no funil (PageView, ViewContent com scroll inicial)
- Não têm correlação clara com conversão (ex: usuário visitou FAQ)

Se o valor for irrelevante, não envie o parâmetro — não force zero.

## Valores para ecossistemas diferentes

Se atender múltiplos nichos, use `content_category` junto com value:

```typescript
await trackEvent({
  eventName: 'Lead',
  value: 120,                           // lead de C-level vale mais
  currency: 'BRL',
  contentName: 'cadastro_voice_clevel',
  contentCategory: 'c_level',
});
```

Depois, na campanha, você pode criar Custom Conversion "Lead C-level" filtrando por essa categoria.
