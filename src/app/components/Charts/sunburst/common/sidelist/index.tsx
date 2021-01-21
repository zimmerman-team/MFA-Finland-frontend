import React from "react";
import { Typography } from "@material-ui/core";
import {
  SideListProps,
  SideListDataItem,
} from "app/components/Charts/sunburst/common/sidelist/data";
import {
  containercss,
  listheadercss,
  listcountcss,
  listitemcss,
  listitemcirclecss,
  gradientlinecss,
  listitemcopy,
} from "app/components/Charts/sunburst/common/sidelist/styles";

export function SideList(props: SideListProps) {
  return (
    <div css={containercss} style={props.overflowList ? { width: "90%" } : {}}>
      {props.selected === "" && (
        <Typography variant="h5" color="textPrimary" css={listheadercss}>
          {props.title}
        </Typography>
      )}
      <Typography variant="h2" color="textPrimary" css={listcountcss}>
        {props.selected !== "" ? props.selected : props.data.children.length}
      </Typography>
      <div
        css={containercss}
        style={props.overflowList ? { maxHeight: 400, overflowY: "auto" } : {}}
      >
        {props.selected !== "" && (
          <span
            css={gradientlinecss(
              props.data.children.map((item: any) => item.color)
            )}
          />
        )}
        {props.data.children.map((item: SideListDataItem) => (
          <div
            css={listitemcss(props.withLinks)}
            key={item.title}
            onClick={() =>
              props.handleClick && props.handleClick({ data: item })
            }
          >
            <div css={listitemcirclecss(item.color)} />
            <div css={listitemcopy()}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
