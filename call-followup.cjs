#!/usr/bin/env node
const https = require('https');

const leadId = parseInt(process.argv[2] || '15');
const outcome = process.argv[3] || 'need_help';

const requestData = JSON.stringify({
  "0": {
    json: { leadId, outcome }
  }
});

const options = {
  hostname: 'pellsolar.com',
  path: '/api/trpc/service.recordFollowupOutcome',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': requestData.length
  }
};

console.log(`Testing recordFollowupOutcome(leadId: ${leadId}, outcome: "${outcome}")...`);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}\n`);
    try {
      const parsed = JSON.parse(data);
      console.log("Response:", JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log("Raw response:", data);
    }
  });
});

req.on('error', (error) => {
  console.error("Request error:", error.message);
});

req.write(requestData);
req.end();
