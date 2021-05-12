import { css } from "styled-components/macro";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { FilterBarProps } from "app/components/FilterBar/index";

export const createStyles = (props: FilterBarProps) => {
  return {
    container: css`
      max-width: 1376px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 64px;
      padding-right: 64px;

      display: flex;
      align-items: flex-start;
      position: sticky;
      top: 68px;
      //margin-bottom: 16px;
      //margin-left: 68px;
      //margin-right: 68px;
      min-height: 68px;
      background-color: #ecf1fa;
      z-index: 6;
      padding-top: 16px;
      padding-bottom: 16px;

      @media (max-width: 1439px) {
        padding-left: 98px;
        box-shadow: -669px 0px 0px 0px #ecf1fa, 669px 0px 0px 0px #ecf1fa;
      }

      @media (max-width: 960px) {
        padding-left: 12px;
        padding-right: 12px;
      }

      @media (max-width: 600px) {
        top: 56px;
        //margin-left: 12px;
        margin-right: 0px;
      }

      @media (max-width: 800px) {
        box-shadow: -300px 0px 0px 0px #ecf1fa, 300px 0px 0px 0px #ecf1fa;
      }

      @media (max-width: 600px) {
        box-shadow: -100px 0px 0px 0px #ecf1fa, 100px 0px 0px 0px #ecf1fa;
      }

      box-shadow: -1240px 0px 0px 0px #ecf1fa, 1240px 0px 0px 0px #ecf1fa;
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
        background-color: ${PrimaryColor[3]};
        box-shadow: none;
      }

      @media (max-width: 600px) {
        display: none;
      }
    `,
    label: css`
      margin: 0 24px;
      white-space: nowrap;

      @media (max-width: 600px) {
        margin: initial;
        height: 36px;
        line-height: 36px;
      }
    `,
    chipContainer: css`
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 2px;
      @media (max-width: 600px) {
        flex-wrap: nowrap;
        overflow-x: auto;

        &::-webkit-scrollbar {
          width: 6px;
          height: 2px;
          background: #ededf6;
        }
        &::-webkit-scrollbar-track {
          border-radius: 4px;
          background: #ededf6;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background: #2e4063;
        }
      }
    `,
    buttonContainer: css`
      display: flex;
      align-items: center;

      @media (max-width: 600px) {
        margin-right: 18px;
      }
    `,
  };
};
