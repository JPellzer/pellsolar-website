# Followup Outcome Feature - Status Report
**Date:** 2026-09-10  
**Status:** Columns added ✅ | Code committed ✅ | Deployment pending ⏳

---

## What's Complete

### 1. Database Columns ✅
```sql
ALTER TABLE website_leads ADD COLUMN "followupRespondedAt" TIMESTAMP;
ALTER TABLE website_leads ADD COLUMN "crmPendingId" INTEGER;
```
**Verified:** Both columns exist in production database

### 2. Code Changes ✅
**Commits:**
- `011de17` - Feature implementation (routers, db, schema, notification)
- `cb10ef6` - Documentation

**Pushed to:** GitHub main branch

### 3. Test Data Created ✅
**Leads in database:**
- ID 14: Herald Regress (regression test)
- ID 15: Herald Followup (followup outcome test)

---

## What's Pending

### Deployment Status ⏳
**Issue:** `service.recordFollowupOutcome` returns 404 NOT_FOUND

**Cause:** Render hasn't deployed commits 011de17/cb10ef6 yet

**Solutions:**
1. **Wait** - Auto-deploy should trigger within 5-10 minutes
2. **Manual trigger** - Use Render API to deploy:
   ```bash
   curl -X POST https://api.render.com/v1/services/<SERVICE_ID>/deploys \
     -H "Authorization: Bearer $RENDER_API_KEY" \
     -H "Content-Type: application/json"
   ```
3. **Dashboard** - Go to render.com → pellsolar-website → Manual Deploy

---

## Testing Instructions

### Once Deployed:

**1. Test "need_help" outcome:**
```bash
curl -X POST https://pellsolar.com/api/trpc/service.recordFollowupOutcome \
  -H "Content-Type: application/json" \
  -d '{"0":{"json":{"leadId":15,"outcome":"need_help"}}}'
```

**Expected:**
- Status 200
- Response: `{ success: true, outcome: "need_help", message: "..." }`
- Database updated: `diagnosisOutcome='need_help'`, `followupRespondedAt` set
- CRM deal created for "Herald Followup"

**2. Verify in database:**
```sql
SELECT id, "firstName", "lastName", "diagnosisOutcome", "followupRespondedAt", "crmDealId"
FROM website_leads
WHERE id IN (14, 15);
```

**3. Verify in CRM:**
```sql
-- Run on CRM database
SELECT d.id, d.name, c.first_name, c.last_name
FROM deals d
JOIN customers c ON d.customer_id = c.id
WHERE c.first_name = 'Herald' AND c.last_name = 'Followup';

-- Check notes contain diagnosis
SELECT content FROM notes WHERE deal_id = <DEAL_ID>;
```

**4. Test idempotency (call again with "helped"):**
```bash
curl -X POST https://pellsolar.com/api/trpc/service.recordFollowupOutcome \
  -H "Content-Type: application/json" \
  -d '{"0":{"json":{"leadId":15,"outcome":"helped"}}}'
```
Expected: Same response, no new CRM deal

---

## Cleanup

Run `cleanup-test-data.cjs` to remove all test data:
- website_leads: Herald Regress (14), Herald Followup (15)
- CRM: deals, notes, activity_logs, files, customers for Herald Followup

---

## Render Deployment Check

**Without RENDER_API_KEY:**
1. Go to https://dashboard.render.com
2. Find "pellsolar-website" service
3. Check:
   - Auto-Deploy: should be "Yes"
   - Branch: should be "main"
   - Latest deploy: should show commit cb10ef6 or 011de17
   - Status: should be "Live"

**If auto-deploy != yes:**
- Settings → Build & Deploy → Auto-Deploy → Enable
- Or: Settings → Connect Repository → Reconnect GitHub

**If webhook is broken:**
- GitHub repo (JPellzer/pellsolar-website) → Settings → Webhooks
- Find Render webhook → Check recent deliveries
- If failures: delete and reconnect in Render settings

---

## Current Column List

All 42 columns in website_leads table:
1. id (integer, not null)
2-5. firstName, lastName, email, phone
6-18. address, ownershipType, propertyType, zipCode, existingSolar, solarMotivation, paymentPreference, monthlyBillRange, interestType, interestOtherText, billFileKey, billFileUrl, billFileName
19-22. status, source, notes, createdAt, updatedAt
23-25. crmDealId, crmCustomerId, crmStatus
26-38. systemType, inverterBrand, batteryBrand, systemAge, selectedIssues, duration, errorCode, aiDiagnosis, aiModel, diagnosisOutcome, diagnosisEmailSentAt, photoKeys, diagnosisFollowupSentAt
39. **followupRespondedAt** (TIMESTAMP, nullable) ← NEW
40. **crmPendingId** (INTEGER, nullable) ← NEW

---

**Next Step:** Wait for deployment or trigger manually, then run tests above.
