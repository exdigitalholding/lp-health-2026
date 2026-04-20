"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import Image from "next/image";

const partners = [
  { src: "/images/parceiros/aws.webp", name: "AWS" },
  { src: "/images/parceiros/microsoft.jpeg", name: "Microsoft" },
  { src: "/images/parceiros/nvidia.jpg", name: "NVIDIA" },
  { src: "/images/parceiros/ibm-watson.jpg", name: "IBM Watson" },
  { src: "/images/parceiros/cloudflare.jpg", name: "Cloudflare" },
  { src: "/images/parceiros/medgemma.jpeg", name: "MedGemma" },
];

export default function UsedBy() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="used-by-heading"
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
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <HeartPulse size={14} aria-hidden="true" />
            Infraestrutura e parceiros
          </span>

          <h2
            id="used-by-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            Utilizado por quem
            <br />
            cuida de vidas.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            Médicos e profissionais de saúde em todo o Brasil já transformaram
            sua rotina clínica com o Health Voice.
          </p>
        </motion.div>

        <ul
          aria-label="Parceiros de infraestrutura"
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-6"
        >
          {partners.map((p, i) => (
            <motion.li
              key={p.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-900 shadow-sm transition hover:shadow-lg hover:shadow-blue-100/40"
            >
              <Image
                src={p.src}
                alt={p.name}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-gray-500">
          Tecnologia sustentada por fornecedores líderes em nuvem, IA e
          segurança.
        </p>
      </div>
    </section>
  );
}
