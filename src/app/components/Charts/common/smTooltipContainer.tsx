import React from "react";
import { css } from "styled-components/macro";
import IconClose from "@material-ui/icons/Close";
import { Button, IconButton } from "@material-ui/core/";

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
  }
`;

interface SmTooltipContainerProps {
  close: Function;
  drilldown: Function;
  children: React.ReactNode;
  showDrilldownBtn: boolean;
}

export const SmTooltipContainer = (props: SmTooltipContainerProps) => (
  <div css={containercss}>
    <div css={innercontainercss}>
      <div
        css={`
          width: 100%;
          display: flex;
          justify-content: flex-end;
        `}
      >
        <IconButton css={closebtncss} onClick={() => props.close()}>
          <IconClose />
        </IconButton>
      </div>
      {props.children}
      {props.showDrilldownBtn && (
        <React.Fragment>
          <div css="width: 100%;height: 15px;" />
          <Button
            color="secondary"
            variant="contained"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              props.close();
              props.drilldown();
            }}
          >
            Drill down
          </Button>
        </React.Fragment>
      )}
    </div>
  </div>
);
