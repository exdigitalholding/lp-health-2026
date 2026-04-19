import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://healthvoice.com.br"),
  title: "Health Voice — Atenda com presença. Registre com inteligência.",
  description:
    "O Health Voice transforma a conversa da consulta em registro organizado, contexto clínico e continuidade assistencial. Feito para a rotina clínica brasileira.",
  applicationName: "Health Voice",
  authors: [{ name: "Health Voice" }],
  keywords: [
    "consulta",
    "prontuário",
    "saúde",
    "médico",
    "registro clínico",
    "assistente de voz",
    "LGPD",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/logos/icon.png",
  },
  openGraph: {
    title: "Health Voice — Atenda com presença. Registre com inteligência.",
    description:
      "O assistente de voz para consultas, registro e continuidade clínica. Feito para a rotina clínica brasileira.",
    type: "website",
    locale: "pt_BR",
    siteName: "Health Voice",
    images: [{ url: "/logos/logo.png", width: 500, height: 500, alt: "Health Voice" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Voice",
    description:
      "Atenda com presença. Registre com inteligência. O assistente de voz para consultas.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0D78EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#0A2540",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
