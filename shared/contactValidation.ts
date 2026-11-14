export const PHONE_REQUIRED_MESSAGE = 'Enter a 10-digit phone number, including the area code.';

export function isUsPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!/^[+\d\s().-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}
