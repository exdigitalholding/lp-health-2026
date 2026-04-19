"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import LeadForm from "./lead-form";

const guarantees = [
  "Sem cartão de crédito",
  "Cancela quando quiser",
  "Dados protegidos",
];

export default function CtaFinal() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-final-heading"
      className="relative w-full overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-blue-800 py-24 text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-blue-900/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="cta-final-heading"
            className="text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
          >
            Pronto para ganhar
            <br />
            tempo e clareza?
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-blue-100 md:text-lg">
            Crie sua conta agora e veja, na sua própria rotina, como o Health
            Voice devolve tempo e preserva o que importa na consulta.
          </p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-blue-50">
            {guarantees.map((g) => (
              <li key={g} className="inline-flex items-center gap-2">
                <Check size={16} className="text-blue-200" aria-hidden="true" />
                {g}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md md:p-8"
        >
          <h3 className="mb-5 text-xl font-semibold">Comece agora</h3>
          <LeadForm variant="dark" ctaLabel="Criar minha conta" />
        </motion.div>
      </div>
    </section>
  );
}
