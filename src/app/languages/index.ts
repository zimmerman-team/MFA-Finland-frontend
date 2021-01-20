/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-dupe-keys */
// @ts-nocheck

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    interpolation: {
      escapeValue: false,
    },
    resources: {
      fi: {
        translations: {
          draft_1: "lorem ipsum finnish 1",
          draft_2: "dolor simet finnish 2",
        },
      },
      sv: {
        translations: {
          draft_1: "lorem ipsum svenska 1",
          draft_2: "dolor simet svenska 2",
        },
      },
      en: {
        translations: {
          draft_1: "lorem ipsum english 1",
          draft_2: "dolor simet english 2",
        },
      },
    },
  });

export default i18n;
