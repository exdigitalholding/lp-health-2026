"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

/**
 * Lista de parceiros (placeholders). Troque `src` pela foto real (1000×1000 recomendado).
 * Se `src` estiver vazio, um placeholder branded aparece no lugar.
 */
const partners: Array<{ src?: string; alt: string }> = [
  { alt: "Foto de médico parceiro 1" },
  { alt: "Foto de médico parceiro 2" },
  { alt: "Foto de médico parceiro 3" },
  { alt: "Foto de médico parceiro 4" },
  { alt: "Foto de médico parceiro 5" },
  { alt: "Foto de médico parceiro 6" },
];

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
            Quem já usa
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            Pessoas reais.
            <br />
            Rotinas reais.
          </h2>
        </motion.div>

        <ul
          aria-label="Galeria de parceiros"
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
        >
          {partners.map((p, i) => (
            <motion.li
              key={p.alt}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg hover:shadow-blue-100/50"
            >
              {p.src ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary-50 via-white to-primary-100 p-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ImageIcon size={24} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    Imagem 1000×1000
                  </span>
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
