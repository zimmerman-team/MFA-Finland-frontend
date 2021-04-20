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
import { drawerStyle } from "app/components/Drawer/common/drawerStyle";
import { NavList } from "app/components/Drawer/common/NavList";

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
