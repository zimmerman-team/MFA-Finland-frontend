const seoDescription = {
  en:
    "The Ministry for Foreign Affairs' databank shows how Finland's development co-operation funds have been used and what results have been achieved with them.",
  fi:
    "Ulkoministeriön tietopankki kertoo mihin Suomen kehitysyhteistyövaroja on käytetty ja millaisia tuloksia niiden avulla on saavutettu.",
  se: "",
};
export function getSeoDescription(language: string) {
  if (language === "en") return seoDescription.en;
  if (language === "fi") return seoDescription.fi;
  if (language === "se") return seoDescription.se;
  return seoDescription.fi;
}
