import React from "react";
import { SunburstPoint } from "react-vis";
import { useWindowScroll } from "react-use";
import { formatLocale } from "app/utils/formatLocale";
import useMousePosition from "app/hooks/useMousePosition";
import {
  tooltipcss,
  tooltiprowcss,
  progressbarcss,
  progressbarcontainercss,
} from "app/components/Charts/sunburst/common/tooltip/styles";
import { getFormattedPercentage } from "app/components/Charts/sunburst/common/tooltip/utils";

interface SDGTooltipProps {
  containerId?: string;
  hoveredNode: SunburstPoint | null;
}

export const SDGTooltip = (props: SDGTooltipProps) => {
  const { x, y } = useMousePosition();
  const windowScroll = useWindowScroll();
  const [style, setStyle] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (props.containerId) {
      const container = document.getElementById(props.containerId);
      if (container) {
        const containerBounds = container.getBoundingClientRect();
        setStyle({
          top: y - containerBounds.top + 40,
          left: x - containerBounds.left - 150,
        });
      }
    } else {
      setStyle({
        top: y - 100 + windowScroll.y,
        left: x - 350,
      });
    }
  }, [x, y, props.hoveredNode, windowScroll.y]);

  return props.hoveredNode ? (
    <div css={tooltipcss} id="sunburst-tooltip" style={style}>
      <div css={tooltiprowcss}>
        <b>{props.hoveredNode.title}</b>
      </div>
      <div css="width: 100%;height: 30px;" />
      <div css={tooltiprowcss}>
        <div>
          <b>
            Disbursed {getFormattedPercentage(props.hoveredNode.percentage)}
          </b>
        </div>
        <div>
          <b>
            {formatLocale(
              props.hoveredNode.disbursed || props.hoveredNode.size
            )}
          </b>
        </div>
      </div>
      <div css="width: 100%;height: 12px;" />
      <div css={progressbarcontainercss}>
        <div css={progressbarcss(props.hoveredNode.percentage)} />
      </div>
      <div css="width: 100%;height: 15px;" />
      <div css={tooltiprowcss}>
        <div>Committed</div>
        <div>
          {props.hoveredNode.committed
            ? formatLocale(props.hoveredNode.committed)
            : "NA"}
        </div>
      </div>
      <div css="width: 100%;height: 15px;" />
    </div>
  ) : null;
};
