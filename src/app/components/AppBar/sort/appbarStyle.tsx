import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";

export const appbarStyle = {
  appBar: css`
    box-shadow: initial;
    position: sticky;
    top: 0;
    height: 68px;
    display: flex;
    justify-content: center;
    z-index: 102; //mui-datatable header has a default z-index of 100...

    @media (max-width: 600px) {
      justify-content: space-between;
      height: 56px;
    }
  `,
  toolBar: (searchOpen: boolean) => css`
    display: flex;
    padding: 0;
    align-items: center;
    justify-content: space-between;
    background-color: ${PrimaryColor[0]};
    @media (min-width: 600px) {
      min-height: 68px;
    }
    @media (max-width: 992px) {
      justify-content: ${searchOpen ? "flex-end" : "space-between"};
    }
  `,
  logoLink: (show: boolean) => css`
    display: flex;
    @media (max-width: 992px) {
      display: ${show ? "flex" : "none"};
    }
    text-decoration: none;
    @media (max-width: 960px) {
      margin-left: 12px;
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
    margin-left: 16px;

    @media (max-width: 600px) {
      font-size: 13px;
    }
  `,
  skipLink: css`
    position: absolute;
    top: -40px;
    left: 0;
    background: #000000;
    color: white;
    padding: 8px;
    z-index: 100;

    :focus {
      top: 0;
    }
  `,
};
