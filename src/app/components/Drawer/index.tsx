import React from "react";
import get from "lodash/get";
import MUIDrawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useCMSData } from "app/hooks/useCMSData";
import { Grid } from "@material-ui/core";
import { GlobalNavItems } from "app/components/Drawer/common/data";
import { useRecoilState } from "recoil";
import { drawerAtom } from "app/state/recoil/atoms";
import { MfaLogo } from "app/assets/mfa_logo";
import { NavLink } from "react-router-dom";
import { PrimaryColor } from "app/theme";
import Typography from "@material-ui/core/Typography";
import { drawerStyle } from "app/components/Drawer/common/drawerStyle";
import { NavList } from "app/components/Drawer/common/NavList";

import LogoFacebook from "app/assets/icons/logo_fb.png";
import LogoYoutube from "app/assets/icons/logo_yt.png";
import LogoLinkedin from "app/assets/icons/logo_linkedin.png";
import LogoTwitter from "app/assets/icons/logo_twitter.png";

export const Drawer = () => {
  const cmsData = useCMSData({ returnData: true });
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

  return (
    <MUIDrawer anchor="top" open={drawerState} onClose={toggleDrawer(false)}>
      <Grid
        container
        item
        xs={12}
        sm={12}
        lg={12}
        css={drawerStyle.DrawerGridContainer}
      >
        {/* ----------------------------------------------------------- */}
        {/* header */}
        <Grid item xs={12} sm={12} lg={12} css={drawerStyle.HeaderGrid}>
          <NavLink to="/" css={drawerStyle.NavLink}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MfaLogo />
            </IconButton>
            <div css={drawerStyle.LogoText}>
              {get(cmsData, "general.pagetitle", "")}
            </div>
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
        <Grid item container xs={12} sm={12} lg={12}>
          {/* ----------------------------------------------------------- */}
          {/* links */}
          <Grid item xs={12} sm={12} lg={2}>
            <NavList items={GlobalNavItems} />
          </Grid>
          <div
            css={`
              width: 1px;
              height: 200px;
              background-color: white;

              @media (max-width: 960px) {
                width: 200px;
                height: 1px;
              }
            `}
          />
          {/* ----------------------------------------------------------- */}
          {/* address */}
          <Grid item xs={12} sm={12} lg={3} css={drawerStyle.AddressContainer}>
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
            <br /> <br />
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
          <div
            css={`
              width: 1px;
              height: 200px;
              background-color: white;

              @media (max-width: 960px) {
                width: 200px;
                height: 1px;
              }
            `}
          />
          {/* ----------------------------------------------------------- */}
          {/* socials */}
          <Grid
            item
            container
            xs={12}
            sm={12}
            lg={3}
            css={`
              padding-left: 32px;
              @media (max-width: 960px) {
                padding-left: initial;
              }
            `}
          >
            <Grid item lg={12}>
              <div css={drawerStyle.SocialIconContainer}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  href="https://www.facebook.com"
                  target="_blank"
                >
                  {/*<IconFacebook css={drawerStyle.GreyIcon} />*/}
                  <img
                    src={LogoFacebook}
                    css={`
                      width: 32px;
                      height: 32px;
                    `}
                    alt="facebook"
                  />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  href="https://www.facebook.com"
                  target="_blank"
                >
                  {/*<IconYoutube css={drawerStyle.GreyIcon} />*/}
                  <img
                    src={LogoYoutube}
                    css={`
                      width: 32px;
                      height: 32px;
                    `}
                    alt="facebook"
                  />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  href="https://www.linkedin.com"
                  target="_blank"
                >
                  {/*<IconLinkedin css={drawerStyle.GreyIcon} />*/}
                  <img
                    src={LogoLinkedin}
                    css={`
                      width: 32px;
                      height: 32px;
                    `}
                    alt="linkedin"
                  />
                </IconButton>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  href="https://www.twitter.com"
                  target="_blank"
                >
                  {/*<IconTwitter css={drawerStyle.GreyIcon} />*/}
                  <img
                    src={LogoTwitter}
                    css={`
                      width: 32px;
                      height: 32px;
                    `}
                    alt="twitter"
                  />
                </IconButton>
              </div>
            </Grid>
            <Grid item lg={12}>
              Lorem
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MUIDrawer>
  );
};
