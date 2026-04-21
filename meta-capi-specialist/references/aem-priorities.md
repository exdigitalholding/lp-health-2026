# Mensuração de Eventos Agregados (AEM)

AEM = recurso que Meta criou em resposta ao iOS 14.5+ App Tracking Transparency. Permite que, mesmo com usuários que optaram por não ser rastreados, eventos sejam reportados (de forma agregada, com privacidade).

## Por que AEM é obrigatório

Sem AEM configurado:
- Usuários iOS que **opt-out** de tracking não contribuem para otimização nenhuma
- Campanhas otimizam só com dados de Android/desktop → públicos enviesados
- Você perde ~20-30% do sinal em B2B (muitos executivos usam iPhone)

Com AEM configurado:
- Até 8 eventos por domínio podem ser priorizados
- Usuários iOS opt-out contribuem sim, de forma agregada
- Modelagem da Meta preenche gaps de atribuição

## Como configurar — passo a passo

### 1. Verificar o domínio

Pré-requisito obrigatório. No Business Manager:

1. **Segurança da marca → Domínios**
2. **Adicionar domínio**: `executivosdigital.com.br` (o domínio-raiz, não o subdomínio)
3. Verificar via **DNS TXT** (recomendado) ou **Meta tag**:

**DNS TXT** (na Vercel DNS ou Cloudflare):
- Tipo: `TXT`
- Nome: `@`
- Valor: `facebook-domain-verification=XXXXXXXXXX` (gerado pela Meta)

**Meta tag** (se usar):
- Colocar no `<head>` do `layout.tsx`:
```html
<meta name="facebook-domain-verification" content="XXXXXXXXXX" />
```

Aguardar até 72h para propagação. Validar de volta no Business Manager.

### 2. Configurar priorização de eventos

No Events Manager:

1. Selecionar o Pixel
2. Menu lateral: **Mensuração de Eventos Agregados**
3. Aba **Eventos da Web**
4. **Configurar Web Events**
5. Escolher o domínio verificado
6. Adicionar os 8 eventos em ordem de prioridade

### 3. Ordem de prioridade recomendada para Executivo's Voice

```
Slot 1 (máxima prioridade):  Subscribe       ← cliente pagante (quando existir)
Slot 2:                      Purchase        ← compra de plano anual (quando existir)
Slot 3:                      StartTrial      ← ativou conta e gravou 1ª reunião
Slot 4:                      Lead            ← submit do formulário
Slot 5:                      Contact         ← clique WhatsApp
Slot 6:                      CompleteRegistration ← cadastro completo (se separado de Lead)
Slot 7:                      ViewContent     ← scroll 60%+ ou demo vídeo
Slot 8:                      PageView        ← mínima prioridade
```

### Para MVP (só 4 eventos inicialmente)

```
Slot 1: Lead
Slot 2: Contact
Slot 3: ViewContent
Slot 4: PageView
```

Os outros 4 slots ficam livres para quando o funil evoluir.

## Como a prioridade funciona

Quando um usuário iOS opt-out faz várias ações na mesma sessão, a Meta reporta apenas **o evento de maior prioridade**. Ou seja:

- User viu página (PageView) → scrollou (ViewContent) → clicou WhatsApp (Contact) → preencheu formulário (Lead)
- Meta reporta apenas `Lead` (o de maior prioridade configurada)

Por isso a ordem importa — eventos de "fim de funil" devem estar no topo.

## Regras e limites

- Máximo **8 eventos por domínio**
- Cada mudança de priorização tem "quarentena" de 48-72h antes de entrar em vigor
- Custom events e Custom conversions também ocupam slots
- Event não listado = descartado para usuários iOS opt-out

## Value Optimization (opcional, avançado)

Para campanhas com otimização por valor (ROAS), ative **Value Optimization** no AEM:

1. No mesmo painel AEM
2. Aba **Valor otimizado**
3. Selecionar eventos de value (ex: `Subscribe`, `Purchase`, `Lead` com value)
4. Meta usa value modeling para otimizar por ROAS mesmo com iOS opt-out

## Troubleshooting comum

### "Seu domínio não está verificado"
- Veja no Business Manager → Segurança da marca se o status é "Verificado" (verde)
- Se estiver pendente, aguarde 24-72h
- Se falhar, remova e re-adicione, tente outro método (DNS vs meta tag)

### "Eventos não aparecem no painel AEM"
- Precisam ter sido disparados pelo menos uma vez com dados reais (não test events)
- Aguarde 24h após primeiro disparo

### "Erro: você já tem 8 eventos configurados"
- Precisa remover um para adicionar outro
- Remova o de menor valor estratégico (ex: PageView)

## Quando reconfigurar

Refaça o AEM sempre que:
- Adicionar novo evento importante ao funil (ex: começou a cobrar pelo produto → adiciona `Subscribe`)
- Remover algum evento que não usa mais
- Mudar prioridade relativa (ex: antes priorizava Lead, agora prioriza StartTrial)

**Lembre**: toda mudança tem 48-72h de quarentena — não mexa em véspera de campanha grande.
