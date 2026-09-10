#!/usr/bin/env node
const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://pellsolar:yKkGMWVIfZeGvndQMeZ2ZCJZ3cvQEH0k@dpg-d747j3ogjchc73b35gag-a.oregon-postgres.render.com/pellsolar';

async function main() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // Step 1: Create test lead
    console.log("Creating test leads...");

    const regressionResult = await pool.query(`
      INSERT INTO website_leads (
        "firstName", "lastName", "email", "phone",
        "ownershipType", "interestType",
        "inverterBrand", "aiDiagnosis", "diagnosisOutcome",
        "createdAt", "updatedAt"
      ) VALUES (
        'Herald', 'Regress', 'josh@pellsolar.com', '9095550145',
        'homeowner', 'other',
        'Enphase', 'Regression test - app not reporting', 'unknown',
        NOW(), NOW()
      ) RETURNING id;
    `);
    const regressId = regressionResult.rows[0].id;
    console.log(`✓ Created regression test lead (ID: ${regressId})`);

    const followupResult = await pool.query(`
      INSERT INTO website_leads (
        "firstName", "lastName", "email", "phone",
        "ownershipType", "interestType",
        "inverterBrand", "aiDiagnosis", "diagnosisOutcome",
        "createdAt", "updatedAt"
      ) VALUES (
        'Herald', 'Followup', 'josh@pellsolar.com', '9095550144',
        'homeowner', 'other',
        'Enphase', 'test diagnosis text', 'unknown',
        NOW(), NOW()
      ) RETURNING id;
    `);
    const followupId = followupResult.rows[0].id;
    console.log(`✓ Created followup test lead (ID: ${followupId})`);

    // Step 2: Test recordFollowupOutcome with 'need_help'
    console.log(`\nTest lead created with ID: ${followupId}`);
    console.log("To test recordFollowupOutcome, call:");
    console.log(`  POST https://pellsolar.com/api/trpc/service.recordFollowupOutcome`);
    console.log(`  Body: {"leadId": ${followupId}, "outcome": "need_help"}`);
    console.log("\nOr use this curl command:");
    console.log(`curl -X POST https://pellsolar.com/api/trpc/service.recordFollowupOutcome \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '{"0":{"json":{"leadId":${followupId},"outcome":"need_help"}}}'`);

    console.log(`\nTest IDs created:`);
    console.log(`  Herald Regress: ${regressId}`);
    console.log(`  Herald Followup: ${followupId}`);

  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
