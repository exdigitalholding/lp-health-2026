import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D78EC",
          50: "#EAF3FD",
          100: "#D0E3FA",
          200: "#A1C7F5",
          300: "#72ABEF",
          400: "#3B82F6",
          500: "#0D78EC",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#0A2540",
        },
        brand: {
          ink: "#051117",
          text: "#23262F",
          mute: "#777E90",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #0D78EC 0%, #3B82F6 50%, #60A5FA 100%)",
        "brand-gradient-dark":
          "linear-gradient(135deg, #051117 0%, #0A2540 45%, #0D78EC 100%)",
        "brand-radial":
          "radial-gradient(circle at 30% 30%, rgba(13,120,236,0.35), transparent 55%)",
      },
      boxShadow: {
        brand: "0 20px 40px -20px rgba(13,120,236,0.35)",
        "brand-lg": "0 30px 60px -20px rgba(13,120,236,0.45)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
