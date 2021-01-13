/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

interface KeyValue {
  key: string;
  value: boolean;
}

export interface FiltersUpdatedModel {
  value: {
    countries: boolean;
    regions: boolean;
    sectors: boolean;
    donors: boolean;
    organisations: boolean;
    publishers: boolean;
    activitystatus: boolean;
  };
  setValue: Action<FiltersUpdatedModel, KeyValue>;
  clear: Action<FiltersUpdatedModel>;
}

const filtersUpdated: FiltersUpdatedModel = {
  value: {
    countries: false,
    regions: false,
    sectors: false,
    donors: false,
    organisations: false,
    publishers: false,
    activitystatus: false,
  },
  setValue: action((state, payload: KeyValue) => {
    //@ts-ignore
    state.value[payload.key] = payload.value;
  }),
  clear: action((state) => {
    state.value = {
      countries: false,
      regions: false,
      sectors: false,
      donors: false,
      organisations: false,
      publishers: false,
      activitystatus: false,
    };
  }),
};

export default filtersUpdated;
