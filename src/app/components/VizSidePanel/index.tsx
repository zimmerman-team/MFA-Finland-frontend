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
import { css } from "styled-components/macro";

export function VizSidePanel(props: VizSidePanelProps) {
  const styles = {
    background: css`
      top: 224px;
      width: 100vw;
      position: absolute;
      background: #f8f8f8;
      height: calc(100% - 224px);
      z-index: -1;
    `,
  };
  const hasColor =
    props.vizType === "organisations" ||
    props.vizType === "countries-regions" ||
    props.vizType === "thematic-areas" ||
    props.vizType === "sectors";
  return (
    <Grid container css={containercss}>
      <div id="viz-sidepanel-background" css={styles.background} />
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
          color={props.activeTab === "table" ? "#fff" : PrimaryColor[0]}
        />
      </Grid>
      <div css={dividercss} />
      {props.activeTab === "chart" && (
        <div
          id="legend-items"
          css={`
            width: 100%;
            overflow-y: auto;
            overflow-y: overlay;
            max-height: ${props.scrollableHeight - 125}px;
            ${props.vizType === "thematic-areas" ? "pointer-events: none;" : ""}
            ${hasColor ? "padding-top: 24px;" : ""}

            padding-right: 12px;

            &::-webkit-scrollbar {
              width: 4px;
              border-radius: 4px;
              background: transparent;
            }

            &::-webkit-scrollbar-track {
              border-radius: 4px;
              background: ${PrimaryColor[1]};
            }

            &::-webkit-scrollbar-thumb {
              border-radius: 4px;
              background: ${SecondaryColor[0]};
            }

            ::-webkit-scrollbar-button {
              width: 0;
              height: 0;
              display: none;
            }

            ::-webkit-scrollbar-corner {
              background-color: transparent;
            }
          `}
        >
          {props.items.map((item: VizSidePanelItemProps) => (
            <VizSidePanelItem
              {...item}
              key={`${item.name}-${item.value}`}
              vizType={props.vizType}
              setSelected={props.setSelected}
              setExpanded={props.setExpanded}
              expanded={props.expandedVizItem === item.id}
              selected={
                props.selectedVizItem
                  ? props.selectedVizItem === item.id
                  : props.vizType === "thematic-areas"
              }
            />
          ))}
        </div>
      )}
    </Grid>
  );
}
