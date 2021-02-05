// const locale = "fi-FI";
const locale = "en-US";

export function formatLocale(value: number): string {
  if (!value) return "";
  return value.toLocaleString(locale, { style: "currency", currency: "EUR" });
}
