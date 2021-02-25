/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { Typography } from "@material-ui/core";
import { formatMoneyWithPrefix } from "app/utils/formatMoneyWithPrefix";
import { totalcssSimplified } from "app/components/Charts/sunburst-simplified/common/innervizstat/styles";

interface InnerVizStatProps {
  count: number;
}

export function InnerVizStatSimplified(props: InnerVizStatProps) {
  return (
    <div css={totalcssSimplified}>
      <Typography variant="subtitle2" color="textPrimary">
        {formatMoneyWithPrefix(props.count)}
      </Typography>
    </div>
  );
}
