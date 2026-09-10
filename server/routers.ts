import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createLead,
  setLeadCrmInfo,
  getLeads,
  getLeadById,
  updateLeadStatus,
  updateLeadNotes,
  getLeadStats,
  getAllLeadsForExport,
  getProjectPhotos,
  createProjectPhoto,
  deleteProjectPhoto,
  updateProjectPhoto,
  createUnsubscribe,
  getUnsubscribeByToken,
  getUnsubscribeByEmail,
  getAllUnsubscribes,
} from "./db";
import { storageGetSignedUrl, storagePut } from "./storage";
import { notifyOwner, sendDiagnosisEmail } from "./_core/notification";
import { sendSms } from "./_core/sms";
import { ENV } from "./_core/env";
import { makeRequest, type GeocodingResult } from "./_core/map";
import { getLiveGoogleReviewSummary } from "./googleReviews";
import type { Lead } from "../drizzle/schema";
import { postToCrm } from "./crmWebhook";
import { getCrmAuthHeaders } from "./crmAuth";
import { chatRouter } from "./routers/chat";
import { invokeLLM } from "./_core/llm";
import { runSpamChecks } from "./spamProtection";
import { getClientIp } from "./spamProtection";
import { deriveLeadSource } from "@shared/attribution";
import crypto from "crypto";
import { verifyTurnstile } from "./turnstile";
import { checkCustomerInCrm } from "./crmCustomerCheck";

// ─── In-memory rate limit map for unsubscribe endpoint ──────────────────────
const unsubRateLimit = new Map<string, number[]>();

// ─── In-memory rate limit map for diagnose endpoint (5/hour per IP) ─────────
const diagnoseRateLimit = new Map<string, number[]>();
const DIAGNOSE_RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const DIAGNOSE_RATE_MAX = 5;

// ─── Admin guard ─────────────────────────────────────────────────────────────
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ─── UTM data schema (shared) ────────────────────────────────────────────────
const UtmDataSchema = z.object({
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  gclid: z.string().optional(),
}).optional();

// ─── Zod schemas ─────────────────────────────────────────────────────────────
const LeadStatusSchema = z.enum(["New", "Contacted", "Quoted", "Closed", "Lost"]);
const LeadSourceSchema = z.string().trim().min(1).max(64);
const CRM_BILL_LINK_EXPIRY_SECONDS = 7 * 24 * 60 * 60;

function getRequestHeader(req: import("express").Request, name: string): string | undefined {
  const value = req.headers[name.toLowerCase()];
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

function isExternalBillUrl(url?: string): url is string {
  return Boolean(url?.startsWith("https://") && !url.includes("/manus-storage/"));
}

async function getCrmBillFileUrl(
  billFileKey?: string,
  billFileUrl?: string,
): Promise<string | undefined> {
  if (billFileKey) {
    try {
      return await storageGetSignedUrl(billFileKey, CRM_BILL_LINK_EXPIRY_SECONDS);
    } catch (error) {
      console.warn("[CRM] Could not create seven-day signed bill URL:", error);
    }
  }

  // Preserve a signed URL returned by a successful upload, but never forward a
  // browser-session-bound /manus-storage path to an external CRM server.
  return isExternalBillUrl(billFileUrl) ? billFileUrl : undefined;
}

const CreateLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().optional(),
  ownershipType: z.enum(["homeowner", "renter"]),
  propertyType: z.enum(["family_home", "apartment", "commercial"]).optional(),
  zipCode: z.string().optional(),
  existingSolar: z.boolean().optional().transform(v => v === undefined ? undefined : (v ? 1 : 0)),
  solarMotivation: z.enum(["price_stability", "reduce_bills", "all_electric", "other"]).optional(),
  paymentPreference: z.enum(["leasing", "financing", "cash"]).optional(),
  monthlyBillRange: z.string().optional().transform(v => {
    if (!v || v === '' || v === 'unknown') return v;
    const num = parseInt(v.replace(/\D/g, ''), 10);
    if (isNaN(num) || num < 0 || num > 9999) return 'unknown';
    return String(num);
  }),
  interestType: z.enum(["solar", "battery", "solar_battery", "ev_charger", "other"]).default("solar"),
  interestOtherText: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  billFileKey: z.string().optional(),
  billFileUrl: z.string().optional(),
  billFileName: z.string().optional(),
  source: LeadSourceSchema.default("homepage"),
  utmData: UtmDataSchema,
  // Honeypot field — hidden from humans, bots may fill it
  honeypot: z.string().max(200).default(""),
  // Form timing — epoch ms when form was loaded
  form_loaded_at: z.number().int().min(0).optional(),
  // Rendered as an off-screen field; a value indicates automation.
  companyWebsite: z.string().max(200).default(""),
  formSeconds: z.number().int().min(0).max(86_400).default(0),
  pageUrl: z.string().url().max(2_048).optional(),
  turnstileToken: z.string().max(2_048).optional(),
});

