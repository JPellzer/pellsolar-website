import superjson from 'superjson';

// Simulate the exact payload QuotePage sends
const rawPayload = {
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

// Encode with superjson like the client does
const encoded = superjson.serialize(rawPayload);

console.log("=== RAW PAYLOAD ===");
console.log(JSON.stringify(rawPayload, null, 2));

console.log("\n=== SUPERJSON ENCODED ===");
console.log(JSON.stringify(encoded, null, 2));

// Prepare batch request like httpBatchLink does
const batchRequest = {
  "0": {
    json: encoded.json,
    meta: encoded.meta
  }
};

console.log("\n=== BATCH REQUEST (what client sends) ===");
console.log(JSON.stringify(batchRequest, null, 2));

// Now test with actual server
console.log("\n=== MAKING REQUEST TO SERVER ===");
const response = await fetch('http://localhost:4997/api/trpc/leads.create?batch=1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(batchRequest)
});

console.log(`Status: ${response.status}`);
const text = await response.text();
console.log(`Response: ${text}`);

if (!response.ok) {
  try {
    const json = JSON.parse(text);
    console.log("\n=== ERROR DETAILS ===");
    console.log(JSON.stringify(json, null, 2));
  } catch (e) {
    console.log("Could not parse error as JSON");
  }
}
