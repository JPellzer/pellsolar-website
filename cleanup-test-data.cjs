#!/usr/bin/env node
/**
 * Cleanup test data from website_leads and CRM databases
 */

const { Pool } = require('pg');

const WEBSITE_DB_URL = 'postgresql://pellsolar:yKkGMWVIfZeGvndQMeZ2ZCJZ3cvQEH0k@dpg-d747j3ogjchc73b35gag-a.oregon-postgres.render.com/pellsolar';
const CRM_DB_URL = 'postgresql://pellsolar:yKkGMWVIfZeGvndQMeZ2ZCJZ3cvQEH0k@dpg-d747j3ogjchc73b35gag-a.oregon-postgres.render.com/pellsolar';

async function main() {
  const pool = new Pool({
    connectionString: WEBSITE_DB_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log("Cleaning up test data...\n");

    // 1. Get test lead IDs
    const leads = await pool.query(`
      SELECT id, "firstName", "lastName", "crmDealId"
      FROM website_leads
      WHERE ("firstName" = 'Herald' AND "lastName" IN ('Regress', 'Followup'))
         OR phone IN ('9095550144', '9095550145');
    `);

    if (leads.rows.length === 0) {
      console.log("No test leads found to clean up.");
      await pool.end();
      return;
    }

    console.log(`Found ${leads.rows.length} test leads:`);
    leads.rows.forEach(row => {
      console.log(`  - ${row.firstName} ${row.lastName} (ID: ${row.id}, CRM Deal: ${row.crmDealId || 'none'})`);
    });

    // 2. Delete from website_leads
    const leadIds = leads.rows.map(r => r.id);
    await pool.query(`
      DELETE FROM website_leads WHERE id = ANY($1);
    `, [leadIds]);
    console.log(`\n✓ Deleted ${leads.rows.length} test leads from website_leads`);

    // 3. Clean up CRM data (if deals were created)
    const dealIds = leads.rows.map(r => r.crmDealId).filter(Boolean);
    if (dealIds.length > 0) {
      console.log(`\nCleaning up CRM data for ${dealIds.length} deals...`);

      // Get customer IDs first
      const customers = await pool.query(`
        SELECT DISTINCT customer_id FROM deals WHERE id = ANY($1);
      `, [dealIds]);
      const customerIds = customers.rows.map(r => r.customer_id);

      // Delete in order: notes, activity_logs, files, deals, customers
      await pool.query(`DELETE FROM notes WHERE deal_id = ANY($1);`, [dealIds]);
      console.log(`  ✓ Deleted notes`);

      await pool.query(`DELETE FROM activity_logs WHERE deal_id = ANY($1);`, [dealIds]);
      console.log(`  ✓ Deleted activity logs`);

      await pool.query(`DELETE FROM files WHERE deal_id = ANY($1);`, [dealIds]);
      console.log(`  ✓ Deleted files`);

      await pool.query(`DELETE FROM deals WHERE id = ANY($1);`, [dealIds]);
      console.log(`  ✓ Deleted deals`);

      if (customerIds.length > 0) {
        await pool.query(`
          DELETE FROM customers
          WHERE id = ANY($1)
            AND (first_name = 'Herald' AND last_name IN ('Regress', 'Followup'));
        `, [customerIds]);
        console.log(`  ✓ Deleted customers`);
      }
    }

    // 4. Verify cleanup
    console.log("\nVerifying cleanup...");
    const remaining = await pool.query(`
      SELECT COUNT(*) FROM website_leads
      WHERE ("firstName" = 'Herald' AND "lastName" IN ('Regress', 'Followup'))
         OR phone IN ('9095550144', '9095550145');
    `);

    if (remaining.rows[0].count === '0') {
      console.log("✅ All test data cleaned up successfully");
    } else {
      console.log(`⚠️ ${remaining.rows[0].count} test leads still remain`);
    }

  } catch (error) {
    console.error("❌ Cleanup failed:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
