import React from "react";
import { Typography, Breadcrumbs as MUIBreadcrumbs } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";
import {
  BreadcrumbProps,
  BreadcrumbLinkModel,
} from "app/components/Breadcrumb/data";
import { useCMSData } from "app/hooks/useCMSData";
import get from "lodash/get";
import {
  BreadcrumbContainerStyle,
  BreadcrumbItemStyle,
  BreadcrumbActiveItemStyle,
} from "./style";

export const Breadcrumbs = (props: BreadcrumbProps) => {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });

  function getLabel(crumb: BreadcrumbLinkModel) {
    const cmsLabel = get(cmsData, crumb.cmsKey, null);
    if (cmsLabel !== "" && cmsLabel !== null) return cmsLabel;
    return crumb.label;
  }

  return (
    <MUIBreadcrumbs css={BreadcrumbContainerStyle} aria-label="breadcrumb">
      {props.route.map((breadcrumb: BreadcrumbLinkModel, index: number) => {
        // all objects except the last one in the array
        if (index < props.route.length - 1) {
          // does the object contain a value for the path property?
          return breadcrumb.path ? (
            // if so, return a link
            <NavLink
              key={breadcrumb.label}
              css={BreadcrumbItemStyle}
              to={`${breadcrumb.path}${location.search}`}
            >
              {getLabel(breadcrumb)}
            </NavLink>
          ) : (
            // if not, return plain text
            <Typography key={breadcrumb.label} css={BreadcrumbItemStyle}>
              {getLabel(breadcrumb)}
            </Typography>
          );
        }
        // last object in the array represents the current page
        return (
          // return plain text
          <Typography key={breadcrumb.label} css={BreadcrumbActiveItemStyle}>
            {getLabel(breadcrumb)}
          </Typography>
        );
      })}
    </MUIBreadcrumbs>
  );
};
