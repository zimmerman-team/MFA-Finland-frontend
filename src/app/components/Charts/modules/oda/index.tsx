import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { useLocation } from "react-use";
import { useCMSData } from "app/hooks/useCMSData";
import { BarChart } from "app/components/Charts/bar";
import {
  BarChartProps,
  ODADataTableColumns,
  ODAbudgetLinesDataTableColumns,
  getODADataTableOptions,
  ODAbudgetLinesDataTableOptions,
} from "app/components/Charts/bar/data";
import { DataTable } from "app/components/Charts/table";
import { VizLoader } from "app/modules/common/viz-loader";
import { getLineName } from "app/components/Charts/bar/utils";
import { SimpleBarChart } from "app/components/Charts/bar/simple";
import { ArrowSelector } from "app/components/Charts/common/arrowselector";
import { SlideContainer } from "app/components/Charts/common/slidecontainer";
import { TransitionContainer } from "app/components/Charts/common/transitioncontainer";
import { getTranslatedCols } from "app/components/Charts/table/utils/getTranslatedCols";
import {
  AF_COUNTRY,
  AF_REGION,
  AF_SECTOR,
  AF_PARTICIPATING_ORG_REF,
  AF_ACTIVITY_STATUS_CODE,
  AF_ACTIVITY_SCOPE_CODE,
  AF_TAG_NARRATIVE,
  AF_TAG_CODE,
  AF_DEFAULT_AID_TYPE_CODE,
  AF_DEFAULT_TIED_STATUS_CODE,
  AF_DEFAULT_FLOW_TYPE_CODE,
  AF_COLLABORATION_TYPE_CODE,
  AF_POLICY_MARKER_CODE,
} from 'app/utils/getAPIFormattedFilters';

interface ODAvizModuleProps extends BarChartProps {
  vizScale: number;
  vizLevel: number;
  activeTab: string;
  activeTabData: any;
  currentLanguage: string;
  scrollableHeight: number;
  odaBudgetLinesChartData: any;
  odaBudgetLinesChartLoading: boolean;
  onArrowSelectChange: (v: string) => void;
  vizTranslation: { x: number; y: number };
}

export function ODAvizModule(props: ODAvizModuleProps) {
  const cmsData = useCMSData({ returnData: true });
  const location = useLocation();
  const tableConfig = props.selectedVizItemId
    ? {
        data: props.odaBudgetLinesChartData.map((item: any) => ({
          ...item,
          line: item[getLineName(props.currentLanguage)],
          year: props.selectedVizItemId,
        })),
        options: ODAbudgetLinesDataTableOptions,
        columns: getTranslatedCols(ODAbudgetLinesDataTableColumns, cmsData),
        title: `${props.odaBudgetLinesChartData.length} ${get(
          cmsData,
          "general.budgetlines",
          "budget lines"
        ).toLowerCase()}`,
      }
    : {
        data: props.data,
        // @ts-ignore
        options: getODADataTableOptions({ tab: "oda" }, props.activeTabData),
        columns: getTranslatedCols(ODADataTableColumns, cmsData),
        title: `${props.data.length} ${get(cmsData, "filters.years", "years")}`,
      };

  const hideODAGNI = () => {
    const currentURLParams = new URLSearchParams(location.search);
    const countries = currentURLParams.get(AF_COUNTRY);
    const regions = currentURLParams.get(AF_REGION);
    const sectors = currentURLParams.get(AF_SECTOR);
    const organisations = currentURLParams.get(AF_PARTICIPATING_ORG_REF);
    const activitystatus = currentURLParams.get(AF_ACTIVITY_STATUS_CODE);
    const activityscope = currentURLParams.get(AF_ACTIVITY_SCOPE_CODE);
    const tag = currentURLParams.get(AF_TAG_NARRATIVE);
    const sdg = currentURLParams.get(AF_TAG_CODE);
    const defaultaidtype = currentURLParams.get(AF_DEFAULT_AID_TYPE_CODE);
    const defaulttiedstatus = currentURLParams.get(AF_DEFAULT_TIED_STATUS_CODE);
    const defaultflowtype = currentURLParams.get(AF_DEFAULT_FLOW_TYPE_CODE);
    const collaborationtype = currentURLParams.get(AF_COLLABORATION_TYPE_CODE);
    const policymarker = currentURLParams.get(AF_POLICY_MARKER_CODE);
    const budgetlines = currentURLParams.get("budget_line");
    const humanrights = currentURLParams.get("human_rights_approach");
    const years = currentURLParams.get("years");
    const hasValue =
      countries ||
      regions ||
      sectors ||
      organisations ||
      activitystatus ||
      activityscope ||
      tag ||
      sdg ||
      defaultaidtype ||
      defaulttiedstatus ||
      defaultflowtype ||
      collaborationtype ||
      policymarker ||
      budgetlines ||
      humanrights ||
      years;

    return hasValue !== null;
  };

  if (hideODAGNI()) {
    tableConfig.columns = filter(
      tableConfig.columns,
      (column: any) => column.name !== "gni"
    );
  }

  if (props.activeTab === "chart" || props.selectedVizItemId) {
    return (
      <div
        id="viz-oda"
        css={`
          width: 100%;
          position: relative;
          padding-right: 72px;
          padding-top: 32px;

          @media (max-width: 767px) {
            padding-right: 0;
          }
        `}
      >
        <TransitionContainer
          vizScale={props.vizScale}
          vizLevel={props.vizLevel}
          vizTranslation={props.vizTranslation}
        >
          <BarChart
            data={props.data}
            onZoomOut={props.onZoomOut}
            vizCompData={props.vizCompData}
            setVizCompData={props.setVizCompData}
            onSelectChange={props.onSelectChange}
            selectedVizItemId={props.selectedVizItemId}
            setSelectedVizItem={props.setSelectedVizItem}
            hideODAGNI={hideODAGNI()}
          />
        </TransitionContainer>
        <SlideContainer
          vizLevel={props.vizLevel}
          selected={props.selectedVizItemId}
          close={() => props.setSelectedVizItem(null)}
        >
          {props.odaBudgetLinesChartLoading ? (
            <VizLoader
              dataCy="budgetlines-loader"
              loading={props.odaBudgetLinesChartLoading}
            />
          ) : (
            <React.Fragment>
              <div
                css={`
                  width: fit-content;
                  padding: 24px 0 0 20px;
                `}
              >
                <ArrowSelector
                  onChange={props.onArrowSelectChange}
                  options={props.data.map((d: any) => d.year.toString())}
                  selected={
                    props.selectedVizItemId
                      ? props.selectedVizItemId.toString()
                      : ""
                  }
                />
              </div>
              {props.activeTab === "chart" ? (
                <SimpleBarChart
                  data={props.odaBudgetLinesChartData}
                  selectedYear={
                    props.selectedVizItemId
                      ? props.selectedVizItemId.toString()
                      : ""
                  }
                />
              ) : (
                <div
                  css={`
                    padding: 24px;
                  `}
                >
                  <DataTable {...tableConfig} />
                </div>
              )}
            </React.Fragment>
          )}
        </SlideContainer>
      </div>
    );
  }
  return (
    <div
      css={`
        overflow-y: overlay;
        padding: 24px 24px 24px 0;
        max-height: ${props.scrollableHeight}px;

        @media (max-width: 600px) {
          padding: 0;
          max-height: 100%;
        }
      `}
    >
      <DataTable {...tableConfig} />
    </div>
  );
}
