"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Clock4,
  HeartPulse,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import LeadForm from "./lead-form";

const guarantees = [
  "Teste Grátis",
  "Sem cartão de crédito",
  "Cancela quando quiser",
  "Dados protegidos (LGPD + E2E)",
];

const microBadges = [
  { icon: Clock4, label: "Setup em 60s" },
  { icon: HeartPulse, label: "Feito para saúde" },
  { icon: Lock, label: "Criptografia E2E" },
];

export default function StartForm() {
  const reduce = useReducedMotion();

  return (
    <section
      id="comecar"
      aria-labelledby="start-heading"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-white py-28 md:py-32"
    >
      {/* Background ornaments */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-primary/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-blue-400/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dot-soft opacity-40"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        {/* Outer wrapper card — the big "div bacana" */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white/80 p-6 shadow-[0_40px_80px_-30px_rgba(13,120,236,0.25)] backdrop-blur-xl md:p-10 lg:p-14"
        >
          {/* Accent top gradient line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1.5 bg-brand-gradient"
          />

          {/* Decorative inner blob */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* LEFT — message */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-center lg:pr-4 lg:text-right"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles size={14} aria-hidden="true" />
                Teste grátis — sem cartão
              </span>

              <h2
                id="start-heading"
                className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-4xl lg:text-[2.75rem]"
              >
                Teste o Health Voice
                <br />
                em{" "}
                <span className="text-gradient-brand">
                  menos de 1 minuto
                </span>
                .
              </h2>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-600 md:text-[17px] lg:ml-auto">
                Crie sua conta agora e veja, na sua própria rotina, como o
                Health Voice devolve tempo e preserva o que importa na consulta.
              </p>

              <ul className="mx-auto mt-7 flex max-w-md flex-col gap-3 text-left lg:ml-auto">
                {guarantees.map((g) => (
                  <li
                    key={g}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-700"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {g}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-end">
                {microBadges.map((b) => {
                  const Icon = b.icon;
                  return (
                    <span
                      key={b.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm"
                    >
                      <Icon size={13} className="text-primary" aria-hidden="true" />
                      {b.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT — form card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="relative"
            >
              {/* Corner floating badge */}
              <span
                aria-hidden="true"
                className="absolute -top-3 right-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-brand"
              >
                <Sparkles size={12} />
                Grátis
              </span>

              <div className="relative rounded-2xl border border-gray-100 bg-white p-7 shadow-xl shadow-blue-100/60 md:p-8">
                <div className="mb-7 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient shadow-brand">
                    <Image
                      src="/logos/icon.png"
                      alt=""
                      aria-hidden="true"
                      width={40}
                      height={40}
                      className="h-9 w-9 object-contain brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Criar minha conta
                    </h3>
                    <p className="text-sm text-gray-600">
                      Leva menos de 1 minuto.
                    </p>
                  </div>
                </div>

                <LeadForm />

                <div className="mt-7 flex items-start gap-2.5 rounded-xl bg-blue-50/80 p-3.5 text-xs leading-relaxed text-gray-700">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    Seus dados são usados apenas para criar sua conta. Nunca
                    compartilhamos com terceiros.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
