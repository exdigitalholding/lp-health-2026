"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function Demo() {
  const reduce = useReducedMotion();
  return (
    <section
      id="como-funciona"
      aria-labelledby="demo-heading"
      className="w-full bg-gradient-to-b from-gray-50 to-white py-24"
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
            Veja em 60 segundos
          </p>
          <h2
            id="demo-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            Simples o bastante para entrar na sua rotina.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            Sem curva de aprendizado. Sem protagonismo na consulta. Apenas uma
            ferramenta de apoio discreta e útil.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-12 aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl shadow-blue-200/40"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(13,120,236,0.28),transparent_60%)]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <button
              type="button"
              className="group relative flex flex-col items-center gap-3 text-white"
              aria-label="Assistir demonstração do Health Voice (60 segundos)"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition group-hover:bg-white/20 group-focus-visible:bg-white/20">
                <PlayCircle size={48} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <span className="text-sm font-medium opacity-80">
                [ Placeholder — inserir vídeo real da demo ]
              </span>
            </button>
          </div>

          <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            0:60
          </div>
        </motion.div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-600">
          Interface real. Fluxo real. Do início ao fim em menos de um minuto.
        </p>
      </div>
    </section>
  );
}
