import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { createSessionToken } from "./sdk";
import { ENV } from "./env";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

function getOrigin(req: Request): string {
  const proto = req.headers["x-forwarded-proto"] || (req.secure ? "https" : "http");
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  return `${proto}://${host}`;
}

export function registerOAuthRoutes(app: Express) {
  // Initiate Google OAuth flow
  app.get("/api/oauth/google", (req: Request, res: Response) => {
    const returnPath = getQueryParam(req, "return") || "/admin";
    const origin = getOrigin(req);

    // State encodes origin|returnPath for callback
    const state = Buffer.from(`${origin}|${returnPath}`).toString("base64url");

    const redirectUri = `${origin}/api/oauth/callback`;
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", ENV.googleOAuthClientId || "");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("prompt", "select_account");

    res.redirect(authUrl.toString());
  });

  // OAuth callback from Google
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      // Decode state to extract origin and return path
      let redirectTo = "/admin";
      let origin = getOrigin(req);
      try {
        const decoded = Buffer.from(state, "base64url").toString("utf8");
        const parts = decoded.split("|");
        if (parts.length >= 2 && parts[1].startsWith("/")) {
          redirectTo = parts[1];
        }
      } catch {
        // fallback
      }

      // Exchange code for tokens
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: ENV.googleOAuthClientId || "",
          client_secret: ENV.googleOAuthClientSecret || "",
          redirect_uri: `${origin}/api/oauth/callback`,
          grant_type: "authorization_code",
        }),
      });

      if (!tokenResponse.ok) {
        const error = await tokenResponse.text();
        console.error("[OAuth] Token exchange failed:", error);
        res.status(500).json({ error: "Failed to exchange code for tokens" });
        return;
      }

      const tokens = await tokenResponse.json() as { access_token: string };

      // Fetch user info
      const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });

      if (!userInfoResponse.ok) {
        console.error("[OAuth] Failed to fetch user info");
        res.status(500).json({ error: "Failed to fetch user info" });
        return;
      }

      const userInfo = await userInfoResponse.json() as {
        sub: string;
        email: string;
        email_verified: boolean;
        name?: string;
      };

      // Reject unverified emails
      if (!userInfo.email_verified) {
        res.status(403).json({ error: "Email not verified" });
        return;
      }

      // Check if email is in admin allowlist
      const adminEmails = ENV.adminEmails || ["josh@pellsolar.com"];
      if (!adminEmails.includes(userInfo.email)) {
        res.status(403).json({ error: "Access denied: not an admin user" });
        return;
      }

      // Upsert user to database
      const openId = `google:${userInfo.sub}`;
      await db.upsertUser({
        openId,
        name: userInfo.name || null,
        email: userInfo.email || null,
        loginMethod: "google",
        role: "admin",
        lastSignedIn: new Date(),
      });

      // Create session token
      const sessionToken = await createSessionToken(openId, {
        name: userInfo.name || userInfo.email,
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, redirectTo);
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
