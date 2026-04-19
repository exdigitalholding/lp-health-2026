"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ImageIcon, Mic, Monitor, Smartphone } from "lucide-react";

const screens = [
  {
    icon: Mic,
    label: "Tela de gravação",
    desc: "Interface limpa e direta para iniciar o atendimento.",
    aspect: "aspect-[9/19]",
  },
  {
    icon: ImageIcon,
    label: "Consulta estruturada",
    desc: "Resultado organizado por seções clínicas.",
    aspect: "aspect-[9/19]",
  },
  {
    icon: Smartphone,
    label: "Histórico de atendimentos",
    desc: "Tudo acessível, pesquisável e em ordem.",
    aspect: "aspect-[9/19]",
  },
];

export default function AppScreens() {
  const reduce = useReducedMotion();
  return (
    <section
      aria-labelledby="app-screens-heading"
      className="w-full bg-gradient-to-b from-white via-blue-50/40 to-white py-24"
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
            Por dentro do Health Voice
          </p>
          <h2
            id="app-screens-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            A interface pensada para a consulta,
            <br />
            não para a tela.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            Cada tela foi desenhada para respeitar o tempo do profissional e
            entregar clareza em poucos toques.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {screens.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
              >
                <div className="relative mx-auto w-full max-w-[240px] rounded-[2rem] border-8 border-gray-900 bg-gray-900 p-1 shadow-2xl shadow-blue-200/40 transition group-hover:-translate-y-1 group-hover:shadow-blue-300/50">
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-gray-900"
                  />

                  <div
                    className={`${s.aspect} w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary-100 via-white to-primary-200`}
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon size={22} aria-hidden="true" />
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        [ Screenshot real ]
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <h4 className="text-sm font-semibold text-gray-900">{s.label}</h4>
                  <p className="mt-1 text-xs text-gray-500">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group col-span-2 lg:col-span-1"
          >
            <div className="relative mx-auto w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-2xl shadow-blue-200/40 transition group-hover:-translate-y-1">
              <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="aspect-video w-full bg-gradient-to-br from-primary-100 via-white to-primary-200">
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Monitor size={22} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    [ Screenshot desktop real ]
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <h4 className="text-sm font-semibold text-gray-900">
                Painel no desktop
              </h4>
              <p className="mt-1 text-xs text-gray-500">
                Visão ampliada para revisão e exportação.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[
            {
              title: "Resumo clínico pronto",
              desc: "Do áudio para um registro legível, organizado e revisável em segundos.",
            },
            {
              title: "Continuidade entre consultas",
              desc: "Recupere o contexto do paciente no retorno, sem precisar reler tudo.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-xl hover:shadow-blue-100/50"
            >
              <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-blue-100/60 via-white to-blue-50">
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <ImageIcon size={32} aria-hidden="true" />
                  <span className="text-xs font-medium">
                    [ Screenshot/GIF real do app ]
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
