"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileCheck, ListChecks, Repeat2, Sparkles } from "lucide-react";

import {
  ImageCarousel,
  type CarouselSlide,
} from "@/components/ui/image-carousel";
import { PRIMARY_CTA_HREF } from "@/config/landing";

const mockups: CarouselSlide[] = [
  {
    src: "/images/parceiros/12.png",
    label: "Dashboard Health Voice",
    caption:
      "Tela real do produto: inicie a gravação em poucos toques.",
  },
  {
    label: "Resumo da consulta",
    caption:
      "Conteúdo estruturado em seções clínicas: queixa, história, conduta.",
  },
  {
    label: "Histórico do paciente",
    caption: "Contexto preservado entre retornos, sem releitura completa.",
  },
  {
    label: "Conduta e acompanhamento",
    caption: "Próximos passos organizados, prontos para o prontuário.",
  },
];

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
            <ImageCarousel slides={mockups} />
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 flex justify-center"
        >
          <a
            href={PRIMARY_CTA_HREF}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
          >
            Criar minha conta grátis
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
