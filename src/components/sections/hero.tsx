"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { VideoPlayer } from "@/components/ui/video-player";
import { DEMO_VIDEO } from "@/config/landing";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero-form"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden border-b border-gray-100 bg-brand-gradient-dark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(13,120,236,0.38),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(96,165,250,0.22),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-soft opacity-25"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-20 text-center md:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-100 backdrop-blur-md"
        >
          <Sparkles size={14} aria-hidden="true" />
          Feito para a rotina clínica brasileira
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
          className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Atenda com presença.
          <br />
          <span className="bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
            Registre com inteligência.
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-blue-50 md:text-xl"
        >
          O Health Voice transforma a conversa da consulta em registro
          organizado, contexto clínico e continuidade — sem roubar sua atenção
          do paciente.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href="#comecar"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-white px-7 text-base font-semibold text-primary-700 shadow-lg shadow-black/20 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 sm:w-auto"
          >
            Criar minha conta grátis
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            href="#como-funciona"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/50 sm:w-auto"
          >
            Ver como funciona
          </a>
        </motion.div>

        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-blue-100"
        >
          <li className="inline-flex items-center gap-1.5">
            <ShieldCheck
              size={14}
              className="text-blue-200"
              aria-hidden="true"
            />
            Sem cartão para testar
          </li>
          <li className="inline-flex items-center gap-1.5">
            <ShieldCheck
              size={14}
              className="text-blue-200"
              aria-hidden="true"
            />
            LGPD
          </li>
          <li className="inline-flex items-center gap-1.5">
            <ShieldCheck
              size={14}
              className="text-blue-200"
              aria-hidden="true"
            />
            Criptografia E2E
          </li>
        </motion.ul>

        <motion.div
          id="demo-video"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-14 w-full max-w-4xl scroll-mt-24"
        >
          <VideoPlayer
            src={DEMO_VIDEO.src}
            poster={DEMO_VIDEO.poster}
            title={DEMO_VIDEO.title}
            duration={DEMO_VIDEO.duration}
            label="Assistir demonstração"
            tone="dark"
          />
        </motion.div>
      </div>
    </section>
  );
}
