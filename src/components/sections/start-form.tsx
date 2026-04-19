"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

import LeadForm from "./lead-form";

export default function StartForm() {
  const reduce = useReducedMotion();

  return (
    <section
      id="comecar"
      aria-labelledby="start-heading"
      className="relative w-full bg-gradient-to-b from-white to-blue-50/40 py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Comece agora
          </p>
          <h2
            id="start-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            Teste o Health Voice em menos de 1 minuto.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            Sem compromisso. Sem cartão de crédito.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-blue-100/50 md:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <Image
              src="/logos/icon.png"
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Criar minha conta
              </h3>
              <p className="text-sm text-gray-600">
                Leva menos de 1 minuto.
              </p>
            </div>
          </div>

          <LeadForm />

          <div className="mt-6 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs leading-relaxed text-gray-700">
            <ShieldCheck
              size={16}
              className="mt-0.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>
              Seus dados são usados apenas para criar sua conta. Não
              compartilhamos com terceiros.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
