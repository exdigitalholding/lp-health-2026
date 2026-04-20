# Privacidade, LGPD e Consentimento

Meta CAPI em operação com dados de brasileiros exige atenção à LGPD (Lei 13.709/2018). Este guia cobre o essencial para o caso do Executivo's Voice sem juridiquês desnecessário.

## O que a LGPD exige (em linguagem prática)

1. **Base legal** para tratar dados pessoais — para tracking publicitário, geralmente é **consentimento** ou **legítimo interesse** (com ressalvas).
2. **Transparência** — usuário precisa saber que dados são coletados e para quê (política de privacidade clara).
3. **Direitos do titular** — usuário pode pedir para ver, corrigir ou apagar dados.
4. **Minimização** — só coletar o que é necessário.
5. **Segurança** — dados criptografados em trânsito e em repouso.

## CAPI + LGPD — o que muda

O dado enviado à Meta é **hasheado SHA-256** antes. Isso ajuda tecnicamente (pseudonimização), mas **não elimina** a obrigação de ter base legal.

Mesmo hasheado:
- É considerado dado pessoal (pseudônimo ainda é reversível com outras informações da Meta).
- Precisa de base legal para envio.
- Usuário tem direito de saber que está sendo enviado à Meta.

## Consentimento — implementação mínima viável

### 1. Banner de cookies / consentimento

Na primeira visita da LP, apresentar banner com:
- Opção de **aceitar** tracking de marketing
- Opção de **recusar** (ou configurar categorias)
- Link para política de privacidade completa

Exemplo de texto:
> "Usamos cookies e pixels para análise e marketing. Ao clicar em 'Aceitar', você concorda com o envio de dados a parceiros como Meta e Google para medir campanhas. Você pode recusar ou configurar individualmente."

### 2. Respeitar a escolha

Se usuário **recusar**:
- **Não carregar** o Pixel
- **Não disparar** eventos CAPI
- Ou, se for adotar "consent mode", disparar com flag de consent ausente (Meta reduz o sinal)

```tsx
// components/MetaPixel.tsx com consent
'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function MetaPixel() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Ler consent do localStorage ou cookie
    const stored = localStorage.getItem('marketing_consent');
    setConsent(stored === 'true');
  }, []);

  if (!consent) return null;

  return (
    <Script id="fb-pixel" strategy="afterInteractive">
      {/* ... código do Pixel ... */}
    </Script>
  );
}
```

### 3. Lib recomendadas

Para implementar banner de consentimento rapidamente em Next.js:

- **Cookiebot** (gratuito até 100 páginas/mês)
- **Iubenda** (pago, mais completo, integra com LGPD/GDPR/CCPA)
- **React Cookie Consent** (bundle simples, open-source, customização manual)
- **Solução própria** (simples para LP de poucas páginas)

Exemplo de solução própria simples:

```tsx
// components/ConsentBanner.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('marketing_consent');
    if (stored === null) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('marketing_consent', 'true');
    setVisible(false);
    window.location.reload(); // recarrega pra Pixel inicializar
  }

  function refuse() {
    localStorage.setItem('marketing_consent', 'false');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm">
          Usamos cookies e pixels para analisar uso e melhorar campanhas.
          Dados são enviados à Meta (Facebook/Instagram) para mensuração.
          Ver <a href="/privacidade" className="underline">Política de Privacidade</a>.
        </p>
        <div className="flex gap-2">
          <button onClick={refuse} className="px-4 py-2 border border-white rounded">
            Recusar
          </button>
          <button onClick={accept} className="px-4 py-2 bg-white text-gray-900 rounded">
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Política de Privacidade — itens obrigatórios

A política deve mencionar explicitamente:

1. **Dados coletados** (nome, email, telefone, IP, cookies)
2. **Finalidade** (contato comercial, remarketing, otimização de anúncios)
3. **Terceiros com quem compartilha** (Meta/Facebook, Google, se houver)
4. **Base legal** (consentimento e/ou legítimo interesse)
5. **Prazo de retenção**
6. **Direitos do titular** e como exercê-los (email de contato)
7. **DPO ou encarregado** (se aplicável — empresa com alto volume precisa)

Template genérico base em: https://www.gov.br/anpd/pt-br

## Formulário de Lead — práticas LGPD

Na sua LP, o formulário "Criar conta gratuita" deve:

1. **Checkbox de consentimento** (ou mensagem clara abaixo do botão):
```
☑ Ao criar conta, concordo com os Termos de Uso e Política de Privacidade,
  incluindo envio de dados à Meta para mensuração de campanhas.
