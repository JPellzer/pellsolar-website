import { ENV } from "./_core/env";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileStatus = true | false | null;

/**
 * Returns null when Turnstile is not configured, true for an accepted token,
 * and false for an invalid or unavailable verification response.
 */
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string,
): Promise<TurnstileStatus> {
  if (!ENV.turnstileSiteKey || !ENV.turnstileSecretKey) return null;
  if (!token || token.length > 2048) return false;

  try {
    const formData = new URLSearchParams({
      secret: ENV.turnstileSecretKey,
      response: token,
      remoteip: remoteIp,
    });
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });
    const data = await response.json().catch(() => ({ success: false })) as { success?: boolean };
    return response.ok && data.success === true;
  } catch (error) {
    console.warn("[Turnstile] Verification request failed:", error);
    return false;
  }
}
