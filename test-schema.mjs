import { z } from 'zod';

// Recreate the exact schema from routers.ts
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

// Exact payload from QuotePage.tsx lines 376-392
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

console.log("=== TESTING CLIENT PAYLOAD ===\n");
console.log("Input payload:");
console.log(JSON.stringify(clientPayload, null, 2));
console.log("\n=== VALIDATION RESULT ===\n");

try {
  const result = CreateLeadSchema.parse(clientPayload);
  console.log("✅ VALIDATION PASSED");
  console.log("\nTransformed result:");
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.log("❌ VALIDATION FAILED");
  console.log("\nError:", error.message);
  if (error.errors) {
    console.log("\nDetailed errors:");
    error.errors.forEach(err => {
      console.log(`  - ${err.path.join('.')}: ${err.message} (received: ${JSON.stringify(err.received)})`);
    });
  }
}
