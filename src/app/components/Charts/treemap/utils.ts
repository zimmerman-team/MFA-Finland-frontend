import get from "lodash/get";
import find from "lodash/find";
import orderBy from "lodash/orderBy";
import { formatLocale } from "app/utils/formatLocale";
import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";
import {
  TreemapDataModel,
  TreeemapNodeData,
} from "app/components/Charts/treemap/data";
import { getName } from "../sdg";

export function getTreemapLegends(
  data: TreemapDataModel,
  nodefilter: string | number | null,
  currentLanguage: string
): VizSidePanelItemProps[] {
  let filteredData = data.children;
  if (nodefilter) {
    filteredData = [];
    data.children.forEach((org1: TreeemapNodeData) => {
      if (org1.orgs) {
        if (org1.ref === nodefilter) {
          filteredData = org1.orgs;
        } else {
          org1.orgs.forEach((org2: TreeemapNodeData) => {
            if (org2.orgs) {
              if (org2.ref === nodefilter) {
                filteredData = org2.orgs;
              } else {
                org2.orgs.forEach((org3: TreeemapNodeData) => {
                  if (org3.ref === nodefilter && org3.orgs) {
                    filteredData = org3.orgs;
                  }
                });
              }
            }
          });
        }
      }
    });
  }
  return orderBy(filteredData, "value", "desc").map((d: TreeemapNodeData) => ({
    id: d.ref,
    name: get(d, getName(currentLanguage), d.name),
    value: formatLocale(d.value),
    color: d.color,
    children: orderBy(get(d, "orgs", []), "value", "desc").map(
      (c: TreeemapNodeData) => ({
        id: c.ref,
        name: get(c, getName(currentLanguage), d.name),
        value: formatLocale(c.value),
        color: c.color,
        children: orderBy(get(c, "orgs", []), "value", "desc").map(
          (cc: TreeemapNodeData) => ({
            id: cc.ref,
            name: get(cc, getName(currentLanguage), d.name),
            value: formatLocale(cc.value),
            color: cc.color,
          })
        ),
      })
    ),
  }));
}
