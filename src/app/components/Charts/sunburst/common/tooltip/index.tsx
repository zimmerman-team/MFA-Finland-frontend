import React from "react";
import get from "lodash/get";
import { SunburstPoint } from "react-vis";
import { useCMSData } from "app/hooks/useCMSData";
import { formatLocale } from "app/utils/formatLocale";
import useMousePosition from "app/hooks/useMousePosition";
import {
  tooltipcss,
  tooltiprowcss,
  progressbarcss,
  progressbarcontainercss,
} from "app/components/Charts/sunburst/common/tooltip/styles";
import { getFormattedPercentage } from "app/components/Charts/sunburst/common/tooltip/utils";

interface SunburstTooltipProps {
  containerId?: string;
  showOnlyTitle?: boolean;
  hoveredNode: SunburstPoint | null;
}

export const SunburstTooltip = (props: SunburstTooltipProps) => {
  const { x, y } = useMousePosition();
  const [style, setStyle] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    const container = document.getElementById(
      props.containerId || "sunburst-container"
    );
    if (container) {
      const containerBounds = container.getBoundingClientRect();
      setStyle({
        top: y - containerBounds.top + 40,
        left: x - containerBounds.left - 100,
      });
    }
  }, [x, y, props.hoveredNode]);

  return props.hoveredNode ? (
    <div
      css={`
        ${tooltipcss}${props.showOnlyTitle ? "width: fit-content;" : ""}
      `}
      id="sunburst-tooltip"
      style={style}
    >
      <SunburstTooltipContent {...props} />
    </div>
  ) : null;
};

export function SunburstTooltipContent(props: SunburstTooltipProps) {
  const cmsData = useCMSData({ returnData: true });

  if (props.hoveredNode) {
    if (props.showOnlyTitle) {
      return (
        <div data-cy="OnlyTitleHoverNode" css={tooltiprowcss}>
          <b>{props.hoveredNode.title}</b>
        </div>
      );
    }
    return (
      <>
        <div data-cy="HoverNode" css={tooltiprowcss}>
          <b>{props.hoveredNode.title}</b>
        </div>
        <div css="width: 100%;height: 30px;" />
        <div css={tooltiprowcss}>
          <div>
            <b>
              {get(cmsData, "viz.disbursed", "Disbursed")}{" "}
              {getFormattedPercentage(props.hoveredNode.percentage)}
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
          <div>{get(cmsData, "viz.committed", "Committed")}</div>
          <div>
            {props.hoveredNode.committed
              ? formatLocale(props.hoveredNode.committed)
              : "NA"}
          </div>
        </div>
        <div css="width: 100%;height: 15px;" />
      </>
    );
  }
  return null;
}
