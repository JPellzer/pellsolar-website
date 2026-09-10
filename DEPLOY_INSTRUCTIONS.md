# Deploy Instructions - Warranty Fix + Auto-Deploy Setup

## Status

### ✅ Completed
- [x] Warranty section enforcement code written (routers.ts)
- [x] GitHub Actions workflow created (.github/workflows/render-deploy.yml)
- [x] Code committed and pushed to GitHub
- [x] Test script created (test-warranty-fix.js)

### ⚠️  Pending - Requires Manual Steps

The code is ready but NOT deployed to production yet. GitHub Actions cannot auto-deploy until secrets are configured.

## Required Manual Steps

### 1. Get RENDER_API_KEY

The RENDER_API_KEY should be in `../pell-solar-crm/.env` (one directory up from this repo). If not there, get it from:

1. Go to Render Dashboard → Account Settings → API Keys
2. Create a new API key (or copy existing one)
3. Save it securely

### 2. Set GitHub Secrets

Run these commands from the `website/` directory:

```bash
# Set RENDER_API_KEY (reading from the CRM .env file)
cat ../pell-solar-crm/.env | grep RENDER_API_KEY | cut -d= -f2 | \
  gh secret set RENDER_API_KEY --repo JPellzer/pellsolar-website

# Set RENDER_SERVICE_ID
echo "srv-da6reh9srm7s73eipt1g" | \
  gh secret set RENDER_SERVICE_ID --repo JPellzer/pellsolar-website
```

Alternative if you have the key directly:
```bash
echo "rnd_xxxxx" | gh secret set RENDER_API_KEY --repo JPellzer/pellsolar-website
echo "srv-da6reh9srm7s73eipt1g" | gh secret set RENDER_SERVICE_ID --repo JPellzer/pellsolar-website
```

### 3. Enable GitHub Actions

Check if Actions are enabled on the repo:
```bash
gh api repos/JPellzer/pellsolar-website/actions/permissions
```

If disabled, enable them:
```bash
gh api -X PUT repos/JPellzer/pellsolar-website/actions/permissions -f enabled=true
```

### 4. Trigger Deploy

Once secrets are set, push any commit to trigger the workflow:
```bash
# Option A: Empty commit to trigger deploy
git commit --allow-empty -m "Trigger deploy"
git push origin main

# Option B: Wait for next real commit
```

Watch the deploy:
```bash
gh run list --repo JPellzer/pellsolar-website --limit 3
gh run watch
```

### 5. Test on Production

After deploy completes:
```bash
node test-warranty-fix.js
```

Expected output should show:
```
✓ Contains **Warranty:** section: ✅
✓ Contains **Call us if:** section: ✅
✓ Contains Enphase warranty info: ✅
```

### 6. Clean Up Test Data

Delete the test lead from the database:
```sql
-- Using DATABASE_URL from ../pell-solar-crm/.env
DELETE FROM website_leads 
WHERE email = 'josh@pellsolar.com' 
  AND first_name = 'Herald Warranty';
```

Or via script:
```bash
DATABASE_URL="<from ../pell-solar-crm/.env>" node -e "
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query(\"DELETE FROM website_leads WHERE email = 'josh@pellsolar.com' AND first_name = 'Herald Warranty'\")
  .then(() => console.log('Test lead deleted'))
  .then(() => pool.end());
"
```

## What Changed

### Part 1: GitHub Actions Auto-Deploy
- Workflow triggers on every push to `main` (ignores `docs/**` and `*.md`)
- POSTs to Render Deploy API to trigger build
- Polls deploy status every 20s until `live` or `failed`
- Replaces the previous GitHub webhook approach (more reliable)

### Part 2: Warranty Section Enforcement
- Updated diagnostic prompt to REQUIRE **Warranty:** and **Call us if:** sections
- Added brand→term mapping for all major brands:
  - Enphase: 25yr microinverters, 5yr IQ Gateway
  - Tesla Powerwall: 10yr
  - Tesla Solar Inverter: 12.5yr
  - SolarEdge: 12yr inverters (25yr if registered), 25yr optimizers
  - SMA, Fronius: 10yr
  - SunPower: 25yr complete system
  - LG, Panasonic: 10yr batteries
  - Generac PWRcell: 10yr
  - Franklin WH: 12yr
- Post-check appends structured warranty if LLM omits it
- Ensures every diagnosis ends with warranty info + emergency escalation line

## Troubleshooting

### Workflow Not Running
- Check: `gh run list --repo JPellzer/pellsolar-website`
- Verify secrets are set: `gh secret list --repo JPellzer/pellsolar-website`
- Check Actions are enabled

### Deploy Fails
- Check Render dashboard for build logs
- Verify RENDER_SERVICE_ID is correct (srv-da6reh9srm7s73eipt1g)
- Verify RENDER_API_KEY is valid

### Test Still Fails After Deploy
- Verify deploy went live (check Render dashboard)
- Check browser cache (warranty fix is server-side, shouldn't be cached)
- Verify the commit hash matches what's deployed

## Files Modified

1. `server/routers.ts` - Updated diagnose mutation with warranty enforcement
2. `.github/workflows/render-deploy.yml` - New GitHub Actions workflow
3. `test-warranty-fix.js` - Production test script

## Commit

Commit hash: c1978bd
Message: "Add GitHub Actions auto-deploy + warranty section enforcement"
