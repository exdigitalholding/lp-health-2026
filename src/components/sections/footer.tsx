"use client";

import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

const columns = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Benefícios", href: "#beneficios" },
      { label: "Segurança", href: "#seguranca" },
      { label: "Planos", href: "#planos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nós", href: "#" },
      { label: "Parcerias clínicas", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Fale conosco", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de uso", href: "#" },
      { label: "Política de privacidade", href: "#" },
      { label: "LGPD", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export default function LpFooter() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div>
          <Image
            src="/logos/logo.png"
            alt="Health Voice"
            width={180}
            height={48}
            className="h-9 w-auto object-contain"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
            Atenda com presença. Registre com inteligência. O assistente de voz
            feito para respeitar a consulta e apoiar a continuidade clínica.
          </p>

          <div className="mt-5 flex flex-col gap-2 text-sm text-gray-500">
            <a
              href="mailto:contato@healthvoice.com.br"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail size={15} className="text-primary" />
              contato@healthvoice.com.br
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-primary" />
              Brasil
            </span>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              {col.title}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-500 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-gray-500 md:flex-row">
          <span>© {new Date().getFullYear()} Health Voice. Todos os direitos reservados.</span>
          <span>Feito com cuidado para a rotina clínica brasileira.</span>
        </div>
      </div>
    </footer>
  );
}
