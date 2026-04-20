import toast from "react-hot-toast";

import type { ApiContextProps } from "@/context/ApiContext";

export interface LeadData {
  name: string;
  email: string;
  phone: string;
}

export const LEAD_STORAGE_KEY = "hv_lead_data";

function sanitizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export async function submitLead(
  data: LeadData,
  PostAPI: ApiContextProps["PostAPI"]
): Promise<void> {
  const payload = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    mobilePhone: sanitizePhone(data.phone),
  };

  const response = await PostAPI("/auth/pre-register", payload, false);

  if (response.status === 200) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(data));
    }
    return;
  }

  const message =
    (response.body && (response.body.message || response.body.error)) ||
    "Não foi possível concluir o cadastro. Tente novamente.";

  toast.error(typeof message === "string" ? message : "Não foi possível concluir o cadastro.");
  throw new Error(typeof message === "string" ? message : "pre-register failed");
}
