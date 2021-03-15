const locale = "en-US";

export function formatLocale(value: number | bigint): string {
  if (!value) return "";
  return Number(value).toLocaleString(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatLocaleN(value: number | bigint): string {
  if (!value) return "";
  return Number(value).toLocaleString(locale);
}
