import React from "react";
import MUIDrawer from "@material-ui/core/Drawer";
import MUIList from "@material-ui/core/List";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Box } from "@material-ui/core";
import { GlobalNavItemProps, GlobalNavItems } from "app/components/Drawer/data";
import { Paper } from "app/components/Paper";
import { useRecoilState } from "recoil";
import { drawerAtom } from "app/state/recoil/atoms";
import { DrawerItem } from "app/components/Drawer/common/DrawerItem";

import { useStoreState, useStoreActions } from "app/state/store/hooks";

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
      css={`
        padding-left: 16px;
        padding-right: 16px;
      `}
    >
      <div
        css={`
          display: flex;
          justify-content: flex-end;
          width: 100%;
          transform: translateX(10px);
        `}
      >
        <IconButton
          onClick={toggleDrawer(false)}
          css={`
            color: #2e4063;
          `}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <Box width="100%" height="30px" />
      <Paper>
        <MUIList disablePadding>
          {GlobalNavItems.map((item: GlobalNavItemProps, index: number) => (
            <DrawerItem {...item} key={index} />
          ))}
        </MUIList>
      </Paper>
      <Box width="100%" height="32px" />
    </div>
  );

  return (
    <MUIDrawer anchor="right" open={drawerState} onClose={toggleDrawer(false)}>
      <Box width="310px">
        <NavList />
      </Box>
    </MUIDrawer>
  );
};
