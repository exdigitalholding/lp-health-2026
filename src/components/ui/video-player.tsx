"use client";

import { PlayCircle, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  duration?: string;
  className?: string;
  /** Tons do card: `light` para fundo branco, `dark` para fundo escuro */
  tone?: "light" | "dark";
  /** Label customizado sob o play button no poster */
  label?: string;
}

export function VideoPlayer({
  src,
  poster,
  title = "Demonstração do Health Voice",
  duration,
  className,
  tone = "dark",
  label,
}: VideoPlayerProps) {
  const [open, setOpen] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  // ESC to close + focus management
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // focus close button when modal opens
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleOpen = () => {
    if (!src) return;
    setOpen(true);
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setOpen(false);
  };

  const isDark = tone === "dark";
  const posterAvailable = Boolean(poster);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`Assistir ${title}${duration ? ` — ${duration}` : ""}`}
        className={cn(
          "group relative block aspect-video w-full overflow-hidden rounded-3xl border shadow-2xl transition",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/55 focus-visible:ring-offset-2",
          isDark
            ? "border-white/10 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 shadow-black/40"
            : "border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 shadow-blue-200/40",
          "hover:shadow-primary/30",
          className,
        )}
      >
        {posterAvailable && poster ? (
          <Image
            src={poster}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover opacity-90 transition group-hover:opacity-100"
          />
        ) : null}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(13,120,236,0.32),transparent_65%)]"
        />

        <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-white">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/12 backdrop-blur-md transition group-hover:scale-105 group-hover:bg-white/20 group-focus-visible:bg-white/20">
            <PlayCircle size={54} strokeWidth={1.4} aria-hidden="true" />
          </div>
          <span className="text-sm font-medium opacity-90">
            {label ?? title}
          </span>
        </div>

        {duration && (
          <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {duration}
          </span>
        )}
      </button>

      {open && src && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleClose}
              aria-label="Fechar vídeo"
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/50"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <video
              ref={videoRef}
              className="aspect-video w-full"
              src={src}
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={poster || undefined}
            >
              Seu navegador não suporta vídeo HTML5.
            </video>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoPlayer;
