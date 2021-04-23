import React from "react";
import get from "lodash/get";
import MUIDrawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useCMSData } from "app/hooks/useCMSData";
import { Grid, Hidden, useMediaQuery, Typography } from "@material-ui/core";
import { GlobalNavItems } from "app/components/Drawer/common/data";
import { useRecoilState } from "recoil";
import { drawerAtom } from "app/state/recoil/atoms";
import { MfaLogo } from "app/assets/mfa_logo";
import { NavLink } from "react-router-dom";
import { PrimaryColor } from "app/theme";
import { drawerStyle } from "app/components/Drawer/common/drawerStyle";
import { NavList } from "app/components/Drawer/common/NavList";

import LogoFacebook from "app/assets/icons/logo_fb.png";
import LogoYoutube from "app/assets/icons/logo_yt.png";
import LogoLinkedin from "app/assets/icons/logo_linkedin.png";
import LogoTwitter from "app/assets/icons/logo_twitter.png";
import CancelIcon from "@material-ui/icons/Cancel";

export const Drawer = () => {
  const cmsData = useCMSData({ returnData: true });
  const [drawerState, setDrawerState] = useRecoilState(drawerAtom);
  const mobile = useMediaQuery("(max-width: 600px)");
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
            <Hidden smDown>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MfaLogo />
              </IconButton>
            </Hidden>
            <div css={drawerStyle.LogoText}>
              {get(cmsData, "general.pagetitle", "")}
            </div>
          </NavLink>

          <IconButton
            onClick={toggleDrawer(false)}
            css={`
              color: ${PrimaryColor[2]};
              @media (max-width: 600px) {
                transform: translateX();
              }
            `}
          >
            {mobile ? <CancelIcon /> : <CloseIcon />}
          </IconButton>
        </Grid>

        {/* ----------------------------------------------------------- */}
        {/* content */}
        <Grid item container xs={12} sm={12} lg={12} css="height: fit-content;">
          {/* ----------------------------------------------------------- */}
          {/* links */}
          <Grid
            item
            xs={12}
            sm={6}
            lg={2}
            css={`
              height: fit-content;
              @media (min-width: 600px) {
                border-right: 1px solid #fff;
              }
              @media (max-width: 600px) {
                margin-bottom: 48px;
              }
              border-right: 1px solid rgba(255, 255, 255, 0.7);
            `}
          >
            <NavList items={GlobalNavItems} />
          </Grid>

          {/* ----------------------------------------------------------- */}
          {/* address */}
          <Grid item xs={12} sm={6} lg={3} css={drawerStyle.AddressContainer}>
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
              {get(cmsData, "menu.telephone", "Switchboard +358 295 16001")}
              <br />
              kirjaamo.um@formin.fi
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} lg="auto" />

          {/* ----------------------------------------------------------- */}
          {/* socials */}
          <Grid
            item
            container
            xs={12}
            sm={6}
            lg={3}
            css={`
              padding-left: 32px;

              @media (max-width: 960px) {
                margin-top: 64px;
                border-left: 1px solid #fff;
              }
            `}
          >
            <Grid item lg={12}>
              <div css={drawerStyle.SocialIconContainer}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  target="_blank"
                  href={get(
                    cmsData,
                    "menu.facebooklink",
                    "https://www.facebook.com"
                  )}
                >
                  {/* <IconFacebook css={drawerStyle.GreyIcon} /> */}
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
                  target="_blank"
                  href={get(
                    cmsData,
                    "menu.youtubelink",
                    "https://www.youtube.com"
                  )}
                >
                  {/* <IconYoutube css={drawerStyle.GreyIcon} /> */}
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
                  target="_blank"
                  href={get(
                    cmsData,
                    "menu.linkedinlink",
                    "https://www.linkedin.com"
                  )}
                >
                  {/* <IconLinkedin css={drawerStyle.GreyIcon} /> */}
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
                  target="_blank"
                  href={get(
                    cmsData,
                    "menu.twitterlink",
                    "https://www.twitter.com"
                  )}
                >
                  {/* <IconTwitter css={drawerStyle.GreyIcon} /> */}
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
              <br />
              <Typography
                variant="body1"
                css={`
                  color: white;
                  @media (max-width: 960px) {
                    max-width: 60%;
                    margin-bottom: 48px;
                  }
                `}
              >
                {get(cmsData, "menu.social", "")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MUIDrawer>
  );
};
