// @ts-ignore
import { atom, RecoilState, selector } from "recoil";
import { CountryItemProps, CountryList } from "app/state/data/Countries";

export const countriesState = atom({
  key: "countries",
  default: { countries: CountryList },
});

export const countriesSelectedState = atom({
  key: "countriesSelected",
  default: { countries: [] },
});

export const filterState = atom({
  key: "filter",
  default: { value: "", label: "None" },
});

export const searchState = atom({
  key: "searchTerm",
  default: "",
});

export const filteredCountries = selector({
  key: "filteredCountries",
  get: ({ get }) => {
    const { countries } = get(countriesState);
    const searchTerm = get(searchState);
    const val = new RegExp(searchTerm.toLowerCase(), "g");
    const searchedCountries = countries.filter((country: CountryItemProps) => {
      return !!country.label.toLowerCase().match(val);
    });
    // @ts-ignore
    searchedCountries.sort((a, b) => a.country - b.country);
    return searchedCountries;
  },
});

export interface AppState {
  countryList: CountryItemProps[];
}

function LoadAppStateFromLocalStorage(): AppState {
  const stringifiedJSON: string | null = window.localStorage.getItem(
    LocalStorageKey.APP_STATE
  );

  if (typeof stringifiedJSON === "string") {
    return JSON.parse(stringifiedJSON);
  }

  return {
    countryList: CountryList,
  };
}

export const selectedCountries = selector({
  key: "selectedCountries",
  get: ({ get }) => {
    const data = LoadAppStateFromLocalStorage();
    return data.countryList.filter((country: CountryItemProps) => {
      return country.selected === true;
    });
  },
});

export enum LocalStorageKey {
  APP_STATE = "APP_STATE",
}

export const initialAppState: RecoilState<AppState> = atom({
  key: "initialAppState",
  default: LoadAppStateFromLocalStorage(),
});
