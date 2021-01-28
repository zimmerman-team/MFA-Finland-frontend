import { css } from "styled-components/macro";
import { ProjectPalette } from "../../theme";
import { FilterPanelProps } from "./index";

export const createStyles = (props: FilterPanelProps) => {
  return {
    container: css`
      background-color: ${ProjectPalette.primary.main};
      margin-top: -16px;
      padding-top: 24px;

      position: fixed;
      width: 100%;
      height: 100vh;
      left: 0;
      z-index: 1;
    `,
    muiContainer: css`
      padding: 0px;
    `,
    heading: css`
      color: white;
      margin-bottom: 37px;
    `,
    closeIcon: css`
      color: white;
    `,
    closeContainer: css`
      margin-top: -12px;
    `,
    actionContainer: css`
      margin-top: 32px;
    `,
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
};
