import React from "react";
import { Path } from "app/const/Path";

export interface GlobalNavItemProps {
  label: string;
  path: string;
}

export const GlobalNavItems: GlobalNavItemProps[] = [
  {
    label: "Feedback",
    path: Path.feedback,
  },
  {
    label: "About",
    path: Path.general.faq,
  },
  {
    label: "Result",
    path: Path.general.info,
  },
  {
    label: "Privacy",
    path: Path.general.contact,
  },
  {
    label: "Statements",
    path: Path.general.contact,
  },
];
