import { css } from "styled-components/macro";
import { ProjectPalette } from "../../../theme";
import { PillButton } from "../../Buttons/PillButton";
import React from "react";

interface BottomActions {}

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
      <PillButton variant="text" css={styles.secondaryButton}>
        Reset filters
      </PillButton>
      <PillButton css={styles.primaryButton}>Apply</PillButton>
    </>
  );
};
