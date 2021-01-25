import React from "react";
import Grid from "@material-ui/core/Grid";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { FilledButton } from "app/components/Buttons/FilledButton";
import { VizSidePanelItem } from "app/components/VizSidePanel/common/item";
import {
  VizSidePanelItemProps,
  VizSidePanelProps,
} from "app/components/VizSidePanel/data";
import {
  dividercss,
  containercss,
  buttonscontainercss,
} from "app/components/VizSidePanel/styles";

export function VizSidePanel(props: VizSidePanelProps) {
  return (
    <Grid container css={containercss}>
      <Grid item xs={12} css={buttonscontainercss}>
        <FilledButton
          label="Chart"
          onClick={() => props.setActiveTab("chart")}
          backgroundColor={
            props.activeTab === "chart" ? PrimaryColor[0] : SecondaryColor[1]
          }
        />
        <div
          css={`
            width: 16px;
          `}
        />
        <FilledButton
          label="Table"
          onClick={() => props.setActiveTab("table")}
          backgroundColor={
            props.activeTab === "table" ? PrimaryColor[0] : SecondaryColor[1]
          }
        />
      </Grid>
      <div css={dividercss} />
      {props.activeTab === "chart" && (
        <div
          css={`
            width: 100%;
            overflow-y: auto;
            overflow-y: overlay;
            max-height: ${props.scrollableHeight - 125}px;
          `}
        >
          {props.items.map((item: VizSidePanelItemProps) => (
            <VizSidePanelItem
              {...item}
              key={item.name}
              vizType={props.vizType}
              setSelected={props.setSelected}
              setExpanded={props.setExpanded}
              expanded={props.expandedVizItem === item.id}
              selected={
                props.selectedVizItem ? props.selectedVizItem === item.id : true
              }
            />
          ))}
        </div>
      )}
    </Grid>
  );
}
