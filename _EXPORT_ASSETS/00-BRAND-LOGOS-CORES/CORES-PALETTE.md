# Paleta de Cores — Health Voice

## Cores principais da marca

| Nome               | HEX       | Uso                                        |
| ------------------ | --------- | ------------------------------------------ |
| Primary (Azul)     | `#0d78ec` | Cor principal da marca, CTA, links         |
| Accent (Azul)      | `#0d78ec` | Destaques, igual ao primary                |
| Azul claro (hover) | `#3b9eff` | Estado hover, gradientes topo              |
| Azul médio         | `#0a5bc4` | Gradientes meio                            |
| Azul escuro        | `#083d82` | Gradientes fundo, profundidade             |
| Azul noturno       | `#0a1628` | Backgrounds escuros, páginas de conversão  |
| Preto profundo     | `#020817` | Backgrounds dark total                     |
| Preto              | `#0A0A0A` | Textos fortes / dark hero                  |

## Cores neutras

| Nome           | HEX       | Uso                          |
| -------------- | --------- | ---------------------------- |
| Background     | `#ffffff` | Fundo padrão da página       |
| Foreground     | `#171717` | Texto padrão                 |
| Cinza muito claro | `#f8fafc` / `#f1f5f9` | Scrollbar track, seções alternadas |
| Cinza borda    | `#e2e8f0` | Bordas sutis                 |
| Cinza médio    | `#a1a1aa` / `#a3a3a3` | Textos secundários |
| Cinza escuro   | `#71717a` | Subtítulos                   |

## Cores de apoio / estado

| Nome             | HEX       | Uso                              |
| ---------------- | --------- | -------------------------------- |
| Amarelo destaque | `#FFCC00` | Highlights, badges "NOVO"        |
| Amarelo soft     | `#facc15` | Estrelas de avaliação            |
| Verde sucesso    | `#10b981` | Checks, confirmações             |
| Verde WhatsApp   | `#25D366` | Botão WhatsApp                   |
| Verde WhatsApp hover | `#20bd5a` | Hover do botão WhatsApp     |
| Vermelho erro    | `#ef4444` | Erros de validação               |

## Gradientes principais

```css
/* Scrollbar / CTA principal */
linear-gradient(180deg, #0d78ec 0%, #0a5bc4 50%, #083d82 100%);

/* Scrollbar hover */
linear-gradient(180deg, #3b9eff 0%, #0d78ec 50%, #0a5bc4 100%);

/* Fundo escuro corporativo */
linear-gradient(180deg, #0a1628 0%, #020817 100%);
```

## Tipografia

- **Fonte principal:** Poppins (sans-serif)
- Variável CSS: `--font-poppins`
