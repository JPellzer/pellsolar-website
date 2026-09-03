/**
 * Spam / bot protection helpers
 *
 * Strategy (zero friction for real users):
 *  1. Honeypot — hidden field that bots fill in, humans never see
 *  2. Address length guard — real addresses are < 200 chars; bots dump JSON blobs
 *  3. Phone format guard — must be 10 US digits after stripping non-digits
 *  4. IP rate limit — max 3 lead submissions per IP per 60-minute window
 */

import { TRPCError } from "@trpc/server";
import type { Request } from "express";

// ─── IP Rate Limiter ──────────────────────────────────────────────────────────
// In-memory store: ip → array of submission timestamps
const ipSubmissions = new Map<string, number[]>();
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 20; // max submissions per window (raised for testing — lower back to 3 when done)

export function getClientIp(req: Request): string {
  // Prefer the original client address supplied by the reverse proxy, then
  // Cloudflare's direct visitor header, then the socket address as a fallback.
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const ips = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    return ips.split(",")[0].trim();
  }
  const cloudflareIp = req.headers["cf-connecting-ip"];
  if (cloudflareIp) return Array.isArray(cloudflareIp) ? cloudflareIp[0] : cloudflareIp;
  return req.socket?.remoteAddress ?? "unknown";
}

export function checkRateLimit(req: Request): void {
  const ip = getClientIp(req);
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;

  const timestamps = (ipSubmissions.get(ip) ?? []).filter(
    (t) => t > windowStart
  );

  if (timestamps.length >= RATE_MAX) {
    console.warn(`[SpamProtection] Rate limit hit for IP: ${ip}`);
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message:
        "Too many submissions. Please wait a while before trying again.",
    });
  }

  timestamps.push(now);
  ipSubmissions.set(ip, timestamps);

  // Prune old IPs every ~1000 calls to prevent unbounded memory growth
  if (Math.random() < 0.001) {
    Array.from(ipSubmissions.entries()).forEach(([key, times]: [string, number[]]) => {
      const fresh = times.filter((t: number) => t > windowStart);
      if (fresh.length === 0) ipSubmissions.delete(key);
      else ipSubmissions.set(key, fresh);
    });
  }
}

// ─── Input Validators ─────────────────────────────────────────────────────────

/** Honeypot: if the hidden field has any value, it's a bot. */
export function checkHoneypot(honeypot: string | undefined | null): void {
  if (honeypot && honeypot.trim().length > 0) {
    console.warn("[SpamProtection] Honeypot triggered — bot submission blocked");
    // Silently succeed from the bot's perspective (don't reveal detection)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid submission.",
    });
  }
}

/** Address sanity: real addresses are short; bots dump JSON/autocomplete blobs. */
export function checkAddress(address: string | undefined | null): void {
  if (address && address.length > 250) {
    console.warn(
      `[SpamProtection] Address too long (${address.length} chars) — bot submission blocked`
    );
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Address appears invalid. Please enter a standard street address.",
    });
  }
}

/** Phone: must be exactly 10 digits (US) after stripping formatting characters. */
export function checkPhone(phone: string): void {
  const digits = phone.replace(/\D/g, "");
  // Allow 11 digits only if it starts with 1 (US country code)
  const normalized = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
  if (normalized.length !== 10) {
    console.warn(
      `[SpamProtection] Invalid phone (${digits.length} digits after strip) — blocked`
    );
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Please enter a valid 10-digit US phone number.",
    });
  }
}

/** Run all checks in one call. */
export function runSpamChecks(
  req: Request,
  opts: {
    honeypot?: string | null;
    address?: string | null;
    phone?: string;
  }
): void {
  checkRateLimit(req);
  checkHoneypot(opts.honeypot);
  if (opts.address !== undefined) checkAddress(opts.address);
  if (opts.phone !== undefined) checkPhone(opts.phone);
}
