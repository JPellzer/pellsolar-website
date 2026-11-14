import { TRPCError } from "@trpc/server";
import { ENV } from "./env";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const trimValue = (value: string): string => value.trim();
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const validatePayload = (input: NotificationPayload): NotificationPayload => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required.",
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required.",
    });
  }

  const title = trimValue(input.title);
  const content = trimValue(input.content);

  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`,
    });
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`,
    });
  }

  return { title, content };
};

/**
 * Sends diagnosis email to customer via SendGrid.
 * Returns `true` if the email was sent successfully, `false` on failure.
 * Never throws on send failure.
 */
export async function sendDiagnosisEmail(params: {
  to: string;
  firstName: string;
  inverterBrand: string;
  diagnosis: string;
  websiteLeadId?: number;
}): Promise<boolean> {
  const apiKey = ENV.sendgridApiKey;
  const from = ENV.notifyFromEmail || "info@pellsolar.com";

  if (!apiKey) {
    console.warn("[Notification] SendGrid API key not configured");
    return false;
  }

  if (!params.to || !params.to.includes("@")) {
    console.warn("[Notification] Invalid recipient email");
    return false;
  }

  const subject = "Your Solar Service Next Steps from Pell Solar";

  // Build followup links if we have a lead ID
  const followupLinks = params.websiteLeadId
    ? `

Would you like our team to follow up?
→ No follow-up needed: https://pellsolar.com/solar-repair?followup=${params.websiteLeadId}&outcome=helped
→ Request a service call: https://pellsolar.com/solar-repair?followup=${params.websiteLeadId}&outcome=need_help

Just click one of the links above so we know how to follow up.
`
    : `

Would you like our team to follow up?
You can request a service call here:
https://pellsolar.com/solar-repair#service-form
`;

  const body = `Hi ${params.firstName || "there"},

Thanks for describing your solar service issue. Here are the next steps; a qualified technician must confirm the cause and any repair:

─────────────────────────────────
${params.diagnosis}
─────────────────────────────────
${followupLinks}
Or call us directly: (909) 240-5294

If there is smoke, fire, sparking or an immediate danger, move away from the equipment and call 911. Do not open or try to repair the equipment. A service request is not emergency assistance.

Pell Solar Team
Licensed C-46 Solar Contractor • License #949122`;

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: params.to }],
          },
        ],
        from: { email: from },
        subject,
        content: [
          {
            type: "text/plain",
            value: body,
          },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to send diagnosis email (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Notification] Error calling SendGrid:", error);
    return false;
  }
}

/**
 * Sends owner notification via SendGrid email.
 * Returns `true` if the email was sent successfully, `false` on failure.
 * Never throws on send failure (only validation errors bubble up as TRPC errors).
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  const { title, content } = validatePayload(payload);

  const apiKey = ENV.sendgridApiKey;
  const to = ENV.ownerNotifyEmail || "josh@pellsolar.com";
  const from = ENV.notifyFromEmail || "info@pellsolar.com";

  if (!apiKey) {
    console.warn("[Notification] SendGrid API key not configured");
    return false;
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
          },
        ],
        from: { email: from },
        subject: title,
        content: [
          {
            type: "text/plain",
            value: content,
          },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to send email (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Notification] Error calling SendGrid:", error);
    return false;
  }
}
