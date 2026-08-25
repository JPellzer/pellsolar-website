export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate Google OAuth login URL
export const getLoginUrl = (returnPath?: string) => {
  const path = returnPath || "/admin";
  return `/api/oauth/google?return=${encodeURIComponent(path)}`;
};
