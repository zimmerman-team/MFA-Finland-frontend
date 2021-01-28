import { BarExtendedDatum, BarItemProps } from "@nivo/bar";

export interface BarChartProps {
  data: any;
  onZoomOut: () => void;
  vizCompData: BarItemProps[];
  setVizCompData: React.Dispatch<React.SetStateAction<BarItemProps[]>>;
  selectedVizItemId: string | number | null;
  setSelectedVizItem: (name: string | number | null) => void;
  onSelectChange: (e: {
    selection: string | number | null;
    translation: { x: number; y: number };
  }) => void;
}

export interface SimpleBarChartProps {
  data: any;
}

export interface BarNodeProps extends BarItemProps {
  hoveredXIndex: number | null;
  setHoveredXIndex: React.Dispatch<React.SetStateAction<number | null>>;
  selected: BarExtendedDatum;
  setSelected: (b: BarExtendedDatum) => void;
  onNodeClick: (e: {
    selection: string | number | null;
    translation: { x: number; y: number };
  }) => void;
  onZoomOut: () => void;
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
    line: "Planning, support functions and communication",
    value: 4500000,
    valueColor: "#E7C3CD",
  },
  {
    line: "Evaluation and internal audit",
    value: 8500000,
    valueColor: "#819DAB",
  },
  {
    line: "Support conducted by civil society organisations",
    value: 7000000,
    valueColor: "#ACD1D1",
  },
  {
    line: "Concessional credits",
    value: 8700000,
    valueColor: "#DA8E68",
  },
];

export const budgetLineKeys = [
  "Multilateral development cooperation",
  "Country-specific and regional development",
  "European Development Fund",
  "Non-country specific development cooperation",
  "Humanitarian assistance",
  "Planning, support functions and communication",
  "Evaluation and internal audit",
  "Support conducted by civil society organisations",
  "Concessional credits",
];

export const budgetLinesMockData = [
  {
    year: 2016,
    "Multilateral development cooperation": 200000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Country-specific and regional development": 5500000,
    "Country-specific and regional developmentColor": "#AE4764",
    "European Development Fund": 4700000,
    "European Development FundColor": "#2E4982",
    "Non-country specific development cooperation": 6000000,
    "Non-country specific development cooperationColor": "#425346",
    "Humanitarian assistance": 7000000,
    "Humanitarian assistanceColor": "#233C71",
    "Planning, support functions and communication": 4500000,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Evaluation and internal audit": 8500000,
    "Evaluation and internal auditColor": "#819DAB",
    "Support conducted by civil society organisations": 7000000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Concessional credits": 8700000,
    "Concessional creditsColor": "#DA8E68",
  },
  {
    year: 2017,
    "Multilateral development cooperation": 200000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Country-specific and regional development": 5500000,
    "Country-specific and regional developmentColor": "#AE4764",
    "European Development Fund": 4700000,
    "European Development FundColor": "#2E4982",
    "Non-country specific development cooperation": 6000000,
    "Non-country specific development cooperationColor": "#425346",
    "Humanitarian assistance": 7000000,
    "Humanitarian assistanceColor": "#233C71",
    "Planning, support functions and communication": 4500000,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Evaluation and internal audit": 8500000,
    "Evaluation and internal auditColor": "#819DAB",
    "Support conducted by civil society organisations": 7000000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Concessional credits": 8700000,
    "Concessional creditsColor": "#DA8E68",
  },
  {
    year: 2018,
    "Multilateral development cooperation": 200000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Country-specific and regional development": 5500000,
    "Country-specific and regional developmentColor": "#AE4764",
    "European Development Fund": 4700000,
    "European Development FundColor": "#2E4982",
    "Non-country specific development cooperation": 6000000,
    "Non-country specific development cooperationColor": "#425346",
    "Humanitarian assistance": 7000000,
    "Humanitarian assistanceColor": "#233C71",
    "Planning, support functions and communication": 4500000,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Evaluation and internal audit": 8500000,
    "Evaluation and internal auditColor": "#819DAB",
    "Support conducted by civil society organisations": 7000000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Concessional credits": 8700000,
    "Concessional creditsColor": "#DA8E68",
  },
  {
    year: 2019,
    "Multilateral development cooperation": 200000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Country-specific and regional development": 5500000,
    "Country-specific and regional developmentColor": "#AE4764",
    "European Development Fund": 4700000,
    "European Development FundColor": "#2E4982",
    "Non-country specific development cooperation": 6000000,
    "Non-country specific development cooperationColor": "#425346",
    "Humanitarian assistance": 7000000,
    "Humanitarian assistanceColor": "#233C71",
    "Planning, support functions and communication": 4500000,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Evaluation and internal audit": 8500000,
    "Evaluation and internal auditColor": "#819DAB",
    "Support conducted by civil society organisations": 7000000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Concessional credits": 8700000,
    "Concessional creditsColor": "#DA8E68",
  },
  {
    year: 2020,
    "Multilateral development cooperation": 200000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Country-specific and regional development": 5500000,
    "Country-specific and regional developmentColor": "#AE4764",
    "European Development Fund": 4700000,
    "European Development FundColor": "#2E4982",
    "Non-country specific development cooperation": 6000000,
    "Non-country specific development cooperationColor": "#425346",
    "Humanitarian assistance": 7000000,
    "Humanitarian assistanceColor": "#233C71",
    "Planning, support functions and communication": 4500000,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Evaluation and internal audit": 8500000,
    "Evaluation and internal auditColor": "#819DAB",
    "Support conducted by civil society organisations": 7000000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Concessional credits": 8700000,
    "Concessional creditsColor": "#DA8E68",
  },
];
