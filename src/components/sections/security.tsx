"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Cloud,
  Fingerprint,
  Lock,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

const pillars = [
  {
    icon: Lock,
    title: "Criptografia de ponta a ponta",
    desc: "Áudios e registros trafegam e são armazenados com criptografia em repouso e em trânsito.",
  },
  {
    icon: Cloud,
    title: "Infraestrutura cloud responsável",
    desc: "Provedores avaliados para o setor de saúde, com redundância e backups automatizados.",
  },
  {
    icon: Fingerprint,
    title: "Acesso controlado",
    desc: "Autenticação forte e controle por perfil. Cada conta vê apenas o que autorizou ver.",
  },
  {
    icon: ShieldCheck,
    title: "Conformidade com LGPD",
    desc: "Tratamento de dados alinhado à regulação brasileira. Retenção, descarte e auditoria claros.",
  },
];

const badges = [
  { label: "LGPD", caption: "Conformidade brasileira" },
  { label: "CFM", caption: "Respeito ao Conselho Federal" },
  { label: "ISO 27001", caption: "Padrão de segurança da informação" },
  { label: "TLS 1.3", caption: "Criptografia em trânsito" },
];

export default function Security() {
  return (
    <section
      id="seguranca"
      className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/25 blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-[160px]" />
        <div className="absolute inset-0 bg-grid-soft opacity-20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-blue-100 backdrop-blur-sm">
            <ShieldCheck size={14} />
            Segurança e confiança
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Segurança é princípio,
            <br />
            não detalhe técnico.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-blue-100 md:text-lg">
            Tranquilidade para você. Respeito pelos dados do seu paciente.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-blue-200 transition group-hover:bg-primary/30">
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 text-base font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-blue-100/70">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-100">
                <BadgeCheck size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">{b.label}</p>
                <p className="text-[11px] leading-tight text-blue-100/60">
                  {b.caption}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mt-12 flex max-w-3xl items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-blue-100/90 backdrop-blur-sm"
        >
          <ServerCog size={20} className="mt-0.5 shrink-0 text-blue-200" />
          <p>
            Nossa arquitetura separa dados de identificação e conteúdo clínico,
            minimiza retenção e oferece trilha de auditoria. Cada decisão foi
            pensada para reduzir risco e preservar o sigilo da consulta.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
