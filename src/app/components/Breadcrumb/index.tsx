import React from "react";
import { Typography, Breadcrumbs as MUIBreadcrumbs } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";
import {
  BreadcrumbProps,
  BreadcrumbLinkModel,
} from "app/components/Breadcrumb/data";
import {
  BreadcrumbContainerStyle,
  BreadcrumbItemStyle,
  BreadcrumbActiveItemStyle,
} from "./style";

export const Breadcrumbs = (props: BreadcrumbProps) => {
  const location = useLocation();
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
              {breadcrumb.label}
            </NavLink>
          ) : (
            // if not, return plain text
            <Typography key={breadcrumb.label} css={BreadcrumbItemStyle}>
              {breadcrumb.label}
            </Typography>
          );
        }
        // last object in the array represents the current page
        return (
          // return plain text
          <Typography key={breadcrumb.label} css={BreadcrumbActiveItemStyle}>
            {breadcrumb.label}
          </Typography>
        );
      })}
    </MUIBreadcrumbs>
  );
};
