import React from "react";
import MUIDrawer from "@material-ui/core/Drawer";
import MUIList from "@material-ui/core/List";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Box, Divider, Grid } from "@material-ui/core";
import { GlobalNavItemProps, GlobalNavItems } from "app/components/Drawer/data";
import { Paper } from "app/components/Paper";
import { useRecoilState } from "recoil";
import { drawerAtom } from "app/state/recoil/atoms";
import { DrawerItem } from "app/components/Drawer/common/DrawerItem";

import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { MfaLogo } from "app/assets/mfa_logo";
import { NavLink } from "react-router-dom";
import { css } from "styled-components/macro";
import { PrimaryColor } from "app/theme";
import Typography from "@material-ui/core/Typography";
import { LogoGoogle } from "app/assets/icons/LogoGoogle";
import { LogoMicrosoft } from "app/assets/icons/LogoMicrosoft";
import { LogoGithub } from "app/assets/icons/LogoGithub";
import { IconFacebook } from "app/assets/icons/IconFacebook";
import { IconYoutube } from "app/assets/icons/IconYoutube";
import { IconLinkedin } from "app/assets/icons/IconLinkedin";
import { IconTwitter } from "app/assets/icons/IconTwitter";

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

export const GreyIcon = css`
  filter: grayscale(1);
  :hover {
    filter: grayscale(0);
  }
`;

export const Drawer = () => {
  const [drawerState, setDrawerState] = useRecoilState(drawerAtom);

  // todo: simplify this logic
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

  const NavList = () => (
    <div
      role="presentation"
      onKeyDown={toggleDrawer(false)}
      onClick={toggleDrawer(false)}
    >
      <MUIList disablePadding>
        {GlobalNavItems.map((item: GlobalNavItemProps, index: number) => (
          <DrawerItem {...item} key={index} />
        ))}
      </MUIList>

      <Box width="100%" height="32px" />
    </div>
  );

  return (
    <MUIDrawer anchor="top" open={drawerState} onClose={toggleDrawer(false)}>
      <Grid
        container
        item
        lg={12}
        css={`
          background-color: ${PrimaryColor[0]};
          height: 100vh;
          padding-left: 39px;
          padding-right: 39px;
        `}
      >
        {/* ----------------------------------------------------------- */}
        {/* header */}
        <Grid
          item
          lg={12}
          css={`
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 68px;
          `}
        >
          <NavLink
            to="/"
            css={`
              display: flex;
              text-decoration: none;
              //transform-origin: right;
              //transform: translateX(-65px);
            `}
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MfaLogo />
            </IconButton>
            <div css={LogoText}>IATI Portal for MFA Finland</div>
          </NavLink>
          <IconButton
            onClick={toggleDrawer(false)}
            css={`
              color: ${PrimaryColor[2]};
            `}
          >
            <CloseIcon />
          </IconButton>
        </Grid>

        {/* ----------------------------------------------------------- */}
        {/* content */}
        <Grid
          item
          container
          lg={12}
          css={`
            //height: 210px;
          `}
        >
          {/* ----------------------------------------------------------- */}
          {/* links */}
          <Grid item lg={2}>
            <NavList />
          </Grid>
          <Divider orientation="vertical" flexItem />
          {/* ----------------------------------------------------------- */}
          {/* address */}
          <Grid
            item
            lg={3}
            css={`
              padding-top: 12px;
              padding-left: 32px;
            `}
          >
            <Typography
              variant="body1"
              css={`
                color: white;
              `}
            >
              Ministry for Foreign Affairs
              <br />
              PO Box 176
              <br /> FI-00023 Government
              <br /> Finland
            </Typography>
            <br /> <br /> <br /> <br />
            <Typography
              variant="body1"
              css={`
                color: white;
              `}
            >
              Switchboard +358 295 16001
              <br />
              kirjaamo.um@formin.fi
            </Typography>
          </Grid>

          {/* ----------------------------------------------------------- */}
          {/* socials */}
          <Grid
            item
            container
            lg={3}
            css={`
              padding-left: 32px;
            `}
          >
            <Grid item lg={12}>
              <div
                css={`
                  display: flex;
                  list-style: none;
                  margin: 0;
                  padding: 0;
                `}
              >
                <IconButton
                  // disabled
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  href="https://www.google.com"
                  target="_blank"
                >
                  <IconFacebook css={GreyIcon} />
                </IconButton>
                <IconButton
                  // disabled
                  color="inherit"
                  aria-label="menu"
                  href="https://www.microsoft.com"
                  target="_blank"
                >
                  <IconYoutube css={GreyIcon} />
                </IconButton>
                <IconButton
                  // disabled
                  // edge="end"
                  color="inherit"
                  aria-label="menu"
                  href="https://www.github.com"
                  target="_blank"
                >
                  <IconLinkedin css={GreyIcon} />
                </IconButton>
                <IconButton
                  // disabled
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  href="https://www.github.com"
                  target="_blank"
                >
                  <IconTwitter css={GreyIcon} />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*<NavList />*/}
    </MUIDrawer>
  );
};
