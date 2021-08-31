import { Serie } from "@nivo/line";

export interface LineProps {
  data: Serie[];
  hovered: number | null;
  selected: any;
}
