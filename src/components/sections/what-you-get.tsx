"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileCheck, ListChecks, Repeat2, Sparkles } from "lucide-react";

const deliverables = [
  {
    icon: ListChecks,
    title: "Estrutura clara da conversa",
    desc: "Principais pontos, queixas, condutas e observações — organizados para leitura rápida.",
  },
  {
    icon: FileCheck,
    title: "Base pronta para o registro",
    desc: "Conteúdo estruturado que acelera o preenchimento do prontuário sem retrabalho.",
  },
  {
    icon: Repeat2,
    title: "Continuidade assistencial",
    desc: "Histórico acessível para revisar retornos e manter contexto entre consultas.",
  },
  {
    icon: Sparkles,
    title: "Menos carga cognitiva",
    desc: "Você volta para casa sem a lista mental de prontuários pendentes.",
  },
];

export default function WhatYouGet() {
  const reduce = useReducedMotion();
  return (
    <section
      aria-labelledby="what-you-get-heading"
      className="w-full bg-gradient-to-b from-white via-blue-50/30 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              O que você recebe depois
            </p>
            <h2
              id="what-you-get-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
            >
              Tempo devolvido.
              <br />
              Contexto preservado.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
              Depois da consulta, você não volta do zero. O Health Voice entrega
              um material útil, organizado e pronto para apoiar o seu registro e a
              continuidade do cuidado.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {deliverables.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.title} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {d.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
                        {d.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-blue-200/40">
              <div className="flex h-full w-full flex-col">
                <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-gray-500">
                    Consulta — 12/04/2026
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Queixa principal
                    </p>
                    <div className="mt-2 h-3 w-5/6 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      História clínica
                    </p>
                    <div className="mt-2 h-3 w-full rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-11/12 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-3/4 rounded bg-gray-200" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Conduta
                    </p>
                    <div className="mt-2 h-3 w-5/6 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-4/6 rounded bg-gray-200" />
                  </div>
                  <div className="mt-auto flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs text-primary">
                    <Sparkles size={14} />[ Placeholder — inserir screenshot real do output ]
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
