// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import crypto5 from "crypto";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// drizzle/schema.ts
import { integer, pgEnum, pgTable, text, timestamp, varchar, serial } from "drizzle-orm/pg-core";
var website_roleEnum = pgEnum("website_role", ["user", "admin"]);
var website_ownershipTypeEnum = pgEnum("website_ownershipType", ["homeowner", "renter"]);
var website_propertyTypeEnum = pgEnum("website_propertyType", ["family_home", "apartment", "commercial"]);
var website_solarMotivationEnum = pgEnum("website_solarMotivation", ["price_stability", "reduce_bills", "all_electric", "other"]);
var website_paymentPreferenceEnum = pgEnum("website_paymentPreference", ["leasing", "financing", "cash"]);
var website_interestTypeEnum = pgEnum("website_interestType", ["solar", "battery", "solar_battery", "ev_charger", "other"]);
var website_leadStatusEnum = pgEnum("website_leadStatus", ["New", "Contacted", "Quoted", "Closed", "Lost"]);
var website_categoryEnum = pgEnum("website_category", ["solar", "battery", "ev-charging", "roofing", "other"]);
var website_chatSessionStatusEnum = pgEnum("website_chatSessionStatus", ["active", "closed", "missed"]);
var website_chatSenderEnum = pgEnum("website_chatSender", ["visitor", "admin"]);
var website_users = pgTable("website_users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: website_roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => /* @__PURE__ */ new Date()),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var website_leads = pgTable("website_leads", {
  id: serial("id").primaryKey(),
  // Contact info
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  address: text("address"),
  // Qualification
  ownershipType: website_ownershipTypeEnum("ownershipType").notNull(),
  propertyType: website_propertyTypeEnum("propertyType"),
  zipCode: varchar("zipCode", { length: 10 }),
  existingSolar: integer("existingSolar"),
  solarMotivation: website_solarMotivationEnum("solarMotivation"),
  paymentPreference: website_paymentPreferenceEnum("paymentPreference"),
  monthlyBillRange: varchar("monthlyBillRange", { length: 64 }),
  interestType: website_interestTypeEnum("interestType").notNull(),
  interestOtherText: text("interestOtherText"),
  // Bill upload
  billFileKey: text("billFileKey"),
  billFileUrl: text("billFileUrl"),
  billFileName: varchar("billFileName", { length: 256 }),
  // CRM
  status: website_leadStatusEnum("status").default("New").notNull(),
  source: varchar("source", { length: 64 }).default("homepage").notNull(),
  notes: text("notes"),
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => /* @__PURE__ */ new Date())
});
var website_projectPhotos = pgTable("website_project_photos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(),
  imageKey: text("imageKey"),
  category: website_categoryEnum("category").default("solar").notNull(),
  location: varchar("location", { length: 256 }),
  featured: integer("featured").default(0).notNull(),
  sortOrder: integer("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var website_unsubscribes = pgTable("website_unsubscribes", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  token: varchar("token", { length: 128 }).notNull().unique(),
  campaign: varchar("campaign", { length: 256 }),
  ipAddress: varchar("ipAddress", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var website_chatSettings = pgTable("website_chat_settings", {
  id: serial("id").primaryKey(),
  isOnline: integer("isOnline").default(0).notNull(),
  // 0 = offline, 1 = online
  offlineMessage: text("offlineMessage").default("We're currently offline. Leave your name and email and we'll get back to you shortly!"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => /* @__PURE__ */ new Date())
});
var website_chatSessions = pgTable("website_chat_sessions", {
  id: serial("id").primaryKey(),
  sessionToken: varchar("sessionToken", { length: 128 }).notNull().unique(),
  visitorName: varchar("visitorName", { length: 128 }),
  visitorEmail: varchar("visitorEmail", { length: 320 }),
  visitorPhone: varchar("visitorPhone", { length: 32 }),
  status: website_chatSessionStatusEnum("status").default("active").notNull(),
  smsSent: integer("smsSent").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => /* @__PURE__ */ new Date())
});
var website_chatMessages = pgTable("website_chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("sessionId").notNull(),
  sender: website_chatSenderEnum("sender").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var chatSettings = website_chatSettings;
var chatSessions = website_chatSessions;
var chatMessages = website_chatMessages;

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "pellsolar-website",
  cookieSecret: process.env.JWT_SECRET ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  // Google OAuth
  googleOAuthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
  googleOAuthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? "",
  adminEmails: (process.env.ADMIN_EMAILS ?? "josh@pellsolar.com").split(",").map((e) => e.trim()),
  // SendGrid Email
  sendgridApiKey: process.env.SENDGRID_API_KEY ?? "",
  ownerNotifyEmail: process.env.OWNER_NOTIFY_EMAIL ?? "josh@pellsolar.com",
  notifyFromEmail: process.env.NOTIFY_FROM_EMAIL ?? "info@pellsolar.com",
  // Twilio SMS
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? "",
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? "",
  twilioFromNumber: process.env.TWILIO_FROM_NUMBER ?? "",
  twilioNotifyNumber: process.env.TWILIO_NOTIFY_NUMBER ?? "",
  // Cloudflare R2 Storage
  r2AccountId: process.env.R2_ACCOUNT_ID ?? "",
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  r2Bucket: process.env.R2_BUCKET ?? "pellsolar-website",
  r2PublicBaseUrl: process.env.R2_PUBLIC_BASE_URL ?? "",
  // Google Maps API
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? "",
  // Anthropic AI
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? ""
};

// server/db.ts
var _db = null;
var _pool = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes("localhost") || process.env.DATABASE_URL.includes("127.0.0.1") ? void 0 : { rejectUnauthorized: false }
      });
      _db = drizzle(_pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _pool = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = { openId: user.openId };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) values.lastSignedIn = /* @__PURE__ */ new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    await db.insert(website_users).values(values).onConflictDoUpdate({
      target: website_users.openId,
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(website_users).where(eq(website_users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function createLead(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const conditions = [];
  if (data.phone) conditions.push(eq(website_leads.phone, data.phone));
  if (data.email) conditions.push(eq(website_leads.email, data.email));
  if (conditions.length > 0) {
    const { or } = await import("drizzle-orm");
    const existing = await db.select().from(website_leads).where(or(...conditions)).limit(1);
    if (existing.length > 0) {
      const existingLead = existing[0];
      const updateData = {};
      if (data.monthlyBillRange && !existingLead.monthlyBillRange) updateData.monthlyBillRange = data.monthlyBillRange;
      if (data.interestType && !existingLead.interestType) updateData.interestType = data.interestType;
      if (data.address && !existingLead.address) updateData.address = data.address;
      if (data.billFileKey && !existingLead.billFileKey) updateData.billFileKey = data.billFileKey;
      if (data.notes) updateData.notes = existingLead.notes ? `${existingLead.notes}
[Re-submitted ${(/* @__PURE__ */ new Date()).toISOString()}]` : `[Re-submitted ${(/* @__PURE__ */ new Date()).toISOString()}]`;
      if (Object.keys(updateData).length > 0) {
        await db.update(website_leads).set(updateData).where(eq(website_leads.id, existingLead.id));
      }
      return { id: existingLead.id, isDuplicate: true };
    }
  }
  const result = await db.insert(website_leads).values(data).returning({ id: website_leads.id });
  return { id: result[0].id, isDuplicate: false };
}
async function getLeads(filters) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (filters?.status) conditions.push(eq(website_leads.status, filters.status));
  if (filters?.source) conditions.push(eq(website_leads.source, filters.source));
  const query = conditions.length > 0 ? db.select().from(website_leads).where(and(...conditions)).orderBy(desc(website_leads.createdAt)) : db.select().from(website_leads).orderBy(desc(website_leads.createdAt));
  return query;
}
async function getLeadById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(website_leads).where(eq(website_leads.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function updateLeadStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(website_leads).set({ status }).where(eq(website_leads.id, id));
}
async function updateLeadNotes(id, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(website_leads).set({ notes }).where(eq(website_leads.id, id));
}
async function getLeadStats() {
  const db = await getDb();
  if (!db) return { total: 0, byStatus: {}, bySource: {} };
  const allLeads = await db.select().from(website_leads);
  const total = allLeads.length;
  const byStatus = {};
  const bySource = {};
  for (const lead of allLeads) {
    byStatus[lead.status] = (byStatus[lead.status] || 0) + 1;
    bySource[lead.source] = (bySource[lead.source] || 0) + 1;
  }
  return { total, byStatus, bySource };
}
async function getAllLeadsForExport() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(website_leads).orderBy(desc(website_leads.createdAt));
}
async function getProjectPhotos(category) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db.select().from(website_projectPhotos).where(eq(website_projectPhotos.category, category)).orderBy(website_projectPhotos.sortOrder, desc(website_projectPhotos.createdAt));
  }
  return db.select().from(website_projectPhotos).orderBy(website_projectPhotos.sortOrder, desc(website_projectPhotos.createdAt));
}
async function createProjectPhoto(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(website_projectPhotos).values(data).returning({ id: website_projectPhotos.id });
  return result[0].id;
}
async function deleteProjectPhoto(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(website_projectPhotos).where(eq(website_projectPhotos.id, id));
}
async function updateProjectPhoto(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(website_projectPhotos).set(data).where(eq(website_projectPhotos.id, id));
}
async function createUnsubscribe(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(website_unsubscribes).values(data).returning({ id: website_unsubscribes.id });
  return result[0].id;
}
async function getUnsubscribeByEmail(email) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(website_unsubscribes).where(eq(website_unsubscribes.email, email.toLowerCase())).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAllUnsubscribes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(website_unsubscribes).orderBy(desc(website_unsubscribes.createdAt));
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
function parseCookies(cookieHeader) {
  if (!cookieHeader) {
    return /* @__PURE__ */ new Map();
  }
  const parsed = parseCookieHeader(cookieHeader);
  return new Map(Object.entries(parsed));
}
function getSessionSecret() {
  const secret = ENV.cookieSecret;
  return new TextEncoder().encode(secret);
}
async function createSessionToken(openId, options = {}) {
  return signSession(
    {
      openId,
      appId: ENV.appId,
      name: options.name || ""
    },
    options
  );
}
async function signSession(payload, options = {}) {
  const issuedAt = Date.now();
  const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
  const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
  const secretKey = getSessionSecret();
  return new SignJWT({
    openId: payload.openId,
    appId: payload.appId,
    name: payload.name
  }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
}
async function verifySession(cookieValue) {
  if (!cookieValue) {
    console.warn("[Auth] Missing session cookie");
    return null;
  }
  try {
    const secretKey = getSessionSecret();
    const { payload } = await jwtVerify(cookieValue, secretKey, {
      algorithms: ["HS256"]
    });
    const { openId, appId, name } = payload;
    if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
      console.warn("[Auth] Session payload missing required fields");
      return null;
    }
    return {
      openId,
      appId,
      name
    };
  } catch (error) {
    console.warn("[Auth] Session verification failed", String(error));
    return null;
  }
}
async function authenticateRequest(req) {
  const cookies = parseCookies(req.headers.cookie);
  const sessionCookie = cookies.get(COOKIE_NAME);
  const session = await verifySession(sessionCookie);
  if (!session) {
    throw ForbiddenError("Invalid session cookie");
  }
  const sessionUserId = session.openId;
  const signedInAt = /* @__PURE__ */ new Date();
  const user = await getUserByOpenId(sessionUserId);
  if (!user) {
    throw ForbiddenError("User not found");
  }
  await upsertUser({
    openId: user.openId,
    lastSignedIn: signedInAt
  });
  return user;
}

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function getOrigin(req) {
  const proto = req.headers["x-forwarded-proto"] || (req.secure ? "https" : "http");
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  return `${proto}://${host}`;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/google", (req, res) => {
    const returnPath = getQueryParam(req, "return") || "/admin";
    const origin = getOrigin(req);
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
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      let redirectTo = "/admin";
      let origin = getOrigin(req);
      try {
        const decoded = Buffer.from(state, "base64url").toString("utf8");
        const parts = decoded.split("|");
        if (parts.length >= 2 && parts[1].startsWith("/")) {
          redirectTo = parts[1];
        }
      } catch {
      }
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: ENV.googleOAuthClientId || "",
          client_secret: ENV.googleOAuthClientSecret || "",
          redirect_uri: `${origin}/api/oauth/callback`,
          grant_type: "authorization_code"
        })
      });
      if (!tokenResponse.ok) {
        const error = await tokenResponse.text();
        console.error("[OAuth] Token exchange failed:", error);
        res.status(500).json({ error: "Failed to exchange code for tokens" });
        return;
      }
      const tokens = await tokenResponse.json();
      const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
      });
      if (!userInfoResponse.ok) {
        console.error("[OAuth] Failed to fetch user info");
        res.status(500).json({ error: "Failed to fetch user info" });
        return;
      }
      const userInfo = await userInfoResponse.json();
      if (!userInfo.email_verified) {
        res.status(403).json({ error: "Email not verified" });
        return;
      }
      const adminEmails = ENV.adminEmails || ["josh@pellsolar.com"];
      if (!adminEmails.includes(userInfo.email)) {
        res.status(403).json({ error: "Access denied: not an admin user" });
        return;
      }
      const openId = `google:${userInfo.sub}`;
      await upsertUser({
        openId,
        name: userInfo.name || null,
        email: userInfo.email || null,
        loginMethod: "google",
        role: "admin",
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await createSessionToken(openId, {
        name: userInfo.name || userInfo.email,
        expiresInMs: ONE_YEAR_MS
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

// server/storage.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
var _s3Client = null;
function getR2Client() {
  if (!_s3Client) {
    const accountId = ENV.r2AccountId;
    const accessKeyId = ENV.r2AccessKeyId;
    const secretAccessKey = ENV.r2SecretAccessKey;
    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error(
        "R2 config missing: set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY"
      );
    }
    _s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  }
  return _s3Client;
}
function normalizeKey(relKey) {
  return relKey.replace(/^\/+/, "");
}
function appendHashSuffix(relKey) {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}
async function storagePut(relKey, data, contentType = "application/octet-stream") {
  const client = getR2Client();
  const bucket = ENV.r2Bucket || "pellsolar-website";
  const key = appendHashSuffix(normalizeKey(relKey));
  const body = typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType
    })
  );
  return { key, url: `/manus-storage/${key}` };
}
async function storageGetSignedUrl(relKey, expiresInSeconds = 604800) {
  const client = getR2Client();
  const bucket = ENV.r2Bucket || "pellsolar-website";
  const key = normalizeKey(relKey);
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  });
  const signedUrl = await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds
  });
  return signedUrl;
}

