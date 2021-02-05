import { atom, RecoilState } from "recoil";
import { FILTER_TYPES } from "../../../components/FilterPanel/data";

export const drawerAtom = atom({
  key: "drawerAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const languageAtom = atom({
  key: "languageAtom", // unique ID (with respect to other atoms/selectors)
  default: "en", // default value (aka initial value)
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
  budget: string[];
  sectors: string[];
  donors: string[];
  organisations: string[];
  publishers: string[];
  period: string[];
  activitystatus: string[];
}

export const selectedFilterAtom: RecoilState<SelectedFilterAtomModel> = atom({
  key: "selectedFilterAtom",
  default: {
    countries: [] as string[],
    regions: [] as string[],
    budget: [] as string[],
    sectors: [] as string[],
    donors: [] as string[],
    organisations: [] as string[],
    publishers: [] as string[],
    period: [] as string[],
    activitystatus: [] as string[],
  },
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
