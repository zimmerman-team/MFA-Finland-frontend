// @ts-nocheck
import React from "react";
import MUIAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  currentFilterOpenAtom,
  drawerAtom,
  languageAtom,
} from "app/state/recoil/atoms";
import { css } from "styled-components/macro";
import { MfaLogo } from "app/assets/mfa_logo";
import LanguageIcon from "@material-ui/icons/Language";
import SearchIcon from "@material-ui/icons/Search";
import { Popover } from "@material-ui/core";
import { FILTER_TYPES } from "../FilterPanel/data";

export function AppBar() {
  const [drawerState, setDrawerState] = useRecoilState(drawerAtom);
  const [currentLanguage, setLanguage] = useRecoilState(languageAtom);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);

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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          height: 64px;
          display: flex;
          justify-content: center;
          z-index: 100;
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
            padding: 0;
            background-color: ${PrimaryColor[0]};
          `}
        >
          {/* ---------------------------------------------- */}
          {/* logo */}
          <NavLink
            to="/"
            onClick={() => setCurrentFilterOpen(FILTER_TYPES.NONE)}
            css={`
              display: flex;
              text-decoration: none;
              transform-origin: right;
              // transform: translateX(-65px);
            `}
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MfaLogo />
            </IconButton>
            <div css={LogoText}>IATI Portal for MFA Finland</div>
          </NavLink>

          {/* ---------------------------------------------- */}
          {/* searchfield */}
          <div
            css={`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <SearchPlaceholder />

            {/* ---------------------------------------------- */}
            {/* lang switch */}
            {/* todo: move to separate component */}
            <div
              aria-describedby={id}
              onClick={handleClick}
              css={`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-left: 20px;
                margin-right: 20px;
                user-select: none;
                cursor: pointer;
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
                  text-transform: uppercase;
                `}
              >
                {currentLanguage}
              </div>
            </div>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <div
                css={`
                  display: flex;
                  flex-direction: column;
                  background-color: white;
                  padding: 16px;

                  div {
                    user-select: none;
                    cursor: pointer;
                    text-transform: uppercase;
                    margin-bottom: 16px;

                    &:hover {
                      opacity: 0.5;
                    }

                    &:last-child {
                      margin-bottom: 0;
                    }
                  }
                `}
              >
                <div
                  onClick={() => {
                    setLanguage("fi");
                  }}
                >
                  fi
                </div>
                <div
                  onClick={() => {
                    setLanguage("sv");
                  }}
                >
                  sv
                </div>
                <div
                  onClick={() => {
                    setLanguage("en");
                  }}
                >
                  en
                </div>
              </div>
            </Popover>

            {/* ---------------------------------------------- */}
            {/* burger menu */}
            <IconButton
              // edge="end"
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
          z-index: 1;
          top: 0;
          left: 0;
          position: fixed;
          background-color: ${PrimaryColor[0]};
          height: 64px;
          width: 100vw;
        `}
      />
    </React.Fragment>
  );
}

export const SearchPlaceholder = () => {
  const styles = {
    container: css`
      width: 144px;
      height: 36px;
      background: #bcc6d6;
      border-radius: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 2px;
      padding-left: 15px;
    `,
    label: css`
      color: ${SecondaryColor[2]};
    `,
    iconContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: ${PrimaryColor[2]};
    `,
    icon: css`
      fill: ${PrimaryColor[0]};
    `,
  };

  return (
    <div css={styles.container}>
      <div css={styles.label}>Search</div>
      <div css={styles.iconContainer}>
        <SearchIcon css={styles.icon} />
      </div>
    </div>
  );
};