// server/uploadRoute.ts
function registerUploadRoute(app) {
  app.post("/api/upload-bill", async (req, res) => {
    try {
      const { fileName, contentType, base64Data } = req.body;
      if (!fileName || !contentType || !base64Data) {
        res.status(400).json({ error: "Missing fileName, contentType, or base64Data" });
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/heic",
        "image/heif",
        "text/csv",
        "application/csv",
        "text/plain",
        "application/vnd.ms-excel",
        "application/octet-stream"
      ];
      if (!allowedTypes.includes(contentType)) {
        res.status(400).json({ error: "Invalid file type. Accepted: CSV, PDF, JPEG, PNG" });
        return;
      }
      const buffer = Buffer.from(base64Data, "base64");
      if (buffer.length > 10 * 1024 * 1024) {
        res.status(400).json({ error: "File too large. Maximum size is 10MB." });
        return;
      }
      const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const key = `bills/${Date.now()}-${safeFileName}`;
      const { key: storedKey, url } = await storagePut(key, buffer, contentType);
      let publicUrl = `https://pellsolar.com/manus-storage/${storedKey}`;
      try {
        const signedUrl = await storageGetSignedUrl(storedKey, 7 * 24 * 60 * 60);
        if (signedUrl) publicUrl = signedUrl;
      } catch (e) {
        console.warn("[UploadRoute] Could not generate presigned URL, using fallback:", e);
      }
      res.json({ success: true, key: storedKey, url, publicUrl });
    } catch (err) {
      console.error("[UploadRoute] Error:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  });
}

// server/unsubscribeRoute.ts
import crypto2 from "crypto";
function registerUnsubscribeRoute(app) {
  app.post("/api/unsubscribe/generate-token", (req, res) => {
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
    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1e3;
    const payload = `${email.toLowerCase()}|${expiresAt}|${campaign ?? ""}`;
    const signature = crypto2.createHmac("sha256", secret).update(payload).digest("hex");
    const token = `${Buffer.from(payload).toString("base64url")}.${signature}`;
    res.json({ token });
  });
}

// server/_core/storageProxy.ts
import path from "path";
import fs from "fs";
function registerStorageProxy(app) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (key.includes("..") || key.startsWith("/")) {
      res.status(400).send("Invalid storage key");
      return;
    }
    const localPath = path.resolve(process.cwd(), "dist", "public", "manus-storage", key);
    try {
      if (fs.existsSync(localPath)) {
        res.set("Cache-Control", "public, max-age=31536000, immutable");
        res.sendFile(localPath, (err) => {
          if (err) {
            console.error("[StorageProxy] sendFile error:", err);
            if (!res.headersSent) {
              res.status(404).send("File not found");
            }
          }
        });
        return;
      }
      if (process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY) {
        try {
          const signedUrl = await storageGetSignedUrl(key, 3600);
          res.set("Cache-Control", "no-store");
          res.redirect(307, signedUrl);
        } catch (err) {
          console.error("[StorageProxy] R2 fetch failed:", err);
          res.status(404).send("File not found");
        }
      } else {
        res.status(404).send("File not found");
      }
    } catch (err) {
      console.error("[StorageProxy] Unhandled error:", err);
      if (!res.headersSent) {
        res.status(500).send("Internal server error");
      }
    }
  });
}

// server/routers.ts
import { z as z3 } from "zod";

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }]
          }
        ],
        from: { email: from },
        subject: title,
        content: [
          {
            type: "text/plain",
            value: content
          }
        ]
      })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to send email (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling SendGrid:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
import { TRPCError as TRPCError5 } from "@trpc/server";

// server/_core/sms.ts
async function sendSms(to, body) {
  const { twilioAccountSid, twilioAuthToken, twilioFromNumber } = ENV;
  if (!twilioAccountSid || !twilioAuthToken || !twilioFromNumber) {
    console.warn("[SMS] Twilio credentials not configured \u2014 skipping SMS.");
    return false;
  }
  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
    const params = new URLSearchParams({
      To: to,
      From: twilioFromNumber,
      Body: body
    });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString("base64")
      },
      body: params.toString()
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

// server/_core/map.ts
function getMapsConfig() {
  const apiKey = ENV.googleMapsApiKey;
  if (!apiKey) {
    throw new Error(
      "Google Maps API key missing: set GOOGLE_MAPS_API_KEY"
    );
  }
  return { apiKey };
}
async function makeRequest(endpoint, params = {}, options = {}) {
  const { apiKey } = getMapsConfig();
  const url = new URL(`https://maps.googleapis.com${endpoint}`);
  url.searchParams.append("key", apiKey);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== void 0 && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });
  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: options.body ? JSON.stringify(options.body) : void 0
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google Maps API request failed (${response.status} ${response.statusText}): ${errorText}`
    );
  }
  return await response.json();
}

// server/googleReviews.ts
var cachedSummary = null;
var cacheExpiresAt = 0;
function toGoogleReviewSummary(result) {
  const candidate = result.results.find(
    (place) => place.name.toLowerCase().includes("pell solar") && place.rating !== void 0 && place.user_ratings_total !== void 0
  );
  if (!candidate || candidate.rating === void 0 || candidate.user_ratings_total === void 0) return null;
  return {
    provider: "Google",
    rating: candidate.rating,
    reviewCount: candidate.user_ratings_total,
    profileUrl: "https://www.google.com/search?q=Pell+Solar+reviews",
    fetchedAt: Date.now()
  };
}
async function getLiveGoogleReviewSummary() {
  if (cachedSummary && Date.now() < cacheExpiresAt) return cachedSummary;
  try {
    const result = await Promise.race([
      makeRequest("/maps/api/place/textsearch/json", {
        query: "Pell Solar 1326 Monte Vista Ave Upland CA 91786"
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Google review request timed out")), 4e3))
    ]);
    cachedSummary = toGoogleReviewSummary(result);
    cacheExpiresAt = Date.now() + 6 * 60 * 60 * 1e3;
    return cachedSummary;
  } catch (error) {
    console.warn("[Google reviews] Unable to refresh the live review summary", error);
    cacheExpiresAt = Date.now() + 15 * 60 * 1e3;
    return cachedSummary;
  }
}

// server/crmWebhook.ts
var CRM_WEBHOOK_URL = "https://pellsolar-crm-prod.onrender.com/api/webhooks/website-lead";
async function postToCrm(payload) {
  try {
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
      bill_file_url: payload.bill_file_url ? "[present]" : void 0
    }, null, 2));
    const res = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.status === 429) {
      console.warn("[CRM] Rate limited \u2014 will not retry");
      return { success: false, error: "rate_limited" };
    }
    const data = await res.json().catch(() => ({}));
    console.log("[CRM] Response status:", res.status, "body:", JSON.stringify(data));
    if (!res.ok) {
      console.error("[CRM] Webhook error:", res.status, data);
      return { success: false, error: `http_${res.status}` };
    }
    return data;
  } catch (err) {
    console.error("[CRM] Network error posting to CRM:", err);
    return { success: false, error: "network_error" };
  }
}

// server/routers/chat.ts
import { z as z2 } from "zod";
import { TRPCError as TRPCError3 } from "@trpc/server";
import { eq as eq2, desc as desc2, and as and2, gt } from "drizzle-orm";
import crypto3 from "crypto";
var adminProcedure2 = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});
var chatRouter = router({
  // Public: get chat status
  getStatus: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { isOnline: false, offlineMessage: "Chat unavailable" };
    const rows = await db.select().from(chatSettings).where(eq2(chatSettings.id, 1));
    const settings = rows[0];
    return {
      isOnline: settings ? settings.isOnline === 1 : false,
      offlineMessage: settings?.offlineMessage ?? "We're currently offline. Leave your name and email and we'll get back to you shortly!"
    };
  }),
  // Public: start a new chat session
  startSession: publicProcedure.input(z2.object({
    visitorName: z2.string().min(1).max(128).optional(),
    visitorEmail: z2.string().email().optional(),
    visitorPhone: z2.string().max(32).optional(),
    firstMessage: z2.string().min(1).max(2e3)
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
    const sessionToken = crypto3.randomBytes(32).toString("hex");
    await db.insert(chatSessions).values({
      sessionToken,
      visitorName: input.visitorName,
      visitorEmail: input.visitorEmail,
      visitorPhone: input.visitorPhone,
      status: "active",
      smsSent: 0
    });
    const rows = await db.select().from(chatSessions).where(eq2(chatSessions.sessionToken, sessionToken));
    const session = rows[0];
    await db.insert(chatMessages).values({
      sessionId: session.id,
      sender: "visitor",
      message: input.firstMessage
    });
    try {
      const name = input.visitorName || "Someone";
      const phoneStr = input.visitorPhone ? ` | Phone: ${input.visitorPhone}` : "";
      const emailStr = input.visitorEmail ? ` | Email: ${input.visitorEmail}` : "";
      const chatUrl = `https://pellsolar.com/admin/chat/${session.id}`;
      const chromeUrl = `googlechrome://pellsolar.com/admin/chat/${session.id}`;
      const smsBody = `NEW LIVE CHAT on pellsolar.com!
${name}${phoneStr}${emailStr}
Msg: "${input.firstMessage.slice(0, 100)}"
Reply (Chrome): ${chromeUrl}
Reply (Safari): ${chatUrl}`;
      await sendSms(ENV.twilioNotifyNumber || ENV.twilioFromNumber, smsBody);
      await db.update(chatSessions).set({ smsSent: 1 }).where(eq2(chatSessions.id, session.id));
    } catch (e) {
      console.error("[Chat] SMS failed:", e);
    }
    return { sessionToken, sessionId: session.id };
  }),
  // Public: send a message
  sendMessage: publicProcedure.input(z2.object({
    sessionToken: z2.string().length(64),
    message: z2.string().min(1).max(2e3)
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await db.select().from(chatSessions).where(eq2(chatSessions.sessionToken, input.sessionToken));
    const session = rows[0];
    if (!session) throw new TRPCError3({ code: "NOT_FOUND" });
    if (session.status === "closed") throw new TRPCError3({ code: "BAD_REQUEST", message: "Chat is closed" });
    await db.insert(chatMessages).values({
      sessionId: session.id,
      sender: "visitor",
      message: input.message
    });
    return { success: true };
  }),
  // Public: poll for messages
  getMessages: publicProcedure.input(z2.object({
    sessionToken: z2.string().length(64),
    afterId: z2.number().optional()
  })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await db.select().from(chatSessions).where(eq2(chatSessions.sessionToken, input.sessionToken));
    const session = rows[0];
    if (!session) throw new TRPCError3({ code: "NOT_FOUND" });
    const messages = input.afterId ? await db.select().from(chatMessages).where(and2(eq2(chatMessages.sessionId, session.id), gt(chatMessages.id, input.afterId))).orderBy(chatMessages.createdAt) : await db.select().from(chatMessages).where(eq2(chatMessages.sessionId, session.id)).orderBy(chatMessages.createdAt);
    return { messages, status: session.status };
  }),
  // Admin: toggle online/offline
  setOnlineStatus: adminProcedure2.input(z2.object({ isOnline: z2.boolean() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    await db.update(chatSettings).set({ isOnline: input.isOnline ? 1 : 0 }).where(eq2(chatSettings.id, 1));
    return { isOnline: input.isOnline };
  }),
  // Admin: list sessions
  getSessions: adminProcedure2.input(z2.object({ status: z2.enum(["active", "closed", "missed", "all"]).optional() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    const sessions = await db.select().from(chatSessions).orderBy(desc2(chatSessions.createdAt)).limit(100);
    if (input.status && input.status !== "all") {
      return sessions.filter((s) => s.status === input.status);
    }
    return sessions;
  }),
  // Admin: get session messages
  getSessionMessages: adminProcedure2.input(z2.object({ sessionId: z2.number() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await db.select().from(chatSessions).where(eq2(chatSessions.id, input.sessionId));
    const session = rows[0];
    if (!session) throw new TRPCError3({ code: "NOT_FOUND" });
    const messages = await db.select().from(chatMessages).where(eq2(chatMessages.sessionId, input.sessionId)).orderBy(chatMessages.createdAt);
    return { session, messages };
  }),
  // Admin: reply
  adminReply: adminProcedure2.input(z2.object({
    sessionId: z2.number(),
    message: z2.string().min(1).max(2e3)
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await db.select().from(chatSessions).where(eq2(chatSessions.id, input.sessionId));
    if (!rows[0]) throw new TRPCError3({ code: "NOT_FOUND" });
    await db.insert(chatMessages).values({
      sessionId: input.sessionId,
      sender: "admin",
      message: input.message
    });
    return { success: true };
  }),
  // Admin: close session
  closeSession: adminProcedure2.input(z2.object({ sessionId: z2.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    await db.update(chatSessions).set({ status: "closed" }).where(eq2(chatSessions.id, input.sessionId));
    return { success: true };
  })
});

// server/_core/llm.ts
import Anthropic from "@anthropic-ai/sdk";
var assertApiKey = () => {
  if (!ENV.anthropicApiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }
};
async function invokeLLM(params) {
  assertApiKey();
  const { messages, maxTokens, max_tokens } = params;
  const systemMessages = messages.filter((m) => m.role === "system");
  const nonSystemMessages = messages.filter((m) => m.role !== "system");
  const anthropicMessages = nonSystemMessages.map((msg) => {
    let content2;
    if (typeof msg.content === "string") {
      content2 = msg.content;
    } else if (Array.isArray(msg.content)) {
      content2 = msg.content.map((c) => typeof c === "string" ? c : "text" in c ? c.text : "").join("\n");
    } else {
      content2 = "text" in msg.content ? msg.content.text : "";
    }
    return {
      role: msg.role === "assistant" ? "assistant" : "user",
      content: content2
    };
  });
  const systemPrompt = systemMessages.map((m) => typeof m.content === "string" ? m.content : "").join("\n");
  const client = new Anthropic({
    apiKey: ENV.anthropicApiKey
  });
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: maxTokens || max_tokens || 1024,
    system: systemPrompt || void 0,
    messages: anthropicMessages
  });
  const content = response.content.length > 0 && "text" in response.content[0] ? response.content[0].text : "";
  return {
    id: response.id,
    created: Math.floor(Date.now() / 1e3),
    model: response.model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content
        },
        finish_reason: response.stop_reason || null
      }
    ],
    usage: {
      prompt_tokens: response.usage.input_tokens,
      completion_tokens: response.usage.output_tokens,
      total_tokens: response.usage.input_tokens + response.usage.output_tokens
    }
  };
}

