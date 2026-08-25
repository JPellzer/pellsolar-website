import { eq, desc, and, count, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  InsertUser,
  website_users,
  website_leads,
  InsertLead,
  Lead,
  website_projectPhotos,
  InsertProjectPhoto,
  ProjectPhoto,
  website_unsubscribes,
  InsertUnsubscribe
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: Pool | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes("localhost") || process.env.DATABASE_URL.includes("127.0.0.1")
          ? undefined
          : { rejectUnauthorized: false }
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

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(website_users).values(values).onConflictDoUpdate({
      target: website_users.openId,
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(website_users).where(eq(website_users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Lead helpers ────────────────────────────────────────────────────────────

export async function createLead(data: InsertLead): Promise<{ id: number; isDuplicate: boolean }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Deduplication: check if a lead with the same phone OR email already exists
  const conditions = [];
  if (data.phone) conditions.push(eq(website_leads.phone, data.phone));
  if (data.email) conditions.push(eq(website_leads.email, data.email));

  if (conditions.length > 0) {
    const { or } = await import("drizzle-orm");
    const existing = await db.select().from(website_leads).where(or(...conditions)).limit(1);
    if (existing.length > 0) {
      const existingLead = existing[0];
      // Update the existing record with any new info from this submission
      const updateData: Partial<InsertLead> = {};
      if (data.monthlyBillRange && !existingLead.monthlyBillRange) updateData.monthlyBillRange = data.monthlyBillRange;
      if (data.interestType && !existingLead.interestType) updateData.interestType = data.interestType;
      if (data.address && !existingLead.address) updateData.address = data.address;
      if (data.billFileKey && !existingLead.billFileKey) updateData.billFileKey = data.billFileKey;
      if (data.notes) updateData.notes = existingLead.notes
        ? `${existingLead.notes}\n[Re-submitted ${new Date().toISOString()}]`
        : `[Re-submitted ${new Date().toISOString()}]`;
      if (Object.keys(updateData).length > 0) {
        await db.update(website_leads).set(updateData).where(eq(website_leads.id, existingLead.id));
      }
      return { id: existingLead.id, isDuplicate: true };
    }
  }

  const result = await db.insert(website_leads).values(data).returning({ id: website_leads.id });
  return { id: result[0].id, isDuplicate: false };
}

export async function getLeads(filters?: { status?: Lead["status"]; source?: Lead["source"] }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (filters?.status) conditions.push(eq(website_leads.status, filters.status));
  if (filters?.source) conditions.push(eq(website_leads.source, filters.source));
  const query = conditions.length > 0
    ? db.select().from(website_leads).where(and(...conditions)).orderBy(desc(website_leads.createdAt))
    : db.select().from(website_leads).orderBy(desc(website_leads.createdAt));
  return query;
}

export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(website_leads).where(eq(website_leads.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateLeadStatus(id: number, status: Lead["status"]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(website_leads).set({ status }).where(eq(website_leads.id, id));
}

export async function updateLeadNotes(id: number, notes: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(website_leads).set({ notes }).where(eq(website_leads.id, id));
}

export async function getLeadStats() {
  const db = await getDb();
  if (!db) return { total: 0, byStatus: {}, bySource: {} };

  const allLeads = await db.select().from(website_leads);
  const total = allLeads.length;

  const byStatus: Record<string, number> = {};
  const bySource: Record<string, number> = {};

  for (const lead of allLeads) {
    byStatus[lead.status] = (byStatus[lead.status] || 0) + 1;
    bySource[lead.source] = (bySource[lead.source] || 0) + 1;
  }

  return { total, byStatus, bySource };
}

export async function getAllLeadsForExport() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(website_leads).orderBy(desc(website_leads.createdAt));
}

// ─── Project Photo helpers ────────────────────────────────────────────────────

export async function getProjectPhotos(category?: ProjectPhoto["category"]) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db.select().from(website_projectPhotos).where(eq(website_projectPhotos.category, category)).orderBy(website_projectPhotos.sortOrder, desc(website_projectPhotos.createdAt));
  }
  return db.select().from(website_projectPhotos).orderBy(website_projectPhotos.sortOrder, desc(website_projectPhotos.createdAt));
}

export async function createProjectPhoto(data: InsertProjectPhoto): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(website_projectPhotos).values(data).returning({ id: website_projectPhotos.id });
  return result[0].id;
}

export async function deleteProjectPhoto(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(website_projectPhotos).where(eq(website_projectPhotos.id, id));
}

export async function updateProjectPhoto(id: number, data: Partial<InsertProjectPhoto>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(website_projectPhotos).set(data).where(eq(website_projectPhotos.id, id));
}

// ─── Unsubscribe helpers ──────────────────────────────────────────────────────

export async function createUnsubscribe(data: InsertUnsubscribe): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(website_unsubscribes).values(data).returning({ id: website_unsubscribes.id });
  return result[0].id;
}

export async function getUnsubscribeByToken(token: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(website_unsubscribes).where(eq(website_unsubscribes.token, token)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUnsubscribeByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(website_unsubscribes).where(eq(website_unsubscribes.email, email.toLowerCase())).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUnsubscribes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(website_unsubscribes).orderBy(desc(website_unsubscribes.createdAt));
}
