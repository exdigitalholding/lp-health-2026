"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Brain, ClipboardX, UserX } from "lucide-react";

import {
  ImageCarousel,
  type CarouselSlide,
} from "@/components/ui/image-carousel";
import { PRIMARY_CTA_HREF } from "@/config/landing";

const momentsSlides: CarouselSlide[] = [
  {
    label: "Antes: tempo dividido entre tela e paciente",
    caption: "Imagem real do contexto clínico — substitua depois.",
  },
  {
    label: "Durante: médico presente na consulta",
    caption: "Captura discreta, sem interromper o fluxo.",
  },
  {
    label: "Depois: registro estruturado pronto para revisão",
    caption: "Resumo clínico organizado, sem retrabalho.",
  },
];

const problems = [
  {
    icon: UserX,
    title: "Olhar na tela, não no paciente",
    desc: "Digitar durante o atendimento rouba presença e quebra a conexão humana que o paciente espera.",
  },
  {
    icon: ClipboardX,
    title: "Registro feito de memória",
    desc: "Reconstruir a consulta depois consome energia, aumenta risco de perda de contexto e compromete a continuidade.",
  },
  {
    icon: Brain,
    title: "Carga cognitiva acumulada",
    desc: "No fim do dia, sobra cansaço. O profissional faz dois trabalhos em um: atender e documentar.",
  },
];

export default function ProblemContext() {
  const reduce = useReducedMotion();
  return (
    <section
      aria-labelledby="problem-heading"
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
            A tensão real da rotina clínica
          </p>
          <h2
            id="problem-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            Atender bem exige presença.
            <br />
            Registrar bem exige atenção.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            Nem sempre dá para fazer os dois com a leveza ideal — e essa tensão
            silenciosa pesa consulta após consulta.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-gray-50/60 p-7 transition hover:border-gray-200 hover:bg-white hover:shadow-sm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mt-14"
        >
          <ImageCarousel slides={momentsSlides} />
        </motion.div>

        <motion.figure
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-14 max-w-3xl border-l-4 border-primary bg-blue-50/50 px-6 py-6"
        >
          <blockquote className="text-lg italic leading-relaxed text-gray-800">
            <p>
              “No fim do dia, eu ainda tinha duas horas de prontuário pela
              frente. O Health Voice devolveu esse tempo para mim e para minha
              família.”
            </p>
          </blockquote>
          <figcaption className="mt-3 text-sm not-italic text-gray-600">
            — Depoimento real de médico parceiro
          </figcaption>
        </motion.figure>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex justify-center"
        >
          <a
            href={PRIMARY_CTA_HREF}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
          >
            Começar agora — é grátis
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
