import React from "react";
import { ProjectPalette } from "app/theme";
import { css } from "styled-components/macro";
import { PillButton } from "app/components/Buttons/PillButton";

interface BottomActions {
  onApply: () => void;
  onReset: () => void;
}

export const BottomActions = (props: BottomActions) => {
  const styles = {
    secondaryButton: css`
      text-transform: unset;
      color: white;
      margin-right: 40px;

      :hover {
        color: #bcc6d6;
      }
    `,
    primaryButton: css`
      padding: 9px 32px 10px 32px;
      background-color: white;
      color: ${ProjectPalette.primary.main};
      border-radius: 22px;
      text-transform: unset;
      line-height: 17px;

      :hover {
        background: #ecf1fa;
      }
    `,
  };

  return (
    <>
      <PillButton
        variant="text"
        css={styles.secondaryButton}
        onClick={props.onReset}
      >
        Reset filters
      </PillButton>
      <PillButton css={styles.primaryButton} onClick={props.onApply}>
        Apply
      </PillButton>
    </>
  );
};
