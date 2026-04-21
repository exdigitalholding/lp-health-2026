"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { track } from "@/lib/fpixel";
import { getFbc, getFbp, newEventId, sendCapiEvent } from "@/lib/meta-capi";

type Props = {
  href: string;
  children: ReactNode;
  source?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export default function WhatsAppLink({
  href,
  children,
  source = "whatsapp",
  onClick,
  target = "_blank",
  rel = "noopener noreferrer",
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      href={href}
      target={target}
      rel={rel}
      onClick={(e) => {
        // Contact hibrido: Pixel + CAPI com mesmo event_id
        const eventId = newEventId("Contact");
        track("Contact", { source }, eventId);
        void sendCapiEvent({
          eventName: "Contact",
          eventId,
          eventSourceUrl: window.location.href,
          custom: { source },
          fbp: getFbp(),
          fbc: getFbc(),
        });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
