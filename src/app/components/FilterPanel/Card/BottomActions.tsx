import React from "react";
import get from "lodash/get";
import { ProjectPalette } from "app/theme";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import { PillButton } from "app/components/Buttons/PillButton";
import filters from "app/state/api/actions-reducers/cms/filters";
import { useMediaQuery } from "@material-ui/core";

interface BottomActions {
  onApply?: () => void;
  onReset: () => void;
}

export const BottomActions = (props: BottomActions) => {
  const cmsData = useCMSData({ returnData: true });
  const mobile = useMediaQuery("(max-width: 600px)");

  const styles = {
    container: css`
      @media (max-width: 600px) {
        width: 100%;
      }
    `,
    secondaryButton: css`
      text-transform: unset;
      color: white;
      margin-right: ${props.onApply ? "40px" : "0"};

      :hover {
        color: #bcc6d6;
      }

      @media (max-width: 600px) {
        width: ${props.onApply ? "50%" : "100%"};
        background-color: #ecf1fa;
        border-radius: 0;
        color: ${ProjectPalette.primary.main};
        height: 56px;
        margin: 0;
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

      @media (max-width: 600px) {
        width: 50%;
        background-color: #ecf1fa;
        border-radius: 0;
        color: ${ProjectPalette.primary.main};
        height: 56px;
        margin: 0;
      }
    `,
  };

  return (
    <div css={styles.container}>
      <PillButton
        variant="text"
        css={styles.secondaryButton}
        onClick={props.onReset}
      >
        {props.onApply
          ? get(cmsData, "filters.reset", "Reset filter")
          : get(cmsData, "filters.resetall", "Reset filters")}
      </PillButton>
      {props.onApply && (
        <PillButton css={styles.primaryButton} onClick={props.onApply}>
          {get(cmsData, "filters.apply", "Apply")}
        </PillButton>
      )}
    </div>
  );
};
