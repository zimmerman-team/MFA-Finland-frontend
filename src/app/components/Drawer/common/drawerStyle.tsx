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
    //flex-direction: column;
  `,
  HeaderGrid: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 68px;
  `,
  NavLink: css`
    display: flex;
    text-decoration: none;
  `,
  AddressContainer: css`
    padding-top: 12px;
    padding-left: 32px;
    border-right: 1px solid #fff;

    @media (max-width: 960px) {
      padding-top: initial;
      border-right-style: none;
    }
  `,
  SocialIconContainer: css`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  `,
};
