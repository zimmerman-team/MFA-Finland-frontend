const seoDescription = {
  en:
    "Openaid.fi is the Foreign Ministry’s databank on Finland’s development cooperation. The service shows where, how, and when Finland's development cooperation funds have been used.",
  fi:
    "Openaid.fi on ulkoministeriön tietopankki Suomen kehitysyhteistyöstä. Palvelu näyttää mihin, miten ja milloin Suomen kehitysyhteistyövaroja on käytetty.",
  se:
    "På webbplatsen Openaid.fi samlar utrikesministeriet data om Finlands utvecklingssamarbete. Här ser du hur, var och när Finlands medel för utvecklingssamarbete har använts.",
};
export function getSeoDescription(language: string) {
  if (language === "en") return seoDescription.en;
  if (language === "fi") return seoDescription.fi;
  if (language === "se") return seoDescription.se;
  return seoDescription.fi;
}
