import React from "react";
import { BarChart } from "app/components/Charts/bar";
import {
  BarChartProps,
  simplebarMockData,
} from "app/components/Charts/bar/data";
import { SimpleBarChart } from "app/components/Charts/bar/simple";
import { ArrowSelector } from "app/components/Charts/common/arrowselector";
import { SlideContainer } from "app/components/Charts/common/slidecontainer";
import { TransitionContainer } from "app/components/Charts/common/transitioncontainer";

interface ODAvizModuleProps extends BarChartProps {
  vizScale: number;
  vizLevel: number;
  odaBudgetLinesChartData: any;
  onArrowSelectChange: (v: string) => void;
  vizTranslation: { x: number; y: number };
}

export function ODAvizModule(props: ODAvizModuleProps) {
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
              props.selectedVizItemId ? props.selectedVizItemId.toString() : ""
            }
          />
        </div>
        <SimpleBarChart data={props.odaBudgetLinesChartData} />
      </SlideContainer>
    </div>
  );
}
