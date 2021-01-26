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

interface VizSidePanelItemPropsProps extends VizSidePanelItemProps {
  vizType: string;
  selected: boolean;
  expanded: boolean;
  isChild?: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string | number | null>>;
  setExpanded: React.Dispatch<React.SetStateAction<string | number | null>>;
}

export function VizSidePanelItem(props: VizSidePanelItemPropsProps) {
  return (
    <Grid
      item
      xs={12}
      css={containercss(
        props.expanded,
        props.selected,
        props.children ? props.children.length > 0 : false,
        props.isChild
      )}
    >
      <div
        css={`
          position: relative;
          ${!props.isChild ? "cursor: pointer;" : ""}
        `}
        onClick={() => {
          if (!props.isChild) {
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
        <Typography
          color="textPrimary"
          variant="body2"
          css={`
            display: flex;
          `}
        >
          {props.color && <div css={circlecss(props.color)} />}
          {props.name}
        </Typography>
        <div
          css={`
            height: 5px;
          `}
        />
        <Typography
          color="textPrimary"
          variant="subtitle2"
          css={`
            padding-left: 6px;
          `}
        >
          {props.value}
        </Typography>
        {props.children && (
          <div css={expandiconcss(props.expanded)}>&#9662;</div>
        )}
      </div>
      {props.children && props.expanded && (
        <React.Fragment>
          <div
            css={`
              height: 16px;
            `}
          />
          {props.children.map((child: VizSidePanelItemProps) => (
            <VizSidePanelItem
              isChild
              selected={false}
              expanded={false}
              key={child.name}
              vizType={props.vizType}
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
