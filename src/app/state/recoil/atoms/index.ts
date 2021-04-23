import { FILTER_TYPES } from "app/components/FilterPanel/data";
import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const drawerAtom = atom({
  key: "drawerAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const bottomDrawerAtom = atom({
  key: "bottomDrawerAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const languageAtom = atom({
  key: "languageAtom",
  default: "en",
  effects_UNSTABLE: [persistAtom],
});

export const cmsDataAtom = atom({
  key: "cmsDataAtom",
  default: {
    general: {},
    viz: {},
    filters: {},
  },
  effects_UNSTABLE: [persistAtom],
});

export const currentFilterOpenAtom = atom({
  key: "currentFilterOpen", // unique ID (with respect to other atoms/selectors)
  default: FILTER_TYPES.NONE, // default value (aka initial value)
});

export const filterCardTabsAtom = atom({
  key: "filterCardTabsAtom", // unique ID (with respect to other atoms/selectors)
  default: [
    {
      name: "All",
      active: true,
      handleClick: () => {},
    },
    {
      name: "Recent",
      active: false,
      handleClick: () => {},
    },
  ], // default value (aka initial value)
});

export interface SelectedFilterAtomModel {
  countries: string[];
  regions: string[];
  sectors: string[];
  organisations: string[];
  organisationtypes: string[];
  activitystatus: string[];
  activityscope: string[];
  tag: string[];
  sdg: string[];
  defaultaidtype: string[];
  defaultflowtype: string[];
  defaulttiedstatus: string[];
  collaborationtype: string[];
  policymarker: string[];
  budgetlines: string[];
  humanrights: string[];
  years: string[];
}

export const defaultfilters = {
  countries: [] as string[],
  regions: [] as string[],
  sectors: [] as string[],
  organisations: [] as string[],
  organisationtypes: [] as string[],
  activitystatus: [] as string[],
  activityscope: [] as string[],
  tag: [] as string[],
  sdg: [] as string[],
  defaultaidtype: [] as string[],
  defaultflowtype: [] as string[],
  defaulttiedstatus: [] as string[],
  collaborationtype: [] as string[],
  policymarker: [] as string[],
  budgetlines: [] as string[],
  humanrights: [] as string[],
  years: [] as string[],
};

export const filterbarHeightAtom: RecoilState<number> = atom({
  key: "filterbarHeightAtom",
  default: 0,
});

export const appbarHeightAtom: RecoilState<number> = atom({
  key: "appbarHeightAtom",
  default: 0,
});

export const selectedFilterAtom: RecoilState<SelectedFilterAtomModel> = atom({
  key: "selectedFilterAtom",
  default: defaultfilters,
});

export const prevLocationAtom: RecoilState<string> = atom({
  key: "prevLocationAtom",
  default: "",
});

export const ODAlatestFiltersAtom: RecoilState<SelectedFilterAtomModel> = atom({
  key: "ODAlatestFilters",
  default: defaultfilters,
});

export const ThematicAreasLatestFiltersAtom: RecoilState<SelectedFilterAtomModel> = atom(
  {
    key: "ODAlatestFilters",
    default: defaultfilters,
  }
);

export const SectorsSunburstLatestFiltersAtom: RecoilState<SelectedFilterAtomModel> = atom(
  {
    key: "ODAlatestFilters",
    default: defaultfilters,
  }
);

export const LocationsTreemapLatestFiltersAtom: RecoilState<SelectedFilterAtomModel> = atom(
  {
    key: "ODAlatestFilters",
    default: defaultfilters,
  }
);

export const OrganisationsLatestFiltersAtom: RecoilState<SelectedFilterAtomModel> = atom(
  {
    key: "ODAlatestFilters",
    default: defaultfilters,
  }
);

export const BudgetLinesLatestFiltersAtom: RecoilState<SelectedFilterAtomModel> = atom(
  {
    key: "ODAlatestFilters",
    default: defaultfilters,
  }
);

export const ProjectsLatestFiltersAtom: RecoilState<SelectedFilterAtomModel> = atom(
  {
    key: "ProjectslatestFilters",
    default: defaultfilters,
  }
);

export const SDGlatestFiltersAtom: RecoilState<SelectedFilterAtomModel> = atom({
  key: "ODAlatestFilters",
  default: defaultfilters,
});

export const GeoLatestFiltersAtom: RecoilState<SelectedFilterAtomModel> = atom({
  key: "ODAlatestFilters",
  default: defaultfilters,
});

export const lineYearPeriodFilter = atom({
  key: "lineYearPeriodFilter",
  default: "",
});

export const exploreLinksState = atom({
  key: "exploreLinksState",
  default: 0,
});

export const detailLinksState = atom({
  key: "detailLinksState",
  default: 0,
});

export const SwitchMapState = atom({
  key: "switchMapState", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const GenericDialogState = atom({
  key: "genericDialogState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const DeleteAccountDialogState = atom({
  key: "deleteAccountDialogState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const searchFocusAtom = atom({
  key: "searchFocus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const ChangeEmailDialogState = atom({
  key: "changeEmailDialogState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const ChangePhotoDialogState = atom({
  key: "changePhotoDialogState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const LandingDialogState = atom({
  key: "changeLandingDialogState", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});
export const ChangeUsernameDialogState = atom({
  key: "changeUsernameDialogState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const ChangeBirthdayDialogState = atom({
  key: "changeBirthdayDialogState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const ChangePasswordDialogState = atom({
  key: "changePasswordDialogState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const ChangePhonenumberDialogState = atom({
  key: "changePhonenumberDialogState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const PasswordSecurityDialogState = atom({
  key: "passwordSecurityDialogState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const ContinueExploringDialogState = atom({
  key: "continueExploringDialogState", // unique ID (with respect to other atoms/selectors)
  default: {
    open: false,
    redirect: "/",
  }, // default value (aka initial value)
});
