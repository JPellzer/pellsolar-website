#!/usr/bin/env node
/**
 * Test service.diagnose mutation against production
 */

const https = require('https');

const payload = {
  firstName: "Herald",
  email: "josh@pellsolar.com",
  systemType: "Solar Only",
  inverterBrand: "Enphase",
  batteryBrand: "No Battery",
  systemAge: "3–5 years",
  selectedIssues: ["monitoring_issue"],
  duration: "A few days",
  description: "App not reporting production data",
  photoKeys: []
};

const requestData = JSON.stringify({
  "0": {
    json: payload
  }
});

const options = {
  hostname: 'pellsolar.com',
  path: '/api/trpc/service.diagnose',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': requestData.length
  }
};

console.log("Testing service.diagnose on production...");
console.log("Payload:", JSON.stringify(payload, null, 2));

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`\nStatus: ${res.statusCode}`);
    if (res.statusCode === 200) {
      const result = JSON.parse(data);
      if (result[0]?.result?.data?.json?.diagnosis) {
        console.log("✅ Diagnosis generated successfully");
        console.log("\nDiagnosis preview (first 200 chars):");
        console.log(result[0].result.data.json.diagnosis.substring(0, 200) + "...");
      } else {
        console.log("⚠️ Unexpected response format");
        console.log(data);
      }
    } else {
      console.log("❌ Request failed");
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.error("❌ Request error:", error.message);
});

req.write(requestData);
req.end();
