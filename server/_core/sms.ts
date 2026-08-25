import { ENV } from "./env";

/**
 * Send an SMS via Twilio REST API using raw fetch (no SDK needed).
 * Returns true on success, false on failure (never throws).
 */
export async function sendSms(to: string, body: string): Promise<boolean> {
  const { twilioAccountSid, twilioAuthToken, twilioFromNumber } = ENV;

  if (!twilioAccountSid || !twilioAuthToken || !twilioFromNumber) {
    console.warn("[SMS] Twilio credentials not configured — skipping SMS.");
    return false;
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
    const params = new URLSearchParams({
      To: to,
      From: twilioFromNumber,
      Body: body,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString("base64"),
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[SMS] Twilio error:", response.status, err);
      return false;
    }

    console.log("[SMS] Sent successfully to", to);
    return true;
  } catch (e) {
    console.error("[SMS] Failed to send SMS:", e);
    return false;
  }
}
