// @ts-nocheck
import React, { FunctionComponent } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { css } from "styled-components/macro";
import { Tooltip } from "@material-ui/core";
import { ProjectPalette } from "../theme";

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
    color: ${ProjectPalette.primary.main};
    //opacity: 0.9;
    line-height: 1;
  `,
  widgeTooltip: css`
    margin-left: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  widgetTooltipIcon: css`
    fill: #bcc6d6;
  `,
};

const widgetContainer = (height: string) => css`
  width: 100%;
  height: ${height ? height : "328px"};
  background-color: white;
  display: flex;
  border-radius: 32px;
  padding: 24px 32px 32px 32px;
  flex-direction: column;
`;

style.widgetContainer = widgetContainer;

interface GridWidgetProps {
  label?: string;
  tooltip?: string;
  height?: string;
  disbursementsStatComponent?: FunctionComponent;
}

export const GridWidget: FunctionComponent<GridWidgetProps> = (props) => {
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
      {props.children}
    </div>
  );
};
