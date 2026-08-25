import { Pool } from "pg";

/**
 * ensureSchema — Idempotent DDL execution at server startup.
 * Creates enums and tables matching drizzle/schema.ts exactly.
 * Never crashes the server — logs warnings on failure.
 */
export async function ensureSchema(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    return; // Skip silently if no DATABASE_URL configured
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const client = await pool.connect();

    try {
      // Check if schema is already correct
      const schemaCheck = await client.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'website_leads' AND column_name = 'firstName'
      `);

      if (schemaCheck.rows.length > 0) {
        console.log("[Schema] website_ tables already exist with correct casing — skipping");
        return;
      }

      // Schema is missing or incorrectly cased — drop all website_ objects before recreating
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

      // Create all enums (no exception handling needed since we just dropped them)
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

      // Create tables (no IF NOT EXISTS needed since we just dropped them)
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
    // Never crash the server — log warning and continue
  } finally {
    await pool.end();
  }
}