```

2. **Link visível** para Termos e Política.

3. **Não coletar além do necessário** — você já coleta nome, email, telefone (correto). Não peça CPF, data de nascimento se não precisar.

## Dados hasheados × pseudonimização × anonimização

Entender a diferença:

- **Dado em claro**: `email@exemplo.com` — LGPD se aplica totalmente.
- **Dado hasheado (SHA-256)**: `a8f5f167f44f...` — **ainda é dado pessoal** (pseudonimização). LGPD se aplica.
- **Dado anonimizado**: removido qualquer identificação, impossível reverter — LGPD **não se aplica**.

Como Meta CAPI envia dados hasheados mas identifica o usuário na ponta, é pseudonimização — LGPD aplica.

## Transferência internacional (importante)

Meta é empresa americana (EUA). Você está transferindo dados pessoais para fora do Brasil. A LGPD permite isso se:

1. O país de destino tem proteção adequada (**EUA não é**), **OU**
2. Há cláusulas contratuais padrão, **OU**
3. O titular deu **consentimento específico** para transferência internacional.

**Ação prática**: mencione na política de privacidade:
> "Seus dados podem ser transferidos para servidores nos EUA, onde ficam hospedados os serviços da Meta (Facebook/Instagram). Ao aceitar, você consente com essa transferência."

## Direito de oposição e exclusão

Se usuário pedir para ser removido do tracking da Meta:

1. **Revogue consentimento** no seu sistema.
2. **Remova da base** de públicos customizados no Gerenciador.
3. Para ser removido dos dados da Meta como um todo, oriente o usuário a acessar:
   https://accountscenter.facebook.com/info_and_permissions/ads_data

A Meta tem ferramentas próprias de direitos do titular que você pode indicar, mas **você é responsável** pelo que está no SEU sistema.

## Limits Data Use (LDU) — para Califórnia (CCPA)

Se sua LP recebe tráfego dos EUA, configure o flag LDU para usuários californianos:

```typescript
// No payload CAPI:
const event = {
  // ...
  data_processing_options: ['LDU'],
  data_processing_options_country: 1, // EUA
  data_processing_options_state: 1000, // Califórnia
};
```

Para operação só no Brasil, **não é necessário**.

## Resumo executivo — checklist LGPD para Executivo's Voice

- [ ] Banner de consentimento implementado
- [ ] Política de Privacidade detalhada e acessível
- [ ] Termos de Uso acessíveis
- [ ] Formulário com checkbox ou texto de consentimento claro
- [ ] Política menciona transferência internacional (Meta/EUA)
- [ ] Canal de contato para exercer direitos do titular (ex: `voce@executivosdigital.com.br`)
- [ ] Consent respeitado no código (Pixel não carrega sem consent)
- [ ] Dados hasheados SHA-256 antes de enviar à Meta
- [ ] Access Token guardado em variável de ambiente, nunca commitado
- [ ] HTTPS em toda a LP e endpoints

## Disclaimer

Este guia é orientação geral de best-practice técnica. Para compliance formal LGPD em operação comercial, consulte um advogado especializado — especialmente se operar em mercados regulados (saúde, financeiro, jurídico) ou lidar com dados sensíveis.
