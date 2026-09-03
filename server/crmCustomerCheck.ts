import { getCrmAuthHeaders } from "./crmAuth";

const CRM_CUSTOMER_CHECK_URL = "https://pellsolar-crm-prod.onrender.com/api/check-customer";

export async function checkCustomerInCrm(phone?: string, email?: string): Promise<boolean> {
  const checkParams = new URLSearchParams();
  if (phone) checkParams.set("phone", phone.replace(/\D/g, ""));
  if (email) checkParams.set("email", email);

  const checkRes = await fetch(`${CRM_CUSTOMER_CHECK_URL}?${checkParams.toString()}`, {
    headers: getCrmAuthHeaders(),
  });
  if (!checkRes.ok) return false;

  const checkData = await checkRes.json() as { exists?: boolean };
  return Boolean(checkData.exists);
}
