import React from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
// import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import { Path } from "app/const/Path";

export interface GlobalNavItemProps {
  label: string;
  path: string;
  icon: JSX.Element;
}

export const GlobalNavItems: GlobalNavItemProps[] = [
  {
    label: "Home",
    path: "/",
    icon: <HomeOutlinedIcon fontSize="inherit" />,
  },
  // {
  //   label: 'Explore',
  //   path: Path.explore,
  //   icon: <ExploreOutlinedIcon fontSize="inherit" />,
  // },
  {
    label: "FAQ",
    path: Path.general.faq,
    icon: <HelpOutlineOutlinedIcon fontSize="inherit" />,
  },
  {
    label: "Info",
    path: Path.general.info,
    icon: <InfoOutlinedIcon fontSize="inherit" />,
  },
  {
    label: "Contact",
    path: Path.general.contact,
    icon: <MailOutlinedIcon fontSize="inherit" />,
  },
];