// ─── Routers ─────────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  reviewSummary: router({
    google: publicProcedure.query(() => getLiveGoogleReviewSummary()),
  }),

  security: router({
    // The site key is intentionally public; do not expose the Turnstile secret.
    turnstileConfig: publicProcedure.query(() => ({
      siteKey: ENV.turnstileSiteKey && ENV.turnstileSecretKey ? ENV.turnstileSiteKey : undefined,
    })),
  }),

  // ─── Lead procedures ───────────────────────────────────────────────────────
  leads: router({
    // Public: submit a new lead
    create: publicProcedure
      .input(CreateLeadSchema)
      .mutation(async ({ input, ctx }) => {
        // ── Bot / spam protection ──────────────────────────────────────────
        runSpamChecks(ctx.req, {
          honeypot: input.honeypot || input.companyWebsite,
          address: input.address,
          phone: input.phone,
        });
        const visitorIp = getClientIp(ctx.req);
        const turnstileOk = await verifyTurnstile(input.turnstileToken, visitorIp);
        if (turnstileOk === false) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Something went wrong, please try again." });
        }
        const source = deriveLeadSource(input.source, input.utmData);
        // ─────────────────────────────────────────────────────────────────
        const { id, isDuplicate } = await createLead({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          address: input.address,
          ownershipType: input.ownershipType,
          propertyType: input.propertyType,
          zipCode: input.zipCode || input.zip,
          existingSolar: input.existingSolar,
          solarMotivation: input.solarMotivation,
          paymentPreference: input.paymentPreference,
          monthlyBillRange: input.monthlyBillRange,
          interestType: input.interestType,
          interestOtherText: input.interestOtherText,
          billFileKey: input.billFileKey,
          billFileUrl: input.billFileUrl,
          billFileName: input.billFileName,
          source,
          notes: input.interestType === "other" && input.interestOtherText ? input.interestOtherText : undefined,
        });
        const crmBillFileUrl = await getCrmBillFileUrl(input.billFileKey, input.billFileUrl);
        if (!isDuplicate) {

        // Notify owner (in-app)
        try {
          await notifyOwner({
            title: "🌞 New Solar Lead",
            content: `New lead from ${input.firstName} ${input.lastName} (${input.email}) via ${source}. Monthly bill: ${input.monthlyBillRange ?? "not specified"}. Interest: ${input.interestType}.`,
          });
        } catch (e) {
          console.warn("[Notification] Failed to notify owner:", e);
        }

        // SMS notification to Josh
        if (ENV.twilioNotifyNumber) {
          const interestLabel: Record<string, string> = {
            solar: "Solar Only",
            battery: "Battery Only",
            solar_battery: "Solar + Battery",
            ev_charger: "EV Charger",
            other: "Other / Not Sure",
          };
          const interestDisplay = interestLabel[input.interestType] ?? input.interestType;

          const cleanPhone = input.phone.replace(/\D/g, "");
          const formattedPhone = cleanPhone.length === 10
            ? `(${cleanPhone.slice(0,3)}) ${cleanPhone.slice(3,6)}-${cleanPhone.slice(6)}`
            : input.phone;
          const billLink = crmBillFileUrl || null;

          const smsBody = [
            `🌞 NEW PELL SOLAR LEAD`,
            `Name: ${input.firstName} ${input.lastName}`,
            `Phone: ${formattedPhone}`,
            `Call: +1${cleanPhone}`,
            `Email: ${input.email}`,
            input.address ? `Address: ${input.address}` : "",
            `Interest: ${interestDisplay}`,
            input.ownershipType ? `Ownership: ${input.ownershipType}` : "",
            input.monthlyBillRange ? `Monthly Bill: $${input.monthlyBillRange}` : "",
            input.interestOtherText ? `Notes: ${input.interestOtherText}` : "",
            input.ownershipType === "renter" ? `⚠️ Renter (not homeowner)` : "",
            billLink ? `Bill file: ${billLink}` : "",
            `CRM: https://pellsolar.com/admin/leads/${id}`,
            `Source: ${source}`,
          ].filter(Boolean).join("\n");

          sendSms(ENV.twilioNotifyNumber, smsBody).catch((e) =>
            console.warn("[SMS] Lead notification failed:", e)
          );
        }
        }
        // Forward to Solar Pro CRM and capture deal_id
        let crmDealId: number | undefined;
        let crmSuspect = false;
        try {
          // Parse monthly_bill as a number (strip non-digits, take first number found)
          const monthlyBillNum = input.monthlyBillRange
            ? parseInt(input.monthlyBillRange.replace(/[^0-9]/g, ""), 10) || undefined
            : undefined;

          const crmRes = await postToCrm({
            first_name: input.firstName,
            last_name: input.lastName,
            email: input.email || undefined,
            phone: input.phone || undefined,
            address: input.address || undefined,
            city: input.city || undefined,
            state: input.state || undefined,
            zip: input.zipCode || input.zip || undefined,
            // Third-party CRM servers require a directly downloadable signed S3 URL.
            // Never send a browser-session-bound /manus-storage path.
            bill_file_url: crmBillFileUrl,
            bill_file_name: input.billFileName || undefined,
            type: "new_lead",
            source,
            // Individual qualification fields
            property_type: (input.propertyType as "family_home" | "apartment" | "commercial" | undefined) || undefined,
            existing_solar: input.existingSolar !== undefined ? input.existingSolar === 1 : undefined,
            solar_motivation: input.solarMotivation || undefined,
            payment_preference: input.paymentPreference || undefined,
            monthly_bill: monthlyBillNum,
            interest: input.interestType || undefined,
            utm_data: input.utmData,
            visitor_ip: visitorIp,
            user_agent: getRequestHeader(ctx.req, "user-agent"),
            referrer: getRequestHeader(ctx.req, "referer"),
            page_url: input.pageUrl,
            form_seconds: input.formSeconds,
            honeypot: input.companyWebsite,
            turnstile_ok: turnstileOk,
            // notes carries free-text when interest is 'other'
            notes: input.interestType === "other" && input.interestOtherText ? input.interestOtherText : undefined,
          });
          if (crmRes.deal_id) crmDealId = crmRes.deal_id;
          crmSuspect = crmRes.suspect === true;
          if (crmRes.deal_id || crmRes.customer_id) {
            await setLeadCrmInfo(id, {
              crmDealId: crmRes.deal_id,
              crmCustomerId: crmRes.customer_id,
              crmStatus: crmRes.success ? "accepted" : undefined,
            });
          } else if (crmRes.success === false) {
            await setLeadCrmInfo(id, { crmStatus: "failed" });
          }
        } catch (e) {
          console.warn("[CRM] postToCrm failed in leads.create:", e);
        }
        return { success: true, id, isDuplicate, dealId: crmDealId, suspect: crmSuspect || undefined };
      }),

    // Public: get a signed upload URL for bill files
    getBillUploadUrl: publicProcedure
      .input(z.object({ fileName: z.string(), contentType: z.string() }))
      .mutation(async ({ input }) => {
        const key = `bills/${Date.now()}-${input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        // Return the key so the client can upload via the /api/upload-bill endpoint
        return { key, uploadPath: `/api/upload-bill` };
      }),

    // Admin: list all leads with optional filters
    list: adminProcedure
      .input(z.object({
        status: LeadStatusSchema.optional(),
        source: LeadSourceSchema.optional(),
      }).optional())
      .query(async ({ input }) => {
        return getLeads(input);
      }),

    // Admin: get a single lead
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const lead = await getLeadById(input.id);
        if (!lead) throw new TRPCError({ code: "NOT_FOUND", message: "Lead not found" });
        return lead;
      }),

    // Admin: update lead status
    updateStatus: adminProcedure
      .input(z.object({ id: z.number(), status: LeadStatusSchema }))
      .mutation(async ({ input }) => {
        await updateLeadStatus(input.id, input.status);
        return { success: true };
      }),

    // Admin: update lead notes
    updateNotes: adminProcedure
      .input(z.object({ id: z.number(), notes: z.string() }))
      .mutation(async ({ input }) => {
        await updateLeadNotes(input.id, input.notes);
        return { success: true };
      }),

    // Admin: pipeline stats
    stats: adminProcedure.query(async () => {
      return getLeadStats();
    }),

    // Admin: export all leads as JSON (client converts to CSV)
    export: adminProcedure.query(async () => {
      return getAllLeadsForExport();
    }),
  }),

  // ─── CRM integration ────────────────────────────────────────────────────────
  crm: router({
    // Public: submit a new solar lead to the CRM
    submitLead: publicProcedure
      .input(z.object({
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().optional(),
        type: z.enum(["new_lead", "service_call"]).default("new_lead"),
        issue_description: z.string().optional(),
        source: z.string().optional(),
        notes: z.string().optional(),
        utm_data: UtmDataSchema,
        // Honeypot field — hidden from humans, bots may fill it
        honeypot: z.string().max(200).default(""),
        // Form timing — epoch ms when form was loaded
        form_loaded_at: z.number().int().min(0).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // ── Bot / spam protection ──────────────────────────────────────────
        runSpamChecks(ctx.req, {
          honeypot: input.honeypot,
          address: input.address,
          phone: input.phone,
        });
        // ─────────────────────────────────────────────────────────────────

        // Store locally so this lead shows up in the website's own admin dashboard,
        // regardless of whether the CRM forward below succeeds.
        let localLeadId: number | undefined;
        try {
          const { id } = await createLead({
            firstName: input.first_name,
            lastName: input.last_name,
            email: input.email || undefined,
            phone: input.phone || undefined,
            address: input.address,
            ownershipType: "homeowner",
            interestType: "other",
            source: input.source || "financing",
            notes: input.notes,
          });
          localLeadId = id;
        } catch (e) {
          console.warn("[Leads] Failed to store crm.submitLead lead locally:", e);
        }

        const result = await postToCrm(input);
        if (!result.success) {
          // Log but don't fail the user — CRM sync is best-effort
          console.warn("[CRM] Lead sync failed:", result.error);
        } else if (localLeadId) {
          await setLeadCrmInfo(localLeadId, {
            crmDealId: result.deal_id,
            crmCustomerId: result.customer_id,
            crmStatus: "accepted",
          });
        }

        // SMS notification to Josh for financing/direct CRM leads
        if (ENV.twilioNotifyNumber && input.type === "new_lead") {
          const phone = input.phone ?? "";
          const cleanPhone2 = phone.replace(/\D/g, "");
          const formattedPhone2 = cleanPhone2.length === 10
            ? `(${cleanPhone2.slice(0,3)}) ${cleanPhone2.slice(3,6)}-${cleanPhone2.slice(6)}`
            : phone;
          const smsBody = [
            `🌞 NEW PELL SOLAR LEAD`,
            `Name: ${input.first_name} ${input.last_name}`,
            phone ? `Phone: ${formattedPhone2}` : "",
            phone ? `Call: +1${cleanPhone2}` : "",
            input.email ? `Email: ${input.email}` : "",
            input.address ? `Address: ${[input.address, input.city, input.state, input.zip].filter(Boolean).join(", ")}` : "",
            input.notes ? `Notes: ${input.notes}` : "",
            `Source: ${input.source ?? "website"}`,
          ].filter(Boolean).join("\n");

          sendSms(ENV.twilioNotifyNumber, smsBody).catch((e) =>
            console.warn("[SMS] CRM lead notification failed:", e)
          );
        }

        return result;
      }),
  }),

  // ─── Service Call procedures ─────────────────────────────────────────────
  service: router({
    diagnose: publicProcedure
      .input(z.object({
        firstName: z.string().min(1),
        email: z.string().email(),
        systemType: z.string(),
        inverterBrand: z.string(),
        batteryBrand: z.string(),
        systemAge: z.string(),
        selectedIssues: z.array(z.string()),
        duration: z.string(),
        description: z.string(),
        errorCode: z.string().optional(),
        photoKeys: z.array(z.string()).optional(),
        honeypot: z.string().max(200).default(""),
      }))
      .mutation(async ({ input, ctx }) => {
        // Rate limiting: 5 diagnoses per hour per IP
        const ip = getClientIp(ctx.req);
        const now = Date.now();
        const windowStart = now - DIAGNOSE_RATE_WINDOW_MS;
        const timestamps = (diagnoseRateLimit.get(ip) ?? []).filter((t) => t > windowStart);
        if (timestamps.length >= DIAGNOSE_RATE_MAX) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Too many diagnostic requests. Please wait a while before trying again.",
          });
        }
        timestamps.push(now);
        diagnoseRateLimit.set(ip, timestamps);

        // Spam checks (honeypot + Turnstile if configured)
        if (input.honeypot && input.honeypot.trim().length > 0) {
          // Honeypot filled = bot. Silently return generic message.
          return { diagnosis: "We were unable to generate a diagnostic at this time. Please submit your service request and our team will contact you shortly." };
        }

        const issueList = input.selectedIssues.join(", ") || "unspecified issue";

        // Expanded brand-specific guidance
        const brandGuidance: Record<string, string> = {
          "SolarEdge": "SolarEdge system: Use power optimizers (P-series/S-series), HD-Wave inverter, mySolarEdge app/portal. Error codes on inverter LED or portal. Safe power-cycle: AC disconnect OFF → wait 30s → DC disconnect OFF → wait 30s → DC ON → AC ON. Warranty: inverter 12yr (25yr if registered), optimizers 25yr. Check optimizer pairing, DC disconnect, error code lookup in app.",
          "Enphase": "Enphase microinverter system: IQ microinverters (IQ7/IQ8), IQ Gateway (Envoy), Enlighten app, IQ Battery (Encharge). Each panel has its own microinverter. Safe power-cycle: IQ Gateway only (unplug 30s, replug). Warranty: microinverters 25yr, IQ Gateway 5yr, IQ Battery 10yr. Check Enlighten for individual panel status, Gateway WiFi, IQ error indicators.",
          "Tesla / SolarCity": "Tesla system: Tesla Solar Inverter (separate from Powerwall), Tesla app. Safe power-cycle: breaker panel → Tesla Solar Inverter breaker OFF → wait 30s → ON. Warranty: Tesla Solar Inverter 12.5yr, Powerwall 10yr. Check Tesla app alerts, gateway online, breaker panel.",
          "Tesla Powerwall": "Tesla Powerwall battery: Tesla app, Gateway. Safe power-cycle: Powerwall breaker OFF → wait 30s → ON. Do NOT power-cycle during outage/backup mode. Warranty: 10yr. Check app for Backup Reserve settings (100% = max backup), Storm Watch, Gateway online, backup circuit test via Go Off-Grid.",
          "SMA": "SMA inverter: Sunny Boy/Tripower, SMA Sunny Portal, SMA Energy app. Safe power-cycle: AC disconnect OFF → DC disconnect OFF → wait 5min → DC ON → AC ON. Warranty: 10yr. Check Sunny Portal event log, AC/DC disconnects, LED status (red/yellow = error).",
          "Fronius": "Fronius inverter: Primo/Symo, Solar.web portal, Smart Meter. Safe power-cycle: AC disconnect OFF → wait 30s → ON. Warranty: 10yr. Check Solar.web state codes, AC disconnect, inverter display error numbers.",
          "SunPower": "SunPower Equinox: SunPower monitoring app, AC modules or inverter. Warranty: 25yr complete system (panels, inverter, labor). Check SunPower app alerts, system communication. Contact SunPower support for warranty claims.",
          "LG": "LG RESU battery: LG ThinQ app (monitoring), battery management system. Warranty: 10yr. Check ThinQ app for battery status, state of charge, errors. LG batteries pair with various inverters (SolarEdge StorEdge, SMA, Fronius) — troubleshoot inverter separately.",
          "Panasonic": "Panasonic EverVolt battery: EverVolt monitoring (varies by installer). Warranty: 10yr. Check monitoring for battery status, charge/discharge cycles. Panasonic panels have separate 25yr warranty.",
          "Generac PWRcell": "Generac PWRcell battery: PWRview app, SnapRS system. Safe power-cycle: PWRcell breaker OFF → wait 30s → ON. Warranty: 10yr. Check PWRview app for battery health, ECO/Clean Backup/Priority Backup modes, inverter status.",
          "Franklin WH": "Franklin WH battery: aGate+ (controller), aPower (battery), Franklin app. Safe power-cycle: system breaker OFF → wait 30s → ON. Warranty: 12yr. Check Franklin app for battery status, grid/solar/battery flow diagram, alerts.",
        };
        const brandNote = brandGuidance[input.inverterBrand] || (input.inverterBrand && input.inverterBrand !== "Don't Know" ? `This system uses a ${input.inverterBrand} inverter/battery. Use terminology and troubleshooting steps specific to that brand.` : "");

        let prompt = `You are a solar system diagnostic expert for Pell Solar, a Tesla Certified Installer based in Southern California. A customer has submitted the following service request:

System Type: ${input.systemType || "Unknown"}
Inverter/System Brand: ${input.inverterBrand || "Unknown"}
Battery Brand: ${input.batteryBrand || "None"}
System Age: ${input.systemAge || "Unknown"}
Issues Selected: ${issueList}
Duration: ${input.duration || "Unknown"}
${input.errorCode ? `Error Code Shown: ${input.errorCode}` : ""}
Customer Description: ${input.description || "None provided"}
${brandNote ? `\nBrand-Specific Context: ${brandNote}` : ""}

Provide a helpful, accurate diagnostic response. Use the exact brand-specific app names, component names, and error code terminology for their system. Never use generic terms like "phase" or "string" if the brand has specific names for those components.

If the issue can be resolved by the customer (checking the monitoring app, resetting a breaker, cleaning panels, power-cycling equipment), explain the exact steps for their brand INCLUDING the safe power-cycle order.

If it requires a technician visit (roof leak, physical damage, inverter failure, battery not backing up during outage, burnt smell, arcing, repeatedly tripping breakers), clearly state that and reassure them Pell Solar will follow up.

Always end with: "Call us immediately at (909) 240-5294 if you smell burning, see arcing/sparks, have repeatedly tripping breakers, or notice roof leaks — turn off the AC disconnect labeled SOLAR and do not attempt DIY repairs."

Keep the response under 250 words and use plain language.`;

        const llmMessages: Array<{ role: "system" | "user" | "assistant"; content: string | Array<any> }> = [
          { role: "system", content: "You are a helpful solar system diagnostic assistant for Pell Solar." },
        ];

        // If photos were uploaded, include them in the prompt
        if (input.photoKeys && input.photoKeys.length > 0) {
          const photoUrls = await Promise.all(
            input.photoKeys.map(async (key) => {
              try {
                return await storageGetSignedUrl(key);
              } catch (e) {
                console.warn("[Diagnose] Failed to get signed URL for photo:", key, e);
                return null;
              }
            })
          );
          const validPhotoUrls = photoUrls.filter(Boolean) as string[];

          if (validPhotoUrls.length > 0) {
            prompt += `\n\nThe customer has uploaded ${validPhotoUrls.length} photo(s). Describe what you see in each photo and incorporate that into your diagnostic.`;
            const content: Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }> = [
              { type: "text", text: prompt },
              ...validPhotoUrls.map(url => ({ type: "image_url" as const, image_url: { url } })),
            ];
            llmMessages.push({ role: "user", content });
          } else {
            llmMessages.push({ role: "user", content: prompt });
          }
        } else {
          llmMessages.push({ role: "user", content: prompt });
        }

        const result = await invokeLLM({
          messages: llmMessages,
        });
        const rawContent = result.choices?.[0]?.message?.content ?? "";
        const diagnosis = typeof rawContent === "string" ? rawContent : (Array.isArray(rawContent) ? rawContent.map(c => typeof c === "string" ? c : "text" in c ? c.text : "").join("\n") : "We were unable to generate a diagnostic at this time. Please submit your service request and our team will contact you shortly.");
        const modelUsed = result.model || process.env.DIAG_MODEL || "claude-sonnet-4-6";

        // Send diagnosis email to customer
        const emailSent = await sendDiagnosisEmail({
          to: input.email,
          firstName: input.firstName,
          inverterBrand: input.inverterBrand,
          diagnosis,
        });

        // Store diagnosis in database (create lead record with diagnosis fields)
        try {
          await createLead({
            firstName: input.firstName,
            lastName: "", // Only have first name at diagnosis stage
            email: input.email,
            ownershipType: "homeowner",
            interestType: "other",
            source: "service",
            systemType: input.systemType || undefined,
            inverterBrand: input.inverterBrand || undefined,
            batteryBrand: input.batteryBrand || undefined,
            systemAge: input.systemAge || undefined,
            selectedIssues: JSON.stringify(input.selectedIssues),
            duration: input.duration || undefined,
            errorCode: input.errorCode || undefined,
            aiDiagnosis: diagnosis,
            aiModel: modelUsed,
            diagnosisOutcome: "unknown", // Will be updated by submitCall
            diagnosisEmailSentAt: emailSent ? new Date() : undefined,
            photoKeys: input.photoKeys || undefined,
            notes: `AI Diagnosis generated on ${new Date().toISOString()}`,
          });
        } catch (e) {
          console.warn("[Diagnose] Failed to store diagnosis in database:", e);
        }

        return { diagnosis };
      }),

    submitCall: publicProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string(),
        phone: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        systemType: z.string().optional(),
        inverterBrand: z.string().optional(),
        batteryBrand: z.string().optional(),
        systemAge: z.string().optional(),
        selectedIssues: z.array(z.string()).optional(),
        duration: z.string().optional(),
        description: z.string().optional(),
        errorCode: z.string().optional(),
        aiDiagnosis: z.string().optional(),
        diagnosisOutcome: z.enum(["helped", "need_help", "unknown"]).optional(),
        photoKeys: z.array(z.string()).optional(),
        // Honeypot field — hidden from humans, bots may fill it
        honeypot: z.string().max(200).default(""),
        // Form timing — epoch ms when form was loaded
        form_loaded_at: z.number().int().min(0).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!input.phone?.trim() && !input.email?.trim()) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "A phone number or email address is required." });
        }
        // ── Bot / spam protection ──────────────────────────────────────────
        runSpamChecks(ctx.req, {
          honeypot: input.honeypot,
          address: input.address,
          phone: input.phone,
        });
        // ─────────────────────────────────────────────────────────────────
        const issuesSummary = (input.selectedIssues ?? []).join(", ");
        const notes = [
          input.systemType ? `System: ${input.systemType}` : "",
          input.inverterBrand ? `Inverter: ${input.inverterBrand}` : "",
          input.batteryBrand && input.batteryBrand !== "No Battery" ? `Battery: ${input.batteryBrand}` : "",
          input.systemAge ? `Age: ${input.systemAge}` : "",
          issuesSummary ? `Issues: ${issuesSummary}` : "",
          input.duration ? `Duration: ${input.duration}` : "",
          input.errorCode ? `Error Code: ${input.errorCode}` : "",
          input.description ? `Notes: ${input.description}` : "",
        ].filter(Boolean).join(" | ");

        // Check if this is a deflected case (AI resolved it, no CRM ticket needed)
        const isDeflected = input.diagnosisOutcome === "helped";

        if (isDeflected) {
          // Send deflection notification to Josh
          await notifyOwner({
            title: "AI Deflected Service Request",
            content: `${input.firstName} ${input.lastName || ""} (${input.email || input.phone})\n${input.inverterBrand || "Unknown brand"} system\nIssues: ${issuesSummary}\n\nAI diagnosis resolved the issue - no CRM ticket created.`,
          });

          // Store locally with outcome=helped
          try {
            await createLead({
              firstName: input.firstName,
              lastName: input.lastName || "",
              email: input.email || undefined,
              phone: input.phone || undefined,
              address: input.address,
              ownershipType: "homeowner",
              interestType: "other",
              source: "service",
              systemType: input.systemType || undefined,
              inverterBrand: input.inverterBrand || undefined,
              batteryBrand: input.batteryBrand || undefined,
              systemAge: input.systemAge || undefined,
              selectedIssues: JSON.stringify(input.selectedIssues || []),
              duration: input.duration || undefined,
              errorCode: input.errorCode || undefined,
              aiDiagnosis: input.aiDiagnosis || undefined,
              diagnosisOutcome: "helped",
              photoKeys: input.photoKeys || undefined,
              notes: `Deflected by AI diagnosis - no service call created\n${notes}`,
            });
          } catch (e) {
            console.warn("[Leads] Failed to store deflected diagnosis:", e);
          }

          return { success: true, deflected: true };
        }

        // Not deflected - proceed with CRM ticket creation
        const crmPayload = {
          first_name: input.firstName,
          last_name: input.lastName || "",
          phone: input.phone,
          email: input.email || "",
          address: input.address || "",
          type: "service_call",
          issue_description: input.description || issuesSummary || "Service request",
          notes,
          source: "website",
        };

        // Step 1: Pre-check if customer exists in CRM
        let customerExists = false;
        try {
          customerExists = await checkCustomerInCrm(input.phone, input.email);
        } catch (e) {
          console.warn("[CRM] Pre-check failed, proceeding with webhook:", e);
        }

        // Build tech brief for the service technician
        const techBrief = [
          `SERVICE TECH BRIEF`,
          `------------------`,
          `Customer: ${input.firstName} ${input.lastName || ""} | ${input.phone}`,
          input.email ? `Email: ${input.email}` : "",
          input.address ? `Address: ${input.address}` : "",
          `System: ${[input.systemType, input.inverterBrand ? `Inverter: ${input.inverterBrand}` : "", input.batteryBrand && input.batteryBrand !== "No Battery" ? `Battery: ${input.batteryBrand}` : "", input.systemAge ? `Age: ${input.systemAge}` : ""].filter(Boolean).join(" | ")}`,
          issuesSummary ? `Issues Reported: ${issuesSummary}` : "",
          input.duration ? `Duration: ${input.duration}` : "",
          input.errorCode ? `Error Code: ${input.errorCode}` : "",
          input.description ? `Customer Description: "${input.description}"` : "",
          input.aiDiagnosis ? `AI Diagnostic: ${input.aiDiagnosis}` : "",
        ].filter(Boolean).join("\n");

        // Step 2: POST to CRM service intake webhook
        let crmResult: { success: boolean; customer_id?: number; deal_id?: number } = { success: false };
        try {
          // Build photo URLs for CRM (needs signed URLs for direct download)
          let photoUrls: Array<{ fileUrl: string; fileKey: string; fileName: string }> = [];
          if (input.photoKeys && input.photoKeys.length > 0) {
            const urlResults = await Promise.all(
              input.photoKeys.map(async (key, idx) => {
                try {
                  const signedUrl = await storageGetSignedUrl(key, 7 * 24 * 60 * 60); // 7 days
                  return signedUrl ? { fileUrl: signedUrl, fileKey: key, fileName: `photo-${idx + 1}.jpg` } : null;
                } catch (e) {
                  console.warn("[CRM] Failed to generate signed URL for photo:", key, e);
                  return null;
                }
              })
            );
            photoUrls = urlResults.filter(Boolean) as Array<{ fileUrl: string; fileKey: string; fileName: string }>;
          }

          const servicePayload = {
            name: `${input.firstName} ${input.lastName || ""}`.trim(),
            email: input.email || "",
            phone: (input.phone || "").replace(/\D/g, ""),
            address: input.address || "",
            serviceType: (input.selectedIssues ?? []).length > 0 ? "repair" : "other",
            problemDescription: input.description || (input.selectedIssues ?? []).join(", ") || "Service request",
            preferredDate: "",
            preferredTime: "",
            source: "service",
            submittedAt: Date.now(),
            // Extra context fields
            systemType: input.systemType || "",
            inverterBrand: input.inverterBrand || "",
            batteryBrand: input.batteryBrand || "",
            systemAge: input.systemAge || "",
            notes,
            customerExists,
            techBrief,
            // Structured fields (alternative to techBrief string)
            system: [input.systemType, input.inverterBrand, input.batteryBrand, input.systemAge].filter(Boolean).join(" | ") || "",
            issuesDuration: input.duration || "",
            customerDescription: input.description || "",
            aiDiagnostic: input.aiDiagnosis || "",
            // Photo URLs for CRM file attachment
            photoFiles: photoUrls.length > 0 ? photoUrls : undefined,
          };
          const res = await fetch("https://pellsolar-crm-prod.onrender.com/api/webhooks/service-intake", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...getCrmAuthHeaders() },
            body: JSON.stringify(servicePayload),
          });
          crmResult = await res.json().catch(() => ({ success: res.ok }));
        } catch (e) {
          console.error("[CRM] Service intake webhook failed:", e);
        }

        // Store locally with all diagnosis fields
        try {
          const { id: localLeadId } = await createLead({
            firstName: input.firstName,
            lastName: input.lastName || "",
            email: input.email || undefined,
            phone: input.phone || undefined,
            address: input.address,
            ownershipType: "homeowner",
            interestType: "other",
            source: "service",
            systemType: input.systemType || undefined,
            inverterBrand: input.inverterBrand || undefined,
            batteryBrand: input.batteryBrand || undefined,
            systemAge: input.systemAge || undefined,
            selectedIssues: JSON.stringify(input.selectedIssues || []),
            duration: input.duration || undefined,
            errorCode: input.errorCode || undefined,
            aiDiagnosis: input.aiDiagnosis || undefined,
            diagnosisOutcome: input.diagnosisOutcome || "unknown",
            photoKeys: input.photoKeys || undefined,
            notes: techBrief,
          });
          const crmDealId = crmResult && "deal_id" in crmResult ? crmResult.deal_id : undefined;
          if (crmDealId) {
            await setLeadCrmInfo(localLeadId, { crmDealId, crmCustomerId: crmResult.customer_id, crmStatus: "accepted" });
          }
        } catch (e) {
          console.warn("[Leads] Failed to store service.submitCall lead locally:", e);
        }

        // SMS notification to Josh for service call submissions
        if (ENV.twilioNotifyNumber) {
          const phone = input.phone ?? "";
          const cleanPhone3 = phone.replace(/\D/g, "");
          const formattedPhone3 = cleanPhone3.length === 10
            ? `(${cleanPhone3.slice(0,3)}) ${cleanPhone3.slice(3,6)}-${cleanPhone3.slice(6)}`
            : phone;
          const smsBody = [
            `🔧 PELL SOLAR SERVICE CALL`,
            `Name: ${input.firstName} ${input.lastName || ""}`.trim(),
            phone ? `Phone: ${formattedPhone3}` : "",
            phone ? `Call: +1${cleanPhone3}` : "",
            input.email ? `Email: ${input.email}` : "",
            input.address ? `Address: ${input.address}` : "",
            input.systemType ? `System: ${input.systemType}` : "",
            input.inverterBrand ? `Inverter: ${input.inverterBrand}` : "",
            input.batteryBrand && input.batteryBrand !== "No Battery" ? `Battery: ${input.batteryBrand}` : "",
            input.systemAge ? `Age: ${input.systemAge}` : "",
            issuesSummary ? `Issues: ${issuesSummary}` : "",
            input.duration ? `Duration: ${input.duration}` : "",
            input.errorCode ? `Error Code: ${input.errorCode}` : "",
            input.description ? `Notes: ${input.description}` : "",
          ].filter(Boolean).join("\n");

          sendSms(ENV.twilioNotifyNumber, smsBody).catch((e) =>
            console.warn("[SMS] Service call notification failed:", e)
          );
        }

        return { success: true, crm: crmResult, customerExists };
      }),
  }),

  // ─── Project Photos procedures ──────────────────────────────────────────
  photos: router({
    list: publicProcedure
      .input(z.object({ category: z.enum(["solar", "battery", "ev-charging", "roofing", "other"]).optional() }).optional())
      .query(async ({ input }) => {
        return getProjectPhotos(input?.category);
      }),

    upload: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        imageData: z.string(), // base64
        mimeType: z.string().default("image/jpeg"),
        category: z.enum(["solar", "battery", "ev-charging", "roofing", "other"]).default("solar"),
        location: z.string().optional(),
        featured: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.imageData, "base64");
        const ext = input.mimeType.split("/")[1] ?? "jpg";
        const key = `project-photos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { url } = await storagePut(key, buffer, input.mimeType);
        const id = await createProjectPhoto({
          title: input.title,
          description: input.description ?? null,
          imageUrl: url,
          imageKey: key,
          category: input.category,
          location: input.location ?? null,
          featured: input.featured ? 1 : 0,
          sortOrder: 0,
        });
        return { id, url };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteProjectPhoto(input.id);
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.enum(["solar", "battery", "ev-charging", "roofing", "other"]).optional(),
        location: z.string().optional(),
        featured: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, featured, ...rest } = input;
        const data: Record<string, unknown> = { ...rest };
        if (featured !== undefined) data.featured = featured ? 1 : 0;
        await updateProjectPhoto(id, data as any);
        return { success: true };
      }),
  }),

  // ─── Unsubscribe procedures ───────────────────────────────────────────────
  unsubscribe: router({
    // Generate a signed token for a given email + campaign
    generateToken: publicProcedure
      .input(z.object({
        email: z.string().email(),
        campaign: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const secret = ENV.jwtSecret || ENV.cookieSecret;
        const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
        const payload = `${input.email}|${expiresAt}|${input.campaign ?? ""}`;
        const signature = crypto
          .createHmac("sha256", secret)
          .update(payload)
          .digest("hex");
        const token = `${Buffer.from(payload).toString("base64url")}.${signature}`;
        return { token };
      }),

    // Process an unsubscribe request: verify token, save to DB, call SendGrid
    process: publicProcedure
      .input(z.object({
        email: z.string().email(),
        token: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const ip = (ctx as any).req?.ip ||
          (ctx as any).req?.headers?.["x-forwarded-for"] ||
          "unknown";

        // Rate limiting: max 5 requests per IP per hour
        const now = Date.now();
        const windowMs = 60 * 60 * 1000;
        const key = `unsub:${ip}`;
        if (!unsubRateLimit.has(key)) unsubRateLimit.set(key, []);
        const timestamps = unsubRateLimit.get(key)!.filter((t) => now - t < windowMs);
        if (timestamps.length >= 5) {
          throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many requests. Please try again later." });
        }
        timestamps.push(now);
        unsubRateLimit.set(key, timestamps);

        // Verify token signature and expiry
        const secret = ENV.jwtSecret || ENV.cookieSecret;
        const parts = input.token.split(".");
        if (parts.length !== 2) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid unsubscribe link." });
        }
        let payload: string;
        try {
          payload = Buffer.from(parts[0], "base64url").toString("utf8");
        } catch {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid unsubscribe link." });
        }
        const expectedSig = crypto
          .createHmac("sha256", secret)
          .update(payload)
          .digest("hex");
        if (expectedSig !== parts[1]) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid unsubscribe link." });
        }
        const [tokenEmail, expiresAtStr, campaign] = payload.split("|");
        if (tokenEmail.toLowerCase() !== input.email.toLowerCase()) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Email mismatch." });
        }
        if (Date.now() > parseInt(expiresAtStr, 10)) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "This unsubscribe link has expired. Please contact us at info@pellsolar.com." });
        }

        // Check if already unsubscribed
        const existing = await getUnsubscribeByEmail(input.email);
        if (existing) {
          return { success: true, alreadyUnsubscribed: true };
        }

        // Save to database
        await createUnsubscribe({
          email: input.email.toLowerCase(),
          token: input.token.slice(0, 128),
          campaign: campaign || null,
          ipAddress: String(ip).slice(0, 64),
        });

        // Add to SendGrid suppression group 35533
        if (ENV.sendgridApiKey) {
          try {
            const sgRes = await fetch(
              "https://api.sendgrid.com/v3/asm/groups/35533/suppressions",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${ENV.sendgridApiKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ recipient_emails: [input.email.toLowerCase()] }),
              }
            );
            if (!sgRes.ok) {
              const errText = await sgRes.text();
              console.error("[Unsubscribe] SendGrid error:", sgRes.status, errText);
            }
          } catch (err) {
            console.error("[Unsubscribe] SendGrid request failed:", err);
          }
        }

        return { success: true, alreadyUnsubscribed: false };
      }),

    // Admin: list all unsubscribes
    list: adminProcedure
      .query(async () => {
        return getAllUnsubscribes();
      }),
  }),

  // ─── Live Chat ────────────────────────────────────────────────────────────
  chat: chatRouter,

  // ─── Geo procedures ────────────────────────────────────────────────────────
  geo: router({
    geocodeZip: publicProcedure
      .input(z.object({ zip: z.string().length(5) }))
      .query(async ({ input }) => {
        try {
          const result = await makeRequest<GeocodingResult>("/maps/api/geocode/json", {
            address: `${input.zip}, USA`,
          });
          if (result.results && result.results.length > 0) {
            const loc = result.results[0].geometry.location;
            const formatted = result.results[0].formatted_address;
            return { lat: loc.lat, lng: loc.lng, formatted, found: true };
          }
          return { lat: 0, lng: 0, formatted: "", found: false };
        } catch {
          return { lat: 0, lng: 0, formatted: "", found: false };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
