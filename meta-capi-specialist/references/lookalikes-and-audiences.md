# Públicos Customizados, Lookalikes e Remarketing

Estratégia de audiências para escalar campanhas do Executivo's Voice com qualidade.

## Os 4 tipos de público que importam

### 1. Custom Audiences (Públicos Customizados) — pessoas que já interagiram

Base para remarketing. Criar no Gerenciador de Públicos:

**Visitantes do site:**
- Todos os visitantes (últimos 30/60/90/180 dias)
- Quem visitou páginas específicas (ex: seção "Casos de uso")
- Quem visitou mas **não converteu** (visitou E NÃO disparou `Lead`)

**Por evento disparado:**
- Quem disparou `ViewContent` últimos 60 dias
- Quem disparou `Contact` (clicou WhatsApp) últimos 30 dias
- Quem disparou `Lead` últimos 90 dias
- Quem disparou `StartTrial` mas não `Subscribe` (quente, precisa follow-up)

**Upload de base própria:**
- Clientes pagantes atuais (CRM exportado)
- Lista de trial users que não converteram
- Base de newsletter/conteúdo

### 2. Lookalike Audiences (Semelhantes) — pessoas parecidas com suas melhores

⚠️ **Regra de ouro**: qualidade da fonte > tamanho. Um LAL 1% de 500 clientes pagantes performa melhor que LAL 1% de 10.000 leads frios.

**Hierarquia de qualidade (melhor no topo):**

1. **LAL de Clientes Pagantes** — upload da base paga como fonte
2. **LAL Value-Based de Purchase/Subscribe** — baseado em valor (quanto paga mais, melhor)
3. **LAL de StartTrial** — ativaram produto, forte sinal
4. **LAL Value-Based de Lead** — leads de maior valor histórico
5. **LAL de Lead (sem value)** — qualquer lead
6. **LAL de Visitantes** — mais fraco, usar como backup

**Tamanhos recomendados:**
- 1% (menor, mais semelhante) — usar em campanhas de conversão principais
- 1-3% — escalar mantendo relevância
- 3-5% — topo de funil, prospecção ampla
- 5-10% — evitar, fica muito diluído

### 3. Interesses e Demografias — só como seed inicial

Na fase inicial (<30 dias de Pixel), sem dados suficientes pra LAL, use segmentação manual:

**Para Executivo's Voice:**
- Cargos: CEO, Founder, Diretor Comercial, Head of Sales, Gerente Comercial
- Setores: SaaS, Consultoria, Direito, Agência
- Idades: 28-55 (onde estão decisores)
- Interesses: LinkedIn, HubSpot, RD Station, Salesforce, produtividade

Depois de 50+ Leads, migre pra LAL e use interesses só em camadas adicionais.

### 4. Engagement Audiences — interagiu com seu conteúdo

- Seguidores do Instagram/Facebook
- Assistiram 50%+ de vídeo orgânico
- Engajaram com post (curtiu, comentou, salvou)
- Visitaram perfil do Instagram

Ótimo para aquecer antes de converter.

## Estratégia de campanhas por estágio do funil

### Topo de funil (TOFU) — descoberta

**Públicos:**
- LAL 1-3% de clientes pagantes
- Interesses amplos (cargos + setores)
- Excluir: quem já visitou o site (evita canibalizar remarketing)

**Objetivo de campanha:** Conversões (otimizando para `Lead`)
**Criativos:** Vídeos curtos mostrando o problema (reuniões sem memória)

### Meio de funil (MOFU) — consideração

**Públicos:**
- Visitantes 30 dias que não converteram
- Quem disparou `ViewContent` mas não `Lead`
- Engajamento Instagram/Facebook

**Objetivo de campanha:** Conversões (otimizando para `Lead`)
**Criativos:** Casos de uso específicos, prova social, comparativos

### Fundo de funil (BOFU) — conversão

**Públicos:**
- Visitantes 7 dias
- Quem disparou `Contact` mas não voltou
- Quem preencheu formulário mas não ativou conta

**Objetivo:** Conversões (otimizando para `Lead` ou evento mais abaixo)
**Criativos:** Prova social forte, urgência, "gratuito/sem cartão"

## Públicos de exclusão — tão importantes quanto inclusão

Sempre excluir em todas as campanhas:

- **Clientes pagantes** (evita gastar em quem já paga)
- **Usuários ativos de trial** (eles vão ver seus comunicados orgânicos)
- **Quem converteu nos últimos 7 dias** (dá tempo de ser onboarding, não quer ver mais ads)

Em campanhas TOFU, excluir também:
- Visitantes últimos 60 dias (eles vão pra campanha de remarketing)

## Cadência de atualização

| Público | Frequência de atualização |
|---|---|
| Visitantes do site | Automático (Pixel) |
| Eventos disparados | Automático (Pixel/CAPI) |
| Upload de clientes pagantes | Semanal (automatizar via Zapier/Make) |
| LAL | Automático (Meta atualiza a cada 3-7 dias) |

## Automação via CAPI + CRM

Para manter a base atualizada com dados de fundo de funil (onde Pixel não alcança):

1. **CRM → Zapier/Make → CAPI**
2. Quando lead vira pagante no CRM, enviar evento `Subscribe` via CAPI
3. Quando trial é ativado, enviar `StartTrial` via CAPI
4. Isso alimenta a Meta com dados de qualidade que Pixel não tem

Veja `crm-integration.md` para implementação.

## Públicos para campanhas de retenção/upsell

Depois que cliente paga, não esquecer:

- LAL de clientes com maior LTV (upsell de plano anual)
- Clientes que cancelaram (winback campaign)
- Clientes inativos há 30 dias (reengajamento)

Usar com cuidado — frequência alta cansa.

## Métricas-chave de público

No Ads Manager, para cada conjunto de anúncios:

- **Frequência**: acima de 3.5 vira "fadiga" — rotacione criativos ou expanda público
- **CPM**: se subir sem motivo, público tá esgotado
- **CTR único**: abaixo de 0.8% = criativo ou público ruim
- **Taxa de conversão**: se cair 30%+ vs histórico = público muito diluído

## Estratégia inicial para Executivo's Voice (primeiros 30 dias)

Enquanto não tem dados suficientes:

**Campanha 1 — TOFU Interesses**
- Público: cargos executivos + SaaS/consultoria
- Orçamento: 60% do total
- Objetivo: `Lead`
- Criativo: vídeo "problema da reunião sem memória"

**Campanha 2 — TOFU LAL Semente**
- Público: LAL 1-3% de upload da sua base atual (se tiver 100+ pessoas)
- Orçamento: 20% do total
- Objetivo: `Lead`

**Campanha 3 — Remarketing**
- Público: visitantes 30 dias que não convertem
- Orçamento: 20% do total
- Objetivo: `Lead`
- Criativo: prova social, CTA direto "comece grátis"

## Após 30 dias — migrar para:

**Campanha 1 — TOFU LAL Clientes Pagantes**
- Público: LAL 1-3% de clientes pagantes (conforme for tendo)
- Orçamento: 50%

**Campanha 2 — TOFU LAL Value-Based**
- Público: LAL 1-3% value-based de `Lead`
- Orçamento: 30%

**Campanha 3 — Remarketing Multinível**
- Públicos separados: 7d, 30d, 60d (cada um com criativo diferente)
- Orçamento: 20%
