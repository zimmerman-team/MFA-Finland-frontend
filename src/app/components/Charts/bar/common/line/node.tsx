import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";

export function LineNodes(props: any) {
  return (
    <React.Fragment>
      {filter(
        props.points,
        (item: any, index: number) =>
          props.points[index + 1] && props.points[index + 1].data.y > 0
      ).map((item: any, index: number) => {
        if (index === props.points.length - 1) {
          return null;
        }
        const nNode = props.points[index + 1];
        const x2 = get(nNode, "x", 0);
        const y2 = get(nNode, "y", 0);
        return (
          <line
            tabIndex={-1}
            y2={y2}
            x2={x2}
            y1={item.y}
            x1={item.x}
            strokeWidth={2}
            stroke="#F4A490"
            key={`${item.id}-line`}
          />
        );
      })}
      {filter(props.points, (item: any) => item.data.y > 0).map((item: any) => {
        return (
          <g
            key={`${item.id}-node`}
            css="pointer-events: none;"
            tabIndex={-1}
            transform={`translate(${item.x}, ${item.y})`}
          >
            <circle
              tabIndex={-1}
              r="4"
              stroke="#382D5E"
              strokeWidth={0.5}
              css={`
                pointer-events: none;
                fill: ${(props.selected ? props.selected.indexValue : null) ===
                  parseInt(item.data.x, 10) ||
                props.hovered === parseInt(item.data.x, 10)
                  ? item.serieColor
                  : "#F4A490"};
              `}
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
