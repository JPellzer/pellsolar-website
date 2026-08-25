import type { Express, Request, Response } from "express";
import crypto from "crypto";
import { ENV } from "./_core/env";

/**
 * POST /api/unsubscribe/generate-token
 * Body: { email: string, campaign?: string }
 * Returns: { token: string }
 *
 * Generates a signed HMAC-SHA256 unsubscribe token valid for 30 days.
 * No authentication required — used by external email systems.
 */
export function registerUnsubscribeRoute(app: Express) {
  app.post("/api/unsubscribe/generate-token", (req: Request, res: Response) => {
    const { email, campaign } = req.body ?? {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ error: "A valid email address is required." });
      return;
    }

    const secret = ENV.jwtSecret || ENV.cookieSecret;
    if (!secret) {
      res.status(500).json({ error: "Server misconfiguration: signing secret not set." });
      return;
    }

    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    const payload = `${email.toLowerCase()}|${expiresAt}|${campaign ?? ""}`;
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");
    const token = `${Buffer.from(payload).toString("base64url")}.${signature}`;

    res.json({ token });
  });
}
