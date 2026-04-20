import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark" | "brand";

const VARIANT: Record<Variant, string> = {
  light: "border-gray-200 bg-white text-gray-600",
  dark: "border-white/10 bg-white/5 text-blue-100 backdrop-blur-md",
  brand: "border-primary/25 bg-primary/10 text-primary",
};

const DOT: Record<Variant, string> = {
  light: "bg-primary",
  dark: "bg-primary-300 shadow-[0_0_10px_#3B82F6]",
  brand: "bg-primary shadow-[0_0_10px_#0D78EC]",
};

type Props = HTMLAttributes<HTMLSpanElement> & { variant?: Variant };

export function Eyebrow({ variant = "light", className, children, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
        VARIANT[variant],
        className,
      )}
      {...props}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", DOT[variant])} />
      {children}
    </span>
  );
}
