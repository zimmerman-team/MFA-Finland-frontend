import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import Grid from "@material-ui/core/Grid";
import { useRouteMatch } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { VizLoader } from "app/modules/common/viz-loader";
import { MoreButton } from "app/components/Charts/bar/data";
import { SunburstChart } from "app/components/Charts/sunburst";
import { getTitle } from "app/components/Charts/sunburst/utils";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { SunburstChartProps } from "app/components/Charts/sunburst/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { languageAtom, selectedFilterAtom } from "app/state/recoil/atoms";
import { SectorsFragmentTable } from "app/components/Charts/table/modules/sectors";
import { getTranslatedCols } from "app/components/Charts/table/utils/getTranslatedCols";
import { backbuttoncss } from "app/components/Charts/sunburst/common/innervizstat/styles";
import {
  SectorsDataTableColumns,
  SectorsDataTableOptions,
} from "app/components/Charts/table/data";
import { SimpleActivitiesTableModule } from "app/components/Charts/table/modules/activities/simple";

interface SectorsVizModuleProps extends SunburstChartProps {
  vizLevel: number;
  activeTab: string;
  clearSectorDrillDown: () => void;
  scrollableHeight: number;
  getActiveTabData: () => any;
}

export function SectorsVizModule(props: SectorsVizModuleProps) {
  const { params } = useRouteMatch();
  const cmsData = useCMSData({ returnData: true });
  const [tablePage, setTablePage] = React.useState(0);
  const [tableRows, setTableRows] = React.useState(10);
  const [currentLanguage] = useRecoilState(languageAtom);
  const [selectedFilters] = useRecoilState(selectedFilterAtom);

  /* STATE & ACTIONS */
  const sectorProjectsAction = useStoreActions(
    (actions) => actions.sectorProjects.fetch
  );
  const sectorProjectsData = useStoreState((state) =>
    get(state.sectorProjects, "data.data", [])
  );
  const sectorProjectsDataCount = useStoreState((state) =>
    get(state.sectorProjects, "data.count", 0)
  );
  const sectorProjectsLoading = useStoreState(
    (state) => state.sectorProjects.loading
  );

  React.useEffect(() => {
    if (props.sectorDrillDown.length > 0) {
      let filters = getAPIFormattedFilters(selectedFilters);
      if (filters.sector_code) {
        filters.sector_code = [...filters.sector_code, props.sectorDrillDown];
      } else {
        filters = {
          ...filters,
          sector_code: [props.sectorDrillDown],
        };
      }
      sectorProjectsAction({
        values: {
          filters,
          rows: tableRows,
          page: tablePage,
        },
      });
    }
  }, [props.sectorDrillDown, tableRows, tablePage]);

  const showTable =
    props.sectorDrillDown.length > 0 && props.activeTab === "table";

  if (props.sectorDrillDown.length > 0 || props.activeTab === "chart") {
    return (
      <React.Fragment>
        <Grid
          container
          css={`
            padding: 24px 24px 24px 0;
            display: ${showTable ? "flex" : "none"};
          `}
        >
          {sectorProjectsLoading ? (
            <VizLoader
              dataCy="projects-loader"
              loading={sectorProjectsLoading}
            />
          ) : (
            <React.Fragment>
              <Grid item sm={12} md={2} lg={1}>
                <div css={backbuttoncss} onClick={props.clearSectorDrillDown}>
                  {get(cmsData, "general.back", "Back")}
                </div>
              </Grid>
              <Grid item sm={12}>
                <SimpleActivitiesTableModule
                  data={sectorProjectsData}
                  setTablePage={setTablePage}
                  setTableRows={setTableRows}
                  tableCount={sectorProjectsDataCount}
                />
              </Grid>
            </React.Fragment>
          )}
        </Grid>
        <div
          css={`
            display: ${!showTable ? "flex" : "none"};
            @media (max-width: 992px) {
              padding-top: 20%;
            }
            @media (max-width: 600px) {
              padding: 10px 0;
            }
          `}
        >
          <SunburstChart
            data={props.data}
            onZoomOut={props.onZoomOut}
            activitiesCount={props.activitiesCount}
            sectorDrillDown={props.sectorDrillDown}
            selectedVizItemId={props.selectedVizItemId}
            setSelectedVizItem={props.setSelectedVizItem}
            onSectorSelectChange={props.onSectorSelectChange}
          />
        </div>
      </React.Fragment>
    );
  }

  let tableData = props.data.children;

  if (currentLanguage !== "en") {
    tableData = tableData.map((category: any) => ({
      ...category,
      title: get(category, getTitle(currentLanguage), category.title),
      children: get(category, "children", []).map((dac3: any) => ({
        ...dac3,
        title: get(dac3, getTitle(currentLanguage), dac3.title),
        children: get(dac3, "children", []).map((dac5: any) => ({
          ...dac5,
          title: get(dac5, getTitle(currentLanguage), dac5.title),
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
      <SectorsFragmentTable
        title=""
        data={tableData}
        options={{
          ...SectorsDataTableOptions,
          customToolbar: () => (
            <MoreButton data={props.getActiveTabData} params={params} />
          ),
        }}
        columns={getTranslatedCols(SectorsDataTableColumns, cmsData)}
      />
    </div>
  );
}
