import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";

export const appbarStyle = {
  appBar: css`
    box-shadow: initial;
    position: sticky;
    top: 0;
    height: 64px;
    display: flex;
    justify-content: center;
    z-index: 102; //mui-datatable header has a default z-index of 100...

    @media (max-width: 600px) {
      justify-content: space-between;
    }
  `,
  toolBar: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    background-color: ${PrimaryColor[0]};
  `,
  logoLink: css`
    display: flex;
    text-decoration: none;
    @media (max-width: 960px) {
      margin-left: 24px;
    }
  `,
  langSwitchContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    margin-right: 20px;
    user-select: none;
    cursor: pointer;
    @media (max-width: 600px) {
      margin-left: 0;
      margin-right: 12px;
    }
  `,
  selectedLanguages: css`
    font-weight: normal;
    font-size: 10px;
    line-height: 1;
    display: flex;
    align-items: center;
    color: #ffffff;
    text-transform: uppercase;
  `,
  logoText: (color: any) => css`
    font-weight: bold;
    font-size: 18px;
    line-height: 1;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    color: ${color};
    margin-left: 15px;

    @media (max-width: 600px) {
      font-size: 13px;
    }
  `,
};
