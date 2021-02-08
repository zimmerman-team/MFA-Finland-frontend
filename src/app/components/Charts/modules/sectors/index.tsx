import React from "react";
import { SunburstChart } from "app/components/Charts/sunburst";
import { SunburstChartProps } from "app/components/Charts/sunburst/data";
import { ArrowSelector } from "app/components/Charts/common/arrowselector";
import { SlideContainer } from "app/components/Charts/common/slidecontainer";
import { TransitionContainer } from "app/components/Charts/common/transitioncontainer";

interface SectorsVizModuleProps extends SunburstChartProps {
  vizLevel: number;
}

export function SectorsVizModule(props: SectorsVizModuleProps) {
  return (
    <SunburstChart
      data={props.data}
      onZoomOut={props.onZoomOut}
      activitiesCount={props.activitiesCount}
      sectorDrillDown={props.sectorDrillDown}
      selectedVizItemId={props.selectedVizItemId}
      setSelectedVizItem={props.setSelectedVizItem}
      onSectorSelectChange={props.onSectorSelectChange}
    />
  );
}
