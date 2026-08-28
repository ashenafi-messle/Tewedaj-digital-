export const maskAccountNumber = (account: string): string => {
  const normalized = account.replace(/\s/g, '');
  if (normalized.length <= 4) return normalized.replace(/./g, '*');
  return `${normalized.slice(0, 2)}${'*'.repeat(Math.max(2, normalized.length - 4))}${normalized.slice(-2)}`;
};
