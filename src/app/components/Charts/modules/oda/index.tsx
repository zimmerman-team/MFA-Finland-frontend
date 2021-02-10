import React from "react";
import { BarChart } from "app/components/Charts/bar";
import {
  BarChartProps,
  ODADataTableColumns,
  ODADataTableOptions,
  ODAbudgetLinesDataTableColumns,
  ODAbudgetLinesDataTableOptions,
} from "app/components/Charts/bar/data";
import { DataTable } from "app/components/Charts/table";
import { VizLoader } from "app/modules/common/viz-loader";
import { SimpleBarChart } from "app/components/Charts/bar/simple";
import { ArrowSelector } from "app/components/Charts/common/arrowselector";
import { SlideContainer } from "app/components/Charts/common/slidecontainer";
import { TransitionContainer } from "app/components/Charts/common/transitioncontainer";

interface ODAvizModuleProps extends BarChartProps {
  vizScale: number;
  vizLevel: number;
  activeTab: string;
  odaBudgetLinesChartData: any;
  odaBudgetLinesChartLoading: boolean;
  onArrowSelectChange: (v: string) => void;
  vizTranslation: { x: number; y: number };
}

export function ODAvizModule(props: ODAvizModuleProps) {
  const tableConfig = props.selectedVizItemId
    ? {
        data: props.odaBudgetLinesChartData.map((item: any) => ({
          ...item,
          year: props.selectedVizItemId,
        })),
        options: ODAbudgetLinesDataTableOptions,
        columns: ODAbudgetLinesDataTableColumns,
        title: `${props.odaBudgetLinesChartData.length} budget lines`,
      }
    : {
        data: props.data,
        options: ODADataTableOptions,
        columns: ODADataTableColumns,
        title: `${props.data.length} years`,
      };

  if (props.activeTab === "chart" || props.selectedVizItemId) {
    return (
      <div
        id="viz-oda"
        css={`
          width: 100%;
          height: 100%;
          position: relative;
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
            <VizLoader />
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
        padding: 24px 24px 24px 0;
      `}
    >
      <DataTable {...tableConfig} />
    </div>
  );
}
