import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";
import { postToCrm } from "./crmWebhook";
import { storageGetSignedUrl } from "./storage";

// ─── Mock the db module ───────────────────────────────────────────────────────

vi.mock("./db", () => ({
  createLead: vi.fn().mockResolvedValue({ id: 42, isDuplicate: false }),
  getLeads: vi.fn().mockResolvedValue([]),
  getLeadById: vi.fn().mockResolvedValue({
    id: 1,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phone: "5550001234",
    address: "123 Solar St",
    ownershipType: "homeowner",
    monthlyBillRange: "200-350",
    interestType: "lease",
    status: "New",
    source: "homepage",
    notes: null,
    billFileKey: null,
    billFileUrl: null,
    billFileName: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  updateLeadStatus: vi.fn().mockResolvedValue(undefined),
  updateLeadNotes: vi.fn().mockResolvedValue(undefined),
  getLeadStats: vi.fn().mockResolvedValue({ total: 5, byStatus: { New: 3, Closed: 2 }, bySource: { homepage: 4, "quote-page": 1 } }),
  getAllLeadsForExport: vi.fn().mockResolvedValue([]),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDb: vi.fn(),
}));

// ─── Mock notifications ───────────────────────────────────────────────────────

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./crmWebhook", () => ({
  postToCrm: vi.fn().mockResolvedValue({ success: true, customer_id: 42, deal_id: 99 }),
}));

vi.mock("./storage", () => ({
  storagePut: vi.fn(),
  storageGetSignedUrl: vi.fn().mockResolvedValue("https://storage.example.test/bills/test-utility-bill.pdf?expires=604800"),
}));

// ─── Context helpers ──────────────────────────────────────────────────────────

function makePublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function makeAdminCtx(): TrpcContext {
  const admin: User = {
    id: 1,
    openId: "admin-open-id",
    email: "admin@pellsolar.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user: admin,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function makeUserCtx(): TrpcContext {
  const user: User = {
    id: 2,
    openId: "user-open-id",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("leads.create (public)", () => {
  it("creates a lead and returns success with id", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.leads.create({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      phone: "5550001234",
      ownershipType: "homeowner",
      interestType: "solar",
      monthlyBillRange: "200-350",
      source: "homepage",
    });
    expect(result.success).toBe(true);
    expect(result.id).toBe(42);
  });

  it("accepts renter ownership type", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.leads.create({
      firstName: "Bob",
      lastName: "Smith",
      email: "bob@example.com",
      phone: "5550009999",
      ownershipType: "renter",
      interestType: "solar_battery",
      source: "financing",
    });
    expect(result.success).toBe(true);
  });

  it("creates a complete quote lead and sends one complete CRM payload", async () => {
    const crmWebhook = vi.mocked(postToCrm);
    const getSignedUrl = vi.mocked(storageGetSignedUrl);
    crmWebhook.mockClear();
    getSignedUrl.mockClear();
    const ctx = makePublicCtx();
    ctx.req.headers = {
      "x-forwarded-for": "198.51.100.42, 10.0.0.1",
      "user-agent": "PellSolarSecurityTest/1.0",
      referer: "https://www.google.com/",
    };
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.create({
      firstName: "Taylor",
      lastName: "Customer",
      email: "taylor@example.com",
      phone: "7145551234",
      address: "123 Solar Way",
      city: "Rancho Cucamonga",
      state: "CA",
      zipCode: "91730",
      ownershipType: "homeowner",
      propertyType: "family_home",
      existingSolar: false,
      solarMotivation: "reduce_bills",
      paymentPreference: "financing",
      monthlyBillRange: "285",
      interestType: "solar_battery",
      billFileKey: "bills/test-utility-bill.pdf",
      billFileUrl: "/manus-storage/bills/test-utility-bill.pdf",
      billFileName: "test-utility-bill.pdf",
      source: "quote-page",
      utmData: { utm_source: "google", utm_campaign: "solar-search", gclid: "TEST123" },
      companyWebsite: "",
      formSeconds: 14,
      pageUrl: "https://pellsolar.com/get-quote?gclid=TEST123",
    });

    expect(result).toMatchObject({ success: true, id: 42, dealId: 99 });
    expect(crmWebhook).toHaveBeenCalledTimes(1);
    expect(crmWebhook).toHaveBeenCalledWith({
      first_name: "Taylor",
      last_name: "Customer",
      email: "taylor@example.com",
      phone: "7145551234",
      address: "123 Solar Way",
      city: "Rancho Cucamonga",
      state: "CA",
      zip: "91730",
      bill_file_url: "https://storage.example.test/bills/test-utility-bill.pdf?expires=604800",
      bill_file_name: "test-utility-bill.pdf",
      type: "new_lead",
      source: "google-ads",
      property_type: "family_home",
      existing_solar: false,
      solar_motivation: "reduce_bills",
      payment_preference: "financing",
      monthly_bill: 285,
      interest: "solar_battery",
      utm_data: { utm_source: "google", utm_campaign: "solar-search", gclid: "TEST123" },
      visitor_ip: "198.51.100.42",
      user_agent: "PellSolarSecurityTest/1.0",
      referrer: "https://www.google.com/",
      page_url: "https://pellsolar.com/get-quote?gclid=TEST123",
      form_seconds: 14,
      honeypot: "",
      turnstile_ok: null,
      notes: undefined,
    });
    expect(getSignedUrl).toHaveBeenCalledWith("bills/test-utility-bill.pdf", 604800);
  });

  it("keeps quote-page as the CRM source when no attribution parameters exist", async () => {
    const crmWebhook = vi.mocked(postToCrm);
    crmWebhook.mockClear();
    const caller = appRouter.createCaller(makePublicCtx());

    await caller.leads.create({
      firstName: "Fallback",
      lastName: "Quote",
      email: "fallback@example.com",
      phone: "7145556789",
      ownershipType: "homeowner",
      interestType: "solar",
      source: "quote-page",
    });

    expect(crmWebhook).toHaveBeenCalledWith(expect.objectContaining({
      source: "quote-page",
      utm_data: undefined,
    }));
  });

  it("rejects a filled company_website honeypot before forwarding a lead to the CRM", async () => {
    const crmWebhook = vi.mocked(postToCrm);
    crmWebhook.mockClear();
    const caller = appRouter.createCaller(makePublicCtx());

    await expect(caller.leads.create({
      firstName: "Bot",
      lastName: "Submission",
      email: "bot@example.test",
      phone: "7145559999",
      ownershipType: "homeowner",
      interestType: "solar",
      source: "quote-page",
      companyWebsite: "https://automated.example/",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });

    expect(crmWebhook).not.toHaveBeenCalled();
  });
});

describe("leads.list (admin only)", () => {
  it("returns leads for admin", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.leads.list({});
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for regular user", async () => {
    const caller = appRouter.createCaller(makeUserCtx());
    await expect(caller.leads.list({})).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("throws FORBIDDEN for unauthenticated user", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.leads.list({})).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});

describe("leads.updateStatus (admin only)", () => {
  it("updates status for admin", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.leads.updateStatus({ id: 1, status: "Contacted" });
    expect(result.success).toBe(true);
  });

  it("throws FORBIDDEN for non-admin", async () => {
    const caller = appRouter.createCaller(makeUserCtx());
    await expect(caller.leads.updateStatus({ id: 1, status: "Closed" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("leads.stats (admin only)", () => {
  it("returns pipeline stats for admin", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    const stats = await caller.leads.stats();
    expect(stats.total).toBe(5);
    expect(stats.byStatus["New"]).toBe(3);
    expect(stats.bySource["homepage"]).toBe(4);
  });
});

describe("leads.export (admin only)", () => {
  it("returns all leads for admin export", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.leads.export();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for non-admin", async () => {
    const caller = appRouter.createCaller(makeUserCtx());
    await expect(caller.leads.export()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
