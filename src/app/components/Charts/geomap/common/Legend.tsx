import React from "react";
import { useRecoilState } from "recoil";
import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";
import { Typography } from "@material-ui/core";
import { languageAtom } from "app/state/recoil/atoms";
import { formatMoneyWithPrefix } from "app/utils/formatMoneyWithPrefix";

interface LegendProps {
  label: string;
  startValue: number;
  totalValue: number;
}

const container = css`
  @media (max-width: 960px) {
    width: 212px;
  }
  width: 382px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  margin-right: 8px;
  margin-left: auto;
`;

const label = css`
  line-height: 17px;
  margin-bottom: 8px;
  text-align: right;
`;

const bar = css`
  width: 100%;
  height: 11px;
  background: linear-gradient(269.94deg, #5f8b83 0.08%, #e5f0f0 99.97%), #e5f0f0;
  border-radius: 10px;
  margin-bottom: 6px;
  border: 0.5px solid ${PrimaryColor[3]};
`;

const valueContainer = css`
  display: flex;
  justify-content: space-between;
`;

const value = css`
  line-height: 17px;
`;

export const Legend = (props: LegendProps) => {
  const [currentLanguage] = useRecoilState(languageAtom);
  return (
    <div css={container}>
      <Typography variant="subtitle2" css={label}>
        {props.label}
      </Typography>
      <div css={bar} />

      <div css={valueContainer}>
        <Typography variant="body2" css={value}>
          {props.startValue}
        </Typography>
        <Typography variant="body2" css={value}>
          {formatMoneyWithPrefix(props.totalValue, currentLanguage)}
        </Typography>
      </div>
    </div>
  );
};
