# Followup Outcome Tracking Implementation
**Date:** September 10, 2026  
**Implementer:** Claude (Sonnet 4.5)  
**Commit:** 011de17

---

## Overview

Added customer follow-up tracking system for AI diagnosis emails. Customers can now click links in diagnosis emails to indicate whether the AI diagnosis helped them (deflection) or if they still need assistance (escalation to CRM).

---

## Implementation Details

### Database Changes

Added two new columns to `website_leads` table:

```sql
ALTER TABLE website_leads ADD COLUMN IF NOT EXISTS "followupRespondedAt" TIMESTAMP;
ALTER TABLE website_leads ADD COLUMN IF NOT EXISTS "crmPendingId" INTEGER;
```

**Migration script:** `add-followup-columns.cjs` (run against production DB after deployment)

### Email Template Changes

Updated `sendDiagnosisEmail()` in `server/_core/notification.ts`:

**Before:**
```
Did this help?
If this resolved your issue, great! If not, you can schedule a service call here:
https://pellsolar.com/solar-repair#service-form
```

**After:**
```
Did this help?
→ Yes, this resolved my issue: https://pellsolar.com/solar-repair?followup={leadId}&outcome=helped
→ No, I still need help: https://pellsolar.com/solar-repair?followup={leadId}&outcome=need_help

Just click one of the links above so we know how to follow up.
```

### New tRPC Mutation

**Endpoint:** `service.recordFollowupOutcome`

**Input Schema:**
```typescript
{
  leadId: number,
  outcome: "helped" | "need_help"
}
```

**Rate Limiting:**
- 10 requests per hour per IP
- In-memory rate limiter (followupRateLimit Map)

**Behavior:**

#### 1. Outcome: "helped" (Customer self-resolved)
- Updates DB: `diagnosisOutcome = "helped"`, `followupRespondedAt = now()`
- Sends deflection email to Josh with:
  - Customer name and contact info
  - Original AI diagnosis text
  - "No further action needed - customer self-resolved" message
- Returns success panel to customer:
  - "Great! Glad we could help. Call us anytime at (909) 240-5294."

#### 2. Outcome: "need_help" (Escalate to service)
- Retrieves lead from DB
- Builds service payload from stored fields:
  - Contact: name, email, phone, address
  - System: systemType, inverterBrand, batteryBrand, systemAge
  - Issue: selectedIssues, duration, errorCode, AI diagnosis
  - Photos: converts photoKeys to signed URLs (7-day expiry)
- POSTs to CRM service-intake webhook
  - URL: `https://pellsolar-crm-prod.onrender.com/api/webhooks/service-intake`
  - Includes all system details + AI diagnosis in notes
  - Attaches photos as signed URLs
- Updates DB:
  - `diagnosisOutcome = "need_help"`
  - `followupRespondedAt = now()`
  - `crmDealId` (from CRM response)
  - `crmPendingId` (from CRM response if available)
- Returns success panel to customer:
  - "We've opened a service request and will call you within one business day."
  - Phone number: (909) 240-5294

### Idempotency

- Mutation checks if `diagnosisOutcome` is already set (not "unknown")
- If already recorded, just re-shows the success panel (no duplicate CRM tickets)
- Safe to click followup link multiple times

### Validation

- Lead ID must exist in database
- `diagnosisOutcome` must be null or "unknown" for first response
- Rate limited to prevent abuse

---

## Files Changed

1. **`drizzle/schema.ts`**
   - Added `followupRespondedAt: timestamp("followupRespondedAt")`
   - Added `crmPendingId: integer("crmPendingId")`

2. **`server/db.ts`**
   - Added `recordFollowup()` helper function
   - Export added to routers.ts imports

3. **`server/routers.ts`**
   - Added followup rate limiting (lines 47-50)
   - Updated diagnose flow to store lead ID BEFORE sending email (lines 579-625)
   - Added `service.recordFollowupOutcome` mutation (lines 876-993)
   - Updated imports to include `recordFollowup`

4. **`server/_core/notification.ts`**
   - Updated `sendDiagnosisEmail()` signature to accept `websiteLeadId?: number`
   - Added conditional followup links to email template
   - Falls back to generic message if no lead ID

5. **`add-followup-columns.cjs`**
   - Migration script for production database
   - Adds both columns with IF NOT EXISTS

---

## Deployment

**Status:** Code deployed to GitHub main (011de17), awaiting Render deployment

**Deployment Steps:**
1. ✅ Code pushed to GitHub main
2. ⏳ Render auto-deploy (waiting for verification)
3. ⏳ Run migration: `node add-followup-columns.cjs` (requires DATABASE_URL from Render)
4. ⏳ Test with real lead

**Migration Pending:**
- Migration script created but needs production DATABASE_URL
- Run on Render after deployment completes
- Alternatively: run via Render console or add env var temporarily

