/**
 * Fix Roger Fumey's CRM record:
 * 1. Generate a 7-day signed URL for his uploaded CSV file
 * 2. Update the billFileUrl in the local database
 * 3. Re-send the lead to the Solar Pro CRM with the correct file URL
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;
const CRM_WEBHOOK_URL = "https://app.pellsolar.com/api/webhooks/website-lead";

const ROGER_FILE_KEY = "bills/1779813313147-SCE_Usage_8004932902_05-01-25_to_05-26-26_8abbd5d8.csv";
const ROGER_LEAD_ID = 480001;

async function getSignedUrl(key, expiresInSeconds = 604800) {
  const forgeUrl = FORGE_API_URL.replace(/\/+$/, "");
  const url = new URL("v1/storage/presign/get", forgeUrl + "/");
  url.searchParams.set("path", key);
  url.searchParams.set("expiry", String(expiresInSeconds));

  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${FORGE_API_KEY}` },
  });

  if (!resp.ok) {
    const msg = await resp.text().catch(() => resp.statusText);
    throw new Error(`Storage signed URL failed (${resp.status}): ${msg}`);
  }

  const data = await resp.json();
  console.log("Forge API response:", JSON.stringify(data));
  return data.url;
}

async function sendToCrm(payload) {
  const resp = await fetch(CRM_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await resp.json().catch(() => ({}));
  console.log("CRM response:", resp.status, JSON.stringify(data));
  return data;
}

async function main() {
  console.log("=== Fix Roger Fumey CRM Record ===");
  
  if (!FORGE_API_URL || !FORGE_API_KEY) {
    console.error("Missing BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY");
    process.exit(1);
  }

  // Step 1: Generate a 7-day signed URL for the CSV file
  console.log("\n1. Generating 7-day signed URL for Roger's CSV file...");
  let signedUrl;
  try {
    signedUrl = await getSignedUrl(ROGER_FILE_KEY);
    console.log("✅ Signed URL generated:", signedUrl ? signedUrl.substring(0, 80) + "..." : "EMPTY");
  } catch (e) {
    console.error("❌ Failed to generate signed URL:", e.message);
    // Try without expiry param as fallback
    console.log("   Trying without expiry param...");
    try {
      const forgeUrl = FORGE_API_URL.replace(/\/+$/, "");
      const url = new URL("v1/storage/presign/get", forgeUrl + "/");
      url.searchParams.set("path", ROGER_FILE_KEY);
      const resp = await fetch(url, {
        headers: { Authorization: `Bearer ${FORGE_API_KEY}` },
      });
      const data = await resp.json().catch(() => ({}));
      console.log("Fallback response:", resp.status, JSON.stringify(data));
      signedUrl = data.url;
    } catch (e2) {
      console.error("❌ Fallback also failed:", e2.message);
    }
  }

  if (!signedUrl) {
    console.error("❌ Could not generate a signed URL. Aborting.");
    process.exit(1);
  }

  // Step 2: Send to Solar Pro CRM with the correct file URL
  console.log("\n2. Sending Roger Fumey's lead to Solar Pro CRM with file URL...");
  const crmResult = await sendToCrm({
    first_name: "Roger",
    last_name: "Fumey",
    email: "rjfumey@gmail.com",
    phone: "9097312998",
    type: "new_lead",
    source: "upload-bill",
    bill_file_url: signedUrl,
    bill_file_name: "SCE_Usage_8004932902_05-01-25_to_05-26-26.csv",
    notes: "Customer uploaded SCE Green Button CSV data. Re-submitted with corrected file URL.",
  });

  if (crmResult.success || crmResult.deal_id || crmResult.customer_id) {
    console.log("✅ Successfully sent to CRM!");
    console.log("   deal_id:", crmResult.deal_id);
    console.log("   customer_id:", crmResult.customer_id);
    console.log("   Signed URL to update in DB:", signedUrl.substring(0, 100) + "...");
  } else {
    console.error("❌ CRM rejected the submission:", JSON.stringify(crmResult));
  }
}

main().catch(console.error);
