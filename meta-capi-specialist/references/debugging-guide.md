# Debugging Guide — Meta CAPI

Os problemas mais comuns e como resolver.

## Checklist de diagnóstico rápido

Quando algo não funciona, rode essa sequência antes de qualquer coisa:

1. **Events Manager → Visão Geral**: eventos aparecem? Qual fonte (Browser, Server, ambas)?
2. **Events Manager → Diagnóstico**: há erros listados? Anote o código.
3. **Events Manager → Testar Eventos**: disparar agora mesmo e ver se chega com test_event_code.
4. **Meta Pixel Helper** (extensão Chrome): pixel carrega? Eventos disparam no cliente?
5. **Network tab do DevTools**: request pra `/api/meta/conversion` retorna 200 OK?
6. **Logs do servidor** (Vercel Function Logs): a Meta respondeu `{"events_received": 1}`?

Se você respondeu "sim" em todos, seu setup tá OK e o problema é de sinal/tempo.

## Erros comuns da API de Conversões

### Erro código 100 — "Invalid parameter"

**Causas mais comuns**:

1. **`event_time` em millisegundos** em vez de segundos.
   - ❌ `event_time: Date.now()` → `1713625200000`
   - ✅ `event_time: Math.floor(Date.now() / 1000)` → `1713625200`

2. **`event_id` como número** em vez de string.
   - ❌ `event_id: 12345`
   - ✅ `event_id: "12345"`

3. **Hash incorreto** — enviou dados não hasheados em campos que exigem hash.
   - `em`, `ph`, `fn`, `ln`, `ct`, `st`, `zp`, `country`, `external_id` → **hashear** com SHA-256
   - `fbp`, `fbc`, `client_ip_address`, `client_user_agent` → **NÃO hashear**

4. **Hash com case errado** — deve ser lowercase ANTES de hashear.
   - ❌ `hash("User@Email.COM")`
   - ✅ `hash("user@email.com")`

5. **Telefone mal formatado** — Meta quer só dígitos com código do país.
   - ❌ `"+55 (41) 99999-9999"`
   - ✅ `"5541999999999"`

6. **`action_source` faltando ou inválido**.
   - Valores válidos: `"website"`, `"app"`, `"phone_call"`, `"chat"`, `"email"`, `"physical_store"`, `"system_generated"`, `"other"`
   - Para LP: sempre `"website"`

### Erro código 190 — "Invalid OAuth access token"

**Causas**:
1. Token expirou (se usou token pessoal, não System User).
2. Token foi revogado.
3. Variável de ambiente não está carregando (typo, prefixo `NEXT_PUBLIC_` indevido).

**Fix**:
- Gere novo token via System User no Business Manager.
- Verifique `process.env.META_CAPI_ACCESS_TOKEN` no log do servidor — está definido?
- Na Vercel, confira em Project Settings → Environment Variables.

### Erro código 2 — "Service temporarily unavailable"

**Causa**: instabilidade na Meta ou rate limit.

**Fix**: implemente retry com backoff exponencial:

```typescript
async function sendWithRetry(payload: unknown, maxAttempts = 3): Promise<Response> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(CAPI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Sucesso ou erro não-retentável
      if (response.ok || response.status < 500) return response;
    } catch (err) {
      if (attempt === maxAttempts) throw err;
    }

    // Backoff exponencial com jitter
    const delay = Math.min(1000 * Math.pow(2, attempt), 10000) + Math.random() * 1000;
    await new Promise(r => setTimeout(r, delay));
  }
  throw new Error('Max retries reached');
}
```

### Erro código 10 — "Permission denied"

**Causa**: System User não tem permissão no Pixel ou no App.

**Fix**:
1. Business Manager → Usuários do sistema → selecione o usuário
2. "Adicionar ativos" → adicione o Pixel e o App, com permissão de **Gerenciar**.

## Problemas de Deduplicação

### Sintoma: Events Manager mostra "2 eventos de 2 fontes" (deveria ser 1 de 2)

**Causas**:

1. **`event_id` diferente entre Pixel e CAPI**.
   - Verifique: Pixel está usando `{eventID: xyz}` e CAPI está usando `event_id: xyz` no payload?
   - O MESMO valor precisa estar nos dois.

2. **Janela de 48h estourou** — CAPI disparou muito depois do Pixel.
   - Fix: sempre dispare CAPI junto (ou em minutos) do Pixel, nunca em batch diário.

3. **Diferença no `event_name`** — um mandou `"Lead"` e outro `"lead"` (case-sensitive).
   - Fix: padronize para usar exatamente o nome do evento padrão (PascalCase).

### Como validar deduplicação

No Events Manager → Testar Eventos → filtro "Eventos do servidor":
- Procure mensagem "**1 evento de 2 fontes**" = OK
- "2 eventos de 2 fontes" = duplicação, algo está errado no event_id

## EMQ (Event Match Quality) baixo

### Sintoma: EMQ < 6.0 em Lead

**Causas e fixes**:

| Problema | Fix |
|---|---|
| Só enviando email hasheado | Adicione telefone, nome, cidade, estado, fbp, fbc, IP |
| fbp/fbc não chegando no servidor | Verifique cookies no request header |
| fbc não é capturado quando user vem de ads | Intercepte `fbclid` na URL e seta cookie `_fbc` |
| Hash com espaços/maiúsculas | Trim + lowercase ANTES de hashear |
| Telefone sem código do país | Normalize para `55XXXXXXXXXXX` |
| IP sempre vindo como `::1` (localhost) | Em produção, leia `x-forwarded-for` em vez de `req.ip` |

