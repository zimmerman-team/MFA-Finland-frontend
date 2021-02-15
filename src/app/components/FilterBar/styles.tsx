import { css } from "styled-components/macro";

import { SecondaryColor } from "app/theme";
import { FilterBarProps } from "app/components/FilterBar/index";

export const createStyles = (props: FilterBarProps, height: number) => {
  return {
    container: css`
      display: flex;
      align-items: flex-start;
      position: sticky;
      top: 64px;
      margin-bottom: 16px;
      min-height: 64px;
      background-color: #ecf1fa;
      overflow-x: auto;
      overflow-y: hidden;
      z-index: 6;
      padding-top: 16px;
      padding-bottom: 4px;

      @media (max-width: 600px) {
        top: 56px;
        min-height: 56px;
        //height: 56px;
        //padding: initial;
        //margin: initial;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 16px;
      }
    `,
    background: css`
      z-index: 5;
      top: 64px;
      left: 0;
      position: fixed;
      background-color: #ecf1fa;
      min-height: ${height}px;
      width: 100vw;
      @media (max-width: 600px) {
        top: 56px;
      }
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
        box-shadow: none;
      }
    `,
    label: css`
      margin: 0 24px;
      white-space: nowrap;
    `,
    chipContainer: css`
      display: block;
      @media (max-width: 600px) {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        //justify-content: space-evenly;
      }
    `,
    buttonContainer: css`
      display: flex;
      align-items: center;

      @media (max-width: 600px) {
        width: 100%;
        margin-bottom: 16px;
      }
    `,
  };
};
