import { describe, expect, it, vi, beforeEach } from "vitest";
import crypto from "crypto";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module so tests don't need a real database
vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    createUnsubscribe: vi.fn().mockResolvedValue(1),
    getUnsubscribeByToken: vi.fn().mockResolvedValue(undefined),
    getUnsubscribeByEmail: vi.fn().mockResolvedValue(undefined),
    getAllUnsubscribes: vi.fn().mockResolvedValue([]),
  };
});

// Helper to build a public (unauthenticated) context
function createPublicContext(ip = "127.0.0.1"): TrpcContext {
  return {
    user: null,
    req: {
      ip,
      headers: { "x-forwarded-for": ip },
      cookies: {},
    } as any,
    res: {
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    } as any,
  };
}

// Helper to build an admin context
function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@pellsolar.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      ip: "127.0.0.1",
      headers: {},
      cookies: {},
    } as any,
    res: {
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    } as any,
  };
}

// Reproduce the token generation logic from routers.ts
function generateToken(email: string, campaign: string, secret: string): string {
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const payload = `${email}|${expiresAt}|${campaign}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

describe("unsubscribe.generateToken", () => {
  it("returns a token string", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.unsubscribe.generateToken({
      email: "test@example.com",
      campaign: "newsletter",
    });
    expect(typeof result.token).toBe("string");
    expect(result.token).toContain(".");
  });

  it("token contains two parts separated by a dot", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.unsubscribe.generateToken({ email: "a@b.com" });
    const parts = result.token.split(".");
    expect(parts.length).toBe(2);
    // First part is base64url-encoded payload
    const decoded = Buffer.from(parts[0], "base64url").toString("utf8");
    expect(decoded).toContain("a@b.com");
  });
});

describe("unsubscribe.process", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects an invalid token", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.unsubscribe.process({ email: "test@example.com", token: "bad.token" })
    ).rejects.toMatchObject({ message: expect.stringMatching(/invalid/i) });
  });

  it("rejects a token with wrong email", async () => {
    const secret = process.env.JWT_SECRET ?? "test-secret";
    const token = generateToken("other@example.com", "", secret);
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.unsubscribe.process({ email: "test@example.com", token })
    ).rejects.toMatchObject({ message: expect.stringMatching(/mismatch|invalid/i) });
  });

  it("rejects a token with tampered signature", async () => {
    const secret = process.env.JWT_SECRET ?? "test-secret";
    const token = generateToken("test@example.com", "", secret);
    const tampered = token.slice(0, -4) + "xxxx";
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.unsubscribe.process({ email: "test@example.com", token: tampered })
    ).rejects.toMatchObject({ message: expect.stringMatching(/invalid/i) });
  });

  it("succeeds with a valid token and saves to DB", async () => {
    const { createUnsubscribe } = await import("./db");
    const secret = process.env.JWT_SECRET ?? "test-secret";
    // Override JWT_SECRET so the server uses the same secret
    process.env.JWT_SECRET = secret;
    const token = generateToken("test@example.com", "newsletter", secret);
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.unsubscribe.process({ email: "test@example.com", token });
    expect(result.success).toBe(true);
    expect(result.alreadyUnsubscribed).toBe(false);
    expect(createUnsubscribe).toHaveBeenCalledOnce();
  });
});

describe("unsubscribe.list (admin only)", () => {
  it("returns empty list for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.unsubscribe.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for non-admin user", async () => {
    const ctx = createAdminContext();
    ctx.user!.role = "user";
    const caller = appRouter.createCaller(ctx);
    await expect(caller.unsubscribe.list()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });
});
