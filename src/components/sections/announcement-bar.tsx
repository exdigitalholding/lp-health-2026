"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-gradient-to-r from-primary-800 via-primary-600 to-primary-500 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2.5 text-center text-xs font-medium md:text-sm">
        <Sparkles size={14} className="shrink-0 text-blue-100" aria-hidden="true" />
        <span>
          Teste grátis por 7 dias, sem cartão de crédito.
        </span>
        <a
          href="#hero-form"
          className="ml-2 hidden items-center gap-1 rounded-full bg-white/10 px-3 py-0.5 font-semibold text-white transition hover:bg-white/20 md:inline-flex"
        >
          Começar agora
          <ArrowRight size={12} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
