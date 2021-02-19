export interface FilterPanelProps {}

export interface FilterOption {
  name: string;
  code: string;
  children?: FilterOption[];
}

export interface CheckboxListItemProps extends FilterOption {
  selected: boolean;
  onFilterCheckboxChange: (value: string) => void;
}

export interface FilterProps {
  title: string;
  selection: string[];
  data?: FilterOption[];
  renderSearch?: boolean;
  selectedItems: string[];
  onApplyFilters: () => void;
  onSelectAllCheckboxChange: () => void;
  onFilterCheckboxChange: (value: string) => void;
}

export interface MailPanelInitDataItemModel {
  label: string;
  heading: string;
  type: any;
  selection: string[];
}

export enum FILTER_TYPES {
  NONE,
  MAIN,
  THEMATIC_AREAS,
  COUNTRIES,
  SECTORS,
  ORGANISATIONS,
  SDGS,
  ACTIVITY_STATUS,
  PERIOD,
  ADVANCED_FILTERS,
}

export const mailPanelInitData: MailPanelInitDataItemModel[] = [
  {
    heading: "Thematic areas",
    label: "All Thematic areas",
    type: FILTER_TYPES.THEMATIC_AREAS,
    selection: [],
  },
  {
    heading: "Countries/Regions",
    label: "The World",
    type: FILTER_TYPES.COUNTRIES,
    selection: [],
  },
  {
    heading: "Sectors",
    label: "All Sectors",
    type: FILTER_TYPES.SECTORS,
    selection: [],
  },
  {
    heading: "Organisations",
    label: "All Organisations",
    type: FILTER_TYPES.ORGANISATIONS,
    selection: [],
  },
  {
    heading: "SDG's",
    label: "All SDG's",
    type: FILTER_TYPES.SDGS,
    selection: [],
  },
  {
    heading: "Activity Status",
    label: "All Activity statuses",
    type: FILTER_TYPES.ACTIVITY_STATUS,
    selection: [],
  },
  {
    heading: "Period",
    label: "All years",
    type: FILTER_TYPES.PERIOD,
    selection: [],
  },
  {
    heading: "Advanced Filters",
    label: "5 Advanced filter",
    type: FILTER_TYPES.ADVANCED_FILTERS,
    selection: [],
  },
];

export const level1MockData: FilterOption[] = [
  {
    code: "54311",
    name: "Thematic Area A",
  },
  {
    code: "54312",
    name: "Thematic Area B",
  },
  {
    code: "54313",
    name: "Thematic Area C",
  },
  {
    code: "Sector Name A4",
    name: "Thematic Area D",
  },
  {
    code: "Sector Name A5",
    name: "Thematic Area E",
  },
  {
    code: "Sector Name A6",
    name: "Thematic Area F",
  },
];

export const level2MockData: FilterOption[] = [
  {
    code: "543",
    name: "Organisation Category A",
    children: [
      {
        code: "5431",
        name: "Organisation AA",
      },
      {
        code: "5431",
        name: "Organisation AB",
      },
      {
        code: "5431",
        name: "Organisation AC",
      },
      {
        code: "5431",
        name: "Organisation AD",
      },
      {
        code: "5431",
        name: "Organisation AE",
      },
    ],
  },
  {
    code: "542",
    name: "Organisation Category B",
    children: [
      {
        code: "5431",
        name: "Organisation BA",
      },
      {
        code: "5431",
        name: "Organisation BB",
      },
      {
        code: "5431",
        name: "Organisation BC",
      },
      {
        code: "5431",
        name: "Organisation BD",
      },
      {
        code: "5431",
        name: "Organisation BE",
      },
    ],
  },
];

export const level3MockData: FilterOption[] = [
  {
    code: "543",
    name: "Sector Category A",
    children: [
      {
        code: "5431",
        name: "Sector Sub-Category A",
        children: [
          {
            code: "54311",
            name: "Sector Name A1",
          },
          {
            code: "54312",
            name: "Sector Name A2",
          },
          {
            code: "54313",
            name: "Sector Name A3",
          },
          {
            code: "Sector Name A4",
            name: "Sector Name A4",
          },
          {
            code: "Sector Name A5",
            name: "Sector Name A5",
          },
          {
            code: "Sector Name A6",
            name: "Sector Name A6",
          },
        ],
      },
      {
        code: "5431",
        name: "Sector Sub-Category B",
        children: [
          {
            code: "54311",
            name: "Sector Name B1",
          },
          {
            code: "54312",
            name: "Sector Name B2",
          },
          {
            code: "54313",
            name: "Sector Name B3",
          },
          {
            code: "Sector Name B4",
            name: "Sector Name B4",
          },
          {
            code: "Sector Name B5",
            name: "Sector Name B5",
          },
          {
            code: "Sector Name B6",
            name: "Sector Name B6",
          },
        ],
      },
    ],
  },
  {
    code: "544",
    name: "Sector Category B",
    children: [
      {
        code: "5431",
        name: "Sector Sub-Category B",
        children: [
          {
            code: "54311",
            name: "Sector Name B1",
          },
          {
            code: "54312",
            name: "Sector Name B2",
          },
          {
            code: "54313",
            name: "Sector Name B3",
          },
          {
            code: "Sector Name B4",
            name: "Sector Name B4",
          },
          {
            code: "Sector Name B5",
            name: "Sector Name B5",
          },
          {
            code: "Sector Name B6",
            name: "Sector Name B6",
          },
        ],
      },
    ],
  },
];
