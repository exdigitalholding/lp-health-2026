import toast from "react-hot-toast";

export interface LeadData {
  name: string;
  email: string;
  phone: string;
}

export const LEAD_STORAGE_KEY = "hv_lead_data";

// TODO: integrar com o endpoint real de captura de lead quando a rota/payload
// forem definidos. Hoje apenas persiste no sessionStorage, loga no console e
// exibe um toast de sucesso para validar o fluxo de UI da landing page.
export async function submitLead(data: LeadData): Promise<void> {
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(data));
    }
    console.info("[health-voice-lp] lead captured", data);
    toast.success("Recebemos seus dados. Em breve entraremos em contato.");
  } catch (error) {
    console.error("[health-voice-lp] failed to capture lead", error);
    toast.error("Não foi possível continuar. Tente novamente.");
    throw error;
  }
}
