"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { PRIMARY_CTA_HREF } from "@/config/landing";

interface InlineCtaProps {
  title?: string;
  subtitle?: string;
  label?: string;
  variant?: "light" | "dark";
}

export default function InlineCta({
  title = "Pronto para testar na sua rotina?",
  subtitle = "Leva menos de 1 minuto para criar sua conta.",
  label = "Criar minha conta grátis",
  variant = "light",
}: InlineCtaProps) {
  const isDark = variant === "dark";
  const reduce = useReducedMotion();

  return (
    <section
      className={`w-full py-14 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900"
          : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={`flex flex-col items-center justify-between gap-6 rounded-2xl border px-6 py-8 md:flex-row md:px-10 ${
            isDark
              ? "border-white/15 bg-white/5 backdrop-blur-md"
              : "border-blue-100 bg-gradient-to-r from-blue-50/60 via-white to-blue-50/60 shadow-sm"
          }`}
        >
          <div className="text-center md:text-left">
            <h3
              className={`text-xl font-semibold md:text-2xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <p
              className={`mt-1 text-sm leading-relaxed ${
                isDark ? "text-blue-100" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          </div>

          <a
            href={PRIMARY_CTA_HREF}
            className={`inline-flex h-12 shrink-0 items-center gap-2 rounded-xl px-6 text-sm font-semibold shadow-sm transition ${
              isDark
                ? "bg-white text-primary hover:bg-blue-50"
                : "bg-primary text-white hover:bg-primary-600"
            }`}
          >
            <span>{label}</span>
            <ArrowUp size={16} className="rotate-45" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
