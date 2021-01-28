import React from "react";
import { SunburstChart } from "app/components/Charts/sunburst";
import { SunburstChartProps } from "app/components/Charts/sunburst/data";
import { ArrowSelector } from "app/components/Charts/common/arrowselector";
import { SlideContainer } from "app/components/Charts/common/slidecontainer";
import { TransitionContainer } from "app/components/Charts/common/transitioncontainer";

interface SectorsVizModuleProps extends SunburstChartProps {
  vizScale: number;
  vizLevel: number;
  vizTranslation: { x: number; y: number };
  //   onArrowSelectChange: (v: string) => void;
}

export function SectorsVizModule(props: SectorsVizModuleProps) {
  return (
    <div
      id="viz-sectors"
      css={`
        width: 100%;
        height: 100%;
        position: relative;

        > div {
          height: 100%;
        }
      `}
    >
      <TransitionContainer
        vizScale={props.vizScale}
        vizLevel={props.vizLevel}
        vizTranslation={props.vizTranslation}
      >
        <div
          css={`
            width: 100%;
            height: 100%;
            * {
              pointer-events: ${props.vizLevel > 0 ? "none" : "all"};

              #sunburst-back {
                display: ${props.vizLevel > 0 ? "none" : "flex"};
              }
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
      </TransitionContainer>
      <SlideContainer
        vizLevel={props.vizLevel}
        selected={props.selectedVizItemId}
        close={() => props.onSectorSelectChange("")}
      >
        <div
          css={`
            width: fit-content;
            padding: 24px 0 0 20px;
          `}
        >
          {/* <ArrowSelector
            onChange={props.onArrowSelectChange}
            options={props.data.map((d: any) => d.year.toString())}
            selected={
              props.selectedVizItemId ? props.selectedVizItemId.toString() : ""
            }
          /> */}
        </div>
      </SlideContainer>
    </div>
  );
}
