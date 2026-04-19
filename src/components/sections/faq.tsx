"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useReducedMotion } from "framer-motion";

const faqs = [
  {
    q: "Como o Health Voice funciona durante a consulta?",
    a: "Você inicia a gravação com um toque e conduz o atendimento normalmente. O app capta a conversa de forma discreta, sem interferir no fluxo natural.",
  },
  {
    q: "É complicado de usar?",
    a: "Não. O fluxo foi desenhado para caber na rotina clínica: abrir, gravar, encerrar. Sem configurações complexas, sem curva de aprendizado.",
  },
  {
    q: "O que eu recebo ao final da consulta?",
    a: "Você recebe o conteúdo da conversa organizado em seções clínicas claras (queixa principal, história, conduta, etc.) pronto para apoiar o seu registro.",
  },
  {
    q: "Posso usar no celular?",
    a: "Sim. O Health Voice foi pensado para celular e desktop, se adaptando ao ambiente em que você atende.",
  },
  {
    q: "Como fica a segurança dos dados?",
    a: "Os dados trafegam e são armazenados com criptografia, em infraestrutura cloud responsável e em conformidade com a LGPD. Só você acessa seus registros.",
  },
  {
    q: "Existe plano de teste?",
    a: "Sim. Você pode começar gratuitamente, sem cartão de crédito, e avaliar na sua rotina antes de qualquer decisão de assinatura.",
  },
  {
    q: "O Health Voice substitui meu prontuário?",
    a: "Não. Ele é uma ferramenta de apoio: entrega material organizado que acelera e qualifica o seu registro, sem substituir o seu julgamento clínico.",
  },
];

export default function Faq() {
  const reduce = useReducedMotion();
  return (
    <section
      aria-labelledby="faq-heading"
      className="w-full bg-gradient-to-b from-white to-blue-50/30 py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Perguntas frequentes
          </p>
          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            Perguntas frequentes.
          </h2>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="px-4">
                <AccordionTrigger className="py-5 text-left text-[15px] font-medium text-gray-900 hover:no-underline md:text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-gray-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
