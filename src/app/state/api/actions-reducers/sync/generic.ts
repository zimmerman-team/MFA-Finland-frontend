/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface ProjectListPage {
  value: number;
  setValue: Action<ProjectListPage, number>;
}

export const projectListPage: ProjectListPage = {
  value: 1,
  setValue: action((state, payload: number) => {
    state.value = payload;
  }),
};
