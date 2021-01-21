// const locale = "fi-FI";
const locale = "en-US";

export function formatLocale(value: number): string {
  return value.toLocaleString(locale, { style: "currency", currency: "EUR" });
}
