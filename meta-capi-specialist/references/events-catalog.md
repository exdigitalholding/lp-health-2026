# Catálogo de Eventos Padrão da Meta

17 eventos padrão oficiais. Use esta referência para decidir qual disparar em cada ação do usuário.

## Tabela rápida de decisão

| Ação do usuário | Evento recomendado | Prioridade |
|---|---|---|
| Carregou a página | `PageView` | Auto (Pixel) |
| Scrollou 60%+ ou assistiu vídeo demo | `ViewContent` | Média |
| Preencheu formulário de cadastro | `Lead` + `CompleteRegistration` | 🔥 Alta |
| Clicou em WhatsApp | `Contact` | Alta |
| Agendou demo/reunião | `Schedule` | Alta |
| Iniciou trial | `StartTrial` | Alta |
| Virou assinante pago | `Subscribe` | 🔥 Alta |
| Fez compra única | `Purchase` | 🔥 Alta |
| Buscou algo no site | `Search` | Baixa |
| Clicou em endereço/mapa | `FindLocation` | Contextual |

## Eventos Detalhados

### PageView
**Quando**: toda carga de página.
**Parâmetros obrigatórios**: nenhum.
**Auto-disparo**: sim, no snippet base do Pixel.
```javascript
fbq('track', 'PageView');
```

### ViewContent
**Quando**: usuário visualizou conteúdo significativo — produto, página de serviço, vídeo demo, seção-chave da LP.
**Parâmetros úteis**: `content_name`, `content_category`, `content_ids`, `value`, `currency`.
**Para SaaS B2B**: ótimo sinal intermediário de intenção. Use em scroll profundo ou início de vídeo de demo.
```javascript
fbq('track', 'ViewContent', {
  content_name: 'demo_video_voice',
  content_category: 'demo',
  value: 0,
  currency: 'BRL'
});
```

### Search
**Quando**: usuário fez uma busca no site.
**Parâmetros úteis**: `search_string`, `content_category`.
**Para SaaS B2B**: raramente aplicável — só use se a LP tiver busca.

### AddToCart
**Quando**: produto adicionado ao carrinho.
**Parâmetros úteis**: `value`, `currency`, `content_ids`, `content_type`.
**Para SaaS B2B**: use se tiver trial pago, "adicionar plano X ao checkout".

### AddToWishlist
**Quando**: item salvo em favoritos/desejos.
**Para SaaS B2B**: geralmente não se aplica.

### InitiateCheckout
**Quando**: usuário clicou em "Continuar para pagamento".
**Parâmetros úteis**: `value`, `currency`, `content_ids`, `num_items`.
**Para SaaS B2B**: dispara na página de checkout do plano pago.

### AddPaymentInfo
**Quando**: usuário inseriu dados de pagamento (antes de finalizar).
**Parâmetros úteis**: `value`, `currency`, `content_category`.
**Sinal forte**: quem chegou aqui tem alta probabilidade de converter.

### Purchase
**Quando**: compra finalizada. **Evento mais importante para e-commerce**.
**Parâmetros obrigatórios**: `value`, `currency`.
**Para SaaS B2B**: use quando usuário vira pagante. Envie o **ticket real** da assinatura.
```javascript
fbq('track', 'Purchase', {
  value: 97.00,
  currency: 'BRL',
  content_ids: ['plano_pro'],
  content_type: 'subscription'
});
```

### Lead
**Quando**: usuário demonstrou interesse qualificado — preencheu formulário de contato, solicitou orçamento, pediu demo.
**Parâmetros úteis**: `value`, `currency`, `content_name`, `content_category`.
**Para SaaS B2B**: 🔥 **evento principal** para campanhas de geração de leads. Dispare APÓS validação de sucesso do formulário.
```javascript
fbq('track', 'Lead', {
  value: 50.00,
  currency: 'BRL',
  content_name: 'cadastro_voice',
  content_category: 'saas_b2b'
});
```

### CompleteRegistration
**Quando**: usuário completou cadastro (pode ser mesmo momento do Lead, ou posterior).
**Parâmetros úteis**: `value`, `currency`, `content_name`, `status`.
**Para SaaS B2B**: use em paralelo com Lead se o cadastro for separado do lead (ex: Lead = formulário curto, CompleteRegistration = criação de conta completa).

