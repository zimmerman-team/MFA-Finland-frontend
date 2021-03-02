/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FunctionComponent } from "react";
import { ProjectPalette } from "app/theme";
import { Tooltip } from "@material-ui/core";
import { css } from "styled-components/macro";
import { useHistory } from "react-router-dom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const style = {
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
  widgetContainer: (height: string | undefined, isHovered: boolean) => css`
    width: 100%;
    //height: 100%;
    display: flex;
    border-radius: 32px;
    flex-direction: column;
    background-color: #ffffff;
    padding: 24px 32px 32px 32px;
    height: ${height || "375px"};
    min-height: 375px;
    overflow: hidden;
    box-shadow: ${isHovered
      ? "0 3px 6px rgba(46, 73, 130, 0.16), 0 3px 6px rgba(46, 73, 130, 0.23);"
      : ""};
    transition: box-shadow 0.3s ease-in-out;

    @media (max-width: 960px) {
      border-radius: 16px;
      padding: 16px 16px 16px 16px;
      width: initial;
      height: initial;
    }
  `,
  childrencontainer: (
    interactive?: boolean,
    childrencontainerStyle?: {
      paddingTop?: number;
      width?: number;
      height?: number;
      scale?: number;
    }
  ) => css`
    display: flex;
    flex-direction: column;
    cursor: ${interactive ? "" : "pointer"};
    padding-top: ${childrencontainerStyle?.paddingTop
      ? `${childrencontainerStyle.paddingTop}px`
      : "initial"};
    width: ${childrencontainerStyle?.width
      ? `${childrencontainerStyle.width}%`
      : "initial"};
    height: ${childrencontainerStyle?.height
      ? `${childrencontainerStyle.height}%`
      : "initial"};
    transform: ${childrencontainerStyle?.scale
      ? `scale(${childrencontainerStyle.scale})`
      : "initial"};
    * {
      pointer-events: ${interactive ? "all" : "none"};
    }
  `,
};

interface GridWidgetProps {
  label?: string;
  link?: string;
  height?: string;
  tooltip?: string;
  interactive?: boolean;
  // childrencontainerStyle?: React.CSSProperties;
  childrencontainerStyle?: {
    paddingTop?: number;
    width?: number;
    height?: number;
    scale?: number;
  };
  disbursementsStatComponent?: FunctionComponent;
  // responsiveOrder?: number;
}

export const GridWidget: FunctionComponent<GridWidgetProps> = (props) => {
  const history = useHistory();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      css={style.widgetContainer(
        props.height,
        isHovered && !props.interactive && props.link !== undefined
      )}
    >
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
      <div
        key={props.label}
        // style={props.childrencontainerStyle}
        css={style.childrencontainer(
          props.interactive,
          props.childrencontainerStyle
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (props.link) {
            history.push(props.link);
          }
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
