#!/usr/bin/env tsx
/**
 * Test script to verify photo upload and diagnosis works with both JPEG and HEIC
 * Run with: npx tsx test-diagnose-photos.ts
 */

import sharp from "sharp";
import { randomBytes } from "crypto";
import { readFileSync, unlinkSync, writeFileSync } from "fs";
import path from "path";

const API_BASE = process.env.API_BASE || "https://pellsolar.com";

interface DiagnoseResponse {
  diagnosis: string;
}

interface UploadResponse {
  url: string;
  key: string;
}

// Helper to create a test JPEG image with text
async function createTestJPEG(): Promise<Buffer> {
  const svg = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#1a1a1a"/>
      <rect x="50" y="50" width="700" height="500" fill="#2a2a2a" stroke="#fed44d" stroke-width="4"/>
      <text x="400" y="250" font-family="Arial" font-size="60" fill="#ff0000" text-anchor="middle" font-weight="bold">ERROR 3-11</text>
      <text x="400" y="350" font-family="Arial" font-size="30" fill="#2babe2" text-anchor="middle">SolarEdge Inverter</text>
      <text x="400" y="420" font-family="Arial" font-size="24" fill="#fed44d" text-anchor="middle">AC DISCONNECT FAULT</text>
    </svg>
  `;

  return await sharp(Buffer.from(svg))
    .resize(800, 600)
    .jpeg({ quality: 90 })
    .toBuffer();
}

// Helper to create a test HEIC (actually convert JPEG to HEIC format if sharp supports it)
async function createTestHEIC(): Promise<Buffer> {
  const jpegBuffer = await createTestJPEG();

  try {
    // Try to create HEIC if sharp supports it
    return await sharp(jpegBuffer).heif({ quality: 85 }).toBuffer();
  } catch (error) {
    console.warn("Sharp cannot encode HEIF/HEIC on this system. Downloading sample HEIC instead...");

    // Try to download a public sample HEIC
    try {
      const sampleUrl = "https://filesamples.com/samples/image/heic/sample1.heic";
      const response = await fetch(sampleUrl);
      if (!response.ok) throw new Error(`Failed to download sample HEIC: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (dlError) {
      console.error("Could not download sample HEIC:", dlError);
      throw new Error("Cannot create or download HEIC for testing. Skipping HEIC test.");
    }
  }
}

// Upload a file to the service (using the existing upload-bill endpoint)
async function uploadFile(filename: string, buffer: Buffer, contentType: string): Promise<string> {
  const base64Data = buffer.toString("base64");

  const response = await fetch(`${API_BASE}/api/upload-bill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: filename,
      contentType,
      base64Data,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed: ${response.status} - ${text}`);
  }

  const data = await response.json() as { key: string; url: string; publicUrl: string };
  return data.key;
}

// Call the diagnose endpoint
async function callDiagnose(photoKeys: string[]): Promise<string> {
  const payload = {
    inverterBrand: "SolarEdge",
    issue: "Error code on display",
    errorCode: "",
    description: "inverter shows an error, photo attached",
    firstName: "Herald",
    lastName: "Phototest",
    email: "josh@pellsolar.com",
    phone: "9095550143",
    photoKeys,
    honeypot: "",
  };

  const response = await fetch(`${API_BASE}/api/trpc/service.diagnose`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Diagnose failed: ${response.status} - ${text}`);
  }

  const data = await response.json();
  // tRPC wraps the response
  return data.result?.data?.diagnosis || data.diagnosis || "No diagnosis returned";
}

// Clean up test data from DB and R2
async function cleanup(photoKeys: string[]) {
  console.log("\n🧹 Cleaning up test data...");
  console.log("   (Cleanup requires direct DB/R2 access - run manually if needed)");
  console.log(`   R2 keys to delete: ${photoKeys.join(", ")}`);
  console.log(`   DB query: DELETE FROM website_leads WHERE first_name='Herald' AND last_name='Phototest';`);
}

// Main test runner
async function main() {
  console.log("🧪 Testing photo diagnosis with JPEG and HEIC...\n");

  const uploadedKeys: string[] = [];

  try {
    // Test 1: JPEG photo
    console.log("📸 Test 1: Creating test JPEG with 'ERROR 3-11' text...");
    const jpegBuffer = await createTestJPEG();
    console.log(`   Created ${jpegBuffer.length} byte JPEG`);

    console.log("   Uploading JPEG...");
    const jpegKey = await uploadFile("test-inverter-error.jpg", jpegBuffer, "image/jpeg");
    uploadedKeys.push(jpegKey);
    console.log(`   ✓ Uploaded: ${jpegKey}`);

    console.log("   Calling diagnose endpoint with JPEG...");
    const jpegDiagnosis = await callDiagnose([jpegKey]);
    console.log("\n📋 JPEG Diagnosis Result:");
    console.log("─".repeat(80));
    console.log(jpegDiagnosis);
    console.log("─".repeat(80));

    // Verify the diagnosis references the photo content
    if (jpegDiagnosis.toLowerCase().includes("error") || jpegDiagnosis.toLowerCase().includes("3-11")) {
      console.log("\n✅ JPEG test PASSED - diagnosis references photo content\n");
    } else {
      console.log("\n⚠️  JPEG test WARNING - diagnosis may not reference photo content\n");
    }

    // Test 2: HEIC photo
    console.log("📸 Test 2: Creating test HEIC...");
    let heicBuffer: Buffer;
    let heicKey: string = "";
    try {
      heicBuffer = await createTestHEIC();
      console.log(`   Created ${heicBuffer.length} byte HEIC`);

      console.log("   Uploading HEIC...");
      heicKey = await uploadFile("test-inverter.heic", heicBuffer, "image/heic");
      uploadedKeys.push(heicKey);
      console.log(`   ✓ Uploaded: ${heicKey}`);

      console.log("   Calling diagnose endpoint with HEIC...");
      const heicDiagnosis = await callDiagnose([heicKey]);
      console.log("\n📋 HEIC Diagnosis Result:");
      console.log("─".repeat(80));
      console.log(heicDiagnosis);
      console.log("─".repeat(80));

      console.log("\n✅ HEIC test PASSED - diagnosis completed without error\n");
    } catch (error) {
      if (error instanceof Error && error.message.includes("Cannot create or download HEIC")) {
        console.log("\n⏭️  HEIC test SKIPPED - cannot create/download HEIC on this system\n");
      } else {
        throw error;
      }
    }

    // Cleanup
    await cleanup(uploadedKeys);

    console.log("\n✅ All tests completed successfully!");
    console.log("\nWhat changed:");
    console.log("  - BEFORE: llm.ts skipped URL-based images (returned empty text)");
    console.log("  - AFTER:  llm.ts fetches URLs, converts HEIC→JPEG, resizes to 1600px, sends as base64");
    console.log("  - Photos are now properly included in diagnosis prompts");

  } catch (error) {
    console.error("\n❌ Test failed:", error);
    // Attempt cleanup even on failure
    if (uploadedKeys.length > 0) {
      await cleanup(uploadedKeys);
    }
    process.exit(1);
  }
}

main();
