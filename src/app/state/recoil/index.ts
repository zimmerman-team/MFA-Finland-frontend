// @ts-nocheck

import { Path } from "app/const/Path";

export interface AppState {
  modules: Modules;
}

interface Modules {
  home: Module;
  about: Module;
  faq: Module;
  privacy: Module;
  activity_detail: Module;
}

interface Module {
  id: string;
  title: string;
  path: string;
}

interface ActivityDetailState extends Module {
  activities: Activity;
}

const BlankAppState: AppState = {
  home: {
    id: "home-module",
    title: "Home",
    path: Path.home,
  },
  about: {
    id: "about-module",
    title: "About",
    path: Path.general.info,
  },
  faq: {
    id: "faq-module",
    title: "FAQ",
    path: Path.general.faq,
  },
  privacy: {
    id: "privacy-module",
    title: "Privacy",
    path: Path.general.privacy,
  },

  activity_detail: {
    id: "activity-detail-module",
    title: "Activity Detail",
    path: Path.detail.activity,
  },
};
