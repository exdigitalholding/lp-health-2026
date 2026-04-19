"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface FieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  /** Ícone renderizado à esquerda do input */
  Svg?: React.ReactNode;
  /** Classe aplicada ao elemento <input> */
  classInput?: string;
  /** Classe aplicada ao wrapper externo */
  className?: string;
  /** Marca o campo como inválido (borda vermelha + anel vermelho) */
  invalid?: boolean;
  /** Label visível ou sr-only usado pelo leitor de tela */
  label?: string;
  /** Esconde o label visualmente mantendo o leitor de tela */
  srLabel?: boolean;
}

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      Svg,
      classInput,
      className,
      invalid,
      type = "text",
      id,
      name,
      label,
      srLabel = true,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? `field-${name ?? generatedId}`;
    const accessibleLabel = label ?? placeholder;

    return (
      <div className={cn("flex w-full flex-col gap-1.5", className)}>
        {accessibleLabel ? (
          <label
            htmlFor={inputId}
            className={cn(
              srLabel
                ? "sr-only"
                : "text-xs font-medium uppercase tracking-wider text-gray-600",
            )}
          >
            {accessibleLabel}
          </label>
        ) : null}
        <div className="relative flex w-full items-center">
          {Svg ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 flex h-5 w-5 items-center justify-center"
            >
              {Svg}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            className={cn(
              "h-12 w-full rounded-xl border bg-white text-[15px] text-gray-900 transition",
              "placeholder:text-gray-500",
              "focus:outline-none focus:ring-[3px] focus:ring-primary/30",
              Svg ? "pl-12 pr-4" : "px-4",
              invalid
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:border-primary",
              classInput,
            )}
            aria-invalid={invalid || undefined}
            {...rest}
          />
        </div>
      </div>
    );
  },
);
Field.displayName = "Field";

export default Field;
