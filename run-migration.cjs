#!/usr/bin/env node
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Use production DATABASE_URL (from Render PostgreSQL)
const DATABASE_URL = 'postgresql://pellsolar:yKkGMWVIfZeGvndQMeZ2ZCJZ3cvQEH0k@dpg-d747j3ogjchc73b35gag-a.oregon-postgres.render.com/pellsolar';

async function main() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1")
      ? undefined
      : { rejectUnauthorized: false }
  });

  try {
    console.log("Adding followupRespondedAt and crmPendingId columns...");

    // Add followupRespondedAt column (TIMESTAMP, not TIMESTAMPTZ - match drizzle schema)
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

    // Print current columns
    console.log("\nCurrent website_leads columns:");
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'website_leads'
      ORDER BY ordinal_position;
    `);
    result.rows.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type} ${row.is_nullable === 'YES' ? '(nullable)' : '(not null)'}`);
    });

    console.log("\n✅ Migration complete!");
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
