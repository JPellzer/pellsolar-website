#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');

// Get RENDER_API_KEY from migration parent .env or environment
let RENDER_API_KEY = process.env.RENDER_API_KEY;
if (!RENDER_API_KEY) {
  try {
    const envPath = path.join(__dirname, '../.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^RENDER_API_KEY=(.+)$/m);
    if (match) RENDER_API_KEY = match[1];
  } catch (e) {
    // Ignore
  }
}

// Try hardcoded key from earlier scripts if not found
if (!RENDER_API_KEY) {
  console.error("RENDER_API_KEY not found. Checking Render manually recommended.");
  process.exit(1);
}

function apiRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.render.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RENDER_API_KEY}`,
        'Accept': 'application/json'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    console.log("Fetching pellsolar-website service...");
    const services = await apiRequest('/v1/services?name=pellsolar-website&limit=1');

    if (!services || services.length === 0) {
      console.error("Service not found");
      process.exit(1);
    }

    const service = services[0].service;
    console.log(`\nService: ${service.name} (${service.id})`);
    console.log(`Auto-deploy: ${service.autoDeploy}`);
    console.log(`Branch: ${service.branch}`);
    console.log(`Repo: ${service.repo}`);

    console.log("\nLast 5 deploys:");
    const deploys = await apiRequest(`/v1/services/${service.id}/deploys?limit=5`);
    deploys.forEach((d, i) => {
      const deploy = d.deploy;
      console.log(`  ${i+1}. ${deploy.status} | ${deploy.trigger} | ${deploy.commit?.id?.substring(0,7) || 'N/A'} | ${new Date(deploy.createdAt).toLocaleString()}`);
    });

    // Check if latest deploy matches our commit
    const latestDeploy = deploys[0].deploy;
    console.log(`\nLatest deploy commit: ${latestDeploy.commit?.id?.substring(0,7)}`);
    console.log(`Target commits: cb10ef6 or 011de17`);

  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