// server/spamProtection.ts
import { TRPCError as TRPCError4 } from "@trpc/server";
var ipSubmissions = /* @__PURE__ */ new Map();
var RATE_WINDOW_MS = 60 * 60 * 1e3;
var RATE_MAX = 20;
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const ips = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    return ips.split(",")[0].trim();
  }
  return req.socket?.remoteAddress ?? "unknown";
}
function checkRateLimit(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const timestamps = (ipSubmissions.get(ip) ?? []).filter(
    (t2) => t2 > windowStart
  );
  if (timestamps.length >= RATE_MAX) {
    console.warn(`[SpamProtection] Rate limit hit for IP: ${ip}`);
    throw new TRPCError4({
      code: "TOO_MANY_REQUESTS",
      message: "Too many submissions. Please wait a while before trying again."
    });
  }
  timestamps.push(now);
  ipSubmissions.set(ip, timestamps);
  if (Math.random() < 1e-3) {
    Array.from(ipSubmissions.entries()).forEach(([key, times]) => {
      const fresh = times.filter((t2) => t2 > windowStart);
      if (fresh.length === 0) ipSubmissions.delete(key);
      else ipSubmissions.set(key, fresh);
    });
  }
}
function checkHoneypot(honeypot) {
  if (honeypot && honeypot.trim().length > 0) {
    console.warn("[SpamProtection] Honeypot triggered \u2014 bot submission blocked");
    throw new TRPCError4({
      code: "BAD_REQUEST",
      message: "Invalid submission."
    });
  }
}
function checkAddress(address) {
  if (address && address.length > 250) {
    console.warn(
      `[SpamProtection] Address too long (${address.length} chars) \u2014 bot submission blocked`
    );
    throw new TRPCError4({
      code: "BAD_REQUEST",
      message: "Address appears invalid. Please enter a standard street address."
    });
  }
}
function checkPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
  if (normalized.length !== 10) {
    console.warn(
      `[SpamProtection] Invalid phone (${digits.length} digits after strip) \u2014 blocked`
    );
    throw new TRPCError4({
      code: "BAD_REQUEST",
      message: "Please enter a valid 10-digit US phone number."
    });
  }
}
function runSpamChecks(req, opts) {
  checkRateLimit(req);
  checkHoneypot(opts.honeypot);
  if (opts.address !== void 0) checkAddress(opts.address);
  if (opts.phone !== void 0) checkPhone(opts.phone);
}

// shared/attribution.ts
function clean(value) {
  const trimmed = value?.trim();
  return trimmed || void 0;
}
function deriveLeadSource(defaultSource, attribution) {
  const gclid = clean(attribution?.gclid);
  const utmSource = clean(attribution?.utm_source);
  if (gclid || utmSource?.toLowerCase() === "google") return "google-ads";
  return utmSource || defaultSource;
}

