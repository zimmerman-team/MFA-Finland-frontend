const fs = require("fs");
const path = require("path");
const replace = require("replace-in-file");

const titles = {
  fi: "OpenAid.fi | Kehitysyhteistyön tietopankki",
  se: "OpenAid.fi | Data om Finlands utvecklingssamarbete",
};
const descriptions = {
  fi:
    "Openaid.fi on ulkoministeriön tietopankki Suomen kehitysyhteistyöstä. Palvelu näyttää mihin, kenelle ja milloin Suomen kehitysyhteistyövaroja on käytetty.",
  se:
    "På webbplatsen Openaid.fi samlar utrikesministeriet data om Finlands utvecklingssamarbete. Här ser du hur, var och när Finlands medel för utvecklingssamarbete har använts.",
};

fs.copyFile(
  path.join(__dirname, "../build/index.html"),
  path.join(__dirname, "../build/index_fi.html"),
  (err) => {
    if (err) throw err;
    console.log("File was copied to destination");
    let options = {
      files: path.join(__dirname, "../build/index_fi.html"),
      from: /OpenAid.fi | Databank on Finland's development cooperation/g,
      to: titles.fi,
    };
    results = replace.sync(options);
    options = {
      files: path.join(__dirname, "../build/index_fi.html"),
      from: /The Ministry for Foreign Affairs' databank shows how Finland's development co-operation funds have been used and what results have been achieved with them./g,
      to: descriptions.fi,
    };
    replace.sync(options);
  }
);

fs.copyFile(
  path.join(__dirname, "../build/index.html"),
  path.join(__dirname, "../build/index_se.html"),
  (err) => {
    if (err) throw err;
    console.log("File was copied to destination");
    let options = {
      files: path.join(__dirname, "../build/index_se.html"),
      from: /OpenAid.fi | Databank on Finland's development cooperation/g,
      to: titles.se,
    };
    results = replace.sync(options);
    options = {
      files: path.join(__dirname, "../build/index_se.html"),
      from: /The Ministry for Foreign Affairs' databank shows how Finland's development co-operation funds have been used and what results have been achieved with them./g,
      to: descriptions.se,
    };
    replace.sync(options);
  }
);
