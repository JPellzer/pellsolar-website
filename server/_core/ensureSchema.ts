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
      // Create all enums with duplicate_object exception handling
      await client.query(`
        DO $$ BEGIN
          CREATE TYPE website_role AS ENUM ('user', 'admin');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await client.query(`
        DO $$ BEGIN
          CREATE TYPE "website_ownershipType" AS ENUM ('homeowner', 'renter');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await client.query(`
        DO $$ BEGIN
          CREATE TYPE "website_propertyType" AS ENUM ('family_home', 'apartment', 'commercial');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await client.query(`
        DO $$ BEGIN
          CREATE TYPE "website_solarMotivation" AS ENUM ('price_stability', 'reduce_bills', 'all_electric', 'other');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await client.query(`
        DO $$ BEGIN
          CREATE TYPE "website_paymentPreference" AS ENUM ('leasing', 'financing', 'cash');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await client.query(`
        DO $$ BEGIN
          CREATE TYPE "website_interestType" AS ENUM ('solar', 'battery', 'solar_battery', 'ev_charger', 'other');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await client.query(`
        DO $$ BEGIN
          CREATE TYPE "website_leadStatus" AS ENUM ('New', 'Contacted', 'Quoted', 'Closed', 'Lost');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await client.query(`
        DO $$ BEGIN
          CREATE TYPE website_category AS ENUM ('solar', 'battery', 'ev-charging', 'roofing', 'other');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await client.query(`
        DO $$ BEGIN
          CREATE TYPE "website_chatSessionStatus" AS ENUM ('active', 'closed', 'missed');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await client.query(`
        DO $$ BEGIN
          CREATE TYPE "website_chatSender" AS ENUM ('visitor', 'admin');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      // Create tables with IF NOT EXISTS
      await client.query(`
        CREATE TABLE IF NOT EXISTS website_users (
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
        CREATE TABLE IF NOT EXISTS website_leads (
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
        CREATE TABLE IF NOT EXISTS website_project_photos (
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
        CREATE TABLE IF NOT EXISTS website_unsubscribes (
          id SERIAL PRIMARY KEY,
          email VARCHAR(320) NOT NULL,
          token VARCHAR(128) NOT NULL UNIQUE,
          campaign VARCHAR(256),
          "ipAddress" VARCHAR(64),
          "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS website_chat_settings (
          id SERIAL PRIMARY KEY,
          "isOnline" INTEGER DEFAULT 0 NOT NULL,
          "offlineMessage" TEXT DEFAULT 'We''re currently offline. Leave your name and email and we''ll get back to you shortly!',
          "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS website_chat_sessions (
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
        CREATE TABLE IF NOT EXISTS website_chat_messages (
          id SERIAL PRIMARY KEY,
          "sessionId" INTEGER NOT NULL,
          sender "website_chatSender" NOT NULL,
          message TEXT NOT NULL,
          "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);

      console.log("[Schema] website_ tables ensured");
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
