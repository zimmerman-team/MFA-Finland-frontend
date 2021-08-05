export const AppNameENG =
  "OpenAid.fi | Databank on Finland's development cooperation";
export const AppNameFIN =
  "OpenAid.fi | Kehitysyhteistyön tietopankki ja tilastot";
export const AppNameSWE = "OpenAid.fi";

export function getAppName(currentLanguage: string) {
  if (currentLanguage === "se") return AppNameSWE;
  if (currentLanguage === "en") return AppNameENG;
  return AppNameFIN;
}

const basePath = "/";

type PathItemType = {
  name: string;
  path: string;
};

interface PathProps {
  general: PathItemType;
  export: PathItemType;
}

export const Path = {
  home: basePath,
  viz: `${basePath}viz`,
  vizTab: `${basePath}viz/:tab`,
  general: {
    privacy: `${basePath}privacy`,
    contact: `${basePath}contact`,
    faq: `${basePath}faq`,
    about: `${basePath}about`,
    info: `${basePath}info`,
    notFound: `${basePath}notFound`,
    statements: `${basePath}statements`,
    result: `${basePath}result`,
    feedback: `${basePath}feedback`,
  },
  detail: {
    project: `${basePath}project/:param`,
    region: `${basePath}regions/:region`,
    country: `${basePath}countries/:country`,
    sector: `${basePath}sectors/:sector`,
    organisation: `${basePath}organisations/:organisation`,
    orgType: `${basePath}organisation-types/:orgType`,
    thematicArea: `${basePath}thematic-area/:theme`,
  },
  debug: {
    components: `${basePath}components`,
  },
};
