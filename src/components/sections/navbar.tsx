"use client";

import {
  HelpCircle,
  Menu,
  MessageCircle,
  PlayCircle,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FEATURES, WHATSAPP_HREF } from "@/config/landing";
import { track } from "@/lib/fpixel";

const onWhatsAppClick = () => track("Contact", { source: "whatsapp" });

const baseLinks = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#seguranca", label: "Segurança" },
];

const navLinks = [
  ...baseLinks,
  ...(FEATURES.plans ? [{ href: "#planos", label: "Planos" }] : []),
];

const mobileToolbarItems = [
  { href: "#demo-video", label: "Como funciona", Icon: PlayCircle },
  { href: "#beneficios", label: "Benefícios", Icon: Sparkles },
  { href: "#faq", label: "FAQ", Icon: HelpCircle },
];

function useScrollDirection() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) > 6) {
        if (currentY < 80) {
          setHidden(false);
        } else if (delta > 0) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastY = currentY;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

export default function LpNavbar() {
  const [open, setOpen] = useState(false);
  const hidden = useScrollDirection();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 md:h-28">
          <Link
            href="/"
            className="tap-target -my-4 flex items-center md:-my-6"
            aria-label="Health Voice — ir para a página inicial"
          >
            <Image
              src="/logos/logo.png"
              alt="Health Voice"
              width={420}
              height={120}
              className="h-16 w-auto object-contain sm:h-20 md:h-36"
              priority
            />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-8 text-sm text-gray-700 md:flex"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="tap-target inline-flex items-center transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick}
              aria-label="Falar no WhatsApp"
              className="tap-target inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href="#comecar"
              className="tap-target inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
            >
              Criar conta grátis
            </a>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick}
              aria-label="Falar no WhatsApp"
              className="tap-target inline-flex items-center justify-center rounded-lg text-emerald-600 transition hover:bg-emerald-50"
            >
              <MessageCircle size={22} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="tap-target inline-flex items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          id="mobile-menu"
          hidden={!open}
          className="border-t border-gray-100 bg-white md:hidden"
        >
          <nav
            aria-label="Navegação mobile"
            className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="tap-target flex items-center rounded-lg px-3 py-2 text-base font-medium text-gray-800 transition-colors hover:bg-gray-50 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onWhatsAppClick();
                setOpen(false);
              }}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Conversar no WhatsApp
            </a>
            <a
              href="#comecar"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
            >
              Criar conta grátis
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile bottom toolbar — app-like, auto-hide on scroll down */}
      <div
        aria-label="Ações rápidas"
        className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ease-out motion-reduce:transition-none ${
          hidden ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto w-full max-w-7xl px-3 pb-3 pt-2">
          <div className="flex items-center gap-1.5 rounded-2xl border border-gray-200 bg-white/95 p-1.5 shadow-[0_8px_30px_rgba(13,120,236,0.12)] backdrop-blur-md">
            {mobileToolbarItems.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                className="tap-target flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[11px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary active:bg-gray-100"
              >
                <Icon size={20} aria-hidden="true" />
                <span className="leading-tight">{label}</span>
              </a>
            ))}

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick}
              aria-label="Falar no WhatsApp"
              className="tap-target flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-emerald-500 px-1 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 active:bg-emerald-700"
            >
              <MessageCircle size={20} aria-hidden="true" />
              <span className="leading-tight">WhatsApp</span>
            </a>

            <a
              href="#comecar"
              className="tap-target flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-primary px-1 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 active:bg-primary-700"
            >
              <UserPlus size={20} aria-hidden="true" />
              <span className="leading-tight">Criar conta</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