### Ferramenta: Payload Helper da Meta

https://developers.facebook.com/tools/debug/capi/payload-helper

Cole seu payload JSON e a Meta valida e diz o que tá errado. Use SEMPRE antes de colocar algo novo em produção.

## Eventos não aparecem no Events Manager

### Sintoma: Test Events mostra OK mas Visão Geral não mostra nada após 24h

**Causas**:

1. **Esqueceu de remover `test_event_code`** → eventos só aparecem em "Testar Eventos", nunca em produção.
   - Fix: condicionar envio: `if (process.env.NODE_ENV !== 'production') { payload.test_event_code = '...'; }`

2. **Domínio não verificado** no Business Manager → eventos são aceitos mas ignorados na atribuição.
   - Fix: Business Manager → Segurança da marca → Domínios → Adicionar e verificar via DNS TXT ou meta tag.

3. **Pixel ID errado na CAPI** (apontando para outro Pixel).
   - Fix: confira se `NEXT_PUBLIC_META_PIXEL_ID` no cliente === `PIXEL_ID` usado no servidor.

4. **CAPI retornando erro silencioso** — o request do cliente chama a API Route mas ela falha.
   - Fix: sempre fazer `console.error` no catch e verificar logs da Vercel Functions.

## Script de teste manual (bash)

Para validar que seu endpoint está enviando corretamente, sem passar pelo navegador:

```bash
#!/bin/bash
# test-capi.sh - Teste manual da CAPI

PIXEL_ID="SEU_PIXEL_ID"
ACCESS_TOKEN="SEU_ACCESS_TOKEN"
TEST_EVENT_CODE="TEST12345"

# SHA-256 em bash (precisa de openssl ou sha256sum)
hash_data() {
  echo -n "$1" | tr '[:upper:]' '[:lower:]' | xargs | sha256sum | awk '{print $1}'
}

EMAIL_HASH=$(hash_data "teste@exemplo.com")
PHONE_HASH=$(hash_data "5541999999999")
EVENT_TIME=$(date +%s)

curl -X POST "https://graph.facebook.com/v21.0/${PIXEL_ID}/events" \
  -H "Content-Type: application/json" \
  -d "{
    \"data\": [{
      \"event_name\": \"Lead\",
      \"event_time\": ${EVENT_TIME},
      \"event_id\": \"test_lead_$(date +%s)\",
      \"action_source\": \"website\",
      \"event_source_url\": \"https://lp.executivosdigital.com.br/\",
      \"user_data\": {
        \"em\": \"${EMAIL_HASH}\",
        \"ph\": \"${PHONE_HASH}\"
      },
      \"custom_data\": {
        \"value\": 50,
        \"currency\": \"BRL\"
      }
    }],
    \"test_event_code\": \"${TEST_EVENT_CODE}\",
    \"access_token\": \"${ACCESS_TOKEN}\"
  }"
```

Resposta esperada:
```json
{
  "events_received": 1,
  "messages": [],
  "fbtrace_id": "..."
}
```

Se `events_received: 0`, há erro no payload — olhar `messages`.

## Chrome DevTools — checklist rápido

1. Abrir a LP
2. DevTools → Network → filtrar por `facebook`
3. Deve aparecer:
   - `fbevents.js` (script do Pixel)
   - `tr?id=PIXEL_ID&ev=PageView` (evento PageView do Pixel)
   - Ao disparar eventos: mais requests pra `tr?...`
4. Application → Cookies → domínio atual:
   - `_fbp` deve existir (setado pelo Pixel)
   - `_fbc` deve existir SE o usuário veio com `?fbclid=...`
5. Network → filtrar por `/api/meta/conversion` (sua API Route):
   - Request aparece ao disparar evento? Status 200?

## Meta Pixel Helper

Instale: https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc

Abrindo a LP, o ícone mostra:
- ✅ Verde: Pixel carregou e disparou eventos
- ⚠️ Amarelo: Pixel carregou mas com avisos (ex: evento sem valor)
- ❌ Vermelho: Pixel não carregou ou erro crítico

Clique no ícone para ver detalhes de cada evento disparado.

## Debug de hash

Para confirmar que o hash está correto:

```typescript
// Teste com valor conhecido
console.log(hashUserData("teste@exemplo.com"));
// Esperado: "a8f5f167f44f4964e6c998dee827110c..." (valor específico de SHA-256)

// Verificar contra uma ferramenta online:
// https://emn178.github.io/online-tools/sha256.html
// Cole "teste@exemplo.com" (em minúsculas) e compare
```

## Quando o EMQ não sobe mesmo com tudo certo

Se você tá enviando email + telefone + nome + cidade + fbp + fbc + IP + UA e EMQ ainda tá baixo, causas possíveis:

1. **Volume baixo de eventos** — EMQ estabiliza com 100+ eventos. Abaixo disso, métrica é ruim.
2. **Usuários em modo anônimo/VPN** — IPs aleatórios quebram matching.
3. **Emails descartáveis** (10minutemail etc.) — Meta não casa com perfis reais.
4. **Hash errado silencioso** — rode o teste de hash acima.

Se tudo checou, espere 7-14 dias para EMQ estabilizar com dados suficientes.
