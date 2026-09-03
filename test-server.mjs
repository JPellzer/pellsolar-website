import { spawn } from 'child_process';
import superjson from 'superjson';

// Start server on PORT=4997 without DATABASE_URL
console.log("Starting server on PORT=4997...\n");
const server = spawn('node', ['dist/index.js'], {
  env: { ...process.env, PORT: '4997', DATABASE_URL: '' },
  stdio: ['ignore', 'pipe', 'pipe']
});

server.stdout.on('data', (data) => {
  console.log(`[SERVER] ${data.toString().trim()}`);
});

server.stderr.on('data', (data) => {
  console.error(`[SERVER ERROR] ${data.toString().trim()}`);
});

// Wait for server to start
await new Promise(resolve => setTimeout(resolve, 3000));

console.log("\n=== TESTING TRPC REQUEST ===\n");

// Exact payload from QuotePage.tsx
const clientPayload = {
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  phone: "7145551234",
  address: "123 Test St",
  city: "TestCity",
  state: "CA",
  zip: "92376",
  ownershipType: "homeowner",
  propertyType: "family_home",
  zipCode: "92376",
  existingSolar: false,
  solarMotivation: "reduce_bills",
  paymentPreference: "financing",
  monthlyBillRange: "200-300",
  interestType: "solar",
  interestOtherText: undefined,
  source: "quote-page",
  billFileKey: undefined,
  billFileUrl: undefined,
  billFileName: undefined,
  utmData: undefined,
  _hp: ""
};

// Encode with superjson and create batch request exactly like the client does
const serialized = superjson.serialize(clientPayload);
const batchRequest = { "0": serialized };

console.log("Sending batch request with superjson encoding...\n");

try {
  const response = await fetch('http://localhost:4997/api/trpc/leads.create?batch=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(batchRequest)
  });

  console.log(`HTTP ${response.status} ${response.statusText}\n`);

  const text = await response.text();
  console.log("Response body:");
  console.log(text);

  if (!response.ok) {
    try {
      const json = JSON.parse(text);
      console.log("\n=== PARSED ERROR ===");
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log("\n(Could not parse as JSON)");
    }
  }
} catch (error) {
  console.error("Fetch failed:", error.message);
} finally {
  server.kill();
  process.exit(0);
}
