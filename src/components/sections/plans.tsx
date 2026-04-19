"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Teste",
    price: "Grátis",
    suffix: "por 7 dias",
    desc: "Comece sem compromisso e veja o valor na sua própria rotina.",
    cta: "Começar teste",
    highlight: false,
    features: [
      "Gravações de consultas",
      "Estruturação automática",
      "Acesso pelo celular e desktop",
      "Suporte por email",
    ],
  },
  {
    name: "Profissional",
    price: "A partir de R$ XX",
    suffix: "/mês",
    desc: "Para o médico que atende com volume e precisa de consistência diária.",
    cta: "Assinar plano",
    highlight: true,
    features: [
      "Gravações ilimitadas",
      "Histórico completo",
      "Exportação para prontuário",
      "Suporte prioritário",
    ],
  },
  {
    name: "Clínica",
    price: "Sob consulta",
    suffix: "",
    desc: "Para equipes e operações com necessidade de padronização.",
    cta: "Falar com time",
    highlight: false,
    features: [
      "Múltiplos profissionais",
      "Gestão centralizada",
      "Relatórios operacionais",
      "Onboarding dedicado",
    ],
  },
];

export default function Plans() {
  const reduce = useReducedMotion();
  return (
    <section
      id="planos"
      aria-labelledby="plans-heading"
      className="w-full bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Planos
          </p>
          <h2
            id="plans-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            Planos claros,
            <br />
            sem letras miúdas.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            Comece simples. Evolua conforme sua operação cresce.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-7 transition ${
                p.highlight
                  ? "border-primary bg-gradient-to-b from-blue-50 to-white shadow-xl shadow-blue-100/60"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  Mais escolhido
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{p.price}</span>
                {p.suffix && <span className="text-sm text-gray-600">{p.suffix}</span>}
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[15px] text-gray-700"
                  >
                    <Check
                      size={16}
                      className="mt-1 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#hero-form"
                className={`mt-7 inline-flex h-12 items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-primary text-white hover:bg-primary-600"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          * Preços a serem definidos — placeholder até validação comercial.
        </p>
      </div>
    </section>
  );
}
