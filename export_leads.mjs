import { createConnection } from '/home/ubuntu/pell-solar-crm/node_modules/.pnpm/mysql2@3.15.1/node_modules/mysql2/promise.js';
import { writeFileSync } from 'fs';

const conn = await createConnection(process.env.DATABASE_URL);
const [rows] = await conn.execute('SELECT * FROM leads ORDER BY createdAt ASC');
console.log(`Found ${rows.length} leads`);

if (rows.length > 0) {
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map(row => headers.map(h => {
      const val = row[h];
      if (val === null || val === undefined) return '';
      const str = String(val).replace(/"/g, '""');
      return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str}"` : str;
    }).join(','))
  ].join('\n');
  writeFileSync('/home/ubuntu/pell_solar_leads_export.csv', csv);
  console.log('CSV saved to /home/ubuntu/pell_solar_leads_export.csv');
  rows.forEach(r => {
    console.log(`  ${r.firstName} ${r.lastName} | ${r.email} | ${r.phone} | ${r.address} | ${r.interestType} | ${r.createdAt}`);
  });
} else {
  console.log('No leads found in database.');
}
await conn.end();
