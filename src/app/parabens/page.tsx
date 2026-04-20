import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Apple,
  ArrowRight,
  CheckCircle2,
  Globe,
  MessageCircle,
  Smartphone,
} from "lucide-react";

import { WHATSAPP, WHATSAPP_HREF } from "@/config/landing";

export const metadata: Metadata = {
  title: "Conta criada — Health Voice",
  description:
    "Sua conta foi criada. Escolha como quer começar a usar o Health Voice.",
  robots: { index: false, follow: false },
};

const APP_STORE_URL =
  "https://apps.apple.com/br/app/health-voice-ia-para-m%C3%A9dicos/id6754345791";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.executivos.healthvoice&hl=pt";
const WEB_APP_URL = "https://app.healthvoice.com.br";

const accessOptions = [
  {
    Icon: Apple,
    title: "Baixar para iPhone",
    description: "App nativo na App Store.",
    href: APP_STORE_URL,
    cta: "Abrir App Store",
  },
  {
    Icon: Smartphone,
    title: "Baixar para Android",
    description: "App nativo na Play Store.",
    href: PLAY_STORE_URL,
    cta: "Abrir Play Store",
  },
  {
    Icon: Globe,
    title: "Abrir no navegador",
    description: "Use direto pelo computador.",
    href: WEB_APP_URL,
    cta: "Acessar app.healthvoice.com.br",
  },
] as const;

const whatsappWelcomeHref = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(
  "Acabei de criar minha conta no Health Voice e quero receber os links de acesso por aqui.",
)}`;

export default function ParabensPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-white py-10 md:py-16">
      {/* Brilhos decorativos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-primary/12 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-24 h-[420px] w-[420px] rounded-full bg-blue-400/12 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-soft opacity-40"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        {/* Header */}
        <header className="flex h-16 items-center justify-center md:h-20">
          <Link
            href="/"
            aria-label="Health Voice — voltar para o início"
            className="-my-16 flex items-center md:-my-20"
          >
            <Image
              src="/logos/logo.png"
              alt="Health Voice"
              width={640}
              height={180}
              className="h-40 w-auto object-contain sm:h-48 md:h-56"
              priority
            />
          </Link>
        </header>

        {/* Hero */}
        <section className="mt-12 flex flex-col items-center text-center md:mt-16">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-brand">
            <CheckCircle2 size={32} strokeWidth={2} />
          </span>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Conta criada com sucesso
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-5xl">
            Bem-vindo ao{" "}
            <span className="text-gradient-brand">Health Voice</span>.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:text-[17px]">
            Tudo pronto. Escolha por onde você prefere começar — ou peça para a
            gente enviar os links direto no seu WhatsApp.
          </p>
        </section>

        {/* Access options */}
        <section
          aria-label="Opções de acesso"
          className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3"
        >
          {accessOptions.map(({ Icon, title, description, href, cta }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-[0_20px_40px_-30px_rgba(13,120,236,0.25)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-brand"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={22} />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-gray-900">
                {title}
              </h2>
              <p className="mt-1 text-sm text-gray-600">{description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5">
                {cta}
                <ArrowRight size={16} />
              </span>
            </a>
          ))}
        </section>

        {/* WhatsApp CTA */}
        <section
          aria-label="Atendimento no WhatsApp"
          className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-6 shadow-[0_30px_60px_-30px_rgba(16,185,129,0.35)] md:mt-16 md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-emerald-300/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-16 h-60 w-60 rounded-full bg-emerald-400/20 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:text-left">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                <MessageCircle size={26} />
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-300" />
              </span>
              <div className="text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/70 bg-emerald-100/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  Atendimento direto
                </span>
                <h3 className="mt-3 text-xl font-semibold text-gray-900 md:text-2xl">
                  Prefere receber os links pelo WhatsApp?
                </h3>
                <p className="mt-1.5 max-w-md text-sm text-gray-600 md:text-[15px]">
                  A gente te manda iOS, Android e Web por lá — e você tira
                  dúvidas com um humano no mesmo chat.
                </p>
              </div>
            </div>

            <a
              href={whatsappWelcomeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pb-24 text-center text-xs text-gray-500 md:pb-16">
          © {new Date().getFullYear()} Health Voice. Todos os direitos
          reservados.
        </footer>
      </div>

      {/* WhatsApp floating */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:bg-emerald-600 md:bottom-8 md:right-8"
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline">Falar no WhatsApp</span>
      </a>
    </main>
  );
}
