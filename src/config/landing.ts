/**
 * Central config for landing page media and feature flags.
 */

export const DEMO_VIDEO = {
  /** URL do vídeo .mp4 (ou .webm). Pode apontar para /videos/... em /public. */
  src: "/videos/health-demo.mp4",
  /** Imagem de capa exibida antes do play. Pode ser /videos/demo-poster.jpg em /public. */
  poster: "",
  /** Duração aproximada para exibir como badge no card do player. */
  duration: "",
  /** Título acessível do vídeo. */
  title: "Demonstração do Health Voice",
};

/**
 * Feature flags — controle fácil de quais seções aparecem na landing page.
 * Para reativar uma seção, basta mudar para `true`.
 */
export const FEATURES = {
  /** Exibe/oculta a seção de Planos (preços) e o link "Planos" no menu. */
  plans: false,
  /** Exibe/oculta a seção "A tensão real da rotina clínica". */
  problemContext: false,
  /** Exibe/oculta a seção de Depoimentos / galeria de médicos parceiros. */
  testimonials: true,
  /** Exibe/oculta a faixa de métricas (SocialProof). */
  socialProof: true,
};

/** Âncora do formulário de cadastro principal (usado pelos CTAs "Criar minha conta"). */
export const PRIMARY_CTA_HREF = "#comecar";

/**
 * Contato via WhatsApp — usado nos botões fixos (navbar topo + toolbar mobile).
 * Número no formato internacional (sem símbolos) para o link wa.me.
 */
export const WHATSAPP = {
  number: "5541963475328",
  message: "Vi a Health Voice e quero conhecer",
};

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(
  WHATSAPP.message,
)}`;
