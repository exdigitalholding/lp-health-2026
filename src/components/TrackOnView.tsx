"use client";

import { useEffect, useRef } from "react";

import { track } from "@/lib/fpixel";

type Props = {
  event: "ViewContent" | "Lead" | "Contact";
  contentName: string;
  /** Proporção visível para disparar (0–1). Default 0.5. */
  threshold?: number;
  /** Se true (default), dispara apenas uma vez por sessão de página. */
  once?: boolean;
};

export default function TrackOnView({
  event,
  contentName,
  threshold = 0.5,
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let fired = false;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (once && fired) return;
          track(event, { content_name: contentName });
          fired = true;
          if (once) obs.disconnect();
        }
      },
      { threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [event, contentName, threshold, once]);

  return <span ref={ref} aria-hidden="true" className="sr-only" />;
}
