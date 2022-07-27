import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import isEqual from "lodash/isEqual";
import { useRecoilState } from "recoil";
import useTitle from "react-use/lib/useTitle";
import { useRouteMatch } from "react-router-dom";
import { Path, getAppName } from "app/const/Path";
import { useStoreState } from "app/state/store/hooks";
import { languageAtom } from "app/state/recoil/atoms";
import { useDataGridData } from "app/hooks/useDataGridData";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { DetailModuleLayout } from "app/modules/detail-modules/common/layout";
import {
  AF_PARTICIPATING_ORG_REF,
} from 'app/utils/getAPIFormattedFilters';

const moduleName = "Organisation Detail Module";

export const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home, cmsKey: "breadcrumbs.homepage" },
  { label: moduleName, cmsKey: "breadcrumbs.organisation" },
];

function getOrganisationValues(
  orgFilterOptions: any,
  orgRef: string
): string[] {
  const fLvl0Org = find(orgFilterOptions, { code: orgRef });
  const filterArr = [];

  if (!fLvl0Org) {
    orgFilterOptions.forEach((lvl0Org: any) => {
      const fLvl1Org = find(lvl0Org.children, { code: orgRef });
      if (!fLvl1Org) {
        lvl0Org.children.forEach((lvl1Org: any) => {
          const fLvl2Org = find(lvl1Org.children, { code: orgRef });
          if (!fLvl2Org) {
            lvl1Org.children.forEach((lvl2Org: any) => {
              const fLvl3Org = find(lvl2Org.children, { code: orgRef });
              if (fLvl3Org) {
                get(fLvl3Org, "children", []).forEach((child: any) => {
                  filterArr.push(child.code);
                  get(child, "children", []).forEach((gchild: any) => {
                    filterArr.push(gchild.code);
                    get(gchild, "children", []).forEach((ggchild: any) => {
                      filterArr.push(ggchild.code);
                    });
                  });
                });
              }
            });
          } else {
            get(fLvl2Org, "children", []).forEach((child: any) => {
              filterArr.push(child.code);
              get(child, "children", []).forEach((gchild: any) => {
                filterArr.push(gchild.code);
                get(gchild, "children", []).forEach((ggchild: any) => {
                  filterArr.push(ggchild.code);
                });
              });
            });
          }
        });
      } else {
        get(fLvl1Org, "children", []).forEach((child: any) => {
          filterArr.push(child.code);
          get(child, "children", []).forEach((gchild: any) => {
            filterArr.push(gchild.code);
            get(gchild, "children", []).forEach((ggchild: any) => {
              filterArr.push(ggchild.code);
            });
          });
        });
      }
    });
  } else {
    get(fLvl0Org, "children", []).forEach((child: any) => {
      filterArr.push(child.code);
      get(child, "children", []).forEach((gchild: any) => {
        filterArr.push(gchild.code);
        get(gchild, "children", []).forEach((ggchild: any) => {
          filterArr.push(ggchild.code);
        });
      });
    });
  }

  filterArr.push(orgRef);

  return filterArr;
}

export function OrganisationDetailModule() {
  const [currentLanguage] = useRecoilState(languageAtom);
  useTitle(`${moduleName} | ${getAppName(currentLanguage)}`);
  const { params } = useRouteMatch();
  const filterOrgOptionsData = useStoreState((state) =>
    get(state.filterOptions.organisations, "data.data", [])
  );
  const [orgValues, setOrgValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    const values = getOrganisationValues(
      filterOrgOptionsData,
      get(params, "organisation", "")
    );
    if (!isEqual(values, orgValues)) {
      setOrgValues(values);
    }
  }, [params, filterOrgOptionsData]);

  const {
    vizDataLoading,
    odaBarChartData,
    thematicAreasChartData,
    sectorsSunburstDataCount,
    sectorsSunburstData,
    locationsTreemapData,
    organisationsTreemapData,
    budgetLinesBarChartData,
    sdgVizData,
    geoMapData,
    unallocablePercentage,
    detailPageNameData,
  } = useDataGridData({
    detailPageFilter: {
      key: AF_PARTICIPATING_ORG_REF,
      value: orgValues,
    },
  });

  return (
    <DetailModuleLayout
      label={detailPageNameData || get(params, "organisation", "")}
      crumbs={crumbs}
      vizDataLoading={vizDataLoading}
      odaBarChartData={odaBarChartData}
      thematicAreasChartData={thematicAreasChartData}
      sectorsSunburstDataCount={sectorsSunburstDataCount}
      sectorsSunburstData={sectorsSunburstData}
      locationsTreemapData={locationsTreemapData}
      organisationsTreemapData={organisationsTreemapData}
      budgetLinesBarChartData={budgetLinesBarChartData}
      sdgVizData={sdgVizData}
      geoMapData={geoMapData}
      unallocablePercentage={unallocablePercentage}
      detailPageFilter={{
        key: AF_PARTICIPATING_ORG_REF,
        value: orgValues,
      }}
    />
  );
}
