export interface DataProps {
  name: string;
  color: string;
  size: number;
  value: number;
  values: string[];
}

export interface ThematicAreasProps {
  data: DataProps[];
  selectedVizItemId: string | number | null;
  setSelectedVizItem: (name: string | number | null) => void;
}

export const thematicareasMockData: DataProps[] = [
  {
    name: "Natural resources",
    color: "#425346",
    size: 200,
    value: 200000000,
    values: ["Main priority 50%", "€2,000,000,000", "Secondary priority 40%"],
  },
  {
    name: "Women and girls",
    color: "#AE4764",
    size: 100,
    value: 100000000,
    values: ["Main priority 20%", "€1,003,070,011", "Secondary priority 35%"],
  },
  {
    name: "Well-functioning society",
    color: "#819DAB",
    size: 180,
    value: 180000000,
    values: ["Main priority 40%", "€1,800,098,999", "Secondary priority 45%"],
  },
  {
    name: "Economy and jobs",
    color: "#DA8E68",
    size: 140,
    value: 140000000,
    values: ["Main priority 80%", "€1,498,000,222", "Secondary priority 10%"],
  },
];

export const directions = [
  ["top", "left"],
  ["right", "top"],
  ["bottom", "right"],
  ["left", "bottom"],
];
