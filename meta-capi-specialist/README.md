# Meta CAPI Specialist Skill

Skill especializada em Meta Conversions API (CAPI), Meta Pixel e otimização de campanhas Meta Ads, com foco em implementação prática em aplicações Next.js para geração de leads B2B/SaaS.

## Contexto principal

Projeto de referência: **Executivo's Voice** (`lp.executivosdigital.com.br`) — SaaS B2B de inteligência de reuniões.

Tipos de conversão rastreados:
- Formulário de cadastro → `Lead`
- Cliques em WhatsApp → `Contact`
- Scroll profundo / demo → `ViewContent`
- PageView automático

## Estrutura

```
meta-capi-specialist/
├── SKILL.md                                    # Instruções principais da skill
└── references/
    ├── nextjs-implementation.md                # Código completo Next.js (App + Pages Router)
    ├── events-catalog.md                       # Catálogo dos 17 eventos padrão
    ├── advanced-matching.md                    # EMQ e parâmetros de matching
    ├── aem-priorities.md                       # Mensuração Agregada e priorização
    ├── value-based-optimization.md             # Atribuir valor a leads grátis
    ├── lookalikes-and-audiences.md             # Estratégia de públicos
    ├── crm-integration.md                      # Eventos downstream via CRM
    ├── debugging-guide.md                      # Debugging e erros comuns
    └── privacy-lgpd.md                         # LGPD e consentimento
```

## Como instalar no Claude Code

### Opção A: Skill local de projeto (recomendado para este caso)

Dentro da raiz do seu projeto Next.js (a pasta que contém `package.json`):

```bash
mkdir -p .claude/skills
cp -r /caminho/para/meta-capi-specialist .claude/skills/
```

Ao abrir esse projeto no Claude Code, a skill será reconhecida automaticamente e acionada quando o contexto for sobre Meta CAPI.

### Opção B: Skill global do usuário

Para deixar disponível em qualquer projeto:

```bash
mkdir -p ~/.claude/skills
cp -r /caminho/para/meta-capi-specialist ~/.claude/skills/
```

### Verificando que funcionou

Abra o Claude Code no projeto e pergunte algo como:

> "Como implementar Meta CAPI na minha LP Next.js?"

A skill deve ser acionada automaticamente. Se quiser forçar, pode mencionar:

> "Usando a skill meta-capi-specialist, me ajude a implementar..."

## Quando a skill é acionada

Automaticamente quando você mencionar:
- Meta Pixel / Facebook Pixel / API de Conversões / CAPI
- Gerenciador de Eventos / Events Manager / EMQ
- Implementação de tracking em Next.js / Vercel
- Otimização de campanhas Meta Ads para leads
- Advanced Matching / deduplicação / event_id
- LGPD em tracking / consentimento / cookies
- Integração CRM + Meta / eventos downstream

## O que ela faz de melhor

- Escreve código TypeScript/Next.js pronto para colar
- Interpreta prints de código, Events Manager, erros
- Debuga problemas comuns (código 100, 190, EMQ baixo, deduplicação falhando)
- Guia passo-a-passo com ordem clara de implementação
- Responde em português brasileiro, direto e prático
- Respeita o contexto de SaaS B2B (não vai te vender setup e-commerce)

## Idioma

Todas as respostas são em **português brasileiro**.
