import superjson from 'superjson';
import { z } from 'zod';

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

console.log("=== ORIGINAL PAYLOAD ===");
console.log(JSON.stringify(clientPayload, null, 2));

console.log("\n=== SUPERJSON SERIALIZED ===");
const serialized = superjson.serialize(clientPayload);
console.log(JSON.stringify(serialized, null, 2));

console.log("\n=== BATCH FORMAT (what client sends) ===");
const batchPayload = {
  "0": serialized
};
console.log(JSON.stringify(batchPayload, null, 2));

console.log("\n=== SUPERJSON DESERIALIZED ===");
const deserialized = superjson.deserialize(serialized);
console.log(JSON.stringify(deserialized, null, 2));

console.log("\n=== CHECKING FOR DIFFERENCES ===");
const jsonSerialized = JSON.stringify(serialized.json);
const jsonDeserialized = JSON.stringify(deserialized);
if (jsonSerialized === jsonDeserialized) {
  console.log("✅ Serialization round-trip is symmetric");
} else {
  console.log("❌ MISMATCH DETECTED");
  console.log("Serialized json:", jsonSerialized);
  console.log("Deserialized:", jsonDeserialized);
}

// Check what the meta field contains
console.log("\n=== SUPERJSON META ===");
if (serialized.meta) {
  console.log(JSON.stringify(serialized.meta, null, 2));
} else {
  console.log("(no meta — all fields are plain JSON types)");
}

// Recreate the schema
const LeadSourceSchema = z.string().trim().min(1).max(64);
const UtmDataSchema = z.object({
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  gclid: z.string().optional(),
}).optional();

const CreateLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().optional(),
  ownershipType: z.enum(["homeowner", "renter"]),
  propertyType: z.enum(["family_home", "apartment", "commercial"]).optional(),
  zipCode: z.string().optional(),
  existingSolar: z.boolean().optional().transform(v => v === undefined ? undefined : (v ? 1 : 0)),
  solarMotivation: z.enum(["price_stability", "reduce_bills", "all_electric", "other"]).optional(),
  paymentPreference: z.enum(["leasing", "financing", "cash"]).optional(),
  monthlyBillRange: z.string().optional(),
  interestType: z.enum(["solar", "battery", "solar_battery", "ev_charger", "other"]).default("solar"),
  interestOtherText: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  billFileKey: z.string().optional(),
  billFileUrl: z.string().optional(),
  billFileName: z.string().optional(),
  source: LeadSourceSchema.default("homepage"),
  utmData: UtmDataSchema,
  _hp: z.string().optional(),
});

console.log("\n=== VALIDATING DESERIALIZED PAYLOAD ===");
try {
  const result = CreateLeadSchema.parse(deserialized);
  console.log("✅ VALIDATION PASSED on deserialized payload");
} catch (error) {
  console.log("❌ VALIDATION FAILED on deserialized payload");
  console.log("\nError:", error.message);
  if (error.errors) {
    console.log("\nDetailed errors:");
    error.errors.forEach(err => {
      console.log(`  - ${err.path.join('.')}: ${err.message} (received: ${JSON.stringify(err.received)})`);
    });
  }
}
