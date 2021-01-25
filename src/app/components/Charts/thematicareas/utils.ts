import orderBy from "lodash/orderBy";
import { formatLocale } from "app/utils/formatLocale";
import { DataProps } from "app/components/Charts/thematicareas/data";
import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";

export function getThematicAreasLegends(
  data: DataProps[]
): VizSidePanelItemProps[] {
  return orderBy(data, "size", "desc").map((d: DataProps) => ({
    id: d.name,
    name: d.name,
    color: d.color,
    value: formatLocale(d.value),
  }));
}
