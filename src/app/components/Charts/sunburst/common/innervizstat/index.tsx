/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { Typography } from "@material-ui/core";
import { formatMoneyWithPrefix } from "app/utils/formatMoneyWithPrefix";
import { totalcss } from "app/components/Charts/sunburst/common/innervizstat/styles";

interface InnerVizStatProps {
  count: number;
}

export function InnerVizStat(props: InnerVizStatProps) {
  return (
    <div css={totalcss}>
      <Typography variant="subtitle2" color="textPrimary">
        {formatMoneyWithPrefix(props.count)}
      </Typography>
    </div>
  );
}
