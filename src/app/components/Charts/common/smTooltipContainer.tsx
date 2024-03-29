import React from "react";
import { css } from "styled-components/macro";
import IconClose from "@material-ui/icons/Close";
import { Button, IconButton } from "@material-ui/core/";
import get from "lodash/get";

const containercss = css`
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  z-index: 1100;
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.12);

  * {
    z-index: 1101;
  }
`;

const innercontainercss = css`
  display: flex;
  background: #fff;
  padding: 12px 25px;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const closebtncss = css`
  && {
    padding: 0;

    svg {
      fill: #002561;
    }
  }
`;

const buttoncss = css`
  color: #fff;
  font-size: 14px;
  padding: 6px 12px;
  background: #002561;
  border-radius: 20px;
  text-transform: none;
`;

interface SmTooltipContainerProps {
  close: Function;
  drilldown?: Function;
  gotoDetail?: Function;
  detailBtnLabel?: string;
  children: React.ReactNode;
  showDrilldownBtn: boolean;
  cmsData?: any;
}

export const SmTooltipContainer = (props: SmTooltipContainerProps) => (
  <div data-cy="smalltooltipcontainer" css={containercss}>
    <div css={innercontainercss}>
      <div
        css={`
          width: 100%;
          display: flex;
          justify-content: flex-end;
        `}
      >
        <IconButton
          tabIndex={0}
          data-cy="CloseButton"
          aria-label="close tooltip button"
          css={closebtncss}
          onClick={() => props.close()}
          onKeyPress={(event: React.KeyboardEvent) => {
            if (event.key === "Enter") {
              props.close();
            }
          }}
        >
          <IconClose />
        </IconButton>
      </div>
      {props.children}
      {(props.showDrilldownBtn || props.gotoDetail) && (
        <React.Fragment>
          <div css="width: 100%;height: 15px;" />
          <div css="width: 100%;display: flex;justify-content: flex-end;align-items: center;gap: 16px;">
            {props.gotoDetail && (
              <Button
                data-cy="GotoDetailButton"
                aria-label="go to detail button"
                css={buttoncss}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  props.close();
                  if (props.gotoDetail) {
                    props.gotoDetail();
                  }
                }}
                onKeyPress={(event: React.KeyboardEvent) => {
                  props.close();
                  if (props.gotoDetail) {
                    props.gotoDetail();
                  }
                }}
              >
                {props.detailBtnLabel}
              </Button>
            )}
            {props.showDrilldownBtn && (
              <Button
                data-cy="DrillDownButton"
                aria-label="drilldown button"
                css={buttoncss}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  props.close();
                  if (props.drilldown) {
                    props.drilldown();
                  }
                }}
                onKeyPress={(event: React.KeyboardEvent) => {
                  props.close();
                  if (props.drilldown) {
                    props.drilldown();
                  }
                }}
              >
                {get(props.cmsData, "viz.drilldown", "Drill Down")}
              </Button>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  </div>
);
