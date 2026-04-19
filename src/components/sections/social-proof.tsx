"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Clock4, HeartPulse, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: Clock4,
    value: "~2h",
    label: "de prontuário devolvidas por dia",
  },
  {
    icon: Activity,
    value: "60s",
    label: "para estruturar uma consulta",
  },
  {
    icon: HeartPulse,
    value: "+92%",
    label: "de médicos parceiros recomendam",
  },
  {
    icon: ShieldCheck,
    value: "LGPD",
    label: "conformidade de ponta a ponta",
  },
];

export default function SocialProof() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Indicadores de uso"
      className="w-full border-y border-gray-100 bg-white py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500"
        >
          Confiado por profissionais que vivem a rotina clínica brasileira
        </motion.p>

        <dl className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  {s.value}
                </dd>
                <p
                  aria-hidden="true"
                  className="mt-1.5 max-w-[200px] text-sm leading-relaxed text-gray-600"
                >
                  {s.label}
                </p>
              </motion.div>
            );
          })}
        </dl>

        <p className="mt-10 text-center text-[11px] uppercase tracking-wider text-gray-500">
          * Indicadores baseados em uso dos parceiros piloto — substituir por dados finais
        </p>
      </div>
    </section>
  );
}
