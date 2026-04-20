/**
 * Meta (Facebook) Pixel — helper tipado.
 * Pixel ID fica centralizado aqui para facilitar troca/retirada.
 */

export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "3068321690023612";

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

type StandardEvent =
  | "PageView"
  | "Lead"
  | "Contact"
  | "ViewContent"
  | "CompleteRegistration"
  | "Subscribe";

export function pageview(eventID?: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventID) {
    window.fbq("track", "PageView", {}, { eventID });
  } else {
    window.fbq("track", "PageView");
  }
}

export function track(
  event: StandardEvent,
  params?: Record<string, unknown>,
  eventID?: string,
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventID) {
    window.fbq("track", event, params ?? {}, { eventID });
  } else if (params) {
    window.fbq("track", event, params);
  } else {
    window.fbq("track", event);
  }
}

export function trackCustom(
  event: string,
  params?: Record<string, unknown>,
  eventID?: string,
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventID) {
    window.fbq("trackCustom", event, params ?? {}, { eventID });
  } else if (params) {
    window.fbq("trackCustom", event, params);
  } else {
    window.fbq("trackCustom", event);
  }
}
