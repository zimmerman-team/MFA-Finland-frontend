import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { PrimaryColor } from "app/theme";
import { NavLink } from "react-router-dom";
import { MfaLogo } from "app/assets/mfa_logo";
import MUIDrawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import { useCMSData } from "app/hooks/useCMSData";
import CancelIcon from "@material-ui/icons/Cancel";
import { drawerAtom } from "app/state/recoil/atoms";
import IconButton from "@material-ui/core/IconButton";
import { NavList } from "app/components/Drawer/common/NavList";
import { Grid, Hidden, useMediaQuery } from "@material-ui/core";
import { GlobalNavItems } from "app/components/Drawer/common/data";
import { drawerStyle } from "app/components/Drawer/common/drawerStyle";

export const Drawer = () => {
  const cmsData = useCMSData({ returnData: true });
  const [drawerState, setDrawerState] = useRecoilState(drawerAtom);
  const mobile = useMediaQuery("(max-width: 600px)");

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
        </Grid>
      </Grid>
    </MUIDrawer>
  );
};
