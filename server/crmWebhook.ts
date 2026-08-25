/**
 * CRM Webhook Proxy
 * Posts lead/service-call data to the Pell Solar CRM at pellsolar-crm-prod.onrender.com.
 * Running server-side avoids CORS restrictions on the CRM endpoint.
 */

const CRM_WEBHOOK_URL = "https://pellsolar-crm-prod.onrender.com/api/webhooks/website-lead";

export interface CrmLeadPayload {
  // Contact info
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;

  // Bill upload
  bill_file_url?: string;
  bill_file_name?: string;

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

  utm_data?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    gclid?: string;
  };
}

export interface CrmLeadResult {
  success: boolean;
  customer_id?: number;
  deal_id?: number;
  duplicate_customer?: boolean;
  error?: string;
}

export async function postToCrm(payload: CrmLeadPayload): Promise<CrmLeadResult> {
  try {
    // Log the exact payload being sent so we can debug CRM field mapping issues
    console.log("[CRM] Sending payload:", JSON.stringify({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      city: payload.city,
      state: payload.state,
      zip: payload.zip,
      type: payload.type,
      source: payload.source,
      monthly_bill: payload.monthly_bill,
      interest: payload.interest,
      bill_file_url: payload.bill_file_url ? "[present]" : undefined,
    }, null, 2));
    const res = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 429) {
      console.warn("[CRM] Rate limited — will not retry");
      return { success: false, error: "rate_limited" };
    }

    const data = await res.json().catch(() => ({}));
    console.log("[CRM] Response status:", res.status, "body:", JSON.stringify(data));

    if (!res.ok) {
      console.error("[CRM] Webhook error:", res.status, data);
      return { success: false, error: `http_${res.status}` };
    }

    return data as CrmLeadResult;
  } catch (err) {
    console.error("[CRM] Network error posting to CRM:", err);
    return { success: false, error: "network_error" };
  }
}
