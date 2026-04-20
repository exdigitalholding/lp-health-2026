"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Field } from "@/components/ui/field";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useApiContext } from "@/context/ApiContext";
import { track } from "@/lib/fpixel";
import { submitLead, type LeadData } from "@/utils/lead";
import { maskPhone } from "@/utils/masks";

const LeadSchema = z.object({
  name: z.string().min(2, "Digite seu nome completo"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(14, "Telefone inválido"),
});

type LeadFormValues = z.infer<typeof LeadSchema>;

interface LeadFormProps {
  variant?: "light" | "dark";
  ctaLabel?: string;
}

export default function LeadForm({
  variant = "light",
  ctaLabel = "Criar minha conta grátis",
}: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const { PostAPI } = useApiContext();
  const router = useRouter();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(LeadSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", phone: "" },
  });

  const isDark = variant === "dark";

  const handleSubmit = async () => {
    const valid = await form.trigger();
    if (!valid) {
      toast.error("Revise os campos em vermelho.");
      return;
    }
    setLoading(true);
    try {
      const values = form.getValues() as LeadData;
      await submitLead(values, PostAPI);
      track("Lead", { content_name: "Criar conta grátis" });
      form.reset();
      router.push("/parabens");
    } catch {
      // feedback já é disparado em submitLead
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div
        className="flex flex-col gap-3"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <Field
                placeholder="Nome completo"
                name="name"
                autoComplete="name"
                Svg={
                  <User
                    className={isDark ? "text-white/60" : "text-blue-400"}
                    size={20}
                  />
                }
                classInput={
                  isDark
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-white/10"
                    : undefined
                }
                value={field.value}
                onChange={field.onChange}
                required
                invalid={!!fieldState.error}
              />
              <FormMessage
                className={`ml-1 text-xs font-medium ${
                  isDark ? "text-red-300" : "text-red-500"
                }`}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <Field
                placeholder="seu@email.com"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                Svg={
                  <Mail
                    className={isDark ? "text-white/60" : "text-blue-400"}
                    size={20}
                  />
                }
                classInput={
                  isDark
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-white/10"
                    : undefined
                }
                value={field.value}
                onChange={field.onChange}
                required
                invalid={!!fieldState.error}
              />
              <FormMessage
                className={`ml-1 text-xs font-medium ${
                  isDark ? "text-red-300" : "text-red-500"
                }`}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem>
              <Field
                placeholder="(XX) 9 9999-9999"
                name="tel"
                autoComplete="tel"
                inputMode="tel"
                Svg={
                  <Phone
                    className={isDark ? "text-white/60" : "text-blue-400"}
                    size={20}
                  />
                }
                classInput={
                  isDark
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-white/10"
                    : undefined
                }
                value={maskPhone(field.value)}
                onChange={(e) => field.onChange(e.target.value)}
                required
                maxLength={16}
                invalid={!!fieldState.error}
              />
              <FormMessage
                className={`ml-1 text-xs font-medium ${
                  isDark ? "text-red-300" : "text-red-500"
                }`}
              />
            </FormItem>
          )}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl px-4 font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-70 ${
            isDark
              ? "bg-white text-primary hover:bg-blue-50"
              : "bg-primary text-white hover:bg-primary-600"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>{ctaLabel}</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <p
          className={`text-center text-xs ${
            isDark ? "text-white/60" : "text-gray-500"
          }`}
        >
          Próximo passo: só criar sua senha. Leva menos de 1 minuto.
        </p>
      </div>
    </Form>
  );
}
