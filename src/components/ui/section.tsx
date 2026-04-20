import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Section({ className, id, ...props }: HTMLAttributes<HTMLElement> & { id?: string }) {
  return <section id={id} className={cn("relative scroll-mt-24 py-20 md:py-28", className)} {...props} />;
}
