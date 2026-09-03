import { ENV } from "./_core/env";

/** Keeps the CRM shared secret server-side while allowing the same header on each CRM request. */
export function getCrmAuthHeaders(): Record<string, string> {
  return ENV.websiteLeadSecret ? { "X-Pell-Secret": ENV.websiteLeadSecret } : {};
}
