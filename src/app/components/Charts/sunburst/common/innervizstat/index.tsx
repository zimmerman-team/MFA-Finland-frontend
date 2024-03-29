/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { useRecoilState } from "recoil";
import { Typography } from "@material-ui/core";
import { languageAtom } from "app/state/recoil/atoms";
import { formatMoneyWithPrefix } from "app/utils/formatMoneyWithPrefix";
import { totalcss } from "app/components/Charts/sunburst/common/innervizstat/styles";

interface InnerVizStatProps {
  count: number;
}

export function InnerVizStat(props: InnerVizStatProps) {
  const [currentLanguage] = useRecoilState(languageAtom);
  return (
    <div css={totalcss}>
      <Typography
        variant="h3"
        color="textPrimary"
        css={`
          font-size: 24px;
          font-weight: 700;
          line-height: 29px;
          margin-bottom: 6px;
        `}
      >
        {formatMoneyWithPrefix(props.count, currentLanguage)}
      </Typography>
    </div>
  );
}
