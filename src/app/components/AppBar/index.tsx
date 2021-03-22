// @ts-nocheck
import React from "react";
import MUIAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { PrimaryColor } from "app/theme";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  drawerAtom,
  languageAtom,
  searchFocusAtom,
  currentFilterOpenAtom,
  bottomDrawerAtom,
} from "app/state/recoil/atoms";
import { MfaLogo } from "app/assets/mfa_logo";
import LanguageIcon from "@material-ui/icons/Language";
import { FILTER_TYPES } from "app/components/FilterPanel/data";
import { LanguagePopover } from "app/components/AppBar/sort/LanguagePopover";
import { BackDrop } from "app/components/AppBar/sort/BackDrop";
import { appbarStyle } from "app/components/AppBar/sort/appbarStyle";
import { Hidden } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { SearchComponent } from "app/components/AppBar/common/Search";
import { IconDots } from "app/assets/icons/IconDots";

export function AppBar() {
  const [isFocused] = useRecoilState(searchFocusAtom);
  const [drawerState, setDrawerState] = useRecoilState(drawerAtom);
  const [currentLanguage, setLanguage] = useRecoilState(languageAtom);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);
  const [bottomMenuState, setBottomMenuState] = useRecoilState(
    bottomDrawerAtom
  );

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

  const toggleBottomMenu = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setBottomMenuState(open);
  };

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

  const location = useLocation();

  return (
    <React.Fragment>
      <MUIAppBar position="relative" color="inherit" css={appbarStyle.appBar}>
        <Toolbar disableGutters css={appbarStyle.toolBar(isFocused)}>
          <Hidden smUp>
            {!isFocused && (
              <IconButton
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
            )}
          </Hidden>
          {/* ---------------------------------------------- */}
          {/* logo */}
          <NavLink
            to={`/${location.search}`}
            css={appbarStyle.logoLink(!isFocused)}
            onClick={() => setCurrentFilterOpen(FILTER_TYPES.NONE)}
          >
            <Hidden xsDown>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MfaLogo />
              </IconButton>
            </Hidden>
            <div css={appbarStyle.logoText(PrimaryColor[2])}>
              IATI Portal for MFA Finland
            </div>
          </NavLink>

          <div
            css={`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            {/* ---------------------------------------------- */}
            {/* searchfield */}
            <Hidden xsDown>
              <SearchComponent />
            </Hidden>

            <Hidden smUp>
              <IconButton
                color="inherit"
                aria-label="menu"
                // onClick={toggleDrawer(true)}
                data-cy="burger-menu-button"
              >
                <SearchIcon
                  css={`
                    fill: ${PrimaryColor[2]};
                  `}
                />
              </IconButton>
            </Hidden>

            {/* ---------------------------------------------- */}
            {/* lang switch */}
            <div
              aria-describedby={id}
              onClick={handleClick}
              css={appbarStyle.langSwitchContainer}
            >
              <LanguageIcon
                css={`
                  fill: ${PrimaryColor[2]};
                  margin-bottom: 3px;
                  @media (max-width: 600px) {
                    margin-bottom: initial;
                  }
                `}
              />
              <Hidden xsDown>
                <div css={appbarStyle.selectedLanguages}>{currentLanguage}</div>
              </Hidden>
            </div>

            {LanguagePopover(id, open, anchorEl, handleClose, setLanguage)}

            {/* ---------------------------------------------- */}
            {/* burger menu */}
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="bottom-menu"
                data-cy="three-dots-button"
                onClick={toggleBottomMenu(true)}
              >
                <IconDots />
              </IconButton>
            </Hidden>

            {/* ---------------------------------------------- */}
            {/* burger menu */}
            <Hidden xsDown>
              <IconButton
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
            </Hidden>
          </div>
        </Toolbar>
      </MUIAppBar>
      <BackDrop />
    </React.Fragment>
  );
}