### Contact
**Quando**: usuário iniciou contato por canais alternativos — WhatsApp, e-mail, telefone, chat.
**Parâmetros úteis**: `content_name`, `content_category`.
**Para SaaS B2B**: 🔥 **essencial** quando LP tem botões de WhatsApp. Sem esse evento, você perde sinal de ~50% das conversões.
```javascript
fbq('track', 'Contact', {
  content_name: 'whatsapp_hero_cta',
  content_category: 'saas_b2b'
});
```

### CustomizeProduct
**Quando**: usuário customizou produto via configurador.
**Para SaaS B2B**: raramente aplicável.

### Donate
**Quando**: doação para organização.
**Para SaaS B2B**: não se aplica.

### FindLocation
**Quando**: usuário procurou localização física.
**Para SaaS B2B**: não se aplica (produto digital).

### Schedule
**Quando**: usuário agendou horário/visita/reunião.
**Parâmetros úteis**: `content_name`, `content_category`.
**Para SaaS B2B**: 🔥 **ótimo evento** para quando a LP tem "Agendar demo" via Calendly/SavvyCal.
```javascript
fbq('track', 'Schedule', {
  content_name: 'demo_agendada_calendly'
});
```

### StartTrial
**Quando**: usuário começou período de avaliação gratuita.
**Parâmetros obrigatórios**: `value`, `currency`, `predicted_ltv`.
**Para SaaS B2B**: use quando ativar trial — separa curiosos de quem realmente usou.
```javascript
fbq('track', 'StartTrial', {
  value: 0.00,
  currency: 'BRL',
  predicted_ltv: 776.00 // LTV previsto: R$97 × 8 meses
});
```

### SubmitApplication
**Quando**: envio de candidatura/aplicação (emprego, crédito, programa).
**Para SaaS B2B**: raramente aplicável.

### Subscribe
**Quando**: usuário iniciou assinatura paga.
**Parâmetros obrigatórios**: `value`, `currency`, `predicted_ltv`.
**Para SaaS B2B**: 🔥 **evento-fim-do-funil**. Dispare no primeiro pagamento aprovado.
```javascript
fbq('track', 'Subscribe', {
  value: 97.00,
  currency: 'BRL',
  predicted_ltv: 776.00
});
```

## Setup recomendado para LP de SaaS B2B (caso Executivo's Voice)

Configuração mínima viável (MVP):

```
1. PageView           — auto
2. ViewContent        — scroll 60%+ ou visualização de vídeo demo
3. Contact            — cada clique em botão de WhatsApp
4. Lead               — submit do formulário de cadastro
```

Setup evoluído (após 30 dias):

```
1. PageView
2. ViewContent
3. Contact (WhatsApp)
4. Lead (formulário)
5. StartTrial         — quando ativar conta e gravar 1ª reunião
6. Subscribe          — quando virar pagante (via CAPI + CRM)
7. Schedule           — se adicionar agendamento de demo
```

## Eventos Personalizados (Custom Events)

Quando nenhum evento padrão encaixa, crie custom. Exemplo para Executivo's Voice:

```javascript
fbq('trackCustom', 'GravouPrimeiraReuniao', {
  content_name: 'first_recording',
  value: 100,
  currency: 'BRL'
});
```

**Quando usar custom**:
- Microconversões específicas do seu funil
- Eventos de qualificação que são únicos do seu negócio
- Ações que não encaixam em nenhum padrão

**Quando NÃO usar custom**:
- Quando um padrão encaixa (use sempre o padrão — tem mais sinal algorítmico)
- Para eventos que você tem certeza que vai querer otimizar campanhas

## Custom Conversions vs Custom Events

- **Custom Event** (`trackCustom`): cria um novo evento do zero
- **Custom Conversion**: cria regra baseada em evento existente + filtro (ex: "Purchase com value > 100")

Para SaaS, use Custom Conversions para criar "Lead qualificado" a partir de `Lead` + filtro no parâmetro `content_category`.
