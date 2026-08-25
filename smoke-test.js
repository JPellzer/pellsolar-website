#!/usr/bin/env node
import { spawn } from "child_process";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

console.log("[Smoke Test] Starting server on port 4998...");

const server = spawn("node", ["dist/index.js"], {
  env: {
    ...process.env,
    PORT: "4998",
    NODE_ENV: "production",
    JWT_SECRET: "test-secret",
    DATABASE_URL: undefined, // Skip database for smoke test
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
server.stdout.on("data", (data) => {
  output += data.toString();
});
server.stderr.on("data", (data) => {
  output += data.toString();
});

// Wait 4 seconds for server to start
setTimeout(async () => {
  try {
    // Test 1: GET / should return 200
    console.log("[Smoke Test] Testing GET /...");
    const response = await fetch("http://localhost:4998/");
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    console.log("✓ GET / returns 200");

    // Test 2: Check built client bundle for maps.googleapis.com
    console.log("[Smoke Test] Checking client bundle references...");
    const assetsDir = "dist/public/assets";
    const files = readdirSync(assetsDir).filter((f) => f.endsWith(".js"));
    let foundGoogleMaps = false;
    let foundButterfly = false;

    for (const file of files) {
      const content = readFileSync(join(assetsDir, file), "utf8");
      if (content.includes("maps.googleapis.com")) {
        foundGoogleMaps = true;
      }
      if (content.includes("butterfly-effect")) {
        foundButterfly = true;
      }
    }

    if (!foundGoogleMaps) {
      throw new Error("maps.googleapis.com not found in client bundle");
    }
    console.log("✓ Client bundle references maps.googleapis.com");

    if (foundButterfly) {
      throw new Error("butterfly-effect found in client bundle");
    }
    console.log("✓ Client bundle does NOT reference butterfly-effect");

    console.log("\n[Smoke Test] All checks passed ✓");
    process.exit(0);
  } catch (error) {
    console.error("\n[Smoke Test] FAILED:", error.message);
    console.log("\nServer output:", output);
    process.exit(1);
  } finally {
    server.kill();
  }
}, 4000);

// Timeout if server doesn't start in 10 seconds
setTimeout(() => {
  console.error("[Smoke Test] Server failed to start in 10 seconds");
  console.log("Server output:", output);
  server.kill();
  process.exit(1);
}, 10000);
