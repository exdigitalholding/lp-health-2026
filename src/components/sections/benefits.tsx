"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, HeartHandshake, Stethoscope } from "lucide-react";

import {
  ImageCarousel,
  type CarouselSlide,
} from "@/components/ui/image-carousel";
import { PRIMARY_CTA_HREF } from "@/config/landing";

const appScreens: CarouselSlide[] = [
  {
    src: "/images/testimonials/prints/print-23.png",
    label: "Depoimento de médico sobre o Health Voice",
    caption: "Relato real de quem já usa o Health Voice na rotina.",
  },
  {
    src: "/images/testimonials/prints/print-18.png",
    label: "Depoimento sobre ganho de tempo no consultório",
    caption: "Menos retrabalho e mais presença com o paciente.",
  },
  {
    src: "/images/testimonials/prints/print-19.png",
    label: "Depoimento sobre qualidade do registro clínico",
    caption: "Registros mais completos e organizados em segundos.",
  },
];

const perspectives = [
  {
    icon: Stethoscope,
    tag: "Para o médico",
    title: "Mais presença. Menos reconstrução.",
    bullets: [
      "Atenda olhando para o paciente, não para a tela",
      "Reduza o retrabalho de montar o prontuário depois",
      "Ganhe clareza no registro mesmo em dias cheios",
    ],
    color: "from-blue-500 to-primary",
  },
  {
    icon: Building2,
    tag: "Para a clínica",
    title: "Padronização e consistência operacional.",
    bullets: [
      "Registros com qualidade mais uniforme entre profissionais",
      "Melhor organização de histórico e continuidade",
      "Redução de gargalos administrativos pós-consulta",
    ],
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: HeartHandshake,
    tag: "Para o paciente",
    title: "Mais escuta. Mais cuidado percebido.",
    bullets: [
      "Sente que o médico está presente e atento",
      "Percebe continuidade entre retornos",
      "Recebe um cuidado com contexto preservado",
    ],
    color: "from-sky-500 to-blue-500",
  },
];

export default function Benefits() {
  const reduce = useReducedMotion();
  return (
    <section
      id="beneficios"
      aria-labelledby="benefits-heading"
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
            Benefícios por perspectiva
          </p>
          <h2
            id="benefits-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            Valor que faz sentido
            <br />
            para todos envolvidos.
          </h2>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mt-12"
        >
          <ImageCarousel slides={appScreens} fit="contain" />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {perspectives.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.tag}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:border-gray-200 hover:shadow-xl hover:shadow-blue-100/40"
              >
                <div
                  aria-hidden="true"
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-lg`}
                >
                  <Icon size={24} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {p.tag}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{p.title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-[15px] leading-relaxed text-gray-600"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
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
            Quero testar na minha rotina
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
