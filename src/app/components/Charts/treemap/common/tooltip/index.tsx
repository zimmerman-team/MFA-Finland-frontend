import React from "react";
import { formatLocale } from "app/utils/formatLocale";
import {
  tooltiprowcss,
  progressbarcss,
  progressbarcontainercss,
} from "app/components/Charts/sunburst/common/tooltip/styles";
import { getFormattedPercentage } from "app/components/Charts/sunburst/common/tooltip/utils";

export function TreemapTooltip(props: any) {
  const { node } = props;
  return (
    <div css="font-size: 14px;width: 300px;" id="treemap-tooltip">
      <div css={tooltiprowcss}>
        <b>{node.data.name}</b>
      </div>
      <div css="width: 100%;height: 30px;" />
      <div css={tooltiprowcss}>
        <div>
          <b>Disbursed {getFormattedPercentage(node.data.percentage)}</b>
        </div>
        <div>
          <b>{formatLocale(node.data.disbursed || node.data.value)}</b>
        </div>
      </div>
      <div css="width: 100%;height: 12px;" />
      <div css={progressbarcontainercss}>
        <div css={progressbarcss(node.data.percentage)} />
      </div>
      <div css="width: 100%;height: 15px;" />
      <div css={tooltiprowcss}>
        <div>Committed</div>
        <div>
          {node.data.committed ? formatLocale(node.data.committed) : "NA"}
        </div>
      </div>
      <div css="width: 100%;height: 15px;" />
    </div>
  );
}
