const fs = require("fs");
const path = require("path");
const replace = require("replace-in-file");

const titles = {
  fi: "OpenAid.fi | Kehitysyhteistyön tietopankki",
  se: "OpenAid.fi | Data om Finlands utvecklingssamarbete",
};
const descriptions = {
  fi:
    "Openaid.fi on ulkoministeriön tietopankki Suomen kehitysyhteistyöstä. Palvelu näyttää mihin, miten ja milloin Suomen kehitysyhteistyövaroja on käytetty.",
  se:
    "På webbplatsen Openaid.fi samlar utrikesministeriet data om Finlands utvecklingssamarbete. Här ser du hur, var och när Finlands medel för utvecklingssamarbete har använts.",
};

fs.copyFile(
  path.join(__dirname, "../build/index.html"),
  path.join(__dirname, "../build/index_fi.html"),
  (err) => {
    if (err) throw err;
    console.log("File was copied to destination");
    const optionsTitle = {
      files: path.join(__dirname, "../build/index_fi.html"),
      from: /OpenAid.fi \| Databank on Finland's development cooperation/g,
      to: titles.fi,
    };
    replace.sync(optionsTitle);
    const optionsDesc = {
      files: path.join(__dirname, "../build/index_fi.html"),
      from: /Openaid.fi is the Foreign Ministry’s databank on Finland’s development cooperation. The service shows where, how, and when Finland's development cooperation funds have been used./g,
      to: descriptions.fi,
    };
    replace.sync(optionsDesc);
    const htmlLangDesc = {
      files: path.join(__dirname, "../build/index_fi.html"),
      from: 'lang="en"',
      to: 'lang="fi"',
    };
    replace.sync(htmlLangDesc);
  }
);

fs.copyFile(
  path.join(__dirname, "../build/index.html"),
  path.join(__dirname, "../build/index_sv.html"),
  (err) => {
    if (err) throw err;
    console.log("File was copied to destination");
    const optionsTitle = {
      files: path.join(__dirname, "../build/index_sv.html"),
      from: /OpenAid.fi \| Databank on Finland's development cooperation/g,
      to: titles.se,
    };
    replace.sync(optionsTitle);
    const optionsDesc = {
      files: path.join(__dirname, "../build/index_sv.html"),
      from: /Openaid.fi is the Foreign Ministry’s databank on Finland’s development cooperation. The service shows where, how, and when Finland's development cooperation funds have been used./g,
      to: descriptions.se,
    };
    replace.sync(optionsDesc);
    const htmlLangDesc = {
      files: path.join(__dirname, "../build/index_sv.html"),
      from: 'lang="en"',
      to: 'lang="sv"',
    };
    replace.sync(htmlLangDesc);
  }
);
