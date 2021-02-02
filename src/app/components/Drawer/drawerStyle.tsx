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
    margin-left: 15px;
  `,
  GreyIcon: css`
    filter: grayscale(1);
    :hover {
      filter: grayscale(0);
    }
  `,
  DrawerGridContainer: css`
    background-color: ${PrimaryColor[0]};
    height: 100vh;
    padding-left: 39px;
    padding-right: 39px;
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
  `,
  SocialIconContainer: css`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  `,
};
