export interface SunburstChartProps {
  data: any;
  onZoomOut: () => void;
  activitiesCount: number;
  sectorDrillDown: string;
  onSectorSelectChange: (v: string) => void;
  selectedVizItemId: string | number | null;
  width?: number;
  height?: number;
  setSelectedVizItem: React.Dispatch<
    React.SetStateAction<string | number | null>
  >;
}

export const SunburstChartColors = [
  "#9CF7EE",
  "#239281",
  "#ED6060",
  "#FFF377",
  "#BDA4FF",
  "#FFC145",
  "#D8AFB2",
  "#C89105",
  "#B23D3E",
  "#30C2B0",
  "#6E5ACC",
];
