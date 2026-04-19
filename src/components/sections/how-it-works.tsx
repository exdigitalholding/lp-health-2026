"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, FileText, Mic, Stethoscope } from "lucide-react";

const steps = [
  {
    icon: Mic,
    num: "01",
    title: "Inicie a gravação",
    desc: "Um toque e o Health Voice começa a captar a conversa de forma discreta.",
  },
  {
    icon: Stethoscope,
    num: "02",
    title: "Conduza a consulta normalmente",
    desc: "Sem fones, sem comandos, sem interrupções. O foco segue no paciente.",
  },
  {
    icon: FileText,
    num: "03",
    title: "Receba a conversa organizada",
    desc: "Ao final, o conteúdo volta estruturado em seções clínicas claras.",
  },
  {
    icon: CheckCircle2,
    num: "04",
    title: "Use para registro e continuidade",
    desc: "Revise, ajuste e aproveite como base para prontuário e próximos retornos.",
  },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();
  return (
    <section
      id="como-funciona"
      aria-labelledby="how-heading"
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
            Como funciona
          </p>
          <h2
            id="how-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            Quatro passos.
            <br />
            Nada além disso.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            Ferramenta de apoio — nunca protagonista da consulta.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-blue-50/30 p-7 transition hover:border-primary/30 hover:shadow-lg hover:shadow-blue-100/60"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-5 text-4xl font-bold text-blue-100 transition group-hover:text-primary/20"
                >
                  {s.num}
                </span>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
