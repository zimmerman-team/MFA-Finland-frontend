import React from "react";
import get from "lodash/get";
import uniqBy from "lodash/uniqBy";
import sortBy from "lodash/sortBy";

export function LineNodes(props: any) {
  let data = uniqBy(
    props.bars.map((bar: any) => ({
      ...bar,
      key: bar.key.split(".")[1],
    })),
    "key"
  );

  const sortedData = sortBy(data, "data.data.gni").reverse();
  const maxValue = get(sortedData, "[0].data.data.gni", 0);

  data = data.map((d: any) => {
    const value = get(d, "data.data.gni", 0);
    const yPerc = (value / maxValue) * 100;
    const updateY = 340 - (yPerc * 350) / 100;
    return {
      ...d,
      updateY,
    };
  });

  return (
    <React.Fragment>
      {data.map((item: any, index: number) => {
        if (index === data.length - 1) {
          return null;
        }
        const nNode = data[index + 1];
        const x2 = get(nNode, "x", 0) + get(nNode, "width", 0) / 2;
        const y2 = get(nNode, "updateY", 0);
        return (
          <line
            x2={x2}
            y2={y2}
            stroke="#E7C3CD"
            y1={item.updateY}
            key={`${item.key}-line`}
            x1={item.x + item.width / 2}
          />
        );
      })}
      {data.map((item: any) => {
        return (
          <g
            key={item.key}
            css="pointer-events: none;"
            transform={`translate(${item.x + item.width / 2}, ${item.updateY})`}
          >
            <circle
              r="6"
              css={`
                pointer-events: none;
                fill: ${props.selected.indexValue === parseInt(item.key, 10) ||
                props.hoveredXIndex === parseInt(item.key, 10)
                  ? item.data.data.gniColor
                  : "#E7C3CD"};
              `}
            />
          </g>
        );
      })}
    </React.Fragment>
  );
}
