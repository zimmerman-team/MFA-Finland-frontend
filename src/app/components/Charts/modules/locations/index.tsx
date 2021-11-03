import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { useRouteMatch } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { getName } from "app/components/Charts/sdg";
import { languageAtom } from "app/state/recoil/atoms";
import { Treemap } from "app/components/Charts/treemap";
import { MoreButton } from "app/components/Charts/bar/data";
import { TreemapProps } from "app/components/Charts/treemap/data";
import { LocationsFragmentTable } from "app/components/Charts/table/modules/locations";
import { getTranslatedCols } from "app/components/Charts/table/utils/getTranslatedCols";
import {
  LocationsDataTableColumns,
  SectorsDataTableOptions,
} from "app/components/Charts/table/data";

interface CountriesRegionsModuleModel extends TreemapProps {
  activeTab: string;
  scrollableHeight: number;
  getActiveTabData: () => any;
}

export function CountriesRegionsModule(props: CountriesRegionsModuleModel) {
  const cmsData = useCMSData({ returnData: true });
  const { params } = useRouteMatch();
  const [currentLanguage] = useRecoilState(languageAtom);

  if (props.activeTab === "chart") {
    return (
      <Treemap
        label="locations"
        data={props.data}
        selectedVizItemId={props.selectedVizItemId}
        setSelectedVizItem={props.setSelectedVizItem}
      />
    );
  }

  let tableData = props.data.children;

  if (currentLanguage !== "en") {
    tableData = tableData.map((item: any) => ({
      ...item,
      name: get(item, getName(currentLanguage), item.name),
      orgs: get(item, "orgs", []).map((item2: any) => ({
        ...item2,
        name: get(item2, getName(currentLanguage), item2.name),
        orgs: get(item2, "orgs", []).map((item3: any) => ({
          ...item3,
          name: get(item3, getName(currentLanguage), item3.name),
        })),
      })),
    }));
  }

  return (
    <div
      css={`
        overflow-y: overlay;
        padding: 24px 24px 24px 0;
        max-height: ${props.scrollableHeight}px;

        @media (max-width: 600px) {
          max-height: 100%;
          padding: 0;
        }
      `}
    >
      <LocationsFragmentTable
        type="location"
        data={tableData}
        options={{
          ...SectorsDataTableOptions,
          customToolbar: () => (
            <MoreButton data={props.getActiveTabData()} params={params} />
          ),
        }}
        columns={getTranslatedCols(LocationsDataTableColumns, cmsData)}
        title={`${props.data.children.length} ${get(
          cmsData,
          "viz.countriesregions",
          "regions/countries"
        ).toLowerCase()}`}
      />
    </div>
  );
}
