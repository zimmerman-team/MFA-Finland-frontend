import { ProjectPalette } from "app/theme";
import { css } from "styled-components/macro";
import { FilterPanelProps } from "app/components/FilterPanel/data";

export const createStyles = (props: FilterPanelProps) => {
  return {
    container: css`
      background-color: ${ProjectPalette.primary.main};
      padding-top: 12px;

      position: fixed;
      width: 100vw;
      height: 100vh;
      left: 0;
      z-index: 101;

      @media (max-width: 600px) {
        padding: 0;
      }
    `,
    muiContainer: css`
      padding: 0 100px;
      padding-top: 12px;
      overflow-y: auto;
      height: calc(100vh - 160px);

      @media (max-width: 960px) {
        padding: 16px;
      }

      @media (max-width: 600px) {
        height: calc(100vh - 320px);
      }
    `,
    heading: css`
      color: white;
      margin-bottom: 37px;
      @media (max-width: 600px) {
        margin-bottom: 36px;
        margin-top: 8px;
      }
    `,
    closeIcon: css`
      color: white;
    `,
    closeContainer: css`
      margin-top: -12px;
      margin-right: -12px;
      @media (max-width: 600px) {
        margin-top: -6px;
      }
    `,
    actionContainer: css`
      margin-top: 32px;
      @media (max-width: 600px) {
        position: fixed;
        bottom: 0;
        left: 0;
      }
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
