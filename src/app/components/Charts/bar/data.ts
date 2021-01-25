import { BarExtendedDatum, BarItemProps } from "@nivo/bar";

export interface BarChartProps {
  data: any;
  selectedVizItemId: string | number | null;
  setSelectedVizItem: (name: string | number | null) => void;
}

export interface BarNodeProps extends BarItemProps {
  hoveredXIndex: number | null;
  setHoveredXIndex: React.Dispatch<React.SetStateAction<number | null>>;
  selected: BarExtendedDatum;
  setSelected: (b: BarExtendedDatum) => void;
}

export const barMockData = [
  {
    year: 2010,
    exclusive: 4700000,
    exclusiveColor: "#ACD1D1",
    other: 1100000,
    otherColor: "#7491CE",
    gni: 0.7,
    gniColor: "#AE4764",
  },
  {
    year: 2011,
    exclusive: 4700000,
    exclusiveColor: "#ACD1D1",
    other: 500000,
    otherColor: "#7491CE",
    gni: 0.6,
    gniColor: "#AE4764",
  },
  {
    year: 2012,
    exclusive: 4200000,
    exclusiveColor: "#ACD1D1",
    other: 200000,
    otherColor: "#7491CE",
    gni: 0.5,
    gniColor: "#AE4764",
  },
  {
    year: 2013,
    exclusive: 6000000,
    exclusiveColor: "#ACD1D1",
    other: 1000000,
    otherColor: "#7491CE",
    gni: 0.3,
    gniColor: "#AE4764",
  },
  {
    year: 2014,
    exclusive: 7000000,
    exclusiveColor: "#ACD1D1",
    other: 100000,
    otherColor: "#7491CE",
    gni: 0.4,
    gniColor: "#AE4764",
  },
  {
    year: 2015,
    exclusive: 1000000,
    exclusiveColor: "#ACD1D1",
    other: 1000000,
    otherColor: "#7491CE",
    gni: 0.8,
    gniColor: "#AE4764",
  },
  {
    year: 2016,
    exclusive: 3000000,
    exclusiveColor: "#ACD1D1",
    other: 2000000,
    otherColor: "#7491CE",
    gni: 0.5,
    gniColor: "#AE4764",
  },
  {
    year: 2017,
    exclusive: 9000000,
    exclusiveColor: "#ACD1D1",
    other: 1000000,
    otherColor: "#7491CE",
    gni: 0.9,
    gniColor: "#AE4764",
  },
  {
    year: 2018,
    exclusive: 1000000,
    exclusiveColor: "#ACD1D1",
    other: 800000,
    otherColor: "#7491CE",
    gni: 0.1,
    gniColor: "#AE4764",
  },
  {
    year: 2019,
    exclusive: 8000000,
    exclusiveColor: "#ACD1D1",
    other: 2000000,
    otherColor: "#7491CE",
    gni: 0.2,
    gniColor: "#AE4764",
  },
  {
    year: 2020,
    exclusive: 4000000,
    exclusiveColor: "#ACD1D1",
    other: 3000000,
    otherColor: "#7491CE",
    gni: 0.8,
    gniColor: "#AE4764",
  },
];

export const simplebarMockData = [
  {
    line: "Multilateral development cooperation",
    value: 10000000,
    valueColor: "#8AA4DB",
  },
  {
    line: "Country-specific and regional development",
    value: 5500000,
    valueColor: "#AE4764",
  },
  {
    line: "European Development Fund",
    value: 4700000,
    valueColor: "#2E4982",
  },
  {
    line: "Non-country specific development cooperation",
    value: 6000000,
    valueColor: "#425346",
  },
  {
    line: "Humanitarian assistance",
    value: 7000000,
    valueColor: "#233C71",
  },
  {
    line: "Planning,support functions and communication",
    value: 4500000,
    valueColor: "#E7C3CD",
  },
  {
    line: "Evaluation and internal audit",
    value: 8500000,
    valueColor: "#819DAB",
  },
  {
    line: "Support conducted by civil society organisations ",
    value: 7000000,
    valueColor: "#ACD1D1",
  },
  {
    line: "Concessional credits",
    value: 8700000,
    valueColor: "#DA8E68",
  },
];
