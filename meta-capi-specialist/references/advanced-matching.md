# Advanced Matching — Maximizando EMQ

Advanced Matching é o processo de enviar dados do usuário junto com eventos para a Meta conseguir "casar" (match) o evento com o perfil real no Facebook/Instagram. Quanto melhor o matching, melhor o algoritmo otimiza suas campanhas.

## Por que importa

- **EMQ alto (8+)** = Meta identifica 80%+ dos seus leads → Lookalike fica muito melhor
- **EMQ baixo (<6)** = Meta perde muitos usuários → campanhas otimizam pra "ruído"
- **Impacto no CPL**: EMQ 8+ costuma reduzir CPL em 15-30% vs EMQ 5

## Parâmetros de matching (em ordem de impacto)

| Parâmetro | Chave | Hash? | Impacto no EMQ | Quando enviar |
|---|---|---|---|---|
| Email | `em` | ✅ SHA-256 | 🔥🔥🔥 | Sempre que tiver |
| Telefone | `ph` | ✅ SHA-256 | 🔥🔥🔥 | Sempre que tiver |
| External ID | `external_id` | ✅ SHA-256 | 🔥🔥 | ID do usuário no seu sistema |
| FB Login ID | `fb_login_id` | ❌ | 🔥🔥 | Só se usar Login com Facebook |
| fbp | `fbp` | ❌ | 🔥🔥 | Sempre (cookie do Pixel) |
| fbc | `fbc` | ❌ | 🔥🔥 | Quando user veio de anúncio |
| IP do cliente | `client_ip_address` | ❌ | 🔥 | Sempre (do request) |
| User Agent | `client_user_agent` | ❌ | 🔥 | Sempre (do request) |
| Primeiro nome | `fn` | ✅ SHA-256 | 🔥 | Quando formulário capturar |
| Sobrenome | `ln` | ✅ SHA-256 | 🔥 | Quando formulário capturar |
| Cidade | `ct` | ✅ SHA-256 | 🔥 | Quando disponível |
| Estado | `st` | ✅ SHA-256 | ⚡ | Formato: código ISO ("sp", "pr") |
| CEP | `zp` | ✅ SHA-256 | 🔥 | Quando disponível |
| País | `country` | ✅ SHA-256 | ⚡ | Sempre ("br") |
| Data de nascimento | `db` | ✅ SHA-256 | ⚡ | Formato YYYYMMDD |
| Gênero | `ge` | ✅ SHA-256 | ⚡ | "f" ou "m" |

## Regras de normalização antes de hashear

**OBRIGATÓRIAS** — se não seguir, hash não bate com o perfil do usuário na Meta:

### Email
```typescript
function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}
// "  User@Email.COM  " → "user@email.com"
```

### Telefone
```typescript
function normalizePhone(phone: string): string {
  // Remove tudo que não é dígito
  let digits = phone.replace(/\D/g, '');
  // Se veio sem código do país, prefixa Brasil
  if (digits.length === 10 || digits.length === 11) {
    digits = `55${digits}`;
  }
  return digits;
}
// "+55 (41) 99999-9999" → "5541999999999"
```

### Nome (primeiro e sobrenome)
```typescript
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')                    // decompõe acentos
    .replace(/[\u0300-\u036f]/g, '');    // remove diacríticos
}
// "João da Silva" → "joao da silva"
```

### Cidade
```typescript
function normalizeCity(city: string): string {
  return city
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');
}
// "São Paulo" → "saopaulo"
```

### Estado
```typescript
function normalizeState(state: string): string {
  // Código ISO de 2 letras em minúsculas
  return state.toLowerCase().trim();
}
// "PR" → "pr"
```

### CEP
```typescript
function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, '');
}
// "80010-000" → "80010000"
```

### País
```typescript
function normalizeCountry(country: string): string {
  return country.toLowerCase().trim(); // ISO 2 letras
}
// "Brasil" → precisa ser transformado em "br" antes
```

### Data de nascimento
```typescript
function normalizeDob(dob: Date): string {
  const year = dob.getFullYear();
  const month = String(dob.getMonth() + 1).padStart(2, '0');
  const day = String(dob.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}
// new Date(1990, 4, 15) → "19900515"
```

## Parâmetros que NÃO devem ser hasheados

Enviar em **texto puro**:

- `fbp` — cookie `_fbp` (ex: `"fb.1.1713625200.1234567890"`)
- `fbc` — cookie `_fbc` (ex: `"fb.1.1713625200.ABCdef..."`)
- `client_ip_address` — IP do usuário (ex: `"189.45.23.10"`)
- `client_user_agent` — UA string completa
- `fb_login_id` — ID do login FB (caso use)

Se você hashear esses, a Meta não consegue usar → EMQ despenca.

## Como capturar fbc corretamente

Quando um usuário clica no anúncio, o Meta redireciona para sua LP com `?fbclid=ABC123...`. Você precisa:

1. **Interceptar no cliente** e setar cookie `_fbc`:

```typescript
// No componente MetaPixel, dentro do useEffect:
const params = new URLSearchParams(window.location.search);
const fbclid = params.get('fbclid');
if (fbclid) {
  const fbc = `fb.1.${Date.now()}.${fbclid}`;
  const maxAge = 90 * 24 * 60 * 60; // 90 dias
  document.cookie = `_fbc=${fbc}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
}
```

2. **Ler no servidor** a partir do header Cookie:

```typescript
function getFbc(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(/_fbc=([^;]+)/);
  return match ? match[1] : undefined;
}
```

3. **Enviar no payload CAPI** sem hash.

Sem essa cadeia, atribuição de leads ao anúncio que gerou cai muito.

## Como capturar fbp

O Pixel seta automaticamente o cookie `_fbp` na primeira visita. Você só precisa ler no servidor:

```typescript
function getFbp(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(/_fbp=([^;]+)/);
  return match ? match[1] : undefined;
}
```

**Troubleshooting**: se `_fbp` não aparece nos cookies, significa que o Pixel não carregou. Veja `debugging-guide.md`.

## Capturar IP e User Agent na API Route

### App Router
```typescript
const clientIp =
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  request.headers.get('x-real-ip') ||
  undefined;

const userAgent = request.headers.get('user-agent') || undefined;
```

### Pages Router
```typescript
const clientIp =
  (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
  (req.headers['x-real-ip'] as string) ||
  req.socket.remoteAddress ||
  undefined;

const userAgent = req.headers['user-agent'] || undefined;
```

**Atenção na Vercel**: `x-forwarded-for` pode ter múltiplos IPs separados por vírgula. Sempre pegar o primeiro.

## External ID — alavanca pouco usada

Se você tem um CRM ou banco de dados com ID de usuário, envie como `external_id` hasheado. Isso permite Meta casar com o mesmo usuário entre dispositivos.

```typescript
const externalId = hashUserData(userIdFromYourDatabase);
```

Especialmente poderoso para SaaS — mesmo usuário acessando no celular e desktop vira o mesmo sinal.

## Medindo o resultado

Após 7-14 dias com Advanced Matching completo, no Events Manager:

1. Vá em **Pixel → Visão Geral → Configurações**
2. Veja o "**Event Match Quality**" de cada evento
3. Meta ideal:
   - `Lead` — 7.5 a 9.0
   - `Contact` — 7.0 a 8.5
   - `Purchase` — 8.5 a 9.5
   - `PageView` — 6.5 a 7.5 (OK mesmo baixo aqui, não é evento de otimização)

Se `Lead` está abaixo de 7.0, veja `debugging-guide.md` — geralmente é hash errado ou faltando fbp/fbc.
