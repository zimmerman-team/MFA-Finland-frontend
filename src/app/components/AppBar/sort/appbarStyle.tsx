import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";

export const appbarStyle = {
  appBar: css`
    margin-left: auto;
    margin-right: auto;
    //max-width: calc(1440px - 64px);
    max-width: 1440px;
    padding: 0 32px;

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

    @media (max-width: 960px) {
      padding: 0;
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

    @media (max-width: 1440px) {
      box-shadow: -669px 0px 0px 0px ${PrimaryColor[0]},
        669px 0px 0px 0px ${PrimaryColor[0]};
    }

    @media (max-width: 800px) {
      box-shadow: -300px 0px 0px 0px ${PrimaryColor[0]},
        300px 0px 0px 0px ${PrimaryColor[0]};
    }

    @media (max-width: 600px) {
      box-shadow: -100px 0px 0px 0px ${PrimaryColor[0]},
        100px 0px 0px 0px ${PrimaryColor[0]};
    }

    box-shadow: -1240px 0px 0px 0px ${PrimaryColor[0]},
      1240px 0px 0px 0px ${PrimaryColor[0]};
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

    @media (max-width: 600px) {
      margin-right: auto;
      margin-left: 0;
    }
  `,
  langSwitchContainer: css`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    margin-right: 20px;
    user-select: none;
    cursor: pointer;
    @media (max-width: 600px) {
      margin-left: 12px;
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
      margin-left: 2px;
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
