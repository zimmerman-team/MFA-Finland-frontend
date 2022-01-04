/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { useRecoilState } from "recoil";
import { Typography } from "@material-ui/core";
import { languageAtom } from "app/state/recoil/atoms";
import { formatMoneyWithPrefix } from "app/utils/formatMoneyWithPrefix";
import { totalcssSimplified } from "app/components/Charts/sunburst-simplified/common/innervizstat/styles";

interface InnerVizStatProps {
  count: number;
}

export function InnerVizStatSimplified(props: InnerVizStatProps) {
  const [currentLanguage] = useRecoilState(languageAtom);
  return (
    <div css={totalcssSimplified}>
      <Typography variant="subtitle2" color="textPrimary">
        {formatMoneyWithPrefix(props.count, currentLanguage)}
      </Typography>
    </div>
  );
}
