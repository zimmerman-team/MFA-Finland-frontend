// @ts-nocheck
import React from "react";
import get from "lodash/get";
import MUIAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useCMSData } from "app/hooks/useCMSData";
import IconButton from "@material-ui/core/IconButton";
import { PrimaryColor } from "app/theme";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  languageAtom,
  searchFocusAtom,
  currentFilterOpenAtom,
  bottomDrawerAtom,
  mobileSearchFocusAtom,
} from "app/state/recoil/atoms";
import { MfaLogo } from "app/assets/mfa_logo";
import LanguageIcon from "@material-ui/icons/Language";
import { FILTER_TYPES } from "app/components/FilterPanel/data";
import { LanguagePopover } from "app/components/AppBar/sort/LanguagePopover";
import { appbarStyle } from "app/components/AppBar/sort/appbarStyle";
import { Hidden } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { SearchComponent } from "app/components/AppBar/common/Search";
import { IconDots } from "app/assets/icons/IconDots";

export function AppBar() {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });
  const [isFocused] = useRecoilState(searchFocusAtom);
  const [currentLanguage, setLanguage] = useRecoilState(languageAtom);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);
  const [bottomMenuState, setBottomMenuState] = useRecoilState(
    bottomDrawerAtom
  );
  const [mobileSearchOpen, setMobileSearchOpen] = useRecoilState(
    mobileSearchFocusAtom
  );

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

  return (
    <React.Fragment>
      <MUIAppBar position="relative" color="inherit" css={appbarStyle.appBar}>
        <Toolbar disableGutters css={appbarStyle.toolBar(isFocused)}>
          {/* Accessibillity anchor */}
          <a
            css={appbarStyle.skipLink}
            href="#main"
            tabIndex={0}
            aria-label="Skip to main content"
          >
            Skip to main
          </a>

          {/* ---------------------------------------------- */}
          {/* logo */}
          {!mobileSearchOpen && (
            <NavLink
              to={`/${currentLanguage}/${location.search}`}
              css={appbarStyle.logoLink(!isFocused, !mobileSearchOpen)}
              onClick={() => {
                setCurrentFilterOpen(FILTER_TYPES.NONE);
              }}
            >
              <Hidden xsDown>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="Go to homepage"
                >
                  <MfaLogo />
                </IconButton>
              </Hidden>
              <h1 css={appbarStyle.logoText(PrimaryColor[2])}>
                {get(cmsData, "general.pagetitle", "")}
              </h1>
            </NavLink>
          )}

          <div
            css={`
              display: flex;
              align-items: center;
              justify-content: center;

              ${mobileSearchOpen
                ? `
                width: 100%;
                padding-right: 16px;

                > div {
                  width: 100%;
                }
              `
                : ""}
            `}
          >
            {/* ---------------------------------------------- */}
            {/* searchfield */}
            <Search
              mobileSearchOpen={mobileSearchOpen}
              setMobileSearchOpen={setMobileSearchOpen}
            />

            {/* ---------------------------------------------- */}
            {/* lang switch */}
            {!mobileSearchOpen && (
              <LanguageSwitch
                id={id}
                currentLanguage={currentLanguage}
                handleClick={handleClick}
              />
            )}

            {LanguagePopover(id, open, anchorEl, handleClose, setLanguage)}

            {/* ---------------------------------------------- */}
            {/* three dots */}
            <Hidden mdUp>
              {!mobileSearchOpen && (
                <ThreeDots toggleBottomMenu={toggleBottomMenu} />
              )}
            </Hidden>

            {/* ---------------------------------------------- */}
            {/* old placement of burger menu, currently acts as spacer */}
            <Hidden xsDown>
              <div
                css={`
                  min-width: 48px;
                  height: 48px;
                `}
              />
            </Hidden>
          </div>
        </Toolbar>
      </MUIAppBar>
    </React.Fragment>
  );
}

const Search = (props: any) => {
  return (
    <>
      <Hidden xsDown>
        {/* eslint-disable-next-line jsx-a11y/tabindex-no-positive */}
        <SearchComponent tabIndex={2} />
      </Hidden>
      <Hidden smUp>
        {!props.mobileSearchOpen && (
          <IconButton
            color="inherit"
            aria-label="Search"
            onClick={() => props.setMobileSearchOpen(true)}
            css={`
              @media (max-width: 600px) {
                padding-right: 4px;
              }
            `}
          >
            {/* TODO: Search panel implementation see: MF-456 */}
            <SearchIcon
              css={`
                fill: ${PrimaryColor[2]};
              `}
            />
          </IconButton>
        )}
        {props.mobileSearchOpen && (
          <div
            css={`
              > div {
                width: 100%;
              }
            `}
          >
            {/* eslint-disable-next-line jsx-a11y/tabindex-no-positive */}
            <SearchComponent tabIndex={2} />
          </div>
        )}
      </Hidden>
    </>
  );
};

const ThreeDots = ({ toggleBottomMenu }: { toggleBottomMenu: any }) => {
  return (
    <IconButton
      color="inherit"
      aria-label="bottom-menu"
      data-cy="three-dots-button"
      onClick={toggleBottomMenu(true)}
      css="margin-right: 6px;"
    >
      <IconDots />
    </IconButton>
  );
};

const LanguageSwitch = ({
  id,
  handleClick,
  currentLanguage,
}: {
  id: string | undefined;
  handleClick: any;
  currentLanguage: string;
}) => {
  return (
    <button
      role="button"
      aria-label="Switch language"
      aria-pressed="false"
      aria-describedby={id}
      onClick={handleClick}
      css={appbarStyle.langSwitchContainer}
    >
      <LanguageIcon
        css={`
          fill: ${PrimaryColor[2]};
          margin-bottom: 3px;
        `}
      />
      <div css={appbarStyle.selectedLanguages}>
        {currentLanguage === "se" ? "sv" : currentLanguage}
      </div>
    </button>
  );
};
