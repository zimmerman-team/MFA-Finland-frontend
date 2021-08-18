import React from "react";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { BarChart } from "app/components/Charts/bar";
import {
  BarChartProps,
  ODADataTableColumns,
  ODAbudgetLinesDataTableColumns,
  getODADataTableOptions,
  getODAbudgetLinesDataTableOptions,
} from "app/components/Charts/bar/data";
import { DataTable } from "app/components/Charts/table";
import { VizLoader } from "app/modules/common/viz-loader";
import { SimpleBarChart } from "app/components/Charts/bar/simple";
import { ArrowSelector } from "app/components/Charts/common/arrowselector";
import { SlideContainer } from "app/components/Charts/common/slidecontainer";
import { TransitionContainer } from "app/components/Charts/common/transitioncontainer";
import { getTranslatedCols } from "app/components/Charts/table/utils/getTranslatedCols";
import { useLocation } from "react-use";

interface ODAvizModuleProps extends BarChartProps {
  vizScale: number;
  vizLevel: number;
  activeTab: string;
  activeTabData: any;
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
          year: props.selectedVizItemId,
        })),
        options: getODAbudgetLinesDataTableOptions,
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
    const countries = currentURLParams.get("recipient_country_code");
    const regions = currentURLParams.get("recipient_region_code");
    const sectors = currentURLParams.get("sector_code");
    const organisations = currentURLParams.get("participating_org_ref");
    const activitystatus = currentURLParams.get("activity_status_code");
    const activityscope = currentURLParams.get("activity_scope_code");
    const tag = currentURLParams.get("tag_narrative");
    const sdg = currentURLParams.get("tag_code");
    const defaultaidtype = currentURLParams.get("default_aid_type_code");
    const defaulttiedstatus = currentURLParams.get("default_tied_status_code");
    const defaultflowtype = currentURLParams.get("default_flow_type_code");
    const collaborationtype = currentURLParams.get("collaboration_type_code");
    const policymarker = currentURLParams.get("policy_marker_code");
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
            <VizLoader loading={props.odaBudgetLinesChartLoading} />
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
