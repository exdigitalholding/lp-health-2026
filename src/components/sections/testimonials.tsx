"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Eu voltei a olhar nos olhos do paciente. O Health Voice cuidou do registro enquanto eu conduzia a consulta — e o prontuário chegou pronto pra revisar.",
    name: "Dra. Ana Moretti",
    role: "Clínica Geral",
    crm: "CRM/SP 000.000",
    tone: "from-primary-500 to-primary-700",
  },
  {
    quote:
      "Antes eu gastava o final da tarde inteiro refazendo prontuário de memória. Hoje saio do consultório com o dia fechado. Isso devolveu tempo pra minha família.",
    name: "Dr. Lucas Pereira",
    role: "Cardiologia",
    crm: "CRM/RJ 000.000",
    tone: "from-primary-400 to-primary-600",
  },
  {
    quote:
      "Na clínica, a padronização dos registros melhorou muito. É uma ferramenta que respeita o fluxo clínico — não tenta roubar o protagonismo da consulta.",
    name: "Dra. Marina Tavares",
    role: "Diretora clínica",
    crm: "CRM/MG 000.000",
    tone: "from-primary-600 to-primary-800",
  },
];

function initials(name: string) {
  return name
    .replace(/^Dra?\.\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export default function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full bg-gradient-to-b from-white to-blue-50/40 py-24"
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
            O que dizem quem já usa
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            Pessoas reais.
            <br />
            Rotinas reais.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            Depoimentos de médicos parceiros no Brasil.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:shadow-xl hover:shadow-blue-100/50"
            >
              <Quote
                size={28}
                className="text-primary/30"
                aria-hidden="true"
              />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-gray-700">
                <p>“{t.quote}”</p>
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                <div
                  aria-hidden="true"
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.tone} text-sm font-semibold text-white`}
                >
                  {initials(t.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-600">
                    {t.role} • {t.crm}
                  </p>
                </div>
              </figcaption>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-[11px] uppercase tracking-wider text-gray-500">
          * Depoimentos placeholder — substituir por médicos parceiros reais com CRM
        </p>
      </div>
    </section>
  );
}
