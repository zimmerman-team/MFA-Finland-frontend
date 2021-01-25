// @ts-nocheck
import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { css } from "styled-components/macro";
import { Tooltip } from "@material-ui/core";

let style = {
  widgetHeader: css`
    width: 100%;
    display: flex;
    align-items: center;
    height: 24px;
  `,
  widgetLabel: css`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: #2e4982;
    opacity: 0.9;
    line-height: 1;
  `,
  widgeTooltip: css`
    margin-left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  widgetTooltipIcon: css`
    fill: #bcc6d6;
  `,
};

const widgetContainer = (height: number) => css`
  width: 100%;
  height: ${height ? height : "328px"};
  background-color: white;
  display: flex;
  border-radius: 32px;
  padding: 32px;
`;

style.widgetContainer = widgetContainer;

interface GridWidgetProps {
  label?: string;
  tooltip?: string;
  height?: number;
  disbursementsStatComponent?: FunctionComponent;
}

export const GridWidget = (props: GridWidgetProps) => {
  return (
    <div css={style.widgetContainer(props.height)}>
      <header css={style.widgetHeader}>
        <div css={style.widgetLabel}>{props.label}</div>
        {props.tooltip && (
          <div css={style.widgeTooltip}>
            <Tooltip title={props.tooltip}>
              <InfoOutlinedIcon css={style.widgetTooltipIcon} />
            </Tooltip>
          </div>
        )}
      </header>
    </div>
  );
};
