import get from "lodash/get";
import { formatLocale } from "app/utils/formatLocale";

const translatedAbbrs = {
  en: {
    bln: "bn",
    mln: "mill.",
    k: "K",
  },
  fi: {
    bln: "mrd.",
    mln: "milj.",
    k: "tuhatta",
  },
  se: {
    bln: "miljarder",
    mln: "miljoner",
    k: "tusen",
  },
};

export function formatMoneyWithPrefix(n: number, lang = "en"): string {
  if (n === 0) {
    return `€0.00`;
  }
  if (Math.abs(Number(n)) >= 1.0e9) {
    return `€${(Math.abs(Number(n)) / 1.0e9).toFixed(2)} ${get(
      translatedAbbrs,
      `[${lang}].bln`,
      "bln"
    )}`;
  }
  if (Math.abs(Number(n)) >= 1.0e6) {
    return `€${(Math.abs(Number(n)) / 1.0e6).toFixed(2)} ${get(
      translatedAbbrs,
      `[${lang}].mln`,
      "mln"
    )}`;
  }
  if (Math.abs(Number(n)) >= 1.0e3) {
    return `€${(Math.abs(Number(n)) / 1.0e3).toFixed(2)} ${get(
      translatedAbbrs,
      `[${lang}].k`,
      "k"
    )}`;
  }
  return `€${formatLocale(n).slice(1)}`;
}

export function formatLargeAmountsWithPrefix(
  n: number | bigint,
  lang = "en"
): string {
  if (!n) return "";
  if (Math.abs(Number(n)) >= 1.0e9) {
    return `€${(Math.abs(Number(n)) / 1.0e9).toFixed(2)} ${get(
      translatedAbbrs,
      `[${lang}].bln`,
      "bln"
    )}`;
  }
  if (Math.abs(Number(n)) >= 1.0e6) {
    return `€${(Math.abs(Number(n)) / 1.0e6).toFixed(2)} ${get(
      translatedAbbrs,
      `[${lang}].mln`,
      "mln"
    )}`;
  }
  return `€${formatLocale(n).slice(1)}`;
}
