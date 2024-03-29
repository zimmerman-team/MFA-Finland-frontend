import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { useCMSData } from "app/hooks/useCMSData";
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
  const cmsData = useCMSData({ returnData: true });

  const [height, setHeight] = React.useState(400);

  React.useEffect(() => {
    setHeight(
      get(document.getElementById("image-container"), "offsetHeight", 400)
    );
  }, []);

  const hasColor =
    props.vizType === "organisations" ||
    props.vizType === "countries-regions" ||
    props.vizType === "thematic-areas" ||
    props.vizType === "sectors";

  return (
    <Grid container css={containercss}>
      <Hidden smDown>
        <Grid item xs={12} css={buttonscontainercss}>
          <FilledButton
            label={get(cmsData, "general.chart", "Chart")}
            onClick={() => props.setActiveTab("chart")}
            backgroundColor={
              props.activeTab === "chart" ? PrimaryColor[0] : SecondaryColor[1]
            }
            color={props.activeTab === "chart" ? "#fff" : PrimaryColor[0]}
          />
          <div
            css={`
              width: 16px;
            `}
          />
          <FilledButton
            label={get(cmsData, "general.table", "Table")}
            onClick={() => props.setActiveTab("table")}
            backgroundColor={
              props.activeTab === "table" ? PrimaryColor[0] : SecondaryColor[1]
            }
            color={props.activeTab === "table" ? "#fff" : PrimaryColor[0]}
          />
        </Grid>
      </Hidden>
      <div css={dividercss} />
      {props.activeTab === "chart" && (
        <div
          id="legend-items"
          css={`
            width: 100%;
            overflow-y: overlay;
            max-height: calc(${height}px - 101px);
            height: 100%;
            min-height: 100%;
            ${hasColor ? "padding-top: 24px;" : ""}

            @media (max-width: 600px) {
              padding-right: 12px;
            }

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

            @media (max-width: 600px) {
              max-height: 100%;
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
