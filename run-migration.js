import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config();

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  try {
    await client.connect();
    console.log('✓ Connected to database\n');

    // Read the migration SQL
    const migrationSQL = await fs.readFile('drizzle/0000_shallow_microbe.sql', 'utf-8');

    // Split by statement-breakpoint and execute each statement
    const statements = migrationSQL
      .split('--> statement-breakpoint')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute\n`);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      const preview = stmt.substring(0, 80).replace(/\n/g, ' ');

      try {
        await client.query(stmt);
        console.log(`✓ Statement ${i + 1}/${statements.length}: ${preview}...`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠ Statement ${i + 1}/${statements.length}: ${preview}... (already exists, skipped)`);
        } else {
          console.error(`✗ Statement ${i + 1}/${statements.length} failed:`, error.message);
          throw error;
        }
      }
    }

    console.log('\n✓ Migration completed successfully');

    // Verify tables were created
    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name LIKE 'website_%'
      ORDER BY table_name;
    `);

    console.log('\n✓ Website tables created:', tables.rows.map(r => r.table_name));

    await client.end();
    console.log('\n✓ Connection closed');
  } catch (error) {
    console.error('\n✗ Migration failed:', error.message);
    await client.end();
    process.exit(1);
  }
}

runMigration();