---

## Testing Plan (PART 3)

Once deployment completes and migration runs:

### 1. Create Test Lead
```sql
INSERT INTO website_leads (
  "firstName", "lastName", "email", "phone",
  "inverterBrand", "aiDiagnosis", "diagnosisOutcome",
  "ownershipType", "interestType", "createdAt"
) VALUES (
  'Herald', 'Followup', 'josh@pellsolar.com', '9095550144',
  'Enphase', 'test diagnosis text', 'unknown',
  'homeowner', 'other', NOW()
) RETURNING id;
```

### 2. Test "need_help" Outcome
```bash
curl -X POST https://pellsolar.com/api/trpc/service.recordFollowupOutcome \
  -H "Content-Type: application/json" \
  -d '{"leadId": <ID_FROM_ABOVE>, "outcome": "need_help"}'
```

**Expected Result:**
- ✅ Response: `{ success: true, outcome: "need_help", message: "..." }`
- ✅ DB updated: `diagnosisOutcome = "need_help"`, `followupRespondedAt` set
- ✅ CRM deal created (query deals/customers for "Herald Followup")
- ✅ Deal note contains "test diagnosis text"

### 3. Verify CRM Integration
```sql
-- Check CRM for new deal
SELECT d.id, d.name, c.first_name, c.last_name 
FROM deals d 
JOIN customers c ON d.customer_id = c.id 
WHERE c.first_name = 'Herald' AND c.last_name = 'Followup';

-- Check deal notes
SELECT content FROM notes WHERE deal_id = <DEAL_ID>;
```

### 4. Cleanup
```sql
-- Delete from website DB
DELETE FROM website_leads WHERE firstName = 'Herald' AND lastName = 'Followup';

-- Delete from CRM DB (run on CRM database)
DELETE FROM notes WHERE deal_id = <DEAL_ID>;
DELETE FROM activity_logs WHERE deal_id = <DEAL_ID>;
DELETE FROM files WHERE deal_id = <DEAL_ID>;
DELETE FROM deals WHERE id = <DEAL_ID>;
DELETE FROM customers WHERE first_name = 'Herald' AND last_name = 'Followup';
```

---

## PART 1: Auto-Deploy Status

**Push Status:** ✅ Successful
- Commit 011de17 pushed to main at 2026-09-10
- Waited 90 seconds for auto-deploy to start

**Verification Needed:**
- Check Render dashboard to confirm deployment started/completed
- Verify new code is live on pellsolar.com
- Alternative: Check if bundle hash changed in page source

**If auto-deploy didn't trigger:**
- Check GitHub → pellsolar-website repo → Settings → Webhooks
- Verify Render webhook exists and recent deliveries succeeded
- Check Render service settings → autoDeploy is "yes"
- Check Render service → Environment → branch matches push branch (main)

---

## Metrics to Track

Once live, monitor these deflection metrics:

1. **Deflection Rate:**
   ```sql
   SELECT 
     COUNT(CASE WHEN "diagnosisOutcome" = 'helped' THEN 1 END) as deflected,
     COUNT(CASE WHEN "diagnosisOutcome" = 'need_help' THEN 1 END) as escalated,
     COUNT(CASE WHEN "diagnosisOutcome" = 'unknown' THEN 1 END) as no_response,
     COUNT(*) as total
   FROM website_leads 
   WHERE "aiDiagnosis" IS NOT NULL 
     AND "diagnosisEmailSentAt" IS NOT NULL;
   ```

2. **Response Time:**
   ```sql
   SELECT AVG(EXTRACT(EPOCH FROM ("followupRespondedAt" - "diagnosisEmailSentAt"))) / 3600 as avg_hours
   FROM website_leads 
   WHERE "followupRespondedAt" IS NOT NULL;
   ```

3. **CRM Integration Success:**
   ```sql
   SELECT 
     COUNT(CASE WHEN "crmDealId" IS NOT NULL THEN 1 END) as crm_success,
     COUNT(CASE WHEN "crmDealId" IS NULL AND "diagnosisOutcome" = 'need_help' THEN 1 END) as crm_failed,
     COUNT(*) as total_need_help
   FROM website_leads 
   WHERE "diagnosisOutcome" = 'need_help';
   ```

---

## Cost Impact

**Minimal:**
- No additional API calls for "helped" outcome (just DB update + one email to Josh)
- "need_help" outcome: one CRM webhook call (already existed for direct submissions)
- Storage: 2 columns (timestamp + integer) per lead

**Expected ROI:**
- Deflection rate target: 30-50% (based on audit recommendations)
- Every deflected service call saves ~$100-200 in technician time
- At 100 diagnoses/month with 40% deflection: 40 fewer service calls = $4,000-8,000/month saved

---

**End of Implementation Report**  
Next: Verify deployment → Run migration → Test live → Monitor metrics
