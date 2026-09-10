#!/usr/bin/env node
/**
 * Add followupRespondedAt and crmPendingId columns to website_leads table
 * Run against production database
 */

const { Pool } = require("pg");

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("localhost") || process.env.DATABASE_URL?.includes("127.0.0.1")
      ? undefined
      : { rejectUnauthorized: false }
  });

  try {
    console.log("Adding followupRespondedAt and crmPendingId columns...");

    // Add followupRespondedAt column
    await pool.query(`
      ALTER TABLE website_leads
      ADD COLUMN IF NOT EXISTS "followupRespondedAt" TIMESTAMP;
    `);
    console.log("✓ Added followupRespondedAt column");

    // Add crmPendingId column
    await pool.query(`
      ALTER TABLE website_leads
      ADD COLUMN IF NOT EXISTS "crmPendingId" INTEGER;
    `);
    console.log("✓ Added crmPendingId column");

    console.log("\n✅ Migration complete!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
