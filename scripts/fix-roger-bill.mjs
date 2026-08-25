/**
 * Fix Roger Fumey's bill file URL
 * Generates a fresh 7-day signed URL for his CSV file and updates the DB
 */
import { createConnection } from "mysql2/promise";

const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

if (!FORGE_API_URL || !FORGE_API_KEY || !DATABASE_URL) {
  console.error("Missing env vars. Need: BUILT_IN_FORGE_API_URL, BUILT_IN_FORGE_API_KEY, DATABASE_URL");
  process.exit(1);
}

const ROGER_ID = 480001;
const BILL_KEY = "bills/1779813313147-SCE_Usage_8004932902_05-01-25_to_05-26-26_8abbd5d8.csv";

async function generateSignedUrl(key) {
  const forgeUrl = FORGE_API_URL.replace(/\/+$/, "");
  const url = new URL("v1/storage/presign/get", forgeUrl + "/");
  url.searchParams.set("path", key);
  url.searchParams.set("expiry", "604800"); // 7 days

  const resp = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${FORGE_API_KEY}` },
  });

  if (!resp.ok) {
    const msg = await resp.text().catch(() => resp.statusText);
    throw new Error(`Signed URL failed (${resp.status}): ${msg}`);
  }

  const data = await resp.json();
  console.log("Forge response:", JSON.stringify(data));
  return data.url;
}

async function main() {
  console.log("Generating signed URL for Roger Fumey's bill file...");
  
  let signedUrl;
  try {
    signedUrl = await generateSignedUrl(BILL_KEY);
    console.log("Signed URL generated:", signedUrl ? signedUrl.substring(0, 80) + "..." : "NULL");
  } catch (e) {
    console.error("Failed to generate signed URL:", e.message);
    // Fall back to /manus-storage/ path
    signedUrl = `/manus-storage/${BILL_KEY}`;
    console.log("Using fallback URL:", signedUrl);
  }

  // Connect to DB and update Roger's record
  const conn = await createConnection(DATABASE_URL);
  
  try {
    const [result] = await conn.execute(
      "UPDATE leads SET billFileUrl = ? WHERE id = ?",
      [signedUrl, ROGER_ID]
    );
    console.log("DB update result:", result);
    console.log("✓ Roger Fumey's billFileUrl updated successfully");
    
    // Verify
    const [rows] = await conn.execute(
      "SELECT id, firstName, lastName, billFileKey, billFileUrl, billFileName FROM leads WHERE id = ?",
      [ROGER_ID]
    );
    console.log("Updated record:", JSON.stringify(rows[0], null, 2));
  } finally {
    await conn.end();
  }
}

main().catch(console.error);
