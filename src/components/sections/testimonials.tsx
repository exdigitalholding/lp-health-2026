"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type TestimonialItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Ordem intercalada (fixa, não volátil) entre prints de WhatsApp
 * e telas/mockups — cada item guarda suas dimensões reais para
 * o card assumir a altura natural da imagem (layout masonry).
 */
const gallery: TestimonialItem[] = [
  {
    src: "/images/testimonials/prints/print-18.png",
    alt: "Depoimento em conversa de WhatsApp",
    width: 1800,
    height: 1800,
  },
  {
    src: "/images/testimonials/mockups/doctor-1.jpg",
    alt: "Médico utilizando o Health Voice",
    width: 1024,
    height: 1024,
  },
  {
    src: "/images/testimonials/prints/whatsapp-2.jpeg",
    alt: "Mensagem de médico no WhatsApp",
    width: 696,
    height: 1024,
  },
  {
    src: "/images/testimonials/mockups/female-doctor-iphone.png",
    alt: "Médica consultando o Health Voice no iPhone",
    width: 3300,
    height: 2475,
  },
  {
    src: "/images/testimonials/prints/print-23.png",
    alt: "Feedback em print de conversa",
    width: 1800,
    height: 1800,
  },
  {
    src: "/images/testimonials/mockups/doctor-macbook.png",
    alt: "Médico revisando informações do paciente no MacBook",
    width: 3300,
    height: 2475,
  },
  {
    src: "/images/testimonials/prints/print-27.png",
    alt: "Depoimento real em conversa de WhatsApp",
    width: 1800,
    height: 1800,
  },
  {
    src: "/images/testimonials/mockups/doctor-3.jpg",
    alt: "Profissional de saúde em consulta",
    width: 1024,
    height: 1024,
  },
  {
    src: "/images/testimonials/prints/whatsapp-3.jpeg",
    alt: "Relato de paciente por mensagem",
    width: 572,
    height: 595,
  },
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
          aria-label="Galeria de depoimentos e uso real"
          className="mt-14 columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3 [column-fill:_balance]"
        >
          {gallery.map((item, i) => (
            <motion.li
              key={item.src}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg hover:shadow-blue-100/50 md:mb-6"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
