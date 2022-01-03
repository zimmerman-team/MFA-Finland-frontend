import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { useCMSData } from "app/hooks/useCMSData";
import { getName } from "app/components/Charts/sdg";
import { languageAtom } from "app/state/recoil/atoms";
import { formatLocale } from "app/utils/formatLocale";
import { getFormattedPercentage } from "app/components/Charts/sunburst/common/tooltip/utils";
import {
  tooltiprowcss,
  progressbarcss,
  progressbarcontainercss,
} from "app/components/Charts/sunburst/common/tooltip/styles";

export function TreemapTooltip(props: any) {
  const { node } = props;
  const cmsData = useCMSData({ returnData: true });
  const [currentLanguage] = useRecoilState(languageAtom);

  return (
    <div css="font-size: 14px;width: 300px;" id="treemap-tooltip">
      <div css={tooltiprowcss}>
        <b>{node.data[getName(currentLanguage)] || node.data.name}</b>
      </div>
      <div css="width: 100%;height: 30px;" />
      <div css={tooltiprowcss}>
        <div>
          <b>
            {get(cmsData, "viz.disbursed", "Disbursed")}{" "}
            {getFormattedPercentage(node.data.percentage)}
          </b>
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
        <div>{get(cmsData, "viz.committed", "Committed")}</div>
        <div>
          {node.data.committed ? formatLocale(node.data.committed) : "NA"}
        </div>
      </div>
      <div css="width: 100%;height: 15px;" />
    </div>
  );
}
