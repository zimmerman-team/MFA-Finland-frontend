import React from "react";
import MUIAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import LogoMFA from "app/assets/mfa_logo.svg";
import theme, { PrimaryColor, SecondaryColor } from "app/theme";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { drawerAtom } from "app/state/recoil/atoms";
import { css } from "styled-components/macro";
import { MfaLogo } from "app/assets/mfa_logo";
import LanguageIcon from "@material-ui/icons/Language";
import SearchIcon from "@material-ui/icons/Search";

export function AppBar() {
  const [drawerState, setDrawerState] = useRecoilState(drawerAtom);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  const LogoText = css`
    font-weight: bold;
    font-size: 18px;
    line-height: 1;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    color: ${PrimaryColor[2]};
    margin-left: 15px;
  `;

  return (
    <React.Fragment>
      <MUIAppBar
        position="relative"
        color="inherit"
        // todo: move elsewhere
        css={`
          box-shadow: initial;
          position: sticky;
          top: 0;
          margin-bottom: 8px;
          height: 68px;
          display: flex;
          justify-content: center;
          //align-items: center;
        `}
      >
        <Toolbar
          // variant="dense"
          disableGutters
          // todo: move elsewhere
          css={`
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 68px;
            background-color: ${PrimaryColor[0]};
          `}
        >
          <NavLink
            to="/"
            css={`
              display: flex;
              text-decoration: none;
              transform-origin: right;
              transform: translateX(-65px);
            `}
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MfaLogo />
            </IconButton>
            <div css={LogoText}>IATI Portal for MFA Finland</div>
          </NavLink>
          <div
            css={`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <div
              css={`
                width: 144px;
                height: 36px;
                background: #bcc6d6;
                border-radius: 32px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: 2px;
                padding-left: 15px;
              `}
            >
              <div
                css={`
                  color: ${SecondaryColor[2]};
                `}
              >
                Search
              </div>
              <div
                css={`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background-color: ${PrimaryColor[2]};
                `}
              >
                <SearchIcon
                  css={`
                    fill: ${PrimaryColor[0]};
                  `}
                />
              </div>
            </div>

            <div
              css={`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-left: 20px;
                margin-right: 20px;
              `}
            >
              <LanguageIcon
                css={`
                  fill: ${PrimaryColor[2]};
                  margin-bottom: 3px;
                `}
              />
              <div
                css={`
                  font-weight: normal;
                  font-size: 10px;
                  line-height: 1;
                  display: flex;
                  align-items: center;

                  color: #ffffff;
                `}
              >
                ENG
              </div>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              data-cy="burger-menu-button"
            >
              <MenuIcon
                css={`
                  fill: ${PrimaryColor[2]};
                `}
              />
            </IconButton>
          </div>
        </Toolbar>
      </MUIAppBar>
      <div
        // todo: move elsewhere
        css={`
          z-index: -1;
          top: 0;
          left: 0;
          position: fixed;
          background-color: ${PrimaryColor[0]};
          height: 68px;
          width: 100vw;
        `}
      />
    </React.Fragment>
  );
}
