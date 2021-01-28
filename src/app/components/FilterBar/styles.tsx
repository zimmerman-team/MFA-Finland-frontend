import { css } from "styled-components/macro";
import { FilterBarProps } from "./index";
import { ProjectPalette, SecondaryColor } from "../../theme";

export const createStyles = (props: FilterBarProps) => {
  return {
    container: css`
      display: flex;
      align-items: center;
      position: sticky;
      top: 64px;
      margin-bottom: 16px;
      height: 64px;
      background-color: #ecf1fa;
      padding: 16px 0;
      overflow-x: auto;
      overflow-y: hidden;
      z-index: 2;
    `,
    background: css`
      z-index: -1;
      top: 64px;
      left: 0;
      position: fixed;
      background-color: #ecf1fa;
      height: 64px;
      width: 100vw;
    `,
    button: css`
      padding: 9px 16px;
      box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.14),
        0px 1px 8px rgba(0, 0, 0, 0.12);
      border-radius: 22px;
      text-transform: unset;
      line-height: 17px;
      min-width: 106px;
      height: 36px;
      :hover {
        background-color: ${SecondaryColor[1]};
      }
    `,
    label: css`
      margin: 0 24px;
    `,
    chipContainer: css``,
  };
};