// server/routers.ts
import crypto4 from "crypto";
var unsubRateLimit = /* @__PURE__ */ new Map();
var adminProcedure3 = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError5({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});
var UtmDataSchema = z3.object({
  utm_source: z3.string().optional(),
  utm_medium: z3.string().optional(),
  utm_campaign: z3.string().optional(),
  utm_content: z3.string().optional(),
  utm_term: z3.string().optional(),
  gclid: z3.string().optional()
}).optional();
var LeadStatusSchema = z3.enum(["New", "Contacted", "Quoted", "Closed", "Lost"]);
var LeadSourceSchema = z3.string().trim().min(1).max(64);
var CRM_BILL_LINK_EXPIRY_SECONDS = 7 * 24 * 60 * 60;
function isExternalBillUrl(url) {
  return Boolean(url?.startsWith("https://") && !url.includes("/manus-storage/"));
}
async function getCrmBillFileUrl(billFileKey, billFileUrl) {
  if (billFileKey) {
    try {
      return await storageGetSignedUrl(billFileKey, CRM_BILL_LINK_EXPIRY_SECONDS);
    } catch (error) {
      console.warn("[CRM] Could not create seven-day signed bill URL:", error);
    }
  }
  return isExternalBillUrl(billFileUrl) ? billFileUrl : void 0;
}
var CreateLeadSchema = z3.object({
  firstName: z3.string().min(1),
  lastName: z3.string().min(1),
  email: z3.string().email(),
  phone: z3.string().min(7),
  address: z3.string().optional(),
  ownershipType: z3.enum(["homeowner", "renter"]),
  propertyType: z3.enum(["family_home", "apartment", "commercial"]).optional(),
  zipCode: z3.string().optional(),
  existingSolar: z3.boolean().optional().transform((v) => v === void 0 ? void 0 : v ? 1 : 0),
  solarMotivation: z3.enum(["price_stability", "reduce_bills", "all_electric", "other"]).optional(),
  paymentPreference: z3.enum(["leasing", "financing", "cash"]).optional(),
  monthlyBillRange: z3.string().optional(),
  interestType: z3.enum(["solar", "battery", "solar_battery", "ev_charger", "other"]).default("solar"),
  interestOtherText: z3.string().optional(),
  city: z3.string().optional(),
  state: z3.string().optional(),
  zip: z3.string().optional(),
  billFileKey: z3.string().optional(),
  billFileUrl: z3.string().optional(),
  billFileName: z3.string().optional(),
  source: LeadSourceSchema.default("homepage"),
  utmData: UtmDataSchema,
  // Honeypot — must be empty; bots fill this in
  _hp: z3.string().optional()
});
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  reviewSummary: router({
    google: publicProcedure.query(() => getLiveGoogleReviewSummary())
  }),
  // ─── Lead procedures ───────────────────────────────────────────────────────
  leads: router({
    // Public: submit a new lead
    create: publicProcedure.input(CreateLeadSchema).mutation(async ({ input, ctx }) => {
      runSpamChecks(ctx.req, {
        honeypot: input._hp,
        address: input.address,
        phone: input.phone
      });
      const source = deriveLeadSource(input.source, input.utmData);
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
        notes: input.interestType === "other" && input.interestOtherText ? input.interestOtherText : void 0
      });
      const crmBillFileUrl = await getCrmBillFileUrl(input.billFileKey, input.billFileUrl);
      if (!isDuplicate) {
        try {
          await notifyOwner({
            title: "\u{1F31E} New Solar Lead",
            content: `New lead from ${input.firstName} ${input.lastName} (${input.email}) via ${source}. Monthly bill: ${input.monthlyBillRange ?? "not specified"}. Interest: ${input.interestType}.`
          });
        } catch (e) {
          console.warn("[Notification] Failed to notify owner:", e);
        }
        if (ENV.twilioNotifyNumber) {
          const interestLabel = {
            solar: "Solar Only",
            battery: "Battery Only",
            solar_battery: "Solar + Battery",
            ev_charger: "EV Charger",
            other: "Other / Not Sure"
          };
          const interestDisplay = interestLabel[input.interestType] ?? input.interestType;
          const cleanPhone = input.phone.replace(/\D/g, "");
          const formattedPhone = cleanPhone.length === 10 ? `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}` : input.phone;
          const billLink = crmBillFileUrl || null;
          const smsBody = [
            `\u{1F31E} NEW PELL SOLAR LEAD`,
            `Name: ${input.firstName} ${input.lastName}`,
            `Phone: ${formattedPhone}`,
            `Call: +1${cleanPhone}`,
            `Email: ${input.email}`,
            input.address ? `Address: ${input.address}` : "",
            `Interest: ${interestDisplay}`,
            input.ownershipType ? `Ownership: ${input.ownershipType}` : "",
            input.monthlyBillRange ? `Monthly Bill: $${input.monthlyBillRange}` : "",
            input.interestOtherText ? `Notes: ${input.interestOtherText}` : "",
            input.ownershipType === "renter" ? `\u26A0\uFE0F Renter (not homeowner)` : "",
            billLink ? `Bill file: ${billLink}` : "",
            `CRM: https://pellsolar.com/admin/leads/${id}`,
            `Source: ${source}`
          ].filter(Boolean).join("\n");
          sendSms(ENV.twilioNotifyNumber, smsBody).catch(
            (e) => console.warn("[SMS] Lead notification failed:", e)
          );
        }
      }
      let crmDealId;
      try {
        const monthlyBillNum = input.monthlyBillRange ? parseInt(input.monthlyBillRange.replace(/[^0-9]/g, ""), 10) || void 0 : void 0;
        const crmRes = await postToCrm({
          first_name: input.firstName,
          last_name: input.lastName,
          email: input.email || void 0,
          phone: input.phone || void 0,
          address: input.address || void 0,
          city: input.city || void 0,
          state: input.state || void 0,
          zip: input.zipCode || input.zip || void 0,
          // Third-party CRM servers require a directly downloadable signed S3 URL.
          // Never send a browser-session-bound /manus-storage path.
          bill_file_url: crmBillFileUrl,
          bill_file_name: input.billFileName || void 0,
          type: "new_lead",
          source,
          // Individual qualification fields
          property_type: input.propertyType || void 0,
          existing_solar: input.existingSolar !== void 0 ? input.existingSolar === 1 : void 0,
          solar_motivation: input.solarMotivation || void 0,
          payment_preference: input.paymentPreference || void 0,
          monthly_bill: monthlyBillNum,
          interest: input.interestType || void 0,
          utm_data: input.utmData,
          // notes carries free-text when interest is 'other'
          notes: input.interestType === "other" && input.interestOtherText ? input.interestOtherText : void 0
        });
        if (crmRes.deal_id) crmDealId = crmRes.deal_id;
      } catch (e) {
        console.warn("[CRM] postToCrm failed in leads.create:", e);
      }
      return { success: true, id, isDuplicate, dealId: crmDealId };
    }),
    // Public: get a signed upload URL for bill files
    getBillUploadUrl: publicProcedure.input(z3.object({ fileName: z3.string(), contentType: z3.string() })).mutation(async ({ input }) => {
      const key = `bills/${Date.now()}-${input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      return { key, uploadPath: `/api/upload-bill` };
    }),
    // Admin: list all leads with optional filters
    list: adminProcedure3.input(z3.object({
      status: LeadStatusSchema.optional(),
      source: LeadSourceSchema.optional()
    }).optional()).query(async ({ input }) => {
      return getLeads(input);
    }),
    // Admin: get a single lead
    getById: adminProcedure3.input(z3.object({ id: z3.number() })).query(async ({ input }) => {
      const lead = await getLeadById(input.id);
      if (!lead) throw new TRPCError5({ code: "NOT_FOUND", message: "Lead not found" });
      return lead;
    }),
    // Admin: update lead status
    updateStatus: adminProcedure3.input(z3.object({ id: z3.number(), status: LeadStatusSchema })).mutation(async ({ input }) => {
      await updateLeadStatus(input.id, input.status);
      return { success: true };
    }),
    // Admin: update lead notes
    updateNotes: adminProcedure3.input(z3.object({ id: z3.number(), notes: z3.string() })).mutation(async ({ input }) => {
      await updateLeadNotes(input.id, input.notes);
      return { success: true };
    }),
    // Admin: pipeline stats
    stats: adminProcedure3.query(async () => {
      return getLeadStats();
    }),
    // Admin: export all leads as JSON (client converts to CSV)
    export: adminProcedure3.query(async () => {
      return getAllLeadsForExport();
    })
  }),
  // ─── CRM integration ────────────────────────────────────────────────────────
  crm: router({
    // Public: submit a new solar lead to the CRM
    submitLead: publicProcedure.input(z3.object({
      first_name: z3.string().min(1),
      last_name: z3.string().min(1),
      email: z3.string().optional(),
      phone: z3.string().optional(),
      address: z3.string().optional(),
      city: z3.string().optional(),
      state: z3.string().optional(),
      zip: z3.string().optional(),
      type: z3.enum(["new_lead", "service_call"]).default("new_lead"),
      issue_description: z3.string().optional(),
      source: z3.string().optional(),
      notes: z3.string().optional(),
      utm_data: UtmDataSchema,
      // Honeypot — must be empty; bots fill this in
      _hp: z3.string().optional()
    })).mutation(async ({ input, ctx }) => {
      runSpamChecks(ctx.req, {
        honeypot: input._hp,
        address: input.address,
        phone: input.phone
      });
      const result = await postToCrm(input);
      if (!result.success) {
        console.warn("[CRM] Lead sync failed:", result.error);
      }
      if (ENV.twilioNotifyNumber && input.type === "new_lead") {
        const phone = input.phone ?? "";
        const cleanPhone2 = phone.replace(/\D/g, "");
        const formattedPhone2 = cleanPhone2.length === 10 ? `(${cleanPhone2.slice(0, 3)}) ${cleanPhone2.slice(3, 6)}-${cleanPhone2.slice(6)}` : phone;
        const smsBody = [
          `\u{1F31E} NEW PELL SOLAR LEAD`,
          `Name: ${input.first_name} ${input.last_name}`,
          phone ? `Phone: ${formattedPhone2}` : "",
          phone ? `Call: +1${cleanPhone2}` : "",
          input.email ? `Email: ${input.email}` : "",
          input.address ? `Address: ${[input.address, input.city, input.state, input.zip].filter(Boolean).join(", ")}` : "",
          input.notes ? `Notes: ${input.notes}` : "",
          `Source: ${input.source ?? "website"}`
        ].filter(Boolean).join("\n");
        sendSms(ENV.twilioNotifyNumber, smsBody).catch(
          (e) => console.warn("[SMS] CRM lead notification failed:", e)
        );
      }
      return result;
    })
  }),
  // ─── Service Call procedures ─────────────────────────────────────────────
  service: router({
    diagnose: publicProcedure.input(z3.object({
      systemType: z3.string(),
      inverterBrand: z3.string(),
      batteryBrand: z3.string(),
      systemAge: z3.string(),
      selectedIssues: z3.array(z3.string()),
      duration: z3.string(),
      description: z3.string()
    })).mutation(async ({ input }) => {
      const issueList = input.selectedIssues.join(", ") || "unspecified issue";
      const brandGuidance = {
        "SolarEdge": "This is a SolarEdge system. Use SolarEdge-specific terminology: power optimizers (P-series or S-series), HD-Wave inverter, StorEdge, mySolarEdge app or SolarEdge monitoring portal. Error codes appear on the inverter LED or in the monitoring portal. Common fixes: check optimizer pairing in the portal, verify DC disconnect is on, look up the specific error code in the mySolarEdge app.",
        "Enphase": "This is an Enphase microinverter system. Use Enphase-specific terminology: IQ microinverters (IQ7, IQ8), IQ Gateway (formerly Envoy), Enlighten app, IQ Battery (formerly Encharge). Each panel has its own microinverter. Common fixes: check Enlighten app for individual panel status, verify IQ Gateway is connected to WiFi, check for IQ8 or IQ7 error indicators in the app.",
        "Tesla / SolarCity": "This is a Tesla/SolarCity system. Use Tesla-specific terminology: Tesla Solar Inverter, Powerwall (if battery present), Tesla app. Common fixes: check Tesla app for alerts and system status, verify gateway is online, check breaker panel for the Tesla Solar Inverter breaker.",
        "SMA": "This is an SMA inverter system. Use SMA-specific terminology: Sunny Boy (string inverter), Sunny Tripower, SMA Sunny Portal, SMA Energy app. Common fixes: check Sunny Portal event log, verify AC/DC disconnects are on, check for red/yellow LED status codes on the inverter display.",
        "Fronius": "This is a Fronius inverter system. Use Fronius-specific terminology: Fronius Primo or Symo inverter, Fronius Solar.web monitoring portal, Fronius Smart Meter. Common fixes: check Solar.web for state codes, verify AC disconnect is on, check the inverter display for error state numbers.",
        "SunPower": "This is a SunPower system. Use SunPower-specific terminology: SunPower Equinox system, SunPower monitoring app, AC modules or SunPower inverter. Common fixes: check SunPower monitoring app for alerts, verify system is communicating, contact SunPower support for warranty-related issues."
      };
      const brandNote = brandGuidance[input.inverterBrand] || (input.inverterBrand && input.inverterBrand !== "Don't Know" ? `This system uses a ${input.inverterBrand} inverter. Use terminology and troubleshooting steps specific to that brand.` : "");
      const prompt = `You are a solar system diagnostic expert for Pell Solar, a Tesla Certified Installer based in Southern California. A customer has submitted the following service request:

System Type: ${input.systemType || "Unknown"}
Inverter/System Brand: ${input.inverterBrand || "Unknown"}
Battery Brand: ${input.batteryBrand || "None"}
System Age: ${input.systemAge || "Unknown"}
Issues Selected: ${issueList}
Duration: ${input.duration || "Unknown"}
Customer Description: ${input.description || "None provided"}
${brandNote ? `
Brand-Specific Context: ${brandNote}` : ""}
Provide a helpful, accurate diagnostic response. Use the exact brand-specific app names, component names, and error code terminology for their system. Never use generic terms like "phase" or "string" if the brand has specific names for those components. If the issue can be resolved by the customer (like checking the monitoring app, resetting a breaker, or cleaning panels), explain the exact steps for their brand. If it requires a technician visit (roof leak, physical damage, inverter failure, battery not backing up during outage), clearly state that and reassure them the Pell Solar team will follow up. Keep the response under 200 words and use plain language.`;
      const result = await invokeLLM({
        messages: [
          { role: "system", content: "You are a helpful solar system diagnostic assistant for Pell Solar." },
          { role: "user", content: prompt }
        ]
      });
      const diagnosis = result.choices?.[0]?.message?.content ?? "We were unable to generate a diagnostic at this time. Please submit your service request and our team will contact you shortly.";
      return { diagnosis };
    }),
    submitCall: publicProcedure.input(z3.object({
      firstName: z3.string().min(1),
      lastName: z3.string(),
      phone: z3.string().min(7),
      email: z3.string().optional(),
      address: z3.string().optional(),
      systemType: z3.string().optional(),
      inverterBrand: z3.string().optional(),
      batteryBrand: z3.string().optional(),
      systemAge: z3.string().optional(),
      selectedIssues: z3.array(z3.string()).optional(),
      duration: z3.string().optional(),
      description: z3.string().optional(),
      aiDiagnosis: z3.string().optional(),
      // Honeypot — must be empty; bots fill this in
      _hp: z3.string().optional()
    })).mutation(async ({ input, ctx }) => {
      runSpamChecks(ctx.req, {
        honeypot: input._hp,
        address: input.address,
        phone: input.phone
      });
      const issuesSummary = (input.selectedIssues ?? []).join(", ");
      const notes = [
        input.systemType ? `System: ${input.systemType}` : "",
        input.inverterBrand ? `Inverter: ${input.inverterBrand}` : "",
        input.batteryBrand && input.batteryBrand !== "No Battery" ? `Battery: ${input.batteryBrand}` : "",
        input.systemAge ? `Age: ${input.systemAge}` : "",
        issuesSummary ? `Issues: ${issuesSummary}` : "",
        input.duration ? `Duration: ${input.duration}` : "",
        input.description ? `Notes: ${input.description}` : ""
      ].filter(Boolean).join(" | ");
      const crmPayload = {
        first_name: input.firstName,
        last_name: input.lastName || "",
        phone: input.phone,
        email: input.email || "",
        address: input.address || "",
        type: "service_call",
        issue_description: input.description || issuesSummary || "Service request",
        notes,
        source: "website"
      };
      let customerExists = false;
      try {
        const checkParams = new URLSearchParams();
        if (input.phone) checkParams.set("phone", input.phone.replace(/\D/g, ""));
        if (input.email) checkParams.set("email", input.email);
        const checkRes = await fetch(`https://pellsolar-crm-prod.onrender.com/api/check-customer?${checkParams.toString()}`);
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          customerExists = !!checkData.exists;
        }
      } catch (e) {
        console.warn("[CRM] Pre-check failed, proceeding with webhook:", e);
      }
      const techBrief = [
        `SERVICE TECH BRIEF`,
        `------------------`,
        `Customer: ${input.firstName} ${input.lastName || ""} | ${input.phone}`,
        input.email ? `Email: ${input.email}` : "",
        input.address ? `Address: ${input.address}` : "",
        `System: ${[input.systemType, input.inverterBrand ? `Inverter: ${input.inverterBrand}` : "", input.batteryBrand && input.batteryBrand !== "No Battery" ? `Battery: ${input.batteryBrand}` : "", input.systemAge ? `Age: ${input.systemAge}` : ""].filter(Boolean).join(" | ")}`,
        issuesSummary ? `Issues Reported: ${issuesSummary}` : "",
        input.duration ? `Duration: ${input.duration}` : "",
        input.description ? `Customer Description: "${input.description}"` : "",
        input.aiDiagnosis ? `AI Diagnostic: ${input.aiDiagnosis}` : ""
      ].filter(Boolean).join("\n");
      let crmResult = { success: false };
      try {
        const servicePayload = {
          name: `${input.firstName} ${input.lastName || ""}`.trim(),
          email: input.email || "",
          phone: input.phone.replace(/\D/g, ""),
          address: input.address || "",
          serviceType: (input.selectedIssues ?? []).length > 0 ? "repair" : "other",
          problemDescription: input.description || (input.selectedIssues ?? []).join(", ") || "Service request",
          preferredDate: "",
          preferredTime: "",
          source: "website-service-form",
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
          aiDiagnostic: input.aiDiagnosis || ""
        };
        const res = await fetch("https://pellsolar-crm-prod.onrender.com/api/webhooks/service-intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(servicePayload)
        });
        crmResult = await res.json().catch(() => ({ success: res.ok }));
      } catch (e) {
        console.error("[CRM] Service intake webhook failed:", e);
      }
      if (ENV.twilioNotifyNumber) {
        const phone = input.phone ?? "";
        const cleanPhone3 = phone.replace(/\D/g, "");
        const formattedPhone3 = cleanPhone3.length === 10 ? `(${cleanPhone3.slice(0, 3)}) ${cleanPhone3.slice(3, 6)}-${cleanPhone3.slice(6)}` : phone;
        const issuesSummary2 = (input.selectedIssues ?? []).join(", ");
        const smsBody = [
          `\u{1F527} PELL SOLAR SERVICE CALL`,
          `Name: ${input.firstName} ${input.lastName || ""}`.trim(),
          phone ? `Phone: ${formattedPhone3}` : "",
          phone ? `Call: +1${cleanPhone3}` : "",
          input.email ? `Email: ${input.email}` : "",
          input.address ? `Address: ${input.address}` : "",
          input.systemType ? `System: ${input.systemType}` : "",
          input.inverterBrand ? `Inverter: ${input.inverterBrand}` : "",
          input.batteryBrand && input.batteryBrand !== "No Battery" ? `Battery: ${input.batteryBrand}` : "",
          input.systemAge ? `Age: ${input.systemAge}` : "",
          issuesSummary2 ? `Issues: ${issuesSummary2}` : "",
          input.duration ? `Duration: ${input.duration}` : "",
          input.description ? `Notes: ${input.description}` : ""
        ].filter(Boolean).join("\n");
        sendSms(ENV.twilioNotifyNumber, smsBody).catch(
          (e) => console.warn("[SMS] Service call notification failed:", e)
        );
      }
      return { success: true, crm: crmResult, customerExists };
    })
  }),
  // ─── Project Photos procedures ──────────────────────────────────────────
  photos: router({
    list: publicProcedure.input(z3.object({ category: z3.enum(["solar", "battery", "ev-charging", "roofing", "other"]).optional() })).query(async ({ input }) => {
      return getProjectPhotos(input.category);
    }),
    upload: adminProcedure3.input(z3.object({
      title: z3.string().min(1),
      description: z3.string().optional(),
      imageData: z3.string(),
      // base64
      mimeType: z3.string().default("image/jpeg"),
      category: z3.enum(["solar", "battery", "ev-charging", "roofing", "other"]).default("solar"),
      location: z3.string().optional(),
      featured: z3.boolean().default(false)
    })).mutation(async ({ input }) => {
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
        sortOrder: 0
      });
      return { id, url };
    }),
    delete: adminProcedure3.input(z3.object({ id: z3.number() })).mutation(async ({ input }) => {
      await deleteProjectPhoto(input.id);
      return { success: true };
    }),
    update: adminProcedure3.input(z3.object({
      id: z3.number(),
      title: z3.string().optional(),
      description: z3.string().optional(),
      category: z3.enum(["solar", "battery", "ev-charging", "roofing", "other"]).optional(),
      location: z3.string().optional(),
      featured: z3.boolean().optional(),
      sortOrder: z3.number().optional()
    })).mutation(async ({ input }) => {
      const { id, featured, ...rest } = input;
      const data = { ...rest };
      if (featured !== void 0) data.featured = featured ? 1 : 0;
      await updateProjectPhoto(id, data);
      return { success: true };
    })
  }),
  // ─── Unsubscribe procedures ───────────────────────────────────────────────
  unsubscribe: router({
    // Generate a signed token for a given email + campaign
    generateToken: publicProcedure.input(z3.object({
      email: z3.string().email(),
      campaign: z3.string().optional()
    })).mutation(async ({ input }) => {
      const secret = ENV.jwtSecret || ENV.cookieSecret;
      const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1e3;
      const payload = `${input.email}|${expiresAt}|${input.campaign ?? ""}`;
      const signature = crypto4.createHmac("sha256", secret).update(payload).digest("hex");
      const token = `${Buffer.from(payload).toString("base64url")}.${signature}`;
      return { token };
    }),
    // Process an unsubscribe request: verify token, save to DB, call SendGrid
    process: publicProcedure.input(z3.object({
      email: z3.string().email(),
      token: z3.string()
    })).mutation(async ({ input, ctx }) => {
      const ip = ctx.req?.ip || ctx.req?.headers?.["x-forwarded-for"] || "unknown";
      const now = Date.now();
      const windowMs = 60 * 60 * 1e3;
      const key = `unsub:${ip}`;
      if (!unsubRateLimit.has(key)) unsubRateLimit.set(key, []);
      const timestamps = unsubRateLimit.get(key).filter((t2) => now - t2 < windowMs);
      if (timestamps.length >= 5) {
        throw new TRPCError5({ code: "TOO_MANY_REQUESTS", message: "Too many requests. Please try again later." });
      }
      timestamps.push(now);
      unsubRateLimit.set(key, timestamps);
      const secret = ENV.jwtSecret || ENV.cookieSecret;
      const parts = input.token.split(".");
      if (parts.length !== 2) {
        throw new TRPCError5({ code: "BAD_REQUEST", message: "Invalid unsubscribe link." });
      }
      let payload;
      try {
        payload = Buffer.from(parts[0], "base64url").toString("utf8");
      } catch {
        throw new TRPCError5({ code: "BAD_REQUEST", message: "Invalid unsubscribe link." });
      }
      const expectedSig = crypto4.createHmac("sha256", secret).update(payload).digest("hex");
      if (expectedSig !== parts[1]) {
        throw new TRPCError5({ code: "BAD_REQUEST", message: "Invalid unsubscribe link." });
      }
      const [tokenEmail, expiresAtStr, campaign] = payload.split("|");
      if (tokenEmail.toLowerCase() !== input.email.toLowerCase()) {
        throw new TRPCError5({ code: "BAD_REQUEST", message: "Email mismatch." });
      }
      if (Date.now() > parseInt(expiresAtStr, 10)) {
        throw new TRPCError5({ code: "BAD_REQUEST", message: "This unsubscribe link has expired. Please contact us at info@pellsolar.com." });
      }
      const existing = await getUnsubscribeByEmail(input.email);
      if (existing) {
        return { success: true, alreadyUnsubscribed: true };
      }
      await createUnsubscribe({
        email: input.email.toLowerCase(),
        token: input.token.slice(0, 128),
        campaign: campaign || null,
        ipAddress: String(ip).slice(0, 64)
      });
      if (ENV.sendgridApiKey) {
        try {
          const sgRes = await fetch(
            "https://api.sendgrid.com/v3/asm/groups/35533/suppressions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${ENV.sendgridApiKey}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ recipient_emails: [input.email.toLowerCase()] })
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
    list: adminProcedure3.query(async () => {
      return getAllUnsubscribes();
    })
  }),
  // ─── Live Chat ────────────────────────────────────────────────────────────
  chat: chatRouter,
  // ─── Geo procedures ────────────────────────────────────────────────────────
  geo: router({
    geocodeZip: publicProcedure.input(z3.object({ zip: z3.string().length(5) })).query(async ({ input }) => {
      try {
        const result = await makeRequest("/maps/api/geocode/json", {
          address: `${input.zip}, USA`
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
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs2 from "fs";
import { nanoid } from "nanoid";
import path3 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path2 from "node:path";
import { defineConfig } from "vite";
var plugins = [react(), tailwindcss(), jsxLocPlugin()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path2.resolve(import.meta.dirname),
  root: path2.resolve(import.meta.dirname, "client"),
  publicDir: path2.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
import superjson2 from "superjson";

// shared/seo.ts
var SITE_NAME = "Pell Solar";
var CANONICAL_ORIGIN = "https://pellsolar.com";

// shared/localBusiness.ts
var LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "SolarEnergyContractor",
  "@id": `${CANONICAL_ORIGIN}/#localbusiness`,
  name: "Pell Solar",
  legalName: "Pell Solar Inc.",
  url: `${CANONICAL_ORIGIN}/`,
  logo: `${CANONICAL_ORIGIN}/manus-storage/pell-logo-yellow_77e86543.png`,
  image: `${CANONICAL_ORIGIN}/manus-storage/solar-home-main-v2_0ad97127.jpg`,
  description: "Pell Solar designs and installs residential solar panels, home batteries, EV charging, and solar service solutions for Southern California and Treasure Valley homeowners.",
  telephone: "+1-866-646-8499",
  email: "info@pellsolar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1326 Monte Vista Ave #7",
    addressLocality: "Upland",
    addressRegion: "CA",
    postalCode: "91786",
    addressCountry: "US"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00"
    }
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Southern California" },
    { "@type": "AdministrativeArea", name: "Treasure Valley, Idaho" }
  ],
  serviceType: [
    "Residential solar panel installation",
    "Home battery installation",
    "EV charger installation",
    "Solar repair and service"
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "California Contractor License",
    identifier: "CSLB #949122"
  },
  sameAs: [
    "https://www.yelp.com/biz/pell-solar-ontario",
    "https://www.facebook.com/pellsolar/",
    "https://www.youtube.com/@PellSolar"
  ]
};
function getLocalBusinessJsonLd() {
  return JSON.stringify(LOCAL_BUSINESS).replace(/</g, "\\u003c");
}

// server/_core/vite.ts
var escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
function buildHeadTags(head, nonce) {
  const title = escapeHtml(head.title);
  const description = escapeHtml(head.description);
  const canonical = head.canonicalPath ? `${CANONICAL_ORIGIN}${head.canonicalPath}` : "";
  const image = head.ogImage ? head.ogImage.startsWith("http") ? head.ogImage : `${CANONICAL_ORIGIN}${head.ogImage}` : "";
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:type" content="${head.ogType ?? "website"}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`
  ];
  if (canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`);
    tags.push(`<meta property="og:url" content="${escapeHtml(canonical)}" />`);
  }
  if (image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(image)}" />`);
    tags.push(`<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  }
  if (!head.noindex && !head.notFound) {
    tags.push(`<script nonce="${nonce}" type="application/ld+json">${getLocalBusinessJsonLd()}</script>`);
  }
  if (head.noindex || head.notFound) tags.push(`<meta name="robots" content="noindex, follow" />`);
  return tags.join("\n");
}
function composeHtml(template, appHtml, head, dehydratedState, nonce = "") {
  const serialized = JSON.stringify(superjson2.serialize(dehydratedState)).replace(/</g, "\\u003c");
  return template.replaceAll("%CSP_NONCE%", nonce).replace("</body>", () => `<script nonce="${nonce}">window.__RQ_STATE__ = ${serialized}</script></body>`).replace("<!--app-head-->", () => buildHeadTags(head, nonce)).replace("<!--app-html-->", () => appHtml);
}
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/entry-client.tsx"`,
        `src="/src/entry-client.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const { html, dehydratedState, head } = await render(url);
      res.status(head.notFound ? 404 : 200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).end(composeHtml(page, html, head, dehydratedState, res.locals.cspNonce ?? ""));
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path3.resolve(import.meta.dirname, "../..", "dist", "public") : path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use((req, res, next) => {
    if (req.path === "/index.html") return res.redirect(301, "/");
    if (req.path !== "/" && /\/+$/.test(req.path)) {
      const query = req.originalUrl.slice(req.path.length);
      return res.redirect(301, (req.path.replace(/\/+$/, "") || "/") + query);
    }
    next();
  });
  app.use(express.static(distPath, { index: false, redirect: false }));
  app.use("*", async (req, res) => {
    const templatePath = path3.resolve(distPath, "index.html");
    try {
      const template = await fs2.promises.readFile(templatePath, "utf-8");
      const serverEntryPath = path3.resolve(import.meta.dirname, "server-ssr", "entry-server.js");
      const { render } = await import(serverEntryPath);
      const { html, dehydratedState, head } = await render(req.originalUrl);
      res.status(head.notFound ? 404 : 200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).end(composeHtml(template, html, head, dehydratedState, res.locals.cspNonce ?? ""));
    } catch (error) {
      console.error("[SSR] render failed; serving client shell", error);
      const template = await fs2.promises.readFile(templatePath, "utf-8");
      const fallback = { title: SITE_NAME, description: "Pell Solar solar and battery installation." };
      res.status(200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).end(
        template.replaceAll("%CSP_NONCE%", res.locals.cspNonce ?? "").replace("<!--app-head-->", () => buildHeadTags(fallback, res.locals.cspNonce ?? ""))
      );
    }
  });
}

// server/redirects.ts
import { Router } from "express";
var router2 = Router();
var redirectMap = {
  // Service pages
  "/solar": "/solar-panel-systems",
  // "/solar-panel-systems" intentionally omitted — it's a real page, no redirect needed
  "/powerwall": "/tesla-powerwall",
  "/tesla-installer": "/tesla-powerwall",
  // "/battery-backup" intentionally omitted — it's a real page, no redirect needed
  "/solar-backup": "/battery-backup",
  "/california-solar-batteries-backup": "/battery-backup",
  // "/ev-charging" intentionally omitted — it's a real page, no redirect needed
  // "/financing" intentionally omitted — it's a real page, no redirect needed
  "/financing-2": "/financing/",
  "/california-bundles": "/financing/",
  // "/solar-lease" intentionally omitted — it's a real page, no redirect needed
  // "/solar-repair" intentionally omitted — it's a real page, no redirect needed
  "/service-request": "/solar-repair",
  "/service": "/solar-repair",
  "/california-solar-services": "/solar-repair",
  // "/nem-3" intentionally omitted — it's a real page, no redirect needed
  // Company pages
  "/about-us": "/about",
  // "/about" intentionally omitted — it's a real page, no redirect needed
  "/customer-reviews": "/reviews",
  // "/our-work" intentionally omitted — it's a real page, no redirect needed
  "/schedule-call": "/schedule",
  "/news": "/blog",
  // Location pages
  // "/california" intentionally omitted — it's a real page, no redirect needed
  "/california-installation": "/california",
  "/california-old": "/california",
  "/solar-panel-company-california": "/california",
  // "/idaho" intentionally omitted — it's a real page, no redirect needed
  "/idaho-installation": "/idaho",
  "/solar-panel-company-idaho": "/idaho",
  // City pages — old format → new format
  "/altadena-ca-solar": "/solar/altadena-ca",
  "/arcadia-ca-solar": "/solar/arcadia-ca",
  "/azusa-ca-solar": "/solar/azusa-ca",
  "/chino-ca-solar": "/solar/chino-ca",
  "/chino-hills-ca-solar": "/solar/chino-hills-ca",
  "/chino-hills-ca-solar-2": "/solar/chino-hills-ca",
  "/claremont-ca-solar": "/solar/claremont-ca",
  "/corona-ca-solar": "/solar/corona-ca",
  "/corona-ca-solar-2": "/solar/corona-ca",
  "/covina-ca-solar": "/solar/covina-ca",
  "/diamond-bar-ca-solar": "/solar/diamond-bar-ca",
  "/eastvale-ca-solar": "/solar/eastvale-ca",
  "/fontana-ca-solar": "/solar/fontana-ca",
  "/glendora-ca-solar": "/solar/glendora-ca",
  "/jurupa-valley-ca-solar": "/solar/jurupa-valley-ca",
  "/la-verne-ca-solar": "/solar/la-verne-ca",
  "/los-angeles-county-ca-solar": "/solar/los-angeles-ca",
  "/los-angeles-county-solar": "/solar/los-angeles-ca",
  "/monrovia-ca-solar": "/solar/monrovia-ca",
  "/moreno-valley-ca-solar": "/solar/moreno-valley-ca",
  "/murrieta-ca-solar": "/solar/murrieta-ca",
  "/ontario-ca-solar": "/solar/ontario-ca",
  "/orange-county-solar": "/solar/orange-ca",
  "/pasadena-ca-solar": "/solar/pasadena-ca",
  "/pomona-ca-solar": "/solar/pomona-ca",
  "/rancho-cucamonga-ca-solar": "/solar/rancho-cucamonga-ca",
  "/rancho-cucamonga-ca-solar-2": "/solar/rancho-cucamonga-ca",
  "/redlands-ca-solar": "/solar/redlands-ca",
  "/rialto-ca-solar": "/solar/rialto-ca",
  "/riverside-ca-solar": "/solar/riverside-ca",
  "/riverside-ca-solar-2": "/solar/riverside-ca",
  "/riverside-county-ca-solar": "/solar/riverside-ca",
  "/riverside-county-solar": "/solar/riverside-ca",
  "/san-bernardino-ca-solar": "/solar/san-bernardino-ca",
  "/san-bernardino-county-ca-solar": "/solar/san-bernardino-ca",
  "/san-bernardino-county-solar": "/solar/san-bernardino-ca",
  "/san-dimas-ca-solar": "/solar/san-dimas-ca",
  "/temecula-ca-solar": "/solar/temecula-ca",
  "/upland-ca-solar": "/solar/upland-ca",
  "/upland-ca-solar-2": "/solar/upland-ca",
  "/walnut-ca-solar": "/solar/walnut-ca",
  "/west-covina-ca-solar": "/solar/west-covina-ca",
  "/yucaipa-ca-solar": "/solar/yucaipa-ca",
  // Blog / article pages
  "/3-types-of-solar-panels": "/blog",
  "/5-benefits-of-using-solar-power": "/blog",
  "/cleaning-your-solar-panels-heres-some-tips": "/blog",
  "/do-solar-communities-do-it-better": "/blog",
  "/environmentally-friendly-camping": "/blog",
  "/fun-facts-about-solar-energy": "/blog",
  "/get-your-tax-credit-by-2020": "/blog",
  "/how-effective-are-solar-panels-during-winter": "/blog",
  "/how-much-maintenance-do-solar-panels-require": "/blog",
  "/reducing-pollution-with-solar-power": "/blog",
  "/rewind-when-solar-panels-were-invented": "/blog",
  "/solar-delivers-more-than-renewable-energy": "/blog",
  "/solar-power-101": "/blog",
  "/solar-power-benefits-in-treasure-valley": "/blog",
  "/solar-power-is-becoming-a-reality-in-the-auto-industry": "/blog",
  "/solar-power-reaches-new-heights-with-window-technology": "/blog",
  "/solar-power-saving-the-planet-and-your-wallet-one-watt-at-a-time": "/blog",
  "/solar-vs-wind-energy-which-alternative-energy-is-right-for-you": "/blog",
  "/the-30-federal-solar-tax-credit-is-ending-soon": "/blog",
  // Quote / form pages
  // "/get-quote" intentionally omitted — it's a real page, no redirect needed
  "/upload-utility-bill": "/upload-bill",
  "/upload-your-data": "/upload-bill",
  "/proposal": "/get-quote",
  "/solar-proposal": "/get-quote",
  // Legal pages — NOTE: /terms-and-conditions and /privacy-policy are handled by staticPages.ts (server-side HTML)
  // Do NOT add redirects for those paths here or they will intercept the static HTML routes
  // Thank you — /thank-you is handled by React router (ThankYou.tsx), do NOT redirect here
  // /thank-you-quote also handled by React
  // Referral application aliases — required for existing iOS WebView app installations
  "/referral-program": "https://app.pellsolar.com/app",
  "/referral-app": "https://app.pellsolar.com/app",
  "/referral-app.html": "https://app.pellsolar.com/app",
  // Old internal/admin pages — redirect to homepage
  "/deal-intel": "/",
  "/customer-referrals": "/",
  "/salesman-portal": "/",
  "/solar-pro": "/",
  // "/solar-demo" intentionally omitted — it's a real page, no redirect needed
  "/pell-solar-referral-admin": "/",
  "/idaho-solar-offer": "/idaho",
  "/california-solar-offer": "/california"
};
for (const [from, to] of Object.entries(redirectMap)) {
  router2.get(from, (_req, res) => {
    res.redirect(301, to);
  });
}
var redirects_default = router2;

// server/staticPages.ts
import { Router as Router2 } from "express";

// shared/phoneTracking.ts
var GOOGLE_ADS_PHONE_CONVERSION = "AW-17865947343/oC4xCJL7x-UcEM_xksdC";
function getPhoneTrackingInlineScript(nonce = "") {
  const nonceAttribute = nonce ? ` nonce="${nonce}"` : "";
  return `<script${nonceAttribute}>(function(){if(window.__pellSolarPhoneTrackingInstalled)return;window.__pellSolarPhoneTrackingInstalled=true;document.addEventListener('click',function(event){var node=event.target instanceof Element?event.target:null;var link=node&&node.closest('a[href^="tel:"]');if(!link)return;var href=link.getAttribute('href')||link.href;var params={phone_number:href.replace(/^tel:/i,'').replace(/[^0-9+]/g,''),link_url:href,link_location:window.location.pathname||'/'};var conversion={send_to:'${GOOGLE_ADS_PHONE_CONVERSION}',value:1.0,currency:'USD'};if(typeof window.gtag==='function'){window.gtag('event','phone_click',params);window.gtag('event','conversion',conversion)}else{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:'phone_click'},params));window.dataLayer.push(Object.assign({event:'conversion'},conversion))}},true)})();</script>`;
}

// server/staticPages.ts
var router3 = Router2();
router3.get("/open-in-browser", (req, res) => {
  const dest = req.query.url || "https://pellsolar.com/admin/chat";
  let safeUrl = "https://pellsolar.com/admin/chat";
  try {
    const parsed = new URL(dest);
    if (parsed.hostname === "pellsolar.com" || parsed.hostname === "www.pellsolar.com") {
      safeUrl = dest;
    }
  } catch {
  }
  const chromeUrl = safeUrl.replace(/^https:\/\//, "googlechromes://");
  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Open in Chrome \u2014 Pell Solar</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f0f4f8;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;}
    .card{background:#fff;border-radius:20px;padding:36px 28px;text-align:center;max-width:340px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,0.10);}
    h2{font-size:22px;font-weight:700;color:#0f1f3d;margin-bottom:10px;}
    p{font-size:14px;color:#555;line-height:1.6;margin-bottom:28px;}
    .btn-chrome{display:block;background:#1a56db;color:#fff;font-size:17px;font-weight:700;padding:17px 24px;border-radius:14px;text-decoration:none;margin-bottom:12px;}
    .btn-safari{display:block;background:#fff;color:#1a56db;font-size:15px;font-weight:500;padding:13px 24px;border-radius:14px;text-decoration:none;border:1.5px solid #1a56db;}
  </style>
</head>
<body>
  <div class="card">
    <h2>Open in Chrome</h2>
    <p>Tap below to open the Pell Solar admin chat in your browser so you can reply to customers.</p>
    <a class="btn-chrome" href="${chromeUrl}">Open in Chrome</a>
    <a class="btn-safari" href="${safeUrl}">Open in Safari instead</a>
  </div>
</body>
</html>`);
});
var HTML_HEAD = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>%TITLE% | Pell Solar</title>
  <meta name="description" content="%DESCRIPTION%" />
  <link rel="canonical" href="https://pellsolar.com%CANONICAL_PATH%" />
  <script nonce="%CSP_NONCE%" type="application/ld+json">${getLocalBusinessJsonLd()}</script>
  ${getPhoneTrackingInlineScript("%CSP_NONCE%")}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; background: #fff; line-height: 1.7; }
    .header { background: #0B1D51; padding: 20px 24px; display: flex; align-items: center; gap: 16px; }
    .header a { color: #FED44D; font-weight: 700; font-size: 20px; text-decoration: none; }
    .header .tagline { color: rgba(255,255,255,0.7); font-size: 13px; }
    .hero { background: #0B1D51; padding: 60px 24px; text-align: center; }
    .hero h1 { color: #fff; font-size: 2.5rem; font-weight: 800; margin-bottom: 8px; }
    .hero p { color: rgba(255,255,255,0.7); font-size: 1.1rem; }
    .content { max-width: 860px; margin: 0 auto; padding: 48px 24px 80px; }
    h2 { font-size: 1.4rem; font-weight: 800; color: #0B1D51; margin: 40px 0 12px; border-bottom: 2px solid #FED44D; padding-bottom: 6px; }
    h3 { font-size: 1.1rem; font-weight: 700; color: #1f2937; margin: 24px 0 8px; }
    p { margin-bottom: 14px; color: #374151; }
    ul, ol { padding-left: 24px; margin-bottom: 14px; }
    li { margin-bottom: 6px; color: #374151; }
    strong { color: #111827; }
    a { color: #2BABE2; font-weight: 600; }
    .sms-box { background: #f0f9ff; border: 2px solid #2BABE2; border-radius: 12px; padding: 24px; margin: 32px 0; }
    .sms-box h2 { border-color: #2BABE2; margin-top: 0; }
    .footer { background: #0B1D51; color: rgba(255,255,255,0.7); text-align: center; padding: 32px 24px; font-size: 13px; }
    .footer a { color: #FED44D; }
    .nav-links { display: flex; gap: 24px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
    .nav-links a { color: #2BABE2; font-weight: 600; }
    .badge { display: inline-block; background: #2BABE2; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 8px; vertical-align: middle; }
  </style>
</head>
<body>`;
var HTML_FOOT = `
  <div class="footer">
    <p><strong style="color:#fff">Pell Solar Inc.</strong> &bull; 1326 Monte Vista Ave #7, Upland, CA 91786 &bull; CSLB #949122</p>
    <p>Phone: <a href="tel:8666468499">(866) 646-8499</a> | <a href="tel:7144553401">(714) 455-3401</a> (CA Local) &bull; Email: <a href="mailto:info@pellsolar.com">info@pellsolar.com</a></p>
    <div class="nav-links">
      <a href="/">Home</a>
      <a href="/get-quote">Get a Quote</a>
      <a href="/terms-and-conditions">Terms &amp; Conditions</a>
      <a href="/privacy-policy">Privacy Policy</a>
    </div>
    <p style="margin-top:16px">&copy; 2026 Pell Solar Inc. All rights reserved. CSLB #949122</p>
  </div>
</body>
</html>`;
function staticHead(title, description, canonicalPath, nonce = "") {
  return HTML_HEAD.replace("%TITLE%", title).replace("%DESCRIPTION%", description).replace("%CANONICAL_PATH%", canonicalPath).replaceAll("%CSP_NONCE%", nonce);
}
router3.get("/terms-and-conditions", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(
    staticHead("Terms & Conditions", "Read the Pell Solar website terms and conditions.", "/terms-and-conditions", res.locals.cspNonce ?? "") + `
  <div class="header">
    <a href="/">Pell Solar</a>
    <span class="tagline">Let the Sun Shine In</span>
  </div>
  <div class="hero">
    <h1>Terms &amp; Conditions</h1>
    <p>Last updated: April 25, 2026</p>
  </div>
  <div class="content">

    <p>These Terms and Conditions ("Terms") govern your use of the Pell Solar website located at pellsolar.com (the "Site") and any services provided by Pell Solar, Inc. ("Pell Solar," "we," "us," or "our"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.</p>

    <h2>1. Use of the Site</h2>
    <p>You may use the Site for lawful purposes only. You agree not to:</p>
    <ul>
      <li>Use the Site in any way that violates applicable federal, state, or local laws or regulations</li>
      <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
      <li>Attempt to gain unauthorized access to any portion of the Site or its related systems</li>
      <li>Interfere with or disrupt the integrity or performance of the Site</li>
      <li>Collect or harvest any personally identifiable information from the Site</li>
    </ul>

    <h2>2. Quote Requests and Lead Submissions</h2>
    <p>When you submit a quote request or contact form on the Site, you authorize Pell Solar to contact you by phone, email, or text message regarding solar products and services. You may opt out of communications at any time by contacting us at <a href="mailto:info@pellsolar.com">info@pellsolar.com</a> or by replying STOP to any text message.</p>
    <p>Quote requests are not binding contracts. All pricing, system design, and financing terms are subject to a formal proposal and signed agreement.</p>

    <h2>3. Pricing and Estimates</h2>
    <p>All pricing displayed on the Site is for illustrative purposes only and represents typical or starting prices. Actual pricing depends on system size, roof type, equipment selection, local permit fees, and other factors. Pell Solar will provide a formal written quote after assessing your specific situation.</p>
    <p>Monthly payment estimates assume qualification for financing programs and are subject to credit approval. Savings estimates are projections based on historical utility rates and typical system performance \u2014 actual savings may vary.</p>

    <h2>4. Intellectual Property</h2>
    <p>All content on the Site \u2014 including text, graphics, logos, images, and software \u2014 is the property of Pell Solar or its content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any Site content without our express written permission.</p>
    <p>The Pell Solar name, logo, and "Let the Sun Shine In" tagline are trademarks of Pell Solar, Inc. All rights reserved.</p>

    <h2>5. Third-Party Links</h2>
    <p>The Site may contain links to third-party websites, including manufacturer sites, financing partners, and review platforms. These links are provided for your convenience only. Pell Solar has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.</p>

    <h2>6. Disclaimer of Warranties</h2>
    <p>THE SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. PELL SOLAR DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
    <p>We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or usefulness of any information on the Site.</p>

    <h2>7. Limitation of Liability</h2>
    <p>TO THE FULLEST EXTENT PERMITTED BY LAW, PELL SOLAR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED THEREIN, EVEN IF PELL SOLAR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
    <p>Our total liability to you for any claim arising from your use of the Site shall not exceed $100.</p>

    <h2>8. Installation Services</h2>
    <p>Solar installation services are governed by a separate written contract between you and Pell Solar. These Terms do not constitute a service agreement. All installation warranties, guarantees, and service terms are set forth in the installation contract.</p>
    <p>Pell Solar is licensed by the California Contractors State License Board (CSLB License #949122) and holds all required licenses in the states where we operate.</p>

    <h2>9. Privacy</h2>
    <p>Your use of the Site is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference. By using the Site, you consent to the collection and use of your information as described in the Privacy Policy.</p>

    <h2>10. Changes to These Terms</h2>
    <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.</p>

    <h2>11. Governing Law</h2>
    <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved in the state or federal courts located in San Bernardino County, California.</p>

    <div class="sms-box">
      <h2>12. SMS / Text Messaging Terms <span class="badge">SMS Program</span></h2>

      <p>By checking the SMS consent box on our web forms, or by providing verbal consent during a consultation or service appointment, you agree to receive text messages from <strong>Pell Solar Inc.</strong> at the mobile number you provide. These Terms govern our SMS program.</p>

      <h3>Program Description</h3>
      <p>Pell Solar Inc. offers an SMS notification program that provides customers with text message updates about their solar project. Messages may include:</p>
      <ul>
        <li>Appointment confirmations and reminders</li>
        <li>Site survey scheduling</li>
        <li>Installation progress updates</li>
        <li>Inspection scheduling</li>
        <li>Permit and utility status updates (including PTO approval)</li>
        <li>Service request updates</li>
        <li>General project communications</li>
      </ul>

      <h3>How to Opt In</h3>
      <p>You may enroll in our SMS program by:</p>
      <ol>
        <li>Checking the SMS consent checkbox on our online quote form at <a href="https://pellsolar.com/get-quote">pellsolar.com/get-quote</a></li>
        <li>Checking the SMS consent checkbox on our service request form at <a href="https://pellsolar.com/solar-repair">pellsolar.com/solar-repair</a></li>
        <li>Providing verbal consent during a sales consultation or service appointment</li>
        <li>Signing a Pell Solar installation agreement that includes SMS consent language</li>
      </ol>
      <p><strong>Consent is not required as a condition of purchasing any goods or services from Pell Solar Inc.</strong></p>

      <h3>Message Frequency</h3>
      <p>Message frequency varies depending on the status of your solar project. During active project phases, you may receive approximately 2\u201310 messages per month. During inactive periods, message frequency may be lower or zero.</p>

      <h3>Message and Data Rates</h3>
      <p>Standard message and data rates may apply. Pell Solar Inc. is not responsible for any fees charged by your mobile carrier. Contact your carrier for details about your text messaging plan.</p>

      <h3>How to Opt Out</h3>
      <p>You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any text message received from Pell Solar Inc. After sending STOP, you will receive one final confirmation message confirming your opt-out. You will not receive further SMS messages unless you re-enroll.</p>

      <h3>Help</h3>
      <p>For help or questions about the SMS program, reply <strong>HELP</strong> to any text message received from Pell Solar. You will receive a response: "Pell Solar: For assistance, call (866) 646-8499 or email info@pellsolar.com. Reply STOP to opt out. Msg &amp; data rates may apply. Msg frequency varies."</p>

      <h3>Supported Carriers</h3>
      <p>Supported carriers include but are not limited to AT&amp;T, Verizon, T-Mobile, Sprint, U.S. Cellular, and other major US wireless carriers. Carriers are not liable for delayed or undelivered messages.</p>

      <h3>Privacy</h3>
      <p>Pell Solar Inc. does not sell, rent, or share your mobile phone number or SMS opt-in data with third parties for marketing or promotional purposes. For complete details, see our <a href="/privacy-policy">Privacy Policy</a>.</p>
    </div>

    <h2>13. Contact Us</h2>
    <p>If you have questions about these Terms, please contact us:</p>
    <ul>
      <li><strong>Pell Solar, Inc.</strong></li>
      <li>1326 Monte Vista Ave #7, Upland, CA 91786</li>
      <li>Phone: <a href="tel:8666468499">(866) 646-8499</a> | <a href="tel:7144553401">(714) 455-3401</a> (CA Local)</li>
      <li>Email: <a href="mailto:info@pellsolar.com">info@pellsolar.com</a></li>
    </ul>

    <div class="nav-links" style="margin-top:40px; justify-content:flex-start;">
      <a href="/privacy-policy">View Privacy Policy &rarr;</a>
      <a href="/">Back to Home</a>
    </div>
  </div>
` + HTML_FOOT
  );
});
router3.get("/privacy-policy", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(
    staticHead("Privacy Policy", "Read Pell Solar\u2019s privacy policy and information practices.", "/privacy-policy", res.locals.cspNonce ?? "") + `
  <div class="header">
    <a href="/">Pell Solar</a>
    <span class="tagline">Let the Sun Shine In</span>
  </div>
  <div class="hero">
    <h1>Privacy Policy</h1>
    <p>Last updated: April 25, 2026</p>
  </div>
  <div class="content">

    <p><strong>Pell Solar Inc.</strong> ("Pell Solar," "we," "us," or "our") is committed to protecting the privacy of our customers and website visitors. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you visit our website (pellsolar.com), use our services, or interact with us in any way.</p>
    <p>By using our website or services, you agree to the terms of this Privacy Policy.</p>

    <h2>Information We Collect</h2>
    <p>We may collect the following types of personal information:</p>
    <ul>
      <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address.</li>
      <li><strong>Project Information:</strong> Property address, utility account details, roof specifications, energy usage data, and other details related to your solar installation.</li>
      <li><strong>Financial Information:</strong> Payment information necessary to process transactions (handled securely through third-party payment processors).</li>
      <li><strong>Website Usage Data:</strong> IP address, browser type, operating system, pages visited, and cookies.</li>
      <li><strong>Communications:</strong> Records of emails, text messages, phone calls, and other communications between you and Pell Solar.</li>
    </ul>

    <h2>How We Use Your Information</h2>
    <p>We use the information we collect for the following purposes:</p>
    <ul>
      <li>To provide, maintain, and improve our solar installation and service offerings.</li>
      <li>To communicate with you about your solar project, including appointment scheduling, installation updates, permit and utility status, and service notifications.</li>
      <li>To send you text messages if you have opted in to our SMS program (see SMS/Text Messaging Privacy section below).</li>
      <li>To process payments and manage your account.</li>
      <li>To respond to your inquiries and provide customer support.</li>
      <li>To comply with legal obligations and protect our rights.</li>
    </ul>

    <div class="sms-box">
      <h2>SMS / Text Messaging Privacy <span class="badge">SMS Program</span></h2>

      <p>This section applies to individuals who opt in to receive text messages from Pell Solar Inc.</p>

      <h3>What We Collect for SMS</h3>
      <p>When you opt in to our SMS program, we collect your mobile phone number, first and last name, and your consent to receive text messages. Opt-in occurs when you check the SMS consent checkbox on our web forms at <a href="https://pellsolar.com/get-quote">pellsolar.com/get-quote</a> or <a href="https://pellsolar.com/solar-repair">pellsolar.com/solar-repair</a>, or when you provide verbal consent during a consultation.</p>

      <h3>How We Use SMS Data</h3>
      <p>We use your mobile phone number solely to send you text messages related to your solar project, including but not limited to: appointment confirmations and reminders, site survey scheduling, installation updates, inspection scheduling, permit and utility status updates (including PTO), service updates, and general project communications. We do not use your phone number for telemarketing or unsolicited promotional messages.</p>

      <h3>No Sharing of SMS Data</h3>
      <p>We do not sell, rent, share, or disclose your mobile phone number, SMS opt-in data, or any information collected in connection with our SMS program to any third parties for their marketing or promotional purposes. This includes but is not limited to lead generators, data brokers, and affiliate marketers. We may share your phone number only with our SMS service provider (Twilio) solely for the purpose of delivering text messages on our behalf.</p>

      <h3>Message Frequency</h3>
      <p>Message frequency varies depending on the status of your solar project. You can typically expect 2\u201310 messages per month during active project phases.</p>

      <h3>Message and Data Rates</h3>
      <p>Standard message and data rates may apply depending on your mobile carrier and plan. Pell Solar is not responsible for any charges imposed by your mobile carrier.</p>

      <h3>How to Opt Out</h3>
      <p>You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any message you receive from us. After opting out, you will receive one final confirmation message and will no longer receive SMS communications from Pell Solar unless you re-enroll.</p>

      <h3>Help</h3>
      <p>For assistance with our SMS program, reply <strong>HELP</strong> to any message or contact us at <a href="tel:8666468499">(866) 646-8499</a> or <a href="mailto:info@pellsolar.com">info@pellsolar.com</a>.</p>

      <h3>Consent</h3>
      <p><strong>Consent to receive text messages is not a condition of purchasing any goods or services from Pell Solar Inc.</strong></p>
    </div>

    <h2>How We Share Your Information</h2>
    <p>We do not sell your personal information. We may share your information in the following limited circumstances:</p>
    <ul>
      <li><strong>Service Providers:</strong> We share information with third-party service providers who assist us in operating our business, such as payment processors, SMS delivery providers (Twilio), email service providers, and CRM platforms. These providers are contractually obligated to protect your data and use it only for the purposes we specify.</li>
      <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.</li>
      <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
      <li><strong>With Your Consent:</strong> We may share information for purposes not described in this policy with your explicit consent.</li>
    </ul>

    <h2>Cookies and Tracking</h2>
    <p>Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings.</p>

    <h2>Data Security</h2>
    <p>We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

    <h2>Data Retention</h2>
    <p>We retain your personal information for as long as necessary to fulfill the purposes described in this policy, including to satisfy legal, accounting, or reporting obligations. If you opt out of our SMS program, we will promptly cease sending you text messages and remove your phone number from our active messaging list.</p>

    <h2>Your Rights</h2>
    <p>Depending on your location, you may have the following rights:</p>
    <ul>
      <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
      <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
      <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations.</li>
      <li><strong>Opt-Out:</strong> Opt out of text messages by replying STOP. Opt out of marketing emails by clicking the unsubscribe link.</li>
    </ul>
    <p>To exercise any of these rights, contact us at <a href="mailto:info@pellsolar.com">info@pellsolar.com</a> or <a href="tel:8666468499">(866) 646-8499</a>.</p>

    <h2>Children's Privacy</h2>
    <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.</p>

    <h2>Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of our website or services after any changes constitutes your acceptance of the updated policy.</p>

    <h2>Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact us:</p>
    <p><strong>Pell Solar Inc.</strong><br />
    1326 Monte Vista Ave #7, Upland, CA 91786<br />
    Phone: <a href="tel:8666468499">(866) 646-8499</a> | <a href="tel:7144553401">(714) 455-3401</a> (CA Local)<br />
    Email: <a href="mailto:info@pellsolar.com">info@pellsolar.com</a><br />
    Website: <a href="https://pellsolar.com">pellsolar.com</a></p>

    <div class="nav-links" style="margin-top:40px; justify-content:flex-start;">
      <a href="/terms-and-conditions">View Terms &amp; Conditions &rarr;</a>
      <a href="/">Back to Home</a>
    </div>
  </div>
` + HTML_FOOT
  );
});
var staticPages_default = router3;

// server/_core/ensureSchema.ts
import { Pool as Pool2 } from "pg";
async function ensureSchema() {
  if (!process.env.DATABASE_URL) {
    return;
  }
  const pool = new Pool2({ connectionString: process.env.DATABASE_URL });
  try {
    const client = await pool.connect();
    try {
      const schemaCheck = await client.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'website_leads' AND column_name = 'firstName'
      `);
      if (schemaCheck.rows.length > 0) {
        console.log("[Schema] website_ tables already exist with correct casing \u2014 skipping");
        return;
      }
      console.log("[Schema] Dropping existing website_ objects (if any) before recreating with correct casing");
      await client.query(`DROP TABLE IF EXISTS "website_users" CASCADE`);
      await client.query(`DROP TABLE IF EXISTS "website_leads" CASCADE`);
      await client.query(`DROP TABLE IF EXISTS "website_project_photos" CASCADE`);
      await client.query(`DROP TABLE IF EXISTS "website_unsubscribes" CASCADE`);
      await client.query(`DROP TABLE IF EXISTS "website_chat_settings" CASCADE`);
      await client.query(`DROP TABLE IF EXISTS "website_chat_sessions" CASCADE`);
      await client.query(`DROP TABLE IF EXISTS "website_chat_messages" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_role" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_ownershipType" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_propertyType" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_solarMotivation" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_paymentPreference" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_interestType" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_leadStatus" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_category" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_chatSessionStatus" CASCADE`);
      await client.query(`DROP TYPE IF EXISTS "website_chatSender" CASCADE`);
      await client.query(`CREATE TYPE "website_role" AS ENUM ('user', 'admin')`);
      await client.query(`CREATE TYPE "website_ownershipType" AS ENUM ('homeowner', 'renter')`);
      await client.query(`CREATE TYPE "website_propertyType" AS ENUM ('family_home', 'apartment', 'commercial')`);
      await client.query(`CREATE TYPE "website_solarMotivation" AS ENUM ('price_stability', 'reduce_bills', 'all_electric', 'other')`);
      await client.query(`CREATE TYPE "website_paymentPreference" AS ENUM ('leasing', 'financing', 'cash')`);
      await client.query(`CREATE TYPE "website_interestType" AS ENUM ('solar', 'battery', 'solar_battery', 'ev_charger', 'other')`);
      await client.query(`CREATE TYPE "website_leadStatus" AS ENUM ('New', 'Contacted', 'Quoted', 'Closed', 'Lost')`);
      await client.query(`CREATE TYPE "website_category" AS ENUM ('solar', 'battery', 'ev-charging', 'roofing', 'other')`);
      await client.query(`CREATE TYPE "website_chatSessionStatus" AS ENUM ('active', 'closed', 'missed')`);
      await client.query(`CREATE TYPE "website_chatSender" AS ENUM ('visitor', 'admin')`);
      await client.query(`
        CREATE TABLE "website_users" (
          id SERIAL PRIMARY KEY,
          "openId" VARCHAR(64) NOT NULL UNIQUE,
          name TEXT,
          email VARCHAR(320),
          "loginMethod" VARCHAR(64),
          role website_role DEFAULT 'user' NOT NULL,
          "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
          "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
          "lastSignedIn" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);
      await client.query(`
        CREATE TABLE "website_leads" (
          id SERIAL PRIMARY KEY,
          "firstName" VARCHAR(128) NOT NULL,
          "lastName" VARCHAR(128) NOT NULL,
          email VARCHAR(320) NOT NULL,
          phone VARCHAR(32) NOT NULL,
          address TEXT,
          "ownershipType" "website_ownershipType" NOT NULL,
          "propertyType" "website_propertyType",
          "zipCode" VARCHAR(10),
          "existingSolar" INTEGER,
          "solarMotivation" "website_solarMotivation",
          "paymentPreference" "website_paymentPreference",
          "monthlyBillRange" VARCHAR(64),
          "interestType" "website_interestType" NOT NULL,
          "interestOtherText" TEXT,
          "billFileKey" TEXT,
          "billFileUrl" TEXT,
          "billFileName" VARCHAR(256),
          status "website_leadStatus" DEFAULT 'New' NOT NULL,
          source VARCHAR(64) DEFAULT 'homepage' NOT NULL,
          notes TEXT,
          "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
          "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);
      await client.query(`
        CREATE TABLE "website_project_photos" (
          id SERIAL PRIMARY KEY,
          title VARCHAR(256) NOT NULL,
          description TEXT,
          "imageUrl" TEXT NOT NULL,
          "imageKey" TEXT,
          category website_category DEFAULT 'solar' NOT NULL,
          location VARCHAR(256),
          featured INTEGER DEFAULT 0 NOT NULL,
          "sortOrder" INTEGER DEFAULT 0 NOT NULL,
          "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);
      await client.query(`
        CREATE TABLE "website_unsubscribes" (
          id SERIAL PRIMARY KEY,
          email VARCHAR(320) NOT NULL,
          token VARCHAR(128) NOT NULL UNIQUE,
          campaign VARCHAR(256),
          "ipAddress" VARCHAR(64),
          "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);
      await client.query(`
        CREATE TABLE "website_chat_settings" (
          id SERIAL PRIMARY KEY,
          "isOnline" INTEGER DEFAULT 0 NOT NULL,
          "offlineMessage" TEXT DEFAULT 'We''re currently offline. Leave your name and email and we''ll get back to you shortly!',
          "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);
      await client.query(`
        CREATE TABLE "website_chat_sessions" (
          id SERIAL PRIMARY KEY,
          "sessionToken" VARCHAR(128) NOT NULL UNIQUE,
          "visitorName" VARCHAR(128),
          "visitorEmail" VARCHAR(320),
          "visitorPhone" VARCHAR(32),
          status "website_chatSessionStatus" DEFAULT 'active' NOT NULL,
          "smsSent" INTEGER DEFAULT 0 NOT NULL,
          "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
          "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);
      await client.query(`
        CREATE TABLE "website_chat_messages" (
          id SERIAL PRIMARY KEY,
          "sessionId" INTEGER NOT NULL,
          sender "website_chatSender" NOT NULL,
          message TEXT NOT NULL,
          "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);
      console.log("[Schema] website_ tables created successfully");
    } finally {
      client.release();
    }
  } catch (error) {
    console.warn("[Schema] Failed to ensure schema:", error);
  } finally {
    await pool.end();
  }
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  await ensureSchema();
  const app = express2();
  const server = createServer(app);
  if (process.env.NODE_ENV === "production") {
    app.use((_req, res, next) => {
      const nonce = crypto5.randomBytes(16).toString("base64");
      res.locals.cspNonce = nonce;
      res.setHeader(
        "Content-Security-Policy",
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://connect.facebook.net; object-src 'none'; base-uri 'self'"
      );
      next();
    });
  }
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  app.use(redirects_default);
  registerOAuthRoutes(app);
  registerUploadRoute(app);
  registerUnsubscribeRoute(app);
  app.use(staticPages_default);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
