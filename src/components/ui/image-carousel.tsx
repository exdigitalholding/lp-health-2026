"use client";

import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface CarouselSlide {
  /** URL da imagem (pode ser /public/... ou URL externa). Deixe vazio para placeholder. */
  src?: string;
  /** Texto descritivo usado em alt + caption acessível. */
  label: string;
  /** Legenda exibida abaixo da imagem (opcional). */
  caption?: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  /** Classe extra no wrapper externo. */
  className?: string;
  /** Tamanho do slide (aspect ratio + largura máxima). Default: 1000×1000. */
  aspect?: "square" | "video";
}

export function ImageCarousel({
  slides,
  className,
  aspect = "square",
}: ImageCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const total = slides.length;
  const current = slides[index];

  const prev = React.useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = React.useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  if (total === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Mockups do Health Voice"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "relative focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-3xl",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-blue-100/60",
          aspect === "square" ? "aspect-square" : "aspect-video",
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {current.src ? (
          <Image
            key={current.src}
            src={current.src}
            alt={current.label}
            fill
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-cover"
            priority={index === 0}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary-50 via-white to-primary-100 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ImageIcon size={36} aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">
                {current.label}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Placeholder — substitua pela imagem real (1000×1000)
              </p>
            </div>
            <span className="mt-2 rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-xs font-medium text-primary">
              {index + 1} / {total}
            </span>
          </div>
        )}

        {/* Setas prev/next sobrepostas */}
        <button
          type="button"
          onClick={prev}
          aria-label="Imagem anterior"
          className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-800 shadow-md transition hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40 md:left-5 md:h-12 md:w-12"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Próxima imagem"
          className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-800 shadow-md transition hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40 md:right-5 md:h-12 md:w-12"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>

        {/* Counter badge */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
        >
          {index + 1} / {total}
        </span>
      </div>

      {/* Caption */}
      {current.caption && (
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-gray-600">
          {current.caption}
        </p>
      )}

      {/* Dots / Indicators */}
      <div
        role="tablist"
        aria-label="Selecionar imagem"
        className="mt-5 flex items-center justify-center gap-2"
      >
        {slides.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            type="button"
            aria-selected={i === index}
            aria-label={`Ir para imagem ${i + 1}: ${s.label}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2.5 rounded-full transition focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40",
              i === index
                ? "w-8 bg-primary"
                : "w-2.5 bg-gray-300 hover:bg-gray-400",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
