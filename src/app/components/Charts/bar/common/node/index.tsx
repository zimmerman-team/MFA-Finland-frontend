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

  let opacity =
    props.data.indexValue === props.hoveredXIndex ||
    props.data.indexValue === get(props.selected, "indexValue", "")
      ? 1
      : 0.6;

  if (!props.hoveredXIndex && !props.selected) {
    opacity = 1;
  }

  return (
    <g
      {...fprops}
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
      onClick={() => {
        if (props.data.indexValue !== get(props.selected, "indexValue", "")) {
          props.onNodeClick({
            selection: props.data.indexValue,
            translation: { x: props.x * -1 + 80, y: 0 },
          });
          props.setSelected(props.data);
        } else {
          props.onZoomOut();
        }
      }}
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
        fill={props.color}
        width={props.width}
        height={props.height}
        css={`
          opacity: ${opacity};
        `}
      />
    </g>
  );
}
