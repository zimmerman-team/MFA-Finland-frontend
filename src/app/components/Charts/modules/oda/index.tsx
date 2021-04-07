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
import { getTranslatedCols } from "../../table/utils/getTranslatedCols";
import { useRouteMatch } from "react-router-dom";

interface ODAvizModuleProps extends BarChartProps {
  vizScale: number;
  vizLevel: number;
  activeTab: string;
  scrollableHeight: number;
  odaBudgetLinesChartData: any;
  odaBudgetLinesChartLoading: boolean;
  onArrowSelectChange: (v: string) => void;
  vizTranslation: { x: number; y: number };
  getActiveTabData: () => any;
}

export function ODAvizModule(props: ODAvizModuleProps) {
  const cmsData = useCMSData({ returnData: true });
  const { params } = useRouteMatch();

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
        options: getODADataTableOptions(params, props.getActiveTabData),
        columns: getTranslatedCols(ODADataTableColumns, cmsData),
        title: `${props.data.length} ${get(cmsData, "filters.years", "years")}`,
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
                <SimpleBarChart data={props.odaBudgetLinesChartData} />
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
      `}
    >
      <DataTable {...tableConfig} />
    </div>
  );
}
