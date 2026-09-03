export const ENV = {
  appId: process.env.VITE_APP_ID ?? "pellsolar-website",
  cookieSecret: process.env.JWT_SECRET ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",

  // Google OAuth
  googleOAuthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
  googleOAuthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? "",
  adminEmails: (process.env.ADMIN_EMAILS ?? "josh@pellsolar.com").split(",").map(e => e.trim()),

  // SendGrid Email
  sendgridApiKey: process.env.SENDGRID_API_KEY ?? "",
  ownerNotifyEmail: process.env.OWNER_NOTIFY_EMAIL ?? "josh@pellsolar.com",
  notifyFromEmail: process.env.NOTIFY_FROM_EMAIL ?? "info@pellsolar.com",

  // Twilio SMS
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? "",
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? "",
  twilioFromNumber: process.env.TWILIO_FROM_NUMBER ?? "",
  twilioNotifyNumber: process.env.TWILIO_NOTIFY_NUMBER ?? "",

  // Cloudflare R2 Storage
  r2AccountId: process.env.R2_ACCOUNT_ID ?? "",
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  r2Bucket: process.env.R2_BUCKET ?? "pellsolar-website",
  r2PublicBaseUrl: process.env.R2_PUBLIC_BASE_URL ?? "",

  // Google Maps API
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? "",

  // Anthropic AI
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? "",

  // Website/CRM integration
  websiteLeadSecret: process.env.WEBSITE_LEAD_SECRET ?? "",
  crmCustomerCheckUrl: process.env.CRM_CUSTOMER_CHECK_URL ?? "https://pellsolar-crm-prod.onrender.com/api/check-customer",

  // Cloudflare Turnstile (optional - turnstile code stays inactive without these)
  turnstileSiteKey: process.env.TURNSTILE_SITE_KEY ?? "",
  turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY ?? "",
};
