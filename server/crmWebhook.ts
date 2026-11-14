/**
 * CRM Webhook Proxy
 * Posts lead/service-call data to the Pell Solar CRM at pellsolar-crm-prod.onrender.com.
 * Running server-side avoids CORS restrictions on the CRM endpoint.
 */

import { getCrmAuthHeaders } from "./crmAuth";

export function crmWebhookUrl() {
  const configured = process.env.CRM_WEBHOOK_URL;
  if (!configured && process.env.NODE_ENV !== 'production') throw new Error('CRM_WEBHOOK_URL is required outside production');
  return configured || 'https://pellsolar-crm-prod.onrender.com/api/webhooks/website-lead';
}

export interface CrmBillFile {
  /** Seven-day signed URL the CRM can download directly */
  url: string;
  key: string;
  name: string;
  type: "bill" | "green_button";
}

export interface CrmLeadPayload {
  service_intake?: Record<string, any>;
  // Contact info
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;

  // Bill upload — first utility bill (legacy single-file fields)
  bill_file_url?: string;
  bill_file_key?: string;
  bill_file_name?: string;
  // Every uploaded file: utility bills + Green Button CSV
  bill_files?: CrmBillFile[];

  // Lead type
  /** "new_lead" for quote/estimate forms, "service_call" for repair/service forms */
  type: "new_lead" | "service_call";
  issue_description?: string;
  source?: string;

  // Qualification fields (individual top-level fields)
  property_type?: "family_home" | "apartment" | "commercial";
  existing_solar?: boolean;
  solar_motivation?: "price_stability" | "reduce_bills" | "all_electric" | "other";
  payment_preference?: "leasing" | "financing" | "cash";
  monthly_bill?: number;
  interest?: string;

  // Catch-all for anything that doesn't fit a dedicated field
  notes?: string;
  lead_details?: Record<string, unknown>;

  // Visit security metadata
  visitor_ip?: string;
  user_agent?: string;
  referrer?: string;
  page_url?: string;
  form_seconds?: number;
  honeypot?: string;
  turnstile_ok?: boolean | null;

  utm_data?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    gclid?: string;
    fbclid?: string; fbc?: string; fbp?: string; gbraid?: string; wbraid?: string; click_id?: string; event_id?: string;
  };
}

export interface CrmLeadResult {
  success: boolean;
  queued?: boolean;
  pending_id?: number;
  customer_id?: number;
  deal_id?: number;
  duplicate_customer?: boolean;
  suspect?: boolean;
  error?: string;
}

export async function postToCrm(payload: CrmLeadPayload, leadId?: number): Promise<CrmLeadResult> {
  const { enqueueCrmLead, deliverCrmLead } = await import('./crmOutbox');
  const id = await enqueueCrmLead(payload, leadId);
  try { return await deliverCrmLead(id); }
  catch { return { success:false, queued:true, error:'delivery_pending' }; }
}

export async function sendToCrm(payload: CrmLeadPayload): Promise<CrmLeadResult> {
  try {
    const endpoint = payload.service_intake ? crmWebhookUrl().replace(/\/website-lead$/, '/service-intake') : crmWebhookUrl();
    const res = await fetch(endpoint, {
      method: "POST",
      // 25s cap: the catch below turns a timeout into network_error, which fires the site's fallback alert
      signal: AbortSignal.timeout(25000),
      headers: { "Content-Type": "application/json", ...getCrmAuthHeaders() },
      body: JSON.stringify(payload.service_intake || payload),
    });

    if (res.status === 429) {
      console.warn("[CRM] Rate limited — retained for retry");
      return { success: false, error: "rate_limited" };
    }

    const data = await res.json().catch(() => ({}));
    console.log("[CRM] Response status:", res.status);

    if (!res.ok) {
      console.error("[CRM] Webhook error:", res.status, data);
      return { success: false, error: `http_${res.status}` };
    }

    if (payload.service_intake && ((data.status === 'deal_created' && data.deal_id) || (data.status === 'inquiry_logged' && data.pending_id))) return {...data,success:true};
    if (data.success !== true || !data.deal_id) return { success: false, error: 'unconfirmed_delivery' };
    return data as CrmLeadResult;
  } catch (err) {
    console.error("[CRM] Network error posting to CRM:", err);
    return { success: false, error: "network_error" };
  }
}
