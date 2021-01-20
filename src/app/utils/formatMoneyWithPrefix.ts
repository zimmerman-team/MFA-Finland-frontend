export function formatMoneyWithPrefix(n: number): string {
  if (Math.abs(Number(n)) >= 1.0e9) {
    return `€ ${(Math.abs(Number(n)) / 1.0e9).toFixed(2)} bln`;
  }
  if (Math.abs(Number(n)) >= 1.0e6) {
    return `€ ${(Math.abs(Number(n)) / 1.0e6).toFixed(2)} mln`;
  }
  if (Math.abs(Number(n)) >= 1.0e3) {
    return `€ ${(Math.abs(Number(n)) / 1.0e3).toFixed(2)} k`;
  }
  return `€ ${Math.abs(Number(n))}`;
}