import { css } from "styled-components/macro";
import { PrimaryColor } from "app/theme";

export const drawerStyle = {
  LogoText: css`
    font-weight: bold;
    font-size: 18px;
    line-height: 1;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    color: ${PrimaryColor[2]};
    margin-left: 16px;
    @media (max-width: 600px) {
      margin: 0;
      width: 100%;
      text-align: center;
      place-content: center;
      //margin-left: 88px;
    }
  `,
  GreyIcon: css`
    /*filter: grayscale(1);
    :hover {
      filter: grayscale(0);
    }*/
  `,
  DrawerGridContainer: css`
    background-color: ${PrimaryColor[0]};
    height: 100%;
    padding-left: 39px;
    padding-right: 39px;
    @media (max-width: 600px) {
      padding: 0 16px;
    }
    //flex-direction: column;
  `,
  HeaderGrid: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 68px;

    @media (max-width: 600px) {
      height: 56px;
      margin-bottom: 32px;
    }
  `,
  NavLink: css`
    display: flex;
    text-decoration: none;
    @media (max-width: 600px) {
      width: 100%;
    }
  `,
  AddressContainer: css`
    padding-left: 32px;
    border-right: 1px solid #4f6797;

    @media (max-width: 960px) {
      padding-top: initial;
      border-right-style: none;
    }

    @media (max-width: 600px) {
      border-left: 1px solid #4f6797;
    }
  `,
  SocialIconContainer: css`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  `,
};
