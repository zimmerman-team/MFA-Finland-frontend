import React from "react";

export interface SearchComponentLayoutProps {
  width: number;
  value: string;
  close: Function;
  loading: boolean;
  setValue: Function;
  resultType: string;
  loadMore: Function;
  hasMoreOfType: boolean;
  setResultType: Function;
  searchData: NavResultsModel;
  targetRef: React.RefObject<HTMLDivElement>;
  onClickAway: (event: React.MouseEvent<Document>) => void;
}

export interface ResultModel {
  name: string;
  link: string;
}

export interface NavResultItemModel {
  count: number;
  data: ResultModel[];
}

export interface NavResultsModel {
  Projects: NavResultItemModel;
  "Thematic areas": NavResultItemModel;
  Countries: NavResultItemModel;
  Organisations: NavResultItemModel;
  Sectors: NavResultItemModel;
  All: NavResultItemModel;
}

export const datapath = "data.data";
export const countpath = "data.count";

export const searchNavItems = [
  "Projects",
  "Thematic areas",
  "Sectors",
  "Organisations",
  "Countries",
  "All",
];

const mockResultItem = {
  name: "Activity",
  link: "",
};

export const initData: NavResultsModel = {
  Projects: {
    count: 0,
    data: [],
  },
  "Thematic areas": {
    count: 0,
    data: [],
  },
  Countries: {
    count: 0,
    data: [],
  },
  Organisations: {
    count: 0,
    data: [],
  },
  Sectors: {
    count: 0,
    data: [],
  },
  All: {
    count: 0,
    data: [],
  },
};

export const mockResultsData = {
  Projects: [
    mockResultItem,
    mockResultItem,
    mockResultItem,
    mockResultItem,
    mockResultItem,
    mockResultItem,
    mockResultItem,
    mockResultItem,
    mockResultItem,
    mockResultItem,
  ],
  Countries: [],
  Organisations: [],
  Sectors: [],
  All: [],
};

export const thematicAreas: ResultModel[] = [
  {
    name: "Priority area 1, primary",
    link: `/thematic-area/${encodeURIComponent("Priority area 1, primary")}`,
  },
  {
    name: "Priority area 2, primary",
    link: `/thematic-area/${encodeURIComponent("Priority area 2, primary")}`,
  },
  {
    name: "Priority area 3, primary",
    link: `/thematic-area/${encodeURIComponent("Priority area 3, primary")}`,
  },
  {
    name: "Priority area 4, primary",
    link: `/thematic-area/${encodeURIComponent("Priority area 4, primary")}`,
  },
];
