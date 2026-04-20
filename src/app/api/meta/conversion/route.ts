import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import {
  normalizeCity,
  normalizeCountry,
  normalizeEmail,
  normalizeName,
  normalizePhoneBR,
  normalizeState,
  normalizeZip,
} from "@/lib/meta-capi";

// Endpoint server-to-server para a Meta Conversions API (v21.0).
// Recebe payload do cliente, normaliza + hashea PII e repassa para Graph API.

export const runtime = "nodejs";

type UserData = {
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

type ClientPayload = {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  user?: UserData;
  custom?: Record<string, unknown>;
  fbp?: string;
  fbc?: string;
};

const GRAPH_API_VERSION = "v21.0";

function sha256(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return crypto.createHash("sha256").update(value).digest("hex");
}

/** Envolve hash em array, padrao atual da Meta v21+. */
function hashArr(value: string | undefined): string[] | undefined {
  const hashed = sha256(value);
  return hashed ? [hashed] : undefined;
}

function getClientIp(req: NextRequest): string | undefined {
  // Vercel/proxy preenche x-forwarded-for. Primeiro IP da lista eh o do cliente.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim();
  return req.headers.get("x-real-ip") ?? undefined;
}

export async function POST(req: NextRequest) {
  const pixelId =
    process.env.META_CAPI_DATASET_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;

  if (!pixelId || !accessToken) {
    return NextResponse.json(
      { error: "CAPI nao configurada (pixelId/accessToken ausente)" },
      { status: 500 },
    );
  }

  let body: ClientPayload;
  try {
    body = (await req.json()) as ClientPayload;
  } catch {
    return NextResponse.json({ error: "JSON invalido" }, { status: 400 });
  }

  if (!body?.eventName || !body?.eventId) {
    return NextResponse.json(
      { error: "eventName e eventId sao obrigatorios" },
      { status: 400 },
    );
  }

  const clientIp = getClientIp(req);
  const userAgent = req.headers.get("user-agent") ?? undefined;

  // user_data: PII normalizada + hash SHA-256 em ARRAYS (padrao Meta v21+).
  // fbp/fbc/IP/UA vao SEM hash, como STRINGS.
  const userData: Record<string, string | string[] | undefined> = {
    em: hashArr(normalizeEmail(body.user?.email)),
    ph: hashArr(normalizePhoneBR(body.user?.phone)),
    fn: hashArr(normalizeName(body.user?.firstName)),
    ln: hashArr(normalizeName(body.user?.lastName)),
    ct: hashArr(normalizeCity(body.user?.city)),
    st: hashArr(normalizeState(body.user?.state)),
    zp: hashArr(normalizeZip(body.user?.zip)),
    country: hashArr(normalizeCountry(body.user?.country)),
    external_id: hashArr(body.user?.externalId),
    fbp: body.fbp,
    fbc: body.fbc,
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };

  // Remove undefined para nao poluir payload
  const cleanedUserData = Object.fromEntries(
    Object.entries(userData).filter(([, v]) => {
      if (v === undefined) return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  );

  const event = {
    event_name: body.eventName,
    event_time: Math.floor(Date.now() / 1000), // Unix em segundos
    event_id: body.eventId, // string — deduplica com Pixel
    event_source_url: body.eventSourceUrl,
    action_source: "website" as const,
    user_data: cleanedUserData,
    custom_data: body.custom ?? {},
  };

  const payload: Record<string, unknown> = { data: [event] };
  if (testEventCode) payload.test_event_code = testEventCode;

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${accessToken}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("CAPI erro", res.status, data);
      return NextResponse.json(
        { ok: false, status: res.status, meta: data },
        { status: 200 },
      );
    }

    return NextResponse.json({ ok: true, meta: data }, { status: 200 });
  } catch (err) {
    console.error("CAPI exception", err);
    return NextResponse.json({ ok: false, error: "fetch_failed" }, { status: 200 });
  }
}
