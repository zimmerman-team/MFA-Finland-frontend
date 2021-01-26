import get from "lodash/get";
import find from "lodash/find";
import orderBy from "lodash/orderBy";
import { formatLocale } from "app/utils/formatLocale";
import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";
import {
  TreemapDataModel,
  TreeemapNodeData,
} from "app/components/Charts/treemap/data";

export function getTreemapLegends(
  data: TreemapDataModel,
  nodefilter: string | number | null
): VizSidePanelItemProps[] {
  let filteredData = data.children;
  if (nodefilter) {
    filteredData =
      find(filteredData, { ref: nodefilter as string })?.orgs || [];
  }
  return orderBy(filteredData, "value", "desc").map((d: TreeemapNodeData) => ({
    id: d.ref,
    name: d.name,
    value: formatLocale(d.value),
    color: d.color,
    children: orderBy(get(d, "orgs", []), "value", "desc").map(
      (c: TreeemapNodeData) => ({
        id: c.ref,
        name: c.name,
        value: formatLocale(c.value),
        color: c.color,
        children: orderBy(get(d, "orgs", []), "value", "desc").map(
          (cc: TreeemapNodeData) => ({
            id: cc.ref,
            name: cc.name,
            value: formatLocale(cc.value),
            color: cc.color,
          })
        ),
      })
    ),
  }));
}
