# Pellsolar.com Website Migration - Manus to Render

This document describes the migration of the pellsolar.com website from Manus platform services to self-hosted infrastructure on Render.

## What Was Changed

| Component | Before (Manus) | After (Self-Hosted) |
|-----------|----------------|---------------------|
| **Database** | MySQL (Manus) | PostgreSQL (Render) |
| **Storage** | Manus Forge S3 proxy | Cloudflare R2 (direct S3-compatible) |
| **Authentication** | Manus OAuth | Google OAuth (admin-only) |
| **LLM** | Manus Forge proxy | Anthropic Claude API (direct) |
| **Notifications** | Manus notification service | SendGrid email API |
| **Maps** | Manus proxy | Google Maps API (direct) |

## Database Changes

### Schema Migrations
- Converted from `mysql` to `postgresql` dialect in drizzle.config.ts
- All MySQL types converted to PostgreSQL equivalents:
  - `int` autoincrement → `serial`
  - `tinyint` → `integer`
  - `mysqlEnum` → named `pgEnum`
  - `onUpdateNow()` → `$onUpdate(() => new Date())`
  - `onDuplicateKeyUpdate` → `onConflictDoUpdate`
  - `.insertId` → `.returning({ id })`

### Table Naming
**All tables and enum types are prefixed with `website_`** to share the CRM's PostgreSQL database without collisions:
- `users` → `website_users`
- `leads` → `website_leads`
- `project_photos` → `website_project_photos`
- etc.

### Driver
- Removed: `mysql2`
- Added: `pg` + `@types/pg`

## Storage Migration

### R2 Configuration
- Replaced Manus Forge presigned URL flow with direct Cloudflare R2 uploads
- S3-compatible API via `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner`
- Preserved existing function signatures: `storagePut()`, `storageGet()`, `storageGetSignedUrl()`
- Random hash suffix on upload keys maintained for uniqueness

### Backwards Compatibility
- `/manus-storage/*` proxy route preserved
- Returns 307 redirect to 1-hour signed R2 URL
- Existing stored file URLs continue to work

## Authentication Migration

### Google OAuth Flow
1. User clicks login → redirected to `/api/oauth/google`
2. Server redirects to `accounts.google.com/o/oauth2/v2/auth`
3. User authenticates with Google
4. Callback to `/api/oauth/callback` exchanges code for tokens
5. Fetches user info from `googleapis.com/oauth2/v3/userinfo`
6. **Admin allowlist check**: rejects if email not in `ADMIN_EMAILS`
7. Upserts user to database with `openId: "google:{sub}"`
8. Issues local JWT session cookie (same jose-based system as before)

### Session Management
- Trimmed `sdk.ts` to local JWT only
- Removed remote Manus user-sync fallback
- Unknown user = forbidden (no auto-sync)

## LLM Migration

### Anthropic Claude
- Added `@anthropic-ai/sdk` package
- Model: `claude-haiku-4-5-20251001`
- Default max_tokens: 1024

### API Compatibility
- Preserved `invokeLLM({ messages })` signature
- Returns OpenAI-style response shape: `{ choices: [{ message: { content } }] }`
- System messages extracted and passed as Anthropic `system` parameter

## Notification Migration

### SendGrid Email
- Replaced Manus notification service with SendGrid v3 REST API
- Plain-text email sent via `POST https://api.sendgrid.com/v3/mail/send`
- Never throws on send failure (returns false instead)
- Validation errors still bubble up as TRPC errors

## Maps Migration

### Google Maps API Direct
- Removed Manus `/v1/maps/proxy` prefix
- All requests go directly to `https://maps.googleapis.com{endpoint}`
- API key appended as query parameter
- All existing types and helper functions preserved

## Removed Files

- `server/_core/dataApi.ts` (Manus data API)
- `server/_core/imageGeneration.ts` (Manus image generation)
- `server/_core/voiceTranscription.ts` (Manus voice transcription)
- `.manus/` directory (Manus metadata)
- `pnpm-lock.yaml` (switched to npm)

## Package Changes

### Removed
- `mysql2`
- `vite-plugin-manus-runtime`
- `packageManager` and `pnpm` fields from package.json
- `pnpm` devDependency

### Added
- `@anthropic-ai/sdk`
- `pg`
- `@types/pg` (devDependency)

## Vite Configuration

Removed from `vite.config.ts`:
- `vitePluginManusRuntime()` plugin
- `vitePluginManusDebugCollector()` plugin and all related code
- Manus-specific allowedHosts (`.manuspre.computer`, etc.)

Kept:
- `react()`, `tailwindcss()`, `jsxLocPlugin()`
- Aliases: `@`, `@shared`, `@assets`
- `envDir`, `root`, `publicDir`, `outDir`
- `allowedHosts`: `localhost`, `127.0.0.1`
- `fs.strict` and `fs.deny` dotfiles

## Environment Variables

### Required on Render

```bash
# Application
NODE_ENV=production
JWT_SECRET=<generate-with-openssl-rand-hex-32>
VITE_APP_ID=pellsolar-website

# Database (Render PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Google OAuth (admin login only)
GOOGLE_OAUTH_CLIENT_ID=<from-google-cloud-console>
GOOGLE_OAUTH_CLIENT_SECRET=<from-google-cloud-console>
ADMIN_EMAILS=josh@pellsolar.com,other@example.com  # comma-separated

# SendGrid Email
SENDGRID_API_KEY=<from-sendgrid>
OWNER_NOTIFY_EMAIL=josh@pellsolar.com
NOTIFY_FROM_EMAIL=info@pellsolar.com

# Twilio SMS
TWILIO_ACCOUNT_SID=<from-twilio>
TWILIO_AUTH_TOKEN=<from-twilio>
TWILIO_FROM_NUMBER=+1234567890
TWILIO_NOTIFY_NUMBER=+1234567890  # owner's phone for notifications

# Cloudflare R2 Storage
R2_ACCOUNT_ID=<from-cloudflare-r2>
R2_ACCESS_KEY_ID=<from-cloudflare-r2>
R2_SECRET_ACCESS_KEY=<from-cloudflare-r2>
R2_BUCKET=pellsolar-website
R2_PUBLIC_BASE_URL=  # optional, for public URLs

# Google Maps API
GOOGLE_MAPS_API_KEY=<from-google-cloud-console>

# Anthropic AI
ANTHROPIC_API_KEY=<from-anthropic>
```

## Build and Deploy

### Build Command
```bash
npm install && npm run build
```

This runs:
1. `vite build` (client bundle)
2. `vite build --config vite.config.ssr.ts` (SSR bundle)
3. `esbuild server/_core/index.ts --bundle` (server bundle)

### Start Command
```bash
npm start
```

Runs `node dist/index.js`

### First Deploy

**IMPORTANT:** Run database migrations once before the first deploy:

```bash
npm run db:push
```

This creates all `website_*` tables and enum types in the shared PostgreSQL database.

## Testing Locally

1. Copy `.env.example` to `.env` and fill in credentials
2. Ensure `DATABASE_URL` points to a PostgreSQL instance
3. Run migrations: `npm run db:push`
4. Start dev server: `npm run dev`
5. Open `http://localhost:5173`

## Production Deployment

1. Create Render web service
2. Set environment variables from list above
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Deploy
6. SSH into Render instance and run `npm run db:push` (first deploy only)

## Rollback Plan

If migration fails:
1. Revert DNS to point to old Manus deployment
2. All data remains in both systems
3. File storage URLs redirect to R2 (backwards compatible)
4. User sessions remain valid (same JWT secret)
