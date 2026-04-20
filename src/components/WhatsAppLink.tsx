"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { track } from "@/lib/fpixel";

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
        track("Contact", { source });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
