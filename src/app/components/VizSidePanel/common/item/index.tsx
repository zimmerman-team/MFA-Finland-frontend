/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";
import {
  circlecss,
  containercss,
  expandiconcss,
} from "app/components/VizSidePanel/common/item/styles";
import IconButton from "@material-ui/core/IconButton";
import { ArrowDropDown } from "@material-ui/icons";

interface VizSidePanelItemPropsProps extends VizSidePanelItemProps {
  vizType: string;
  selected: boolean;
  expanded: boolean;
  isChild?: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string | number | null>>;
  setExpanded: React.Dispatch<React.SetStateAction<string | number | null>>;
}

export function VizSidePanelItem(props: VizSidePanelItemPropsProps) {
  const isSectorOROrgORLocation =
    props.vizType === "sectors" ||
    props.vizType === "organisations" ||
    props.vizType === "countries-regions";
  const isNOTSectorOrgLocation =
    props.vizType !== "sectors" &&
    props.vizType !== "countries-regions" &&
    props.vizType !== "organisations";
  return (
    <Grid
      item
      xs={12}
      css={containercss(
        props.expanded,
        props.selected,
        props.children ? props.children.length > 0 : false,
        props.vizType,
        props.color !== null,
        props.isChild
      )}
      style={isSectorOROrgORLocation ? { opacity: 1 } : {}}
    >
      <div
        css={`
          position: relative;
          ${((props.vizType === "oda" || props.vizType === "thematic-areas") &&
            !props.isChild) ||
          (isSectorOROrgORLocation &&
            props.children &&
            props.children.length > 0 &&
            !props.selected)
            ? "cursor: pointer;"
            : ""}
        `}
        onClick={() => {
          if (isSectorOROrgORLocation) {
            if (props.children && props.children.length > 0) {
              props.setSelected(props.id);
            }
          } else if (!props.isChild) {
            if (props.children) {
              if (props.expanded) {
                props.setExpanded(null);
              } else {
                props.setExpanded(props.id);
              }
            }
            if (!props.children) {
              props.setSelected(props.id);
            }
          }
        }}
      >
        <div
          css={`
            display: flex;
            flex-direction: row;
          `}
        >
          {props.color && <div css={circlecss(props.color)} />}
          <Typography
            color="textPrimary"
            variant="body2"
            css={`
              line-height: 17px;
              width: calc(100% - 25px);
            `}
          >
            {props.name}
          </Typography>
        </div>
        <div
          css={`
            height: 4px;
          `}
        />
        <div
          css={`
            display: flex;
            justify-content: space-between;
          `}
        >
          <Typography
            color="textPrimary"
            variant="subtitle2"
            css={`
              margin-left: ${props.color ? "22px" : "0"};
              line-height: 17px;
            `}
          >
            {props.value}
          </Typography>
          {props.children && isNOTSectorOrgLocation && (
            <ArrowDropDown css={expandiconcss(props.expanded)} />
          )}
        </div>
      </div>
      {props.children &&
        (props.expanded || (props.selected && props.vizType === "sectors")) &&
        props.vizType !== "countries-regions" &&
        props.vizType !== "organisations" && (
          <React.Fragment>
            <div
              css={`
                height: 12px;
                pointer-events: none;
              `}
            />
            {props.children.map((child: VizSidePanelItemProps) => (
              <VizSidePanelItem
                isChild
                selected={false}
                expanded={false}
                vizType={props.vizType}
                key={`${child.name}-${child.value}`}
                setSelected={props.setSelected}
                setExpanded={props.setExpanded}
                {...child}
              />
            ))}
          </React.Fragment>
        )}
    </Grid>
  );
}
