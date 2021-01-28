import React from "react";
import { css } from "styled-components/macro";
import IconButton from "@material-ui/core/IconButton";
import { Lock, LockOpen } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { ProjectPalette } from "../../../theme";
import { PillButton } from "../../Buttons/PillButton";

interface TooltipModel {
  label: string;
  value: number | bigint;
  type: string;
  isLocked: boolean;
  handleLockClick: Function;
}
export const HeaderContainer = css`
  display: flex;
  justify-content: space-between;
`;

export const Header = css`
  line-height: 22px;
  letter-spacing: unset;
`;

export const ValueLabel = css`
  font-family: Finlandica;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${ProjectPalette.primary.main};

  margin-bottom: 8px;
`;

export const Value = css`
  line-height: 29px;
`;

export const ButtonContainerStyle = css`
  display: flex;
  justify-content: flex-end;
`;

export const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  top: -76px;
  left: -120px;
  width: 296px;
  height: 181px;
  background: #ffffff;
  border-radius: 15px;
  filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
  padding: 16px 24px 24px 16px;
`;

export const Icon = css`
  margin-top: -12px;
  margin-right: -12px;
  margin-bottom: -2px;
`;

export const Tooltip = React.memo(function TooltipMemoized(
  props: TooltipModel
) {
  return (
    <div css={Container}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div css={HeaderContainer}>
          <Typography variant="h6" color="primary" css={Header}>
            {props.label}
          </Typography>
          <IconButton
            onClick={() => props.handleLockClick()}
            color="primary"
            css={Icon}
          >
            {props.isLocked ? <Lock /> : <LockOpen />}
          </IconButton>
        </div>
        <div css={ValueLabel}>Disbursements</div>
        <Typography variant="h5" css={Value}>
          {`€ ${new Intl.NumberFormat("nl-NL").format(props.value)}`}
        </Typography>
      </div>
      <div css={ButtonContainerStyle}>
        <PillButton>Country Page</PillButton>
      </div>
    </div>
  );
});
