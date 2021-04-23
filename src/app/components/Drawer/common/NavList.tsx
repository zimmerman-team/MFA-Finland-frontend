import React from "react";
import MUIList from "@material-ui/core/List";
import { Box, Hidden, useMediaQuery } from "@material-ui/core";
import { GlobalNavItemProps } from "app/components/Drawer/common/data";
import { useRecoilState } from "recoil";
import { drawerAtom } from "app/state/recoil/atoms";
import { DrawerItem } from "app/components/Drawer/common/DrawerItem";

export const NavList = (props: NavListProps) => {
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
    <div
      role="presentation"
      onKeyDown={toggleDrawer(false)}
      onClick={toggleDrawer(false)}
    >
      <MUIList disablePadding>
        {mobile && <DrawerItem label="Home" path="/" />}
        {props.items
          .filter((item) => {
            if (item.label === "Language" && !mobile) {
              return false;
            }
            return true;
          })
          .map((item: GlobalNavItemProps, index: number) => (
            <DrawerItem {...item} key={index} />
          ))}
      </MUIList>

      <Hidden smDown>
        <Box width="100%" height="32px" />
      </Hidden>
    </div>
  );
};
interface NavListProps {
  items: GlobalNavItemProps[];
}
