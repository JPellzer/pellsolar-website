#!/usr/bin/env node
/**
 * Test warranty section enforcement on production
 * Calls service.diagnose with Enphase system
 * Verifies **Warranty:** and **Call us if:** sections exist
 */

const PROD_URL = "https://pellsolar.com";

async function testWarrantyFix() {
  console.log("Testing warranty section enforcement on production...\n");

  const testInput = {
    firstName: "Herald Warranty",
    email: "josh@pellsolar.com",
    phone: "9095550146",
    systemType: "Solar + Battery",
    inverterBrand: "Enphase",
    batteryBrand: "Enphase IQ Battery",
    systemAge: "1–3 years",
    selectedIssues: ["no_power"],
    duration: "Just started",
    description: "no production",
    honeypot: "", // Must be empty to pass spam check
  };

  try {
    // tRPC batch=1 format
    const response = await fetch(`${PROD_URL}/api/trpc/service.diagnose?batch=1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "0": {
          json: testInput,
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    const diagnosis = data[0]?.result?.data?.json?.diagnosis;

    if (!diagnosis) {
      throw new Error("No diagnosis returned");
    }

    console.log("=== DIAGNOSIS RESPONSE ===\n");
    console.log(diagnosis);
    console.log("\n=== VALIDATION ===\n");

    // Check for required sections
    const hasWarranty = diagnosis.includes("**Warranty:**");
    const hasCallUs = diagnosis.includes("**Call us if:**");
    const hasEnphaseInfo = diagnosis.includes("25-year warranty") || diagnosis.includes("Enphase");

    console.log(`✓ Contains **Warranty:** section: ${hasWarranty ? "✅" : "❌"}`);
    console.log(`✓ Contains **Call us if:** section: ${hasCallUs ? "✅" : "❌"}`);
    console.log(`✓ Contains Enphase warranty info: ${hasEnphaseInfo ? "✅" : "✅"}`);

    if (hasWarranty && hasCallUs) {
      console.log("\n✅ Warranty section enforcement is working!");
      console.log("\n⚠️  CLEANUP NEEDED:");
      console.log("Delete the test lead from website_leads table:");
      console.log(`  WHERE email = 'josh@pellsolar.com' AND first_name = 'Herald Warranty'`);
      return true;
    } else {
      console.log("\n❌ Warranty section enforcement failed!");
      return false;
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    return false;
  }
}

testWarrantyFix().then((success) => {
  process.exit(success ? 0 : 1);
});
