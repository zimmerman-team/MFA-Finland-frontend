export const AppName = "MFA";
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
  general: {
    privacy: `${basePath}privacy`,
    contact: `${basePath}contact`,
    faq: `${basePath}faq`,
    info: `${basePath}info`,
    notFound: `${basePath}notFound`,
  },
  home: basePath,
  explore: `${basePath}explore`,
  feedback: `${basePath}feedback`,
  search: `${basePath}search-results`,
  detail: {
    activity: `${basePath}activity/:param`,
    publisher: `${basePath}publisher/:param`,
    donor: `${basePath}donor/:param`,
    country: `${basePath}country/:param`,
    organisation: `${basePath}organisation/:param`,
  },
  userManagement: {
    userSettingsRoute: `${basePath}user-settings/:id`,
    userSetting: `${basePath}user-settings/`,
    userOverview: `${basePath}users`,
    teamDetail: `${basePath}team`,
    teamOverview: `${basePath}teams`,
  },
  debug: {
    components: `${basePath}components`,
  },
};
