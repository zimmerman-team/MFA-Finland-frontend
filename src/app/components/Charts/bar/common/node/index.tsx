// @ts-nocheck
import React from "react";
import get from "lodash/get";
import { BarNodeProps } from "app/components/Charts/bar/data";

export function BarNode(props: BarNodeProps) {
  const fprops = {
    data: props.data,
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    color: props.color,
    theme: props.theme,
    label: props.label,
  };

  const getColor = (hovered: boolean) => {
    switch (props.color) {
      case "#ACD1D1":
        return hovered ? "#ACD1D1" : "#DCECEC";
        break;
      case "#233C71":
        return hovered ? "#233C71" : "#A8BBE4";
        break;
      default:
        return props.color;
    }
  };

  let opacity =
    props.data.indexValue === props.hoveredXIndex ||
    props.data.indexValue === get(props.selected, "indexValue", "")
      ? 1
      : 0.6;

  let border =
    props.data.indexValue === props.hoveredXIndex ||
    props.data.indexValue === get(props.selected, "indexValue", "")
      ? "0.5px solid #343249"
      : "0.5px solid #B8B6CD";

  const color =
    props.data.indexValue === props.hoveredXIndex ||
    props.data.indexValue === get(props.selected, "indexValue", "")
      ? getColor(true)
      : getColor(false);

  if (!props.hoveredXIndex && !props.selected) {
    opacity = 1;
    border = "0.5px solid #B8B6CD";
  }

  function onItemClick() {
    props.onNodeClick({
      selection: props.data.indexValue,
      translation: { x: props.x * -1 + 50, y: 0 },
    });
    props.setSelected(props.data);
  }

  return (
    <g
      {...fprops}
      onClick={onItemClick}
      onKeyPress={(e) => {
        if (e.code === "Enter") {
          onItemClick();
        }
      }}
      onTouchStart={onItemClick}
      transform={`translate(${props.x}, ${props.y})`}
      onMouseEnter={() => {
        if (
          (props.selected || { indexValue: "" }).indexValue !==
          props.data.indexValue
        ) {
          props.setHoveredXIndex(props.data.indexValue as number);
        }
      }}
      onMouseLeave={() => props.setHoveredXIndex(null)}
      css={`
        cursor: pointer;
        ${props.data.indexValue === get(props.selected, "indexValue", "")
          ? `
              z-index: 2;
            `
          : ""}
      `}
      data-cy="bf-barchart-bar-comp"
    >
      <rect
        rx={0}
        ry={0}
        fill={color}
        width={props.width}
        height={props.height}
        css={`
          outline: ${border};
          opacity: ${opacity};
        `}
      />
    </g>
  );
}
