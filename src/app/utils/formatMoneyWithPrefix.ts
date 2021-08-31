import { formatLocale } from "app/utils/formatLocale";

export function formatMoneyWithPrefix(n: number): string {
  if (n === 0) {
    return `€0.00`;
  }
  if (Math.abs(Number(n)) >= 1.0e9) {
    return `€${(Math.abs(Number(n)) / 1.0e9).toFixed(2)} bln`;
  }
  if (Math.abs(Number(n)) >= 1.0e6) {
    return `€${(Math.abs(Number(n)) / 1.0e6).toFixed(2)} mln`;
  }
  if (Math.abs(Number(n)) >= 1.0e3) {
    return `€${(Math.abs(Number(n)) / 1.0e3).toFixed(2)} k`;
  }
  return `€${formatLocale(n).slice(1)}`;
}

export function formatLargeAmountsWithPrefix(n: number | bigint): string {
  if (!n) return "";
  if (Math.abs(Number(n)) >= 1.0e9) {
    return `€${(Math.abs(Number(n)) / 1.0e9).toFixed(2)} bln`;
  }
  if (Math.abs(Number(n)) >= 1.0e6) {
    return `€${(Math.abs(Number(n)) / 1.0e6).toFixed(2)} mln`;
  }
  return `€${formatLocale(n).slice(1)}`;
}
