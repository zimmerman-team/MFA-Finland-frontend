import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import Grid from "@material-ui/core/Grid";
import { VizLoader } from "app/modules/common/viz-loader";
import { selectedFilterAtom } from "app/state/recoil/atoms";
import { SunburstChart } from "app/components/Charts/sunburst";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { SunburstChartProps } from "app/components/Charts/sunburst/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { SectorsFragmentTable } from "app/components/Charts/table/modules/sectors";
import { backbuttoncss } from "app/components/Charts/sunburst/common/innervizstat/styles";
import {
  SectorsDataTableColumns,
  SectorsDataTableOptions,
} from "app/components/Charts/table/data";
import { SimpleActivitiesTableModule } from "app/components/Charts/table/modules/activities/simple";
import { useCMSData } from "app/hooks/useCMSData";
import { getTranslatedCols } from "../../table/utils/getTranslatedCols";

interface SectorsVizModuleProps extends SunburstChartProps {
  vizLevel: number;
  activeTab: string;
  clearSectorDrillDown: () => void;
  scrollableHeight: number;
}

export function SectorsVizModule(props: SectorsVizModuleProps) {
  const cmsData = useCMSData({ returnData: true });
  const [tablePage, setTablePage] = React.useState(0);
  const [tableRows, setTableRows] = React.useState(10);
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
            <VizLoader loading={sectorProjectsLoading} />
          ) : (
            <React.Fragment>
              <Grid item sm={12} md={2} lg={1}>
                <div css={backbuttoncss} onClick={props.clearSectorDrillDown}>
                  Back
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
  return (
    <div
      css={`
        overflow-y: overlay;
        padding: 24px 24px 24px 0;
        max-height: ${props.scrollableHeight}px;
      `}
    >
      <SectorsFragmentTable
        title=""
        data={props.data.children}
        options={SectorsDataTableOptions}
        columns={getTranslatedCols(SectorsDataTableColumns, cmsData)}
      />
    </div>
  );
}
