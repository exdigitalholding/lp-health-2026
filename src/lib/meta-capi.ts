/**
 * Helpers para Meta Conversions API (CAPI).
 * Parte cliente (browser): captura de fbp/fbc, envio para /api/meta/conversion.
 * Parte servidor: hashing e montagem de payload (ver /api/meta/conversion/route.ts).
 */

export type MetaEventName =
  | "PageView"
  | "Lead"
  | "Contact"
  | "ViewContent"
  | "CompleteRegistration"
  | "Subscribe";

export type MetaUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  externalId?: string;
};

export type MetaCustomData = Record<string, unknown>;

export type ClientEventPayload = {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl: string;
  user?: MetaUserData;
  custom?: MetaCustomData;
  fbp?: string;
  fbc?: string;
};

/**
 * Gera event_id deterministico compartilhado entre Pixel e CAPI.
 * Meta faz deduplicacao quando ambos enviam mesmo event_name + event_id em ate 48h.
 */
export function newEventId(eventName: MetaEventName): string {
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 10);
  return `${eventName}_${ts}_${rnd}`;
}

/**
 * Normaliza texto removendo acentos (NFD + strip diacriticos).
 * Obrigatorio para nomes/cidades — Meta armazena sem acento.
 */
function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Email: lowercase + trim */
export function normalizeEmail(email: string | undefined): string | undefined {
  if (!email) return undefined;
  const v = email.toLowerCase().trim();
  return v || undefined;
}

/**
 * Telefone BR: remove nao-digitos e prefixa 55 se vier sem codigo de pais.
 * Ex: "(41) 99999-9999" -> "5541999999999"
 */
export function normalizePhoneBR(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  return digits;
}

/** Nome (primeiro ou sobrenome): lowercase + trim + sem acento */
export function normalizeName(name: string | undefined): string | undefined {
  if (!name) return undefined;
  const v = stripDiacritics(name.toLowerCase().trim());
  return v || undefined;
}

/** Cidade: lowercase + trim + sem acento + sem espacos */
export function normalizeCity(city: string | undefined): string | undefined {
  if (!city) return undefined;
  const v = stripDiacritics(city.toLowerCase().trim()).replace(/\s+/g, "");
  return v || undefined;
}

/** Estado: codigo ISO 2 letras lowercase. Ex: "PR" -> "pr" */
export function normalizeState(state: string | undefined): string | undefined {
  if (!state) return undefined;
  const v = state.toLowerCase().trim();
  return v || undefined;
}

/** CEP: so digitos */
export function normalizeZip(zip: string | undefined): string | undefined {
  if (!zip) return undefined;
  const v = zip.replace(/\D/g, "");
  return v || undefined;
}

/** Pais: ISO 2 letras lowercase. Ex: "BR" -> "br" */
export function normalizeCountry(country: string | undefined): string | undefined {
  if (!country) return undefined;
  const v = country.toLowerCase().trim();
  return v || undefined;
}

/** Le cookie pelo nome (cliente). */
function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Retorna _fbp diretamente do cookie que o Pixel cria.
 * Nao hashear — vai em texto puro no payload CAPI.
 */
export function getFbp(): string | undefined {
  return readCookie("_fbp");
}

/**
 * Retorna _fbc do cookie OU deriva de ?fbclid= na URL.
 * Formato: fb.1.<timestamp>.<fbclid>
 */
export function getFbc(): string | undefined {
  const fromCookie = readCookie("_fbc");
  if (fromCookie) return fromCookie;

  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (!fbclid) return undefined;
  return `fb.1.${Date.now()}.${fbclid}`;
}

/**
 * Envia evento para a API Route /api/meta/conversion.
 * Usa fetch com keepalive para nao perder evento em navegacao.
 */
export async function sendCapiEvent(payload: ClientEventPayload): Promise<void> {
  try {
    await fetch("/api/meta/conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Falha silenciosa — Pixel client ainda dispara o evento
  }
}
