import { Serie } from "@nivo/line";
// import { BarExtendedDatum } from "@nivo/bar";

export interface LineProps {
  data: Serie[];
  hovered: number | null;
  // selected: BarExtendedDatum | null;
  selected: any;
}
