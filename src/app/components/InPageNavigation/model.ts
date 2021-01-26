import {
  ActivityMetadata,
  ActivityItemProps,
} from "app/modules/activity-detail-module/common/Activity/model";
import React from "react";

export type InPageNavModel = {
  lists: InpageNavItemModel[] | ActivityItemProps[];
  dontShow?: boolean;
  active?: number;
  setActive?: React.Dispatch<React.SetStateAction<number>>;
  handleClick?: Function;
  actualData?: ActivityMetadata;
  handleClickUp?: Function;
  handleClickDown?: Function;
  setActivityListState?: any;
};

export interface InpageNavItemModel {
  id?: number;
  path: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export type LocationModel = {
  label: string;
  url: string;
};
