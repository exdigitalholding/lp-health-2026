"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FEATURES } from "@/config/landing";

const baseLinks = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#seguranca", label: "Segurança" },
];

const navLinks = [
  ...baseLinks,
  ...(FEATURES.plans ? [{ href: "#planos", label: "Planos" }] : []),
];

export default function LpNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-6 md:h-28">
        <Link
          href="/"
          className="tap-target -my-3 flex items-center"
          aria-label="Health Voice — ir para a página inicial"
        >
          <Image
            src="/logos/logo.png"
            alt="Health Voice"
            width={420}
            height={120}
            className="h-20 w-auto object-contain md:h-24"
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
            href="#comecar"
            className="tap-target inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
          >
            Criar conta grátis
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="tap-target inline-flex items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-gray-100 bg-white md:hidden"
      >
        <nav
          aria-label="Navegação mobile"
          className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-4"
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
            href="#comecar"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
          >
            Criar conta grátis
          </a>
        </nav>
      </div>
    </header>
  );
}
