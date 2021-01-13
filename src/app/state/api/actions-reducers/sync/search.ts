/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface SyncSearchModel {
  value: string;
  setValue: Action<SyncSearchModel, string>;
}

const syncSearch: SyncSearchModel = {
  value: "",
  setValue: action((state, payload: string) => {
    state.value = payload;
  }),
};

export default syncSearch;
