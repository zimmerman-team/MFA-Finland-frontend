import React from "react";
import { Path } from "app/const/Path";

export interface GlobalNavItemProps {
  label: string;
  path: string;
}

export const GlobalNavItems: GlobalNavItemProps[] = [
  {
    label: "Feedback",
    path: Path.general.feedback,
  },
  {
    label: "About",
    path: Path.general.about,
  },
  {
    label: "Result",
    path: Path.general.result,
  },
  {
    label: "Privacy",
    path: Path.general.privacy,
  },
  {
    label: "Statements",
    path: Path.general.statements,
  },
  {
    label: "Language",
    path: "",
  },
];
