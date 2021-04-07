import React from "react";

export function LineNodes(props: any) {
  return (
    <React.Fragment>
      {/* {props.points.map((item: any, index: number) => {
        if (index === props.points.length - 1) {
          return null;
        }
        const nNode = props.points[index + 1];
        const x2 = get(nNode, "x", 0);
        const y2 = get(nNode, "y", 0);
        return (
          <line
            y2={y2}
            y1={item.y}
            x2={x2 + 15}
            x1={item.x + 15}
            stroke="#E7C3CD"
            key={`${item.id}-line`}
          />
        );
      })} */}
      {props.points.map((item: any) => {
        return (
          <g
            key={`${item.id}-node`}
            css="pointer-events: none;"
            tabIndex={0}
            transform={`translate(${item.x}, ${item.y})`}
          >
            <circle
              r="6"
              css={`
                pointer-events: none;
                fill: ${(props.selected ? props.selected.indexValue : null) ===
                  parseInt(item.data.x, 10) ||
                props.hovered === parseInt(item.data.x, 10)
                  ? item.serieColor
                  : "#E7C3CD"};
              `}
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
